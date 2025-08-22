import { supabase } from '@/lib/customSupabaseClient';

export const submitContactForm = async (formData) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([
      { 
        name: formData.name, 
        email: formData.email, 
        message: formData.message,
        is_read: false,
        archived: false,
      }
    ]);
  
  return { data, error };
};

export const getContactMessages = async (supabaseClient) => {
  const { data, error } = await supabaseClient
    .from('contact_messages')
    .select(`
      *,
      assigned_profile:assigned_to (first_name, last_name)
    `)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const fetchAllMessages = async (supabaseClient) => {
  return getContactMessages(supabaseClient);
};

export const getUnreadMessagesCount = async (supabaseClient) => {
  const { count, error } = await supabaseClient
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('is_read', false);
  return { count, error };
};

export const updateMessageStatus = async (supabaseClient, messageId, updates) => {
  const { data, error } = await supabaseClient
    .from('contact_messages')
    .update(updates)
    .eq('id', messageId)
    .select(`
      *,
      assigned_profile:assigned_to (first_name, last_name)
    `)
    .single();
  return { data, error };
};

export const updateMessage = async (supabaseClient, messageId, updates) => {
  return updateMessageStatus(supabaseClient, messageId, updates);
};