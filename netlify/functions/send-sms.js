const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Ensure credentials are provided
if (!accountSid || !authToken || !fromPhoneNumber) {
  const missing = [
    !accountSid && "TWILIO_ACCOUNT_SID",
    !authToken && "TWILIO_AUTH_TOKEN",
    !fromPhoneNumber && "TWILIO_PHONE_NUMBER"
  ].filter(Boolean).join(", ");
  
  const errorMsg = `Twilio credentials missing: ${missing}. Please check environment variables.`;
  console.error(errorMsg);
  
  // This part will run during Netlify's build/deployment and locally.
  // We cannot return an HTTP response here, but we log the critical error.
  // The function will fail at runtime if invoked without credentials.
}

// Initialize client only if credentials exist.
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  if (!client) {
      return { 
          statusCode: 500, 
          body: JSON.stringify({ success: false, error: "Twilio client is not initialized. Check server credentials." })
      };
  }

  try {
    const { to, body } = JSON.parse(event.body);

    if (!to || !body) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing "to" or "body" in request.' }) };
    }

    const message = await client.messages.create({
      body: body,
      from: fromPhoneNumber,
      to: to
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, sid: message.sid })
    };
  } catch (error) {
    console.error('Twilio error:', error);
    return {
      statusCode: error.status || 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};