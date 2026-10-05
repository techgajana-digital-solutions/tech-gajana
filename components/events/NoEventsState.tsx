'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CalendarClock, RefreshCw, Bell, Check, User, Phone, Play, ArrowLeft } from 'lucide-react'
import { submitRegistration } from '@/lib/eventsRegistration'

const PLUM = '#704A74'
const PLUM_DARK = '#3B1F40'
const PLUM_TINT = '#F4EEF5'
const INK = '#241A26'
const INK_SOFT = '#7A6E7E'

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@techgajana'
const AUTO_CHECK_MS = 60_000

export default function NoEventsState({
  variant = 'list',
  loadError = false,
}: {
  /** 'list' = no events published; 'detail' = this specific event isn't available */
  variant?: 'list' | 'detail'
  /** true when the sheet couldn't be reached (different wording) */
  loadError?: boolean
}) {
  const router = useRouter()
  const [isChecking, startTransition] = useTransition()
  const [lastChecked, setLastChecked] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stamp = () => new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

  const checkAgain = useCallback(() => {
    startTransition(() => {
      router.refresh()
      setLastChecked(stamp())
    })
  }, [router])

  // Set the first timestamp on the client only (avoids hydration mismatch)
  useEffect(() => setLastChecked(stamp()), [])

  // Re-check every minute while the tab is visible, and when the visitor returns to the tab
  useEffect(() => {
    const tick = () => document.visibilityState === 'visible' && checkAgain()
    const id = setInterval(tick, AUTO_CHECK_MS)
    document.addEventListener('visibilitychange', tick)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [checkAgain])

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    const result = await submitRegistration({
      event: 'event-updates',
      eventTitle: 'Notify me about new events',
      name,
      phone,
      source: 'events-empty-state-notify',
    })
    setIsSubmitting(false)
    if (result.success) setIsSuccess(true)
    else setError(result.message ?? 'Something went wrong. Please try again.')
  }

  const title = loadError
    ? 'We couldn’t load events right now'
    : variant === 'detail'
      ? 'This event isn’t available (yet)'
      : 'New events are on the way'

  const body = loadError
    ? 'Something went wrong on our side. Please try again in a moment.'
    : variant === 'detail'
      ? 'It may not be announced yet, or it may have been removed. New events are added regularly, so check back soon.'
      : 'We’re planning our next bootcamps, hackathons and contests. Check back often, or leave your number and we’ll tell you first.'

  return (
    <div className="rounded-[2rem] border-2 border-dashed px-6 py-12 sm:py-16 text-center" style={{ borderColor: '#E7DAE9', backgroundColor: '#fff' }}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: PLUM_TINT, color: PLUM }}
      >
        <CalendarClock size={28} />
      </motion.div>

      <h3 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: PLUM_DARK }}>{title}</h3>
      <p className="text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed" style={{ color: INK_SOFT }}>{body}</p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
        <button
          onClick={checkAgain}
          disabled={isChecking}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
          style={{ backgroundColor: PLUM_DARK }}
        >
          <RefreshCw size={15} className={isChecking ? 'animate-spin' : ''} />
          {isChecking ? 'Checking…' : 'Check for new events'}
        </button>

        {variant === 'detail' && (
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border cursor-pointer transition-all hover:scale-105 active:scale-95"
            style={{ borderColor: PLUM, color: PLUM }}
          >
            <ArrowLeft size={15} /> All events
          </Link>
        )}
      </div>
      {lastChecked && (
        <p className="text-xs mb-10" style={{ color: INK_SOFT }}>
          Last checked at {lastChecked} · we also re-check automatically every minute
        </p>
      )}

      {/* Notify me */}
      <div className="max-w-md mx-auto text-left rounded-[1.5rem] p-6" style={{ backgroundColor: PLUM_TINT }}>
        {isSuccess ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-white mx-auto mb-3 flex items-center justify-center" style={{ color: PLUM }}>
              <Check size={22} />
            </div>
            <p className="font-bold" style={{ color: INK }}>You’re on the list!</p>
            <p className="text-sm mt-1" style={{ color: INK_SOFT }}>We’ll message you as soon as a new event is announced.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleNotify}>
            <p className="flex items-center gap-2 text-sm font-bold mb-4" style={{ color: INK }}>
              <Bell size={16} style={{ color: PLUM }} /> Notify me when events are announced
            </p>
            <div className="grid gap-3 mb-3">
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: INK_SOFT }} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-3 text-sm focus:outline-none"
                  style={{ color: INK }}
                />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: INK_SOFT }} />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-3 text-sm focus:outline-none"
                  style={{ color: INK }}
                />
              </div>
            </div>
            {error && <p className="text-sm mb-3" style={{ color: '#B4485A' }}>{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full font-bold text-sm text-white cursor-pointer transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-wait"
              style={{ backgroundColor: PLUM }}
            >
              {isSubmitting ? 'Saving…' : 'Notify me'}
            </button>
          </form>
        )}
      </div>

      <a
        href={YOUTUBE_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-8 text-sm font-semibold cursor-pointer"
        style={{ color: PLUM }}
      >
        <Play size={16} /> Watch TG Talk About while you wait
      </a>
    </div>
  )
}