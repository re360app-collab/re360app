import { supabase } from '@/lib/customSupabaseClient';

const getApiHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  const headers = {
    'Content-Type': 'application/json',
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
  };
  if (session) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }
  return headers;
};

export const sendApiRequest = async (endpoint, payload, method = 'POST') => {
  const apiUrl = `/api/${endpoint}`;
  
  try {
    const headers = await getApiHeaders();

    const response = await fetch(apiUrl, {
      method: method,
      headers: headers,
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.error || `Server returned status ${response.status}`;
      console.error(`API Error on ${endpoint}:`, errorMessage);
      throw new Error(errorMessage);
    }
    
    return responseData;

  } catch (error) {
    console.error(`Failed to send a request to the Edge Function at ${apiUrl}:`, error);
    throw new Error(`Failed to send a request to the Edge Function. Please check the connection and try again.`);
  }
};