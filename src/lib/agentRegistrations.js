import { supabase } from '@/lib/customSupabaseClient';

export const fetchAllAgentRegistrations = async (supabaseClient) => {
  const { data, error } = await supabaseClient
    .from('agent_registrations')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const fetchNewAgentRegistrationsCount = async (supabaseClient) => {
  const { count, error } = await supabaseClient
    .from('agent_registrations')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'New');
  return { count, error };
};

export const fetchAssignedAgentRegistrations = async (supabaseClient, loanOfficerId) => {
  const { data, error } = await supabaseClient
    .from('agent_registrations')
    .select('*')
    .eq('assigned_loan_officer_id', loanOfficerId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const updateAgentRegistration = async (supabaseClient, id, updates) => {
  const { data, error } = await supabaseClient
    .from('agent_registrations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};