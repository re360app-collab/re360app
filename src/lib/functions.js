import { supabase } from '@/lib/customSupabaseClient';

export const invokeFunction = async (functionName, payload) => {
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: JSON.stringify(payload),
  });

  if (error) {
    console.error(`Error invoking function '${functionName}':`, error);
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Could not connect to the server. Please check your connection.');
    }
    
    // Attempt to parse the error response if it's a stringified JSON
    try {
      const parsedError = JSON.parse(error.message);
      throw new Error(parsedError.error || `An unknown error occurred. Details: ${error.message}`);
    } catch (e) {
      // If parsing fails, it's likely an HTML response or a simple string error
      if (error.message.includes('&lt;!doctype html&gt;')) {
        throw new Error('Server returned an invalid response (likely an HTML error page). Please check the function path and server configuration.');
      }
      throw new Error(error.message || 'An unknown error occurred.');
    }
  }

  return { data, error };
};