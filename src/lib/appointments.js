import { supabase } from '@/lib/supabase';

// Appointment management helpers
export const addAppointment = async (appointmentData) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select();
    return { data, error };
  } catch (error) {
    console.error('Error inserting appointment:', error);
    return { data: null, error };
  }
};

export const getAppointments = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        buyers (
          first_name,
          last_name,
          email,
          phone
        ),
        realestateleads (
          buyer_first_name,
          buyer_last_name,
          buyer_email,
          buyer_phone
        ),
        agent_registrations (
          first_name,
          last_name,
          email,
          phone
        )
      `)
      .eq('user_id', userId)
      .order('appointment_date', { ascending: true });
    return { data, error };
  } catch (error) {
    console.error('Error getting appointments:', error);
    return { data: null, error };
  }
};

export const updateAppointment = async (appointmentId, updates) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', appointmentId)
      .select();
    return { data, error };
  } catch (error) {
    console.error('Error updating appointment:', error);
    return { data: null, error };
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', appointmentId);
    return { error };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return { error };
  }
};