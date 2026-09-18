'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import RegistrationForm from './RegistrationForm'

const PLUM = '#704A74'
const PLUM_TINT = '#F4EEF5'
const INK = '#241A26'
const INK_SOFT = '#7A6E7E'

export default function RegistrationModal({
  isOpen,
  onClose,
  eventSlug,
  eventTitle,
  tag,
  accent = PLUM,
  accentDark = '#3B1F40',
}: {
  isOpen: boolean
  onClose: () => void
  eventSlug: string
  eventTitle: string
  tag?: string
  accent?: string
  accentDark?: string
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-20 pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2C1730]/50 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-[1.75rem] shadow-2xl overflow-hidden z-10 max-h-full flex flex-col"
          >
            <div className="px-7 py-6 flex items-start justify-between" style={{ backgroundColor: PLUM_TINT }}>
              <div>
                {tag && (
                  <span className="text-xs font-bold uppercase tracking-widest mb-1 block" style={{ color: accent }}>
                    {tag} · Registration
                  </span>
                )}
                <h3 className="text-lg font-bold pr-4" style={{ color: INK }}>
                  {eventTitle}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors shadow-sm flex-shrink-0 cursor-pointer"
                style={{ color: INK_SOFT }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-7 overflow-y-auto">
              <RegistrationForm eventSlug={eventSlug} eventTitle={eventTitle} accent={accent} accentDark={accentDark} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}