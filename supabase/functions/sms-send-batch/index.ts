import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
    import { corsHeaders } from "../_shared/cors.ts";

    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const jsonResponse = (data: object, status = 200) =>
      new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status,
      });

    async function sendTwilioMessage(to: string, body: string, statusCallback: string) {
      const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
      const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
      const fromIdentifier = Deno.env.get("TWILIO_MESSAGING_SERVICE_SID") || Deno.env.get("TWILIO_PHONE_NUMBER");

      if (!accountSid || !authToken || !fromIdentifier || accountSid.includes("ACxx") || authToken.includes("your_")) {
        throw new Error("FATAL: Twilio credentials are not correctly configured in Supabase secrets. Please verify them in your project settings.");
      }

      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const authHeader = "Basic " + btoa(`${accountSid}:${authToken}`);
      
      const params = new URLSearchParams();
      params.append("To", to);
      params.append("Body", body);
      params.append("StatusCallback", statusCallback);
      
      if (fromIdentifier.startsWith("MG")) {
        params.append("MessagingServiceSid", fromIdentifier);
      } else {
        params.append("From", fromIdentifier);
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error(`Twilio API Error for ${to}:`, JSON.stringify(responseData, null, 2));
        throw new Error(responseData.message || `Twilio API failed with status ${response.status}.`);
      }
      return await response.json();
    }

    Deno.serve(async (req) => {
      if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
      }

      const PUBLIC_BASE_URL = Deno.env.get("PUBLIC_BASE_URL");
      if (!PUBLIC_BASE_URL) {
        return jsonResponse({ error: "Server configuration error: PUBLIC_BASE_URL is not set." }, 500);
      }

      try {
        const { contactIds, tag, message, campaign = "default" } = await req.json();

        let q;
        if (Array.isArray(contactIds) && contactIds.length) {
          q = supa.from("contacts").select("id, phone, first_name").in("id", contactIds).eq("opted_out", false);
        } else if (tag) {
          q = supa.from("contacts").select("id, phone, first_name").contains("tags", [tag]).eq("opted_out", false);
        } else {
          return jsonResponse({ error: "Provide contactIds[] or tag" }, 400);
        }
        const { data: contacts, error: cErr } = await q;
        if (cErr) throw cErr;
        if (!contacts?.length) return jsonResponse({ sent: 0, reason: "no contacts found" });

        const results = [];
        for (const c of contacts) {
          const token = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
          await supa.from("reg_tokens").insert({ token, contact_id: c.id, campaign });

          const link = `${PUBLIC_BASE_URL}/r?t=${token}`;
          const body = String(message).replaceAll("{link}", link).replaceAll("{first}", c.first_name ?? "");
          
          const statusCallbackUrl = `${PUBLIC_BASE_URL}/api/twilio-status-callback`;
          const msg = await sendTwilioMessage(c.phone, body, statusCallbackUrl);

          await supa.from("sms_outbound").insert({
            contact_id: c.id,
            to_number: c.phone,
            body,
            twilio_sid: msg.sid,
            status: "queued",
            campaign_name: campaign,
            link_token: token,
            source: "system"
          });
          results.push({ contact: c.phone, sid: msg.sid });
        }

        return jsonResponse({ sent: results.length, results });
      } catch (e) {
        console.error("sms-send-batch error:", e);
        return jsonResponse({ error: String(e.message || e) }, 500);
      }
    });