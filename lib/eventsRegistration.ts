/**
 * lib/eventsRegistration.ts
 * ------------------------------------------------------------
 * Shared entry point for bootcamp registration forms only
 * (RegistrationForm on the event details page, QuickRegisterForm on the
 * events listing page). Talks to the Apps Script web app in Code.gs,
 * which writes each submission into a sheet/tab named after the event's
 * slug — one tab per bootcamp, all in the same spreadsheet.
 * ------------------------------------------------------------
 */

export const APPSCRIPT_URL =  'https://script.google.com/macros/s/AKfycbxoij7EzfnlK1HCR1pR-ZdQOgkjpkJYqeOHTlJ_RwQpyre1WcYmEe8RkUZYZG8MiEA1/exec'

export interface RegistrationPayload {
  event: string
  eventTitle?: string
  name: string
  phone: string
  email?: string
  college?: string
  source?: string
}

export interface RegistrationResult {
  success: boolean
  message?: string
}

export async function submitRegistration(
  payload: RegistrationPayload
): Promise<RegistrationResult> {
  try {
    const res = await fetch(APPSCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (data.result !== 'success') {
      return { success: false, message: data.message || 'Registration failed. Please try again.' }
    }

    return { success: true }
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please check your connection and try again.',
    }
  }
}