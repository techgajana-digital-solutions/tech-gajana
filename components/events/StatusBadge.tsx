'use client'

import { useEffect, useState } from 'react'
import {
  computeStatus,
  getRegistrationUrgency,
  EventStatus,
  StatusOverride,
} from '@/lib/events-data'

const STATUS_STYLES: Record<EventStatus, { bg: string; text: string; dot: string }> = {
  'Open for Registration': { bg: '#E8F5EC', text: '#1E7A44', dot: '#2FA860' },
  'Coming Soon':           { bg: '#F4EEF5', text: '#6B2E75', dot: '#9C4FA8' },
  'Registration Closed':   { bg: '#FBEBDD', text: '#8A4A11', dot: '#C1701F' },
  Full:                    { bg: '#FBE4E7', text: '#8C2F3D', dot: '#B4485A' },
  Ongoing:                 { bg: '#E3EEFA', text: '#1F3A5F', dot: '#2E6FB0' },
  Completed:               { bg: '#F1EDEE', text: '#7A6E7E', dot: '#A79CA9' },
  Cancelled:               { bg: '#FBE4E7', text: '#8C2F3D', dot: '#B4485A' },
}

// Overlay on top of "Open for Registration", not a separate EventStatus value.
const URGENT_STYLE = { bg: '#FBEBDD', text: '#8A4A11', dot: '#C1701F' }

export default function StatusBadge({
  startDate,
  endDate,
  registrationOpenDate,
  registrationCloseDate,
  statusOverride = 'auto',
  registrationOpen = null,
  seatsLeft = null,
  size = 'md',
}: {
  startDate: string
  endDate: string
  registrationOpenDate: string | null
  registrationCloseDate: string | null
  statusOverride?: StatusOverride
  registrationOpen?: boolean | null
  seatsLeft?: number | null
  size?: 'sm' | 'md'
}) {
  // Computed on mount only, so the server-rendered markup and the first
  // client render match (dates must not be evaluated during SSR).
  const [status, setStatus] = useState<EventStatus | null>(null)
  const [urgentDaysLeft, setUrgentDaysLeft] = useState<number | null>(null)

  useEffect(() => {
    const event = {
      startDate,
      endDate,
      registrationOpenDate,
      registrationCloseDate,
      statusOverride,
      registrationOpen,
      seatsLeft,
    }
    const computed = computeStatus(event)
    setStatus(computed)

    if (computed === 'Open for Registration') {
      const urgency = getRegistrationUrgency(event)
      setUrgentDaysLeft(urgency?.isUrgent ? urgency.daysLeft : null)
    } else {
      setUrgentDaysLeft(null)
    }
  }, [startDate, endDate, registrationOpenDate, registrationCloseDate, statusOverride, registrationOpen, seatsLeft])

  const sizeClass = size === 'sm' ? 'text-[10px] px-2.5 py-1' : 'text-xs px-3 py-1.5'

  if (!status) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClass}`}
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
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClass}`}
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {label}
    </span>
  )
}