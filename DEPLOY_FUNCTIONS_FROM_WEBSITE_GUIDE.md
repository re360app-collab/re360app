# How to Create a Supabase Edge Function from the Website

You were right! You can create a new function directly from the Supabase dashboard. Follow these steps precisely.

---

### Step 1: Navigate to Edge Functions in Supabase

1.  Go to your project's dashboard on the [Supabase website](https://supabase.com/dashboard).
2.  From the left sidebar, click on the **Edge Functions** icon (it looks like a cloud with a lambda symbol).

---

### Step 2: Create a New Function

1.  In the top right corner of the Edge Functions page, click the **"Create a new function"** button.
2.  A dialog box will appear. In the **"Function name"** field, type **exactly** this:
    ```
    send-realtor-invite
    ```
3.  Click the **"Create function"** button.

You will now be taken to the code editor for your new, empty function.

---

### Step 3: Paste the Function Code

1.  **Delete all the placeholder code** that is currently in the editor.
2.  **Copy the entire code block below** and **paste it** into the empty editor on the Supabase website.

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.30.0";
import { Twilio } from "https://deno.land/x/twilio@2.3.1/Twilio.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, phone } = await req.json();

    if (!name || !phone) {
      throw new Error("Missing name or phone number.");
    }
    
    // NOTE: The request must include the user's JWT in the Authorization header.
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? '',
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    // Verify the user is authenticated
    const { data: { user } } = await supabaseAdmin.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // Get Twilio credentials from Supabase secrets
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      throw new Error("Twilio environment variables are not set in Supabase Functions settings.");
    }
    
    const twilio = new Twilio(twilioAccountSid, twilioAuthToken);
    const message = `Hello ${name}, you have been invited to join the RE360App platform. Please register using this link: https://www.re360app.com/auth/register`;

    await twilio.messages.create({
      to: phone,
      from: twilioPhoneNumber,
      body: message,
    });
    
    return new Response(JSON.stringify({ success: true, message: `Invitation sent to ${name}` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in send-realtor-invite function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
```

---

### Step 4: Save and Deploy

1.  In the bottom right corner of the editor, click the **"Save and Deploy"** button.
2.  Wait for the deployment to finish (it might take a minute).

Once it's done, your `send-realtor-invite` function is **LIVE** and the "Add Realtor" feature in your app will now work.