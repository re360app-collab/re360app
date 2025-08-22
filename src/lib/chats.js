import { supabase } from '@/lib/supabase';

export const getChatHistory = async (userId, sessionId) => {
  if (!userId || !sessionId) {
    return { data: [], error: new Error('User ID and Session ID are required.') };
  }
  
  const { data, error } = await supabase
    .from('chat_messages')
    .select('sender, content')
    .eq('user_id', userId)
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  return { data, error };
};

export const saveChatMessage = async ({ userId, sessionId, sender, content }) => {
  if (!userId || !sessionId || !sender || !content) {
    return { error: new Error('Missing required fields for saving chat message.') };
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      { 
        user_id: userId, 
        session_id: sessionId, 
        sender, 
        content 
      }
    ]);

  return { data, error };
};