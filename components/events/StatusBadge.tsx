'use client'

import { useEffect, useState } from 'react'
import { computeStatus, getRegistrationUrgency, EventStatus } from '@/lib/events-data'

const STATUS_STYLES: Record<EventStatus, { bg: string; text: string; dot: string }> = {
  'Open for Registration': { bg: '#E8F5EC', text: '#1E7A44', dot: '#2FA860' },
  'Coming Soon': { bg: '#F4EEF5', text: '#6B2E75', dot: '#9C4FA8' },
  Completed: { bg: '#F1EDEE', text: '#7A6E7E', dot: '#A79CA9' },
}

// Distinct look for "closing soon" — an overlay on top of "Open for
// Registration", not a separate EventStatus value, so filtering/sorting
// logic elsewhere that relies on EventStatus is unaffected.
const URGENT_STYLE = { bg: '#FBEBDD', text: '#8A4A11', dot: '#C1701F' }

export default function StatusBadge({
  startDate,
  endDate,
  registrationOpenDate,
  registrationCloseDate,
  size = 'md',
}: {
  startDate: string
  endDate: string
  registrationOpenDate: string | null
  registrationCloseDate: string | null
  size?: 'sm' | 'md'
}) {
  // Computed on mount only, so the server-rendered markup and the first
  // client render match (dates must not be evaluated during SSR).
  const [status, setStatus] = useState<EventStatus | null>(null)
  const [urgentDaysLeft, setUrgentDaysLeft] = useState<number | null>(null)

  useEffect(() => {
    const event = { startDate, endDate, registrationOpenDate, registrationCloseDate }
    const computed = computeStatus(event)
    setStatus(computed)

    if (computed === 'Open for Registration') {
      const urgency = getRegistrationUrgency(event)
      setUrgentDaysLeft(urgency?.isUrgent ? urgency.daysLeft : null)
    } else {
      setUrgentDaysLeft(null)
    }
  }, [startDate, endDate, registrationOpenDate, registrationCloseDate])

  if (!status) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
          size === 'sm' ? 'text-[10px] px-2.5 py-1' : 'text-xs px-3 py-1.5'
        }`}
        style={{ backgroundColor: '#F1EDEE', color: 'transparent' }}
      >
        Loading
      </span>
    )
  }

  const isUrgent = urgentDaysLeft !== null
  const s = isUrgent ? URGENT_STYLE : STATUS_STYLES[status]
  const label = isUrgent
    ? `Closes in ${urgentDaysLeft} day${urgentDaysLeft === 1 ? '' : 's'}`
    : status

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        size === 'sm' ? 'text-[10px] px-2.5 py-1' : 'text-xs px-3 py-1.5'
      }`}
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {label}
    </span>
  )
}