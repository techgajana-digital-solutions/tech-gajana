'use client'

import { useState, useRef, useEffect } from 'react'
import { CalendarPlus, ExternalLink, Download } from 'lucide-react'

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function buildGoogleCalendarUrl(title: string, description: string, location: string, start: Date, end: Date): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatICSDate(start)}/${formatICSDate(end)}`,
    details: description,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function buildICS(title: string, description: string, location: string, start: Date, end: Date): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export default function AddToCalendarButton({
  title,
  description,
  location,
  startDate,
  endDate,
  accent = '#704A74',
}: {
  title: string
  description: string
  location: string
  /** ISO date, e.g. "2026-09-26" */
  startDate: string
  /** ISO date, e.g. "2026-09-27" */
  endDate: string
  accent?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const start = new Date(`${startDate}T09:00:00`)
  const end = new Date(`${endDate}T17:00:00`)

  const handleICSDownload = () => {
    const ics = buildICS(title, description, location, start, end)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.ics`
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Add to calendar"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border shadow-sm transition-all cursor-pointer hover:scale-110 active:scale-95"
        style={{ borderColor: '#EDE4EF', color: accent }}
      >
        <CalendarPlus size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
          <a
            href={buildGoogleCalendarUrl(title, description, location, start, end)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            style={{ color: '#241A26' }}
            onClick={() => setOpen(false)}
          >
            <ExternalLink size={15} /> Google Calendar
          </a>
          <button
            onClick={handleICSDownload}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer text-left"
            style={{ color: '#241A26' }}
          >
            <Download size={15} /> Apple / Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  )
}
