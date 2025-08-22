import { corsHeaders } from "../_shared/cors.ts";

const TWILIO_INBOUND_URL = Deno.env.get("SUPABASE_URL") + "/functions/v1/twilio-inbound";
const TWILIO_WEBHOOK_USER = Deno.env.get("TWILIO_WEBHOOK_USER");
const TWILIO_WEBHOOK_PASS = Deno.env.get("TWILIO_WEBHOOK_PASS");

function createAuthHeader() {
  if (!TWILIO_WEBHOOK_USER || !TWILIO_WEBHOOK_PASS) {
    console.warn("TWILIO_WEBHOOK_USER or TWILIO_WEBHOOK_PASS not set. Cannot create auth header.");
    return {};
  }
  const credentials = btoa(`${TWILIO_WEBHOOK_USER}:${TWILIO_WEBHOOK_PASS}`);
  return { 'Authorization': `Basic ${credentials}` };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { from_number, body } = await req.json();

    if (!from_number || !body) {
      return new Response(JSON.stringify({ error: 'Missing from_number or body' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const payload = {
      From: from_number,
      Body: body,
      MessageSid: `SM_DIAG_${crypto.randomUUID()}`,
      AccountSid: `AC_DIAG_${crypto.randomUUID()}`,
    };

    const response = await fetch(TWILIO_INBOUND_URL, {
      method: 'POST',
      headers: {
        ...createAuthHeader(),
        'Content-Type': 'application/json',
        'X-Twilio-Signature': 'DIAGNOSTIC_REQUEST'
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await response.text();

    if (!response.ok) {
        throw new Error(`Upstream twilio-inbound function failed with status ${response.status}: ${responseBody}`);
    }

    return new Response(JSON.stringify({ ok: true, message: 'Successfully simulated inbound SMS.', upstream_status: response.status, upstream_body: responseBody }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in diag-twilio-inbound function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});