'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

// ---------------------------------------------------------------------------
// PLACEHOLDER — separate Sheet/tab from event registrations (per spec).
// Content team to provide the deployed AppScript Web App URL.
// ---------------------------------------------------------------------------
const OPINION_APPSCRIPT_URL = 'https://script.google.com/macros/s/PLACEHOLDER_OPINION_ENDPOINT/exec'

const INK = '#241A26'
const INK_SOFT = '#7A6E7E'
const PLUM = '#704A74'
const PLUM_DARK = '#3B1F40'
const PLUM_TINT = '#F4EEF5'

export default function OpinionForm() {
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
      opinion: (form.elements.namedItem('opinion') as HTMLTextAreaElement).value,
    }

    try {
      await fetch(OPINION_APPSCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setIsSuccess(true)
    } catch {
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
        className="flex flex-col items-center justify-center py-8 text-center"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: PLUM_TINT, color: PLUM }}>
          <Check size={26} />
        </div>
        <p className="text-sm font-medium max-w-xs" style={{ color: INK }}>
          Thanks! Your opinion might be featured in this week&apos;s podcast.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        required
        placeholder="Your Name"
        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-sm placeholder:text-gray-400 focus:outline-none transition-all"
        style={{ color: INK }}
      />
      <textarea
        name="opinion"
        required
        rows={4}
        placeholder="Your Opinion"
        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-sm placeholder:text-gray-400 focus:outline-none transition-all resize-none"
        style={{ color: INK }}
      />

      {error && (
        <p className="text-sm text-center" style={{ color: '#B4485A' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-full font-bold text-sm text-white transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:hover:scale-100"
        style={{ backgroundColor: isSubmitting ? PLUM_DARK : PLUM }}
      >
        {isSubmitting ? 'Submitting…' : (
          <>Submit My Opinion <ArrowRight size={16} /></>
        )}
      </button>
    </form>
  )
}
