import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function normalizePhoneNumber(phone) {
  if (!phone) return null;
  const phoneNumber = parsePhoneNumberFromString(phone, 'US');
  if (phoneNumber && phoneNumber.isValid()) {
    return phoneNumber.format('E.164');
  }
  return null;
}