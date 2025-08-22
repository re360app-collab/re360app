import { supabase } from '@/lib/customSupabaseClient';

export const fetchLoansByStatus = async (supabaseClient, statuses) => {
  const { data, error } = await supabaseClient
    .from('loans')
    .select('*')
    .in('status', statuses)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getAllLoans = async (supabaseClient) => {
  const { data, error } = await supabaseClient
    .from('loans')
    .select(`
      *,
      agent_profile:user_profiles(
        first_name,
        last_name,
        email,
        phone
      )
    `)
    .order('created_at', { ascending: false });

  if (error && error.message.includes("could not find a relationship")) {
    console.warn("fetchAllLoans join failed, falling back to non-joined query:", error.message);
    const { data: fallbackData, error: fallbackError } = await supabaseClient
      .from('loans')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: fallbackData, error: fallbackError };
  }

  return { data, error };
};


export const addLoan = async (supabaseClient, loanData) => {
  const { data, error } = await supabaseClient
    .from('loans')
    .insert(loanData)
    .select()
    .single();
  return { data, error };
};

export const updateLoan = async (supabaseClient, id, updates) => {
  const { data, error } = await supabaseClient
    .from('loans')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};