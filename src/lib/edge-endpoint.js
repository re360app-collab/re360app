export function getSmsSendBatchUrl() {
  const abs = import.meta.env.VITE_SEND_BATCH_API_ABSOLUTE;
  if (!abs || !/^https?:\/\//i.test(abs)) {
    throw new Error("Set VITE_SEND_BATCH_API_ABSOLUTE to the FULL public URL of the sms-send-batch function.");
  }
  return abs;
}