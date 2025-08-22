import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

async function getBody(req: Request) {
  try {
    const contentType = req.headers.get('content-type');
    if (contentType?.includes('application/json')) return await req.json();
    if (contentType?.includes('application/x-www-form-urlencoded')) return Object.fromEntries(await req.formData());
  } catch (e) {
    console.error("Error parsing request body:", e);
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await getBody(req);
    if (!body) {
      return new Response(JSON.stringify({ error: 'Invalid request body.' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }

    const { token, first_name, last_name, email, phone, brokerage_name } = body;
    if (!token || !email || !first_name || !last_name || !brokerage_name) {
      const missing = Object.entries({token, email, first_name, last_name, brokerage_name}).filter(([,v])=>!v).map(([k])=>k).join(', ');
      return new Response(JSON.stringify({ error: `Missing required fields: ${missing}` }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 });
    }

    const supabaseAdmin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });

    const { data: tokenData, error: tokenError } = await supabaseAdmin.from('reg_tokens').select('id, contact_id, used').eq('token', token).single();
    if (tokenError || !tokenData) {
      return new Response(JSON.stringify({ error: 'Invalid or expired registration link.' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 });
    }
    if (tokenData.used) {
      return new Response(JSON.stringify({ error: 'This registration link has already been used.' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 410 });
    }

    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, { data: { first_name, last_name, phone, user_type: 'realtor', brokerage_name } });
    if (inviteError) {
      if (inviteError.message.includes('already registered')) {
        return new Response(JSON.stringify({ error: 'A user with this email already exists.' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 409 });
      }
      console.error(`Supabase invite error for ${email}:`, inviteError);
      throw new Error(`Failed to create user account: ${inviteError.message}`);
    }
    if (!inviteData.user) throw new Error('User invitation did not return a user object.');
    const newUserId = inviteData.user.id;

    let contactUpdateError;
    if (tokenData.contact_id) {
        const { error } = await supabaseAdmin
          .from('contacts')
          .update({ first_name, last_name, email, phone, registered: true, user_id: newUserId })
          .eq('id', tokenData.contact_id);
        contactUpdateError = error;
    } else {
        const { error } = await supabaseAdmin
          .from('contacts')
          .insert({ first_name, last_name, email, phone, registered: true, user_id: newUserId });
        contactUpdateError = error;
    }

    if (contactUpdateError) {
      console.error(`Contact update/link error for user_id ${newUserId}:`, contactUpdateError);
      throw new Error(`Failed to update contact details: ${contactUpdateError.message}`);
    }
    
    const { error: tokenUpdateError } = await supabaseAdmin.from('reg_tokens').update({ used: true, used_at: new Date().toISOString() }).eq('id', tokenData.id);
    if (tokenUpdateError) {
      console.error(`CRITICAL: Failed to mark token ${token} as used.`, tokenUpdateError);
    }

    return new Response(JSON.stringify({ success: true, userId: newUserId }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 });

  } catch (error) {
    console.error('Error in register-with-token function:', error);
    return new Response(JSON.stringify({ error: error.message || 'An unexpected server error occurred.' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 });
  }
});