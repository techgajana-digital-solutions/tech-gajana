'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Building, ArrowRight, Check } from 'lucide-react'

// ---------------------------------------------------------------------------
// PLACEHOLDER — content team to provide the deployed Google AppScript Web
// App URL. Use ONE AppScript-connected Sheet with an "Event" column to
// differentiate registrations across all 5 events (per spec Part B §8),
// or point each event at its own tab — confirm the pattern before launch.
//
// Exported so other entry points (e.g. the "Ready to Join" quick form on
// the events listing page) can post to the same endpoint.
// ---------------------------------------------------------------------------
export const REGISTRATION_APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxoij7EzfnlK1HCR1pR-ZdQOgkjpkJYqeOHTlJ_RwQpyre1WcYmEe8RkUZYZG8MiEA1/exec'

const PLUM = '#704A74'
const PLUM_DARK = '#3B1F40'
const PLUM_TINT = '#F4EEF5'
const INK = '#241A26'
const INK_SOFT = '#7A6E7E'

function Field({
  icon,
  type,
  name,
  placeholder,
}: {
  icon: React.ReactNode
  type: string
  name: string
  placeholder: string
}) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: INK_SOFT }}>
        {icon}
      </div>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm placeholder:text-gray-400 focus:outline-none transition-all"
        style={{ color: INK }}
      />
    </div>
  )
}

export default function RegistrationForm({
  eventSlug,
  eventTitle,
  accent = PLUM,
  accentDark = PLUM_DARK,
}: {
  eventSlug: string
  eventTitle: string
  accent?: string
  accentDark?: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const form = e.currentTarget
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      college: (form.elements.namedItem('college') as HTMLInputElement).value,
      event: eventSlug,
      source: 'event-details-registration-form',
    }

    try {
      // Google AppScript Web Apps generally expect a no-cors POST with a
      // simple body; response isn't readable in no-cors mode, so we treat
      // a resolved fetch as success. Swap this for JSON + normal CORS once
      // the AppScript endpoint is confirmed by the content team.
      await fetch(REGISTRATION_APPSCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setIsSuccess(true)
    } catch (err) {
      setError('Something went wrong. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: PLUM_TINT, color: accent }}>
          <Check size={30} />
        </div>
        <h4 className="text-2xl font-bold mb-2" style={{ color: INK }}>You&apos;re registered!</h4>
        <p style={{ color: INK_SOFT }}>We&apos;ll email/message you further details soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="eventSlug" value={eventSlug} />
      <Field icon={<User size={18} />} type="text" name="name" placeholder="Full Name" />
      <Field icon={<Mail size={18} />} type="email" name="email" placeholder="Email Address" />
      <Field icon={<Phone size={18} />} type="tel" name="phone" placeholder="Phone Number" />
      <Field icon={<Building size={18} />} type="text" name="college" placeholder="College / Organization" />

      {error && (
        <p className="text-sm text-center" style={{ color: '#B4485A' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 py-4 rounded-full font-bold text-sm text-white transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:hover:scale-100"
        style={{ backgroundColor: isSubmitting ? accentDark : accent }}
      >
        {isSubmitting ? 'Registering…' : (
          <>Register Now <ArrowRight size={16} /></>
        )}
      </button>

      <p className="text-xs text-center" style={{ color: INK_SOFT }}>
        Registering for <strong>{eventTitle}</strong>
      </p>
    </form>
  )
}