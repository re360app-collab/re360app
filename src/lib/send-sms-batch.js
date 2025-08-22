import { supabase } from '@/lib/customSupabaseClient';

/**
 * @typedef {object} CampaignPayload
 * @property {string} [tag]
 * @property {string[]} [contactIds]
 * @property {string} campaign
 * @property {string} message
 */

/**
 * @typedef {object} SendBatchRequest
 * @property {CampaignPayload} campaignPayload
 * @property {string} [scheduledAt] - ISO string for scheduled time
 */

/**
 * @typedef {object} SendBatchResponse
 * @property {number} [sent]
 * @property {string} [scheduledCampaignId]
 * @property {Array<{contact: string, sid: string}>} [results]
 * @property {string} [reason]
 * @property {string} [error]
 */

/**
 * @param {SendBatchRequest} payload
 * @returns {Promise<SendBatchResponse>}
 */
export async function sendSmsBatch(payload) {
  try {
    // Determine if it's a scheduled campaign or an immediate send
    if (payload.scheduledAt) {
      // It's a scheduled campaign. We just need to store it in the database.
      const { data, error } = await supabase
        .from('scheduled_campaigns')
        .insert({
          scheduled_at: payload.scheduledAt,
          campaign_payload: payload.campaignPayload,
          status: 'scheduled'
        })
        .select('id')
        .single();
      
      if (error) {
        throw new Error(`Failed to schedule campaign: ${error.message}`);
      }
      return { scheduledCampaignId: data.id };

    } else {
      // It's an immediate send. Invoke the Edge Function.
      const { data, error } = await supabase.functions.invoke('sms-send-batch', {
        body: payload.campaignPayload,
      });

      if (error) {
        throw new Error(`Function invocation failed: ${error.message}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }
      
      return data;
    }
  } catch (err) {
    console.error('Error in sendSmsBatch:', err);
    throw err;
  }
}