'use client'

import { useEffect, useState } from 'react'
import { computeStatus, EventStatus } from '@/lib/events-data'

const STATUS_STYLES: Record<EventStatus, { bg: string; text: string; dot: string }> = {
  'Open for Registration': { bg: '#E8F5EC', text: '#1E7A44', dot: '#2FA860' },
  'Coming Soon': { bg: '#F4EEF5', text: '#6B2E75', dot: '#9C4FA8' },
  Completed: { bg: '#F1EDEE', text: '#7A6E7E', dot: '#A79CA9' },
}

export default function StatusBadge({
  startDate,
  endDate,
  size = 'md',
}: {
  startDate: string
  endDate: string
  size?: 'sm' | 'md'
}) {
  // Computed on mount only, so the server-rendered markup and the first
  // client render match (dates must not be evaluated during SSR).
  const [status, setStatus] = useState<EventStatus | null>(null)

  useEffect(() => {
    setStatus(computeStatus(startDate, endDate))
  }, [startDate, endDate])

  if (!status) {
    // Lightweight skeleton while the client computes the real status
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

  const s = STATUS_STYLES[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        size === 'sm' ? 'text-[10px] px-2.5 py-1' : 'text-xs px-3 py-1.5'
      }`}
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
      {status}
    </span>
  )
}
