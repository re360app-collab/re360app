import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { parsePhoneNumberFromString } from 'https://esm.sh/libphonenumber-js@1.11.4';

const getSupabaseAdminClient = (): SupabaseClient => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('CRITICAL: Missing Supabase environment variables (URL or Service Role Key).');
  }

  return createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
};

const normalizePhoneNumber = (phone: string): string | null => {
  if (!phone) return null;
  const phoneNumber = parsePhoneNumberFromString(phone, 'US');
  return phoneNumber ? phoneNumber.format('E.164') : null;
};

async function findOrCreateContact(supabase: SupabaseClient, fromNumber: string) {
    const { data, error } = await supabase
        .from('contacts')
        .upsert({ phone: fromNumber }, { onConflict: 'phone', ignoreDuplicates: false })
        .select('id, opted_out')
        .single();
    
    if (error) {
        console.error(`Error upserting contact for ${fromNumber}:`, error);
        throw new Error(`Database error during contact upsert: ${error.message}`);
    }
    return data;
}

const checkAuth = (req: Request) => {
  const user = Deno.env.get("TWILIO_WEBHOOK_USER");
  const pass = Deno.env.get("TWILIO_WEBHOOK_PASS");

  if (!user || !pass) {
    console.warn("Webhook basic auth not configured. Skipping auth check.");
    return true;
  }
  
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    console.warn("Incoming request missing Authorization header.");
    return false;
  }

  try {
    const [scheme, credentials] = authHeader.split(' ');
    if (scheme !== 'Basic') return false;

    const decoded = atob(credentials);
    const [authUser, authPass] = decoded.split(':');

    return authUser === user && authPass === pass;
  } catch(e) {
    console.error("Error parsing Authorization header:", e);
    return false;
  }
};

Deno.serve(async (req) => {
  const twiMLResponse = (xmlBody = '') => new Response(`<?xml version="1.0" encoding="UTF-8"?><Response>${xmlBody}</Response>`, { headers: { 'Content-Type': 'text/xml' } });
  
  const isDiagnostic = req.headers.get('X-Twilio-Signature') === 'DIAGNOSTIC_REQUEST';
  if (!isDiagnostic && !checkAuth(req)) {
      return new Response("Unauthorized", { status: 401 });
  }

  let fromNumberForErrorLogging = 'unknown';

  try {
    const formData = await req.formData();
    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;
    const rawPayload = Object.fromEntries(formData.entries());

    if (!from || !body) {
      console.warn('Inbound SMS missing "From" or "Body".');
      return twiMLResponse();
    }

    const fromNumber = normalizePhoneNumber(from);
    fromNumberForErrorLogging = fromNumber || from;
    if (!fromNumber) {
        console.error('Could not normalize phone number:', from);
        return twiMLResponse();
    }

    const supabaseAdmin = getSupabaseAdminClient();
    const contact = await findOrCreateContact(supabaseAdmin, fromNumber);
    if (!contact || !contact.id) {
        throw new Error(`FATAL: Could not get a valid contact ID for ${fromNumber}.`);
    }

    const { error: logError } = await supabaseAdmin.from('sms_inbound').insert({
      contact_id: contact.id,
      from_number: fromNumber,
      body: body,
      raw: rawPayload,
      status: 'received'
    });

    if (logError) {
      console.error(`Failed to log inbound SMS for contact ${contact.id}:`, logError);
    }

    const upperBody = body.trim().toUpperCase();
    if (['STOP', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT'].includes(upperBody)) {
      if (!contact.opted_out) {
        const { error: optOutError } = await supabaseAdmin
          .from('contacts')
          .update({ opted_out: true, opted_out_at: new Date().toISOString() })
          .eq('phone', fromNumber);

        if (optOutError) console.error(`Failed to process opt-out for contact ${contact.id}:`, optOutError);
      }
    }

    return twiMLResponse();
  } catch (error) {
    console.error(`CRITICAL ERROR in twilio-inbound for number "${fromNumberForErrorLogging}":`, error.message, error.stack);
    return twiMLResponse();
  }
});