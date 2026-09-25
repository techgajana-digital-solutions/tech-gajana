// ---------------------------------------------------------------------------
// TechGajana — Events data source
//
// This is the SINGLE source of truth for all 5 bootcamp events. The event
// details template at /events/[slug]/page.tsx reads from this file for every
// event — there are no separate hardcoded pages per event.
//
// Swap this file for a CMS/API call later (e.g. `await fetch(CMS_URL)`)
// without touching the page components — every page reads through the
// getEvent* helpers below, not this array directly.
//
// Fields commented "PLACEHOLDER" are flagged in the spec as content-team-owned
// and should become CMS-editable fields before launch.
// ---------------------------------------------------------------------------

export type EventMode = 'Offline' | 'Online'
export type EventStatus = 'Open for Registration' | 'Coming Soon' | 'Completed'

export interface ScheduleSession {
  time: string
  session: string // PLACEHOLDER — session-level breakdown, content team to add
  speaker?: string // PLACEHOLDER — speaker name if applicable
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
  /** ISO date, used for status + countdown calculations */
  startDate: string
  /** ISO date, used for status calculations */
  endDate: string
  durationBadge: string
  mode: EventMode
  description: string
  /** PLACEHOLDER — hero banner image per event, content team to supply final art */
  heroImage: string
  /** PLACEHOLDER — 4-6 bullets, content team to fill based on final curriculum */
  whatYoullLearn: string[]
  /** PLACEHOLDER — varies per event */
  whoShouldAttend: string
  /** PLACEHOLDER — software/tool to pre-install, varies per event */
  toolToInstall: string
  /** PLACEHOLDER — provided / not provided */
  refreshments: string
  /** PLACEHOLDER — venue name, content team to confirm */
  venue: string
  /** PLACEHOLDER — full address text */
  address: string
  mapsLink: string
  timing: string
  /** PLACEHOLDER — dynamic counter, manually updated or synced from Sheet row count */
  seatsLeft: number | null
  /** PLACEHOLDER */
  registrationDeadline: string | null
  /** PLACEHOLDER — Free / Paid amount */
  fee: string
  /** PLACEHOLDER — 3-5 common questions, content team to add */
  faqs: FaqItem[]
  schedule: ScheduleDay[]
  registrationOpenDate: string | null
  registrationCloseDate: string | null
  iconKey: string
  colorFrom: string
  colorTo: string
  accentColor: string
  accentDarkColor: string
}

// ---------------------------------------------------------------------------
// Standard "things to know" checklist items — reused across all 5 events.
// Only the tool-to-install and refreshments lines vary per event (pulled
// from each event's own data above).
// ---------------------------------------------------------------------------
export const standardChecklist = [
  'Bring your own laptop (charger included)',
  'Valid college/government ID for entry',
  'Arrive 15 minutes before start time for check-in (event starts 9:00 AM sharp)',
  'Basic programming knowledge recommended',
  'Certificate of participation provided on completion',
]

const defaultSchedule = (day1Date: string, day2Date: string): ScheduleDay[] => [
  {
    day: 'Day 1',
    date: day1Date,
    hours: '9:00 AM – 5:00 PM',
    sessions: [
      { time: '9:00 AM', session: 'Check-in & Welcome' }, // PLACEHOLDER
      { time: '9:30 AM', session: 'Session 1 (details TBA)' }, // PLACEHOLDER
      { time: '1:00 PM', session: 'Lunch Break' }, // PLACEHOLDER
      { time: '2:00 PM', session: 'Session 2 (details TBA)' }, // PLACEHOLDER
    ],
  },
  {
    day: 'Day 2',
    date: day2Date,
    hours: '9:00 AM – 5:00 PM',
    sessions: [
      { time: '9:00 AM', session: 'Recap & Session 3 (details TBA)' }, // PLACEHOLDER
      { time: '1:00 PM', session: 'Lunch Break' }, // PLACEHOLDER
      { time: '2:00 PM', session: 'Build & Wrap-up' }, // PLACEHOLDER
      { time: '4:30 PM', session: 'Demos & Certificates' }, // PLACEHOLDER
    ],
  },
]

// ---------------------------------------------------------------------------
// Events — titles, dates, and descriptions below are FINAL COPY from the
// content team. Do not reword, shorten, or change dates/titles.
// ---------------------------------------------------------------------------
export async function getEvents(): Promise<EventData[]> {
  const EVENTS_SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyR0eRtFiIZjmM4kEQfnhpFODimKANQx-q6SGjNeLZnEYNl0ulPm6ce0AG-UpydPbiU/exec'

  const res = await fetch(EVENTS_SHEET_API_URL!, {
    next: { revalidate: 300 }, // refetch at most every 5 minutes
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`)
  }

  const rows = await res.json()

  return rows.map((r: any): EventData => ({
    slug: r.slug,
    tag: r.tag,
    title: r.title,
    dateRange: r.dateRange,
    startDate: r.startDate,
    endDate: r.endDate,
    durationBadge: r.durationBadge,
    mode: r.mode,
    description: r.description,
    heroImage: r.heroImage,
    whatYoullLearn: r.whatYoullLearn,
    whoShouldAttend: r.whoShouldAttend,
    toolToInstall: r.toolToInstall,
    refreshments: r.refreshments,
    venue: r.venue,
    address: r.address,
    mapsLink: r.mapsLink,
    timing: r.timing,
    seatsLeft: r.seatsLeft,
    registrationDeadline: r.registrationDeadline,
    fee: r.fee,
    faqs: r.faqs,
    schedule: defaultSchedule(r.startDate, r.endDate),
    registrationOpenDate: r.registrationOpenDate || null,
    registrationCloseDate: r.registrationCloseDate || null,
    iconKey: r.iconKey || 'sparkles',
    colorFrom: r.colorFrom || '#F4EEF5',
    colorTo: r.colorTo || '#EAD3EF',
    accentColor: r.accentColor || '#704A74',
    accentDarkColor: r.accentDarkColor || '#3B1F40',
  }))
}

export function getEventBySlug(events: EventData[], slug: string): EventData | undefined {
  return events.find((e) => e.slug === slug)
}

export function getAllSlugs(events: EventData[]): string[] {
  return events.map((e) => e.slug)
}

const REGISTRATION_WINDOW_DAYS = 30 // fallback only, used when sheet doesn't set explicit dates

export function computeStatus(event: EventData, now: Date = new Date()): EventStatus {
  const end = new Date(`${event.endDate}T23:59:59`)
  if (now > end) return 'Completed'

  if (event.registrationCloseDate) {
    const closeDate = new Date(`${event.registrationCloseDate}T23:59:59`)
    if (now > closeDate) return 'Completed' // or a distinct 'Registration Closed' status if you want to tell these apart
  }

  const openDate = event.registrationOpenDate
    ? new Date(`${event.registrationOpenDate}T00:00:00`)
    : new Date(new Date(`${event.startDate}T00:00:00`).getTime() - REGISTRATION_WINDOW_DAYS * 24 * 60 * 60 * 1000)

  return now >= openDate ? 'Open for Registration' : 'Coming Soon'
}

export function getRegistrationUrgency(event: EventData, now: Date = new Date()): { daysLeft: number; isUrgent: boolean } | null {
  if (!event.registrationCloseDate) return null
  const closeDate = new Date(`${event.registrationCloseDate}T23:59:59`)
  const daysLeft = Math.ceil((closeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (daysLeft < 0) return null
  return { daysLeft, isUrgent: daysLeft <= 5 } // tweak the 5-day threshold to taste
}

export function getNextUpcomingEvent(events: EventData[], now: Date = new Date()): EventData | undefined {
  const upcoming = events
    .filter((e) => new Date(`${e.endDate}T23:59:59`) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  return upcoming[0]
}