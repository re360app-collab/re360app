import { supabase } from '@/lib/supabase';

    export const insertBuyer = async (buyerData) => {
      console.warn("DEPRECATED: insertBuyer is deprecated. Use addLead from realtorLeads.js instead.");
      try {
        const { data, error } = await supabase
          .from('realestateleads')
          .insert([buyerData])
          .select()
          .single();
        return { data, error };
      } catch (error) {
        console.error('Error inserting lead via insertBuyer:', error);
        return { data: null, error };
      }
    };

    export const getBuyers = async (realtorId) => {
      console.warn("DEPRECATED: getBuyers is deprecated. Use fetchMyLeads from realtorLeads.js instead.");
      try {
        const { data, error } = await supabase
          .from('realestateleads')
          .select('*')
          .eq('realtor_id', realtorId)
          .order('created_at', { ascending: false });
        return { data, error };
      } catch (error) {
        console.error('Error getting leads via getBuyers:', error);
        return { data: null, error };
      }
    };

    export const getAllBuyers = async () => {
      console.warn("DEPRECATED: getAllBuyers is deprecated. Use fetchAllLeads from realtorLeads.js instead.");
      try {
        const { data, error } = await supabase
          .from('realestateleads')
          .select('*')
          .order('created_at', { ascending: false });
        return { data, error };
      } catch (error) {
        console.error('Error getting all leads via getAllBuyers:', error);
        return { data: null, error };
      }
    };

    export const updateBuyer = async (leadId, updates) => {
      console.warn("DEPRECATED: updateBuyer is deprecated. Use updateLead from realtorLeads.js instead.");
      try {
        const { data, error } = await supabase
          .from('realestateleads')
          .update(updates)
          .eq('id', leadId)
          .select()
          .single();
        return { data, error };
      } catch (error) {
        console.error('Error updating lead via updateBuyer:', error);
        return { data: null, error };
      }
    };

    export const deleteBuyer = async (leadId) => {
      console.warn("DEPRECATED: deleteBuyer is deprecated. Use deleteLead from realtorLeads.js instead.");
      try {
        const { error } = await supabase
          .from('realestateleads')
          .delete()
          .eq('id', leadId);
        return { error };
      } catch (error) {
        console.error('Error deleting lead via deleteBuyer:', error);
        return { error };
      }
    };