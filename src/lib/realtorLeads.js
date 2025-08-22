import { supabase } from '@/lib/customSupabaseClient';

export const fetchAllLeads = async (supabaseClient) => {
  const { data, error } = await supabaseClient
    .from('realestateleads')
    .select(`
      *,
      realtor_profile:realtor_id(first_name, last_name, brokerage_name, phone),
      lo_profile:assigned_loan_officer_id(first_name, last_name)
    `)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const fetchMyLeads = async (supabaseClient, realtorId) => {
  const { data, error } = await supabaseClient
    .from('realestateleads')
    .select(`
      *,
      lo_profile:assigned_loan_officer_id(first_name, last_name)
    `)
    .eq('realtor_id', realtorId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const fetchAssignedLeads = async (supabaseClient, loanOfficerId) => {
  const { data, error } = await supabaseClient
    .from('realestateleads')
    .select(`
      *,
      realtor_profile:realtor_id(first_name, last_name)
    `)
    .eq('assigned_loan_officer_id', loanOfficerId)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const addLead = async (supabaseClient, leadData) => {
  const { data, error } = await supabaseClient
    .from('realestateleads')
    .insert([leadData])
    .select()
    .single();

  return { data, error };
};

export const updateLead = async (supabaseClient, leadId, updates) => {
  const { data, error } = await supabaseClient
    .from('realestateleads')
    .update(updates)
    .eq('id', leadId)
    .select(`
      *,
      realtor_profile:realtor_id(first_name, last_name, brokerage_name, phone),
      lo_profile:assigned_loan_officer_id(first_name, last_name)
    `)
    .single();

  return { data, error };
};

export const deleteLead = async (supabaseClient, leadId) => {
  const { error } = await supabaseClient
    .from('realestateleads')
    .delete()
    .eq('id', leadId);

  return { error };
};