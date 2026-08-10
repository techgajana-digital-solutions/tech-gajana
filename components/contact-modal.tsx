'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
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

            <form className="flex flex-col gap-6 sm:gap-8 md:gap-10" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    placeholder="FULL NAME *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                <div className="flex-1">
                  <input
                    type="tel"
                    required
                    placeholder="PHONE NUMBER *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="COMPANY / ORGANIZATION"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <select
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors text-white/30 focus:text-white cursor-pointer appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-black text-white/50">
                    ESTIMATED BUDGET
                  </option>
                  <option value="10k-25k" className="bg-black text-white">
                    ₹10,000 - ₹50,000
                  </option>
                  <option value="25k-50k" className="bg-black text-white">
                    ₹50,000 - ₹1,00,000
                  </option>
                  <option value="50k-100k" className="bg-black text-white">
                    ₹1,00,000 - ₹5,00,000
                  </option>
                  <option value="100k+" className="bg-black text-white">
                    ₹5,00,000+
                  </option>
                </select>
              </div>

              <div>
                <textarea
                  required
                  placeholder="TELL US ABOUT YOUR PROJECT *"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto self-stretch sm:self-start mt-2 sm:mt-4 px-8 sm:px-10 py-4 sm:py-5 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
