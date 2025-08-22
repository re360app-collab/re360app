import { supabase } from '@/lib/customSupabaseClient';

export const getFullUserProfile = async (userId) => {
  return await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single();
  
  return { data, error };
};

export const fetchAllUserProfiles = async (supabaseClient) => {
  const { data, error } = await supabaseClient
    .from('user_profiles')
    .select('*');
  return { data, error };
};

export const fetchLoanOfficers = async (supabaseClient) => {
  const { data, error } = await supabaseClient
    .from('user_profiles')
    .select('*')
    .in('position', ['Loan Officer', 'NMB Admin', 'System Admin']);
  return { data, error };
};

export const setAdminRole = async (supabaseClient, targetUserId, newPosition) => {
  const { data, error } = await supabaseClient.functions.invoke('set-user-role', {
    body: {
      target_user_id: targetUserId,
      new_position: newPosition,
    },
  });
  return { data, error };
};