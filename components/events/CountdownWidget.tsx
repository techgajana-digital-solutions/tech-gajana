'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownWidget({
  targetDate,
  label,
  variant = 'dark',
}: {
  /** ISO date string, e.g. event.startDate */
  targetDate: string
  label?: string
  variant?: 'dark' | 'light'
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const target = new Date(`${targetDate}T09:00:00`)
    setTimeLeft(getTimeLeft(target))
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (!timeLeft) return null

  const isDark = variant === 'dark'
  const boxBg = isDark ? 'rgba(255,255,255,0.15)' : '#F4EEF5'
  const boxText = isDark ? '#ffffff' : '#3B1F40'
  const labelColor = isDark ? 'rgba(255,255,255,0.75)' : '#7A6E7E'

  const units: [string, number][] = [
    ['Days', timeLeft.days],
    ['Hrs', timeLeft.hours],
    ['Min', timeLeft.minutes],
    ['Sec', timeLeft.seconds],
  ]

  return (
    <div>
      {label && (
        <p className="text-xs font-semibold mb-2.5" style={{ color: labelColor }}>
          {label}
        </p>
      )}
      <div className="flex items-center gap-2.5">
        {units.map(([u, v]) => (
          <div
            key={u}
            className="flex flex-col items-center justify-center rounded-xl px-3.5 py-2.5 min-w-[58px] backdrop-blur-sm border"
            style={{ backgroundColor: boxBg, borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#EDE4EF' }}
          >
            <span className="text-lg sm:text-xl font-extrabold tabular-nums leading-none" style={{ color: boxText }}>
              {String(v).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-medium mt-1" style={{ color: labelColor }}>
              {u}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
