// lib/events-data.ts
// Single source of truth: the Google Sheet. Everything below normalises
// whatever the sheet contains so bad or blank cells never crash the site.

export type EventMode = 'Offline' | 'Online' | 'Hybrid'
export type EventStatus =
  | 'Coming Soon'
  | 'Open for Registration'
  | 'Registration Closed'
  | 'Full'
  | 'Ongoing'
  | 'Completed'
  | 'Cancelled'
export type StatusOverride = 'auto' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export interface ScheduleSession {
  time: string
  session: string
  speaker?: string
}
export interface ScheduleDay {
  day: string
  date: string
  hours: string
  sessions: ScheduleSession[]
}
export interface FaqItem {
  q: string
  a: string
}

export interface EventData {
  slug: string
  tag: string
  title: string
  dateRange: string
  /** YYYY-MM-DD, or the raw text (e.g. "TBA") when not a real date */
  startDate: string
  endDate: string
  durationBadge: string
  mode: EventMode
  description: string
  heroImage: string
  whatYoullLearn: string[]
  whoShouldAttend: string
  toolToInstall: string
  refreshments: string
  venue: string
  address: string
  mapsLink: string
  timing: string
  seatsLeft: number | null
  /** Free text shown to users, e.g. "30 Nov 2026" or "will be announced soon" */
  registrationDeadline: string | null
  /** Display string: "Free" or "₹499" */
  fee: string
  isFree: boolean
  faqs: FaqItem[]
  schedule: ScheduleDay[]
  /** YYYY-MM-DD or null (never free text) */
  registrationOpenDate: string | null
  registrationCloseDate: string | null
  registrationOpen: boolean | null
  registrationLink: string | null
  statusOverride: StatusOverride
  /** Computed from sheet values at fetch time */
  status: EventStatus
  order: number
  iconKey: string
  colorFrom: string
  colorTo: string
  accentColor: string
  accentDarkColor: string
}

export const standardChecklist = [
  'Bring your own laptop (charger included)',
  'Valid college/government ID for entry',
  'Arrive 15 minutes before start time for check-in (event starts 9:00 AM sharp)',
  'Basic programming knowledge recommended',
  'Certificate of participation provided on completion',
]

// ---------------------------------------------------------------------------
// Small normalisers
// ---------------------------------------------------------------------------
const str = (v: unknown): string => (v == null ? '' : String(v).trim())

const toIso = (v: unknown): string | null => {
  const m = str(v).match(/^\d{4}-\d{2}-\d{2}/)
  return m ? m[0] : null
}

const toNum = (v: unknown): number | null => {
  const s = str(v)
  if (s === '') return null
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

const toTriBool = (v: unknown): boolean | null => {
  if (typeof v === 'boolean') return v
  const s = str(v).toLowerCase()
  if (['true', 'yes', 'y', '1'].includes(s)) return true
  if (['false', 'no', 'n', '0'].includes(s)) return false
  return null
}

const toLines = (v: unknown): string[] =>
  Array.isArray(v)
    ? v.map(str).filter(Boolean)
    : str(v).split(/\r?\n/).map((l) => l.trim()).filter(Boolean)

function toMode(v: unknown): EventMode {
  const s = str(v).toLowerCase()
  if (s.includes('hybrid') || (s.includes('offline') && s.includes('online'))) return 'Hybrid'
  return s.includes('online') ? 'Online' : 'Offline'
}

function toOverride(v: unknown): StatusOverride {
  const s = str(v).toLowerCase()
  return (['upcoming', 'ongoing', 'completed', 'cancelled'] as const).find((x) => x === s) ?? 'auto'
}

function formatFee(v: unknown): { fee: string; isFree: boolean } {
  const s = str(v)
  if (!s || /^(free|0|nil|-)$/i.test(s)) return { fee: 'Free', isFree: true }
  if (/^\d+(\.\d+)?$/.test(s)) return { fee: `₹${Number(s).toLocaleString('en-IN')}`, isFree: false }
  return { fee: s, isFree: false }
}

function parseFaqs(v: unknown): FaqItem[] {
  if (Array.isArray(v)) {
    return v
      .map((f: any) => ({ q: str(f?.q), a: str(f?.a) }))
      .filter((f) => f.q && f.a)
  }
  return toLines(v)
    .map((line) => {
      const [q, ...rest] = line.split('||')
      return { q: str(q), a: str(rest.join('||')) }
    })
    .filter((f) => f.q && f.a)
}

/** True only when the event has a real, parseable start date */
export function hasValidDate(event: Pick<EventData, 'startDate'>): boolean {
  return toIso(event.startDate) !== null
}

// ---------------------------------------------------------------------------
// Schedule
// ---------------------------------------------------------------------------
function dayLabel(startIso: string | null, offset: number): string {
  if (!startIso) return 'TBA'
  const d = new Date(`${startIso}T00:00:00`)
  d.setDate(d.getDate() + offset)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

const defaultSchedule = (startIso: string | null, hours: string): ScheduleDay[] => [
  {
    day: 'Day 1',
    date: dayLabel(startIso, 0),
    hours,
    sessions: [
      { time: '9:00 AM', session: 'Check-in & Welcome' },
      { time: '9:30 AM', session: 'Session 1 (details TBA)' },
      { time: '1:00 PM', session: 'Lunch Break' },
      { time: '2:00 PM', session: 'Session 2 (details TBA)' },
    ],
  },
  {
    day: 'Day 2',
    date: dayLabel(startIso, 1),
    hours,
    sessions: [
      { time: '9:00 AM', session: 'Recap & Session 3 (details TBA)' },
      { time: '1:00 PM', session: 'Lunch Break' },
      { time: '2:00 PM', session: 'Build & Wrap-up' },
      { time: '4:30 PM', session: 'Demos & Certificates' },
    ],
  },
]

function buildSchedule(r: any, startIso: string | null): ScheduleDay[] {
  const hours = str(r.timing) || '9:00 AM – 5:00 PM'
  const days: ScheduleDay[] = []

  for (let n = 1; n <= 3; n++) {
    const lines = toLines(r[`day${n}Sessions`])
    if (!lines.length) continue
    days.push({
      day: `Day ${n}`,
      date: dayLabel(startIso, n - 1),
      hours,
      sessions: lines.map((line) => {
        const [time, session, speaker] = line.split('|').map((p) => p.trim())
        return { time: time ?? '', session: session ?? '', speaker: speaker || undefined }
      }),
    })
  }
  return days.length ? days : defaultSchedule(startIso, hours)
}

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------
const REGISTRATION_WINDOW_DAYS = 30 // fallback when the sheet has a date but no open date

type StatusInput = Pick<EventData, 'startDate' | 'endDate' | 'registrationOpenDate' | 'registrationCloseDate'> &
  Partial<Pick<EventData, 'statusOverride' | 'registrationOpen' | 'seatsLeft'>>

export function computeStatus(event: StatusInput, now: Date = new Date()): EventStatus {
  const o = event.statusOverride ?? 'auto'
  if (o === 'cancelled') return 'Cancelled'
  if (o === 'completed') return 'Completed'
  if (o === 'ongoing') return 'Ongoing'

  const startIso = toIso(event.startDate)
  const endIso = toIso(event.endDate) ?? startIso

  // Date-based phases (skipped when the sheet forces "upcoming")
  if (o !== 'upcoming') {
    if (endIso && now > new Date(`${endIso}T23:59:59`)) return 'Completed'
    if (startIso && now >= new Date(`${startIso}T00:00:00`)) return 'Ongoing'
  }

  // Upcoming: work out the registration state
  if (event.registrationOpen === false) return 'Coming Soon'
  if (event.seatsLeft === 0) return 'Full'
  if (event.registrationCloseDate && now > new Date(`${event.registrationCloseDate}T23:59:59`)) {
    return 'Registration Closed'
  }
  if (event.registrationOpen === true) return 'Open for Registration'

  if (event.registrationOpenDate) {
    return now >= new Date(`${event.registrationOpenDate}T00:00:00`) ? 'Open for Registration' : 'Coming Soon'
  }
  if (startIso) {
    const opens = new Date(`${startIso}T00:00:00`).getTime() - REGISTRATION_WINDOW_DAYS * 86400000
    return now.getTime() >= opens ? 'Open for Registration' : 'Coming Soon'
  }
  return 'Coming Soon' // no real dates yet (TBA)
}

export const canRegister = (event: Pick<EventData, 'status'>) => event.status === 'Open for Registration'

export function getRegistrationUrgency(
  event: Pick<EventData, 'registrationCloseDate'>,
  now: Date = new Date()
): { daysLeft: number; isUrgent: boolean } | null {
  if (!event.registrationCloseDate) return null
  const close = new Date(`${event.registrationCloseDate}T23:59:59`)
  const daysLeft = Math.ceil((close.getTime() - now.getTime()) / 86400000)
  if (daysLeft < 0) return null
  return { daysLeft, isUrgent: daysLeft <= 5 }
}

// ---------------------------------------------------------------------------
// Fetch + map
// ---------------------------------------------------------------------------
export async function getEvents(): Promise<EventData[]> {
  const EVENTS_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbyR0eRtFiIZjmM4kEQfnhpFODimKANQx-q6SGjNeLZnEYNl0ulPm6ce0AG-UpydPbiU/exec"
  const url = EVENTS_SHEET_API_URL // move the Apps Script URL into .env.local
  if (!url) throw new Error('EVENTS_SHEET_API_URL is not set')

  const res = await fetch(url, { next: { revalidate: 300 } }) // sheet edits show up within ~5 min
  if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`)

  const rows: any[] = await res.json()

  const events = rows
    .filter((r) => r.slug && (str(r.published) === '' ? true : toTriBool(r.published) !== false))
    .map((r): EventData => {
      const startIso = toIso(r.startDate)
      const { fee, isFree } = formatFee(r.registrationFee ?? r.fee)

      const base = {
        startDate: startIso ?? (str(r.startDate) || 'TBA'),
        endDate: toIso(r.endDate) ?? startIso ?? (str(r.endDate) || 'TBA'),
        registrationOpenDate: toIso(r.registrationOpenDate),
        registrationCloseDate: toIso(r.registrationCloseDate),
        registrationOpen: toTriBool(r.registrationOpen),
        seatsLeft: toNum(r.seatsLeft),
        statusOverride: toOverride(r.status),
      }

      return {
        ...base,
        slug: str(r.slug),
        tag: str(r.tag),
        title: str(r.title),
        dateRange: str(r.dateRange) || 'Date will be announced soon',
        durationBadge: str(r.durationBadge) || 'TBA',
        mode: toMode(r.mode),
        description: str(r.description),
        heroImage: str(r.heroImage),
        whatYoullLearn: toLines(r.whatYoullLearn),
        whoShouldAttend: str(r.whoShouldAttend),
        toolToInstall: str(r.toolToInstall),
        refreshments: str(r.refreshments),
        venue: str(r.venue),
        address: str(r.address),
        mapsLink: str(r.mapsLink),
        timing: str(r.timing),
        registrationDeadline: str(r.registrationDeadline) || null,
        fee,
        isFree,
        faqs: parseFaqs(r.faqs),
        schedule: buildSchedule(r, startIso),
        registrationLink: str(r.registrationLink) || null,
        status: computeStatus(base),
        order: toNum(r.order) ?? 999,
        iconKey: str(r.iconKey) || 'sparkles',
        colorFrom: str(r.colorFrom) || '#F4EEF5',
        colorTo: str(r.colorTo) || '#EAD3EF',
        accentColor: str(r.accentColor) || '#704A74',
        accentDarkColor: str(r.accentDarkColor) || '#3B1F40',
      }
    })

  return events.sort((a, b) => a.order - b.order)
}

export const getEventBySlug = (events: EventData[], slug: string) => events.find((e) => e.slug === slug)
export const getAllSlugs = (events: EventData[]) => events.map((e) => e.slug)

/** Next event with a real date that hasn't started yet. TBA, ongoing, completed and cancelled events are skipped. */
export function getNextUpcomingEvent(events: EventData[], now: Date = new Date()): EventData | undefined {
  return events
    .filter(
      (e) =>
        hasValidDate(e) &&
        e.status !== 'Cancelled' &&
        new Date(`${e.startDate}T23:59:59`) >= now
    )
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0]
}