import { supabase } from '@/lib/supabase-browser';

/**
 * Finds a contact by phone number.
 * @param {string} phone The E.164 formatted phone number.
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export const findContactByPhone = async (phone) => {
  if (!phone) {
    return { data: null, error: { message: 'Phone number is required.' } };
  }
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('id, phone')
      .eq('phone', phone)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error(`Error finding contact by phone ${phone}:`, error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    console.error(`Exception in findContactByPhone for ${phone}:`, err);
    return { data: null, error: err };
  }
};