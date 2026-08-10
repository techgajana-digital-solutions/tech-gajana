'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

// Replace with your deployed Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyp2ugyiNYLtdaYwm2WXsKv3tSmMchF4mHsiqeaPA0gw80HtNgY7hl3YrsqIRgZtp4/exec'

type FormState = {
  fullName: string
  email: string
  phone: string
  company: string
  enquiryType: string
  preferredTiming: string
  message: string
}

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  enquiryType: '',
  preferredTiming: '',
  message: '',
}

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [formData, setFormData] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script doesn't return CORS headers by default
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      })

      // 'no-cors' mode means we can't read the response, so assume success
      setStatus('success')
      setFormData(initialState)
      setTimeout(() => {
        setStatus('idle')
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full max-w-3xl bg-black text-white p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
              Project Inquiry.
            </h2>
            <p className="text-neutral-400 font-medium mb-8 md:mb-12 text-sm sm:text-base">
              Tell us about your next big idea and we'll get back to you within 24 hours.
            </p>

            <form className="flex flex-col gap-6 sm:gap-8 md:gap-10" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="flex-1">
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="FULL NAME *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL ADDRESS *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="flex-1">
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="PHONE NUMBER *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Professional Title / Company"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="flex-1">
                  <select
                    name="enquiryType"
                    required
                    value={formData.enquiryType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors text-white/30 focus:text-white cursor-pointer appearance-none"
                  >
                    <option value="" disabled className="bg-black text-white/50">
                      Enquiring About ?*
                    </option>
                    <option value="digital-product-development" className="bg-black text-white">
                      Digital Product Development
                    </option>
                    <option value="mentorship-guidance" className="bg-black text-white">
                      Mentorship & Guidance
                    </option>
                    <option value="research-publications" className="bg-black text-white">
                      Research & Publications
                    </option>
                    <option value="other-tech-solutions" className="bg-black text-white">
                      Other Tech Solutions
                    </option>
                  </select>
                </div>

                <div className="flex-1">
                  <input
                    type="datetime-local"
                    name="preferredTiming"
                    required
                    value={formData.preferredTiming}
                    onChange={handleChange}
                    style={{ colorScheme: 'dark' }}
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors text-white/70"
                  />
                  <p className="text-[10px] text-white/30 tracking-widest uppercase mt-2">
                    Preferred Consultation Timing *
                  </p>
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                placeholder="WANNA SAY SOMETHING BEFORE THE CALL? *"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto self-stretch sm:self-start mt-2 sm:mt-4 px-8 sm:px-10 py-4 sm:py-5 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting'
                  ? 'Submitting...'
                  : status === 'success'
                  ? 'Sent ✓'
                  : 'Submit Inquiry'}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-xs tracking-widest uppercase">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}