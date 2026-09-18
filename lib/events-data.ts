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
export const events: EventData[] = [
  {
    slug: 'flutter-bootcamp',
    tag: 'Bootcamp 01',
    title: 'Cross Platform / Mobile App Development with Flutter',
    dateRange: 'September 26–27',
    startDate: '2026-09-26',
    endDate: '2026-09-27',
    durationBadge: '2 Days',
    mode: 'Offline',
    description:
      'Build beautiful, native-feeling apps for Android and iOS from a single codebase. Hands-on sessions covering Flutter fundamentals, UI design, and real app deployment.',
    heroImage:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1600&auto=format&fit=crop', // PLACEHOLDER
    whatYoullLearn: [
      'Flutter fundamentals and project structure', // PLACEHOLDER
      'Building real UI with widgets and layouts', // PLACEHOLDER
      'Connecting your app to a live API', // PLACEHOLDER
      'State management basics', // PLACEHOLDER
      'Building and exporting an installable app', // PLACEHOLDER
    ],
    whoShouldAttend: 'Students and beginners with basic programming knowledge', // PLACEHOLDER
    toolToInstall: 'Flutter SDK + Android Studio', // PLACEHOLDER
    refreshments: 'Provided', // PLACEHOLDER
    venue: 'TechGajana Riselab', // PLACEHOLDER
    address: 'Address to be confirmed', // PLACEHOLDER
    mapsLink: 'https://maps.app.goo.gl/FqA9QsbUGQHKs5nTA',
    timing: '9:00 AM – 5:00 PM (both days)',
    seatsLeft: null, // PLACEHOLDER
    registrationDeadline: null, // PLACEHOLDER
    fee: 'Free', // PLACEHOLDER
    faqs: [
      { q: 'Do I need prior coding experience?', a: 'Basic programming knowledge helps, but the bootcamp starts from fundamentals.' }, // PLACEHOLDER
      { q: 'What do I need to bring?', a: 'A laptop that can run Flutter, and a charger.' }, // PLACEHOLDER
      { q: 'Will I get a certificate?', a: 'Yes, on completion of both days.' }, // PLACEHOLDER
    ],
    schedule: defaultSchedule('September 26', 'September 27'),
  },
  {
    slug: 'nextjs-bootcamp',
    tag: 'Bootcamp 02',
    title: 'Full Stack Development with Next.js',
    dateRange: 'October 17–18',
    startDate: '2026-10-17',
    endDate: '2026-10-18',
    durationBadge: '2 Days',
    mode: 'Offline',
    description:
      'Go from frontend to backend with Next.js. Learn routing, server-side rendering, APIs, and how to ship a complete full stack web application.',
    heroImage:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop', // PLACEHOLDER
    whatYoullLearn: [
      'Next.js routing, layouts, and server components', // PLACEHOLDER
      'Server-side rendering and data fetching', // PLACEHOLDER
      'Building and consuming APIs', // PLACEHOLDER
      'Working with a real database', // PLACEHOLDER
      'Deploying a full stack app', // PLACEHOLDER
    ],
    whoShouldAttend: 'Students with basic HTML/CSS/JS knowledge', // PLACEHOLDER
    toolToInstall: 'Node.js + VS Code', // PLACEHOLDER
    refreshments: 'Provided', // PLACEHOLDER
    venue: 'TechGajana Riselab', // PLACEHOLDER
    address: 'Address to be confirmed', // PLACEHOLDER
    mapsLink: 'https://maps.app.goo.gl/FqA9QsbUGQHKs5nTA',
    timing: '9:00 AM – 5:00 PM (both days)',
    seatsLeft: null, // PLACEHOLDER
    registrationDeadline: null, // PLACEHOLDER
    fee: 'Free', // PLACEHOLDER
    faqs: [
      { q: 'Do I need prior coding experience?', a: 'Basic web development knowledge is recommended.' }, // PLACEHOLDER
      { q: 'What do I need to bring?', a: 'A laptop with Node.js installable, and a charger.' }, // PLACEHOLDER
      { q: 'Will I get a certificate?', a: 'Yes, on completion of both days.' }, // PLACEHOLDER
    ],
    schedule: defaultSchedule('October 17', 'October 18'),
  },
  {
    slug: 'unity-gamedev-bootcamp',
    tag: 'Bootcamp 03',
    title: 'Game Development with Unity',
    dateRange: 'November 7–8',
    startDate: '2026-11-07',
    endDate: '2026-11-08',
    durationBadge: '2 Days',
    mode: 'Offline',
    description:
      'Dive into game development with Unity. Design mechanics, build interactive worlds, and create your own playable game by the end of the bootcamp.',
    heroImage:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop', // PLACEHOLDER
    whatYoullLearn: [
      'Unity editor basics: scenes, prefabs, physics', // PLACEHOLDER
      'Player movement and game logic in C#', // PLACEHOLDER
      'Level design fundamentals', // PLACEHOLDER
      'Exporting a playable build', // PLACEHOLDER
    ],
    whoShouldAttend: 'Students curious about game development, no prior Unity experience needed', // PLACEHOLDER
    toolToInstall: 'Unity Hub + Unity Editor', // PLACEHOLDER
    refreshments: 'Provided', // PLACEHOLDER
    venue: 'TechGajana Riselab', // PLACEHOLDER
    address: 'Address to be confirmed', // PLACEHOLDER
    mapsLink: 'https://maps.app.goo.gl/FqA9QsbUGQHKs5nTA',
    timing: '9:00 AM – 5:00 PM (both days)',
    seatsLeft: null, // PLACEHOLDER
    registrationDeadline: null, // PLACEHOLDER
    fee: 'Free', // PLACEHOLDER
    faqs: [
      { q: 'Do I need prior game dev experience?', a: 'No, this bootcamp starts from the basics.' }, // PLACEHOLDER
      { q: 'What do I need to bring?', a: 'A laptop that can run Unity, and a charger.' }, // PLACEHOLDER
      { q: 'Will I get a certificate?', a: 'Yes, on completion of both days.' }, // PLACEHOLDER
    ],
    schedule: defaultSchedule('November 7', 'November 8'),
  },
  {
    slug: 'java-for-all',
    tag: 'Bootcamp 04',
    title: 'Java for All',
    dateRange: 'November 18–19',
    startDate: '2026-11-18',
    endDate: '2026-11-19',
    durationBadge: '2 Days',
    mode: 'Offline',
    description:
      'A beginner-friendly deep dive into Java — covering core concepts, OOP principles, and practical coding exercises for developers at any stage.',
    heroImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop', // PLACEHOLDER
    whatYoullLearn: [
      'Core Java syntax and fundamentals', // PLACEHOLDER
      'Object-oriented programming principles', // PLACEHOLDER
      'Practical coding exercises', // PLACEHOLDER
      'Writing clean, maintainable code', // PLACEHOLDER
    ],
    whoShouldAttend: 'Developers at any stage — beginners to intermediate', // PLACEHOLDER
    toolToInstall: 'JDK + IntelliJ IDEA / Eclipse', // PLACEHOLDER
    refreshments: 'Provided', // PLACEHOLDER
    venue: 'TechGajana Riselab', // PLACEHOLDER
    address: 'Address to be confirmed', // PLACEHOLDER
    mapsLink: 'https://maps.app.goo.gl/FqA9QsbUGQHKs5nTA',
    timing: '9:00 AM – 5:00 PM (both days)',
    seatsLeft: null, // PLACEHOLDER
    registrationDeadline: null, // PLACEHOLDER
    fee: 'Free', // PLACEHOLDER
    faqs: [
      { q: 'Is this suitable for complete beginners?', a: 'Yes, the bootcamp is designed to be beginner-friendly.' }, // PLACEHOLDER
      { q: 'What do I need to bring?', a: 'A laptop with JDK installable, and a charger.' }, // PLACEHOLDER
      { q: 'Will I get a certificate?', a: 'Yes, on completion of both days.' }, // PLACEHOLDER
    ],
    schedule: defaultSchedule('November 18', 'November 19'),
  },
  {
    slug: 'dsa-and-me',
    tag: 'Bootcamp 05',
    title: 'POV: One Day, DSA and Me <3',
    dateRange: 'December 9–10',
    startDate: '2026-12-09',
    endDate: '2026-12-10',
    durationBadge: '2 Days',
    mode: 'Offline',
    description:
      'Sharpen your problem-solving skills with focused sessions on Data Structures and Algorithms — built for placements, contests, and real coding confidence.',
    heroImage:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1600&auto=format&fit=crop', // PLACEHOLDER
    whatYoullLearn: [
      'Arrays, strings, trees, and graphs', // PLACEHOLDER
      'Pattern recognition for interview questions', // PLACEHOLDER
      'Time and space complexity', // PLACEHOLDER
      'Live problem solving practice', // PLACEHOLDER
    ],
    whoShouldAttend: 'Students preparing for placements or competitive programming', // PLACEHOLDER
    toolToInstall: 'Any code editor (VS Code recommended)', // PLACEHOLDER
    refreshments: 'Provided', // PLACEHOLDER
    venue: 'TechGajana Riselab', // PLACEHOLDER
    address: 'Address to be confirmed', // PLACEHOLDER
    mapsLink: 'https://maps.app.goo.gl/FqA9QsbUGQHKs5nTA',
    timing: '9:00 AM – 5:00 PM (both days)',
    seatsLeft: null, // PLACEHOLDER
    registrationDeadline: null, // PLACEHOLDER
    fee: 'Free', // PLACEHOLDER
    faqs: [
      { q: 'What level of DSA knowledge is needed?', a: 'Basic programming knowledge is enough — we build up from there.' }, // PLACEHOLDER
      { q: 'What do I need to bring?', a: 'A laptop with any code editor, and a charger.' }, // PLACEHOLDER
      { q: 'Will I get a certificate?', a: 'Yes, on completion of both days.' }, // PLACEHOLDER
    ],
    schedule: defaultSchedule('December 9', 'December 10'),
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getEventBySlug(slug: string): EventData | undefined {
  return events.find((e) => e.slug === slug)
}

export function getAllSlugs(): string[] {
  return events.map((e) => e.slug)
}

/**
 * Status badge must update dynamically based on date vs today's date.
 * Call this client-side (after mount) to avoid SSR/client date mismatch.
 *
 * Assumption (spec doesn't pin an exact rule): registration is considered
 * "Open" starting 30 days before the event and through its final day;
 * anything further out shows "Coming Soon". Adjust REGISTRATION_WINDOW_DAYS
 * below, or wire this to a real "registration opens" field from the CMS.
 */
const REGISTRATION_WINDOW_DAYS = 30

export function computeStatus(startDate: string, endDate: string, now: Date = new Date()): EventStatus {
  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T23:59:59`)
  const registrationOpensAt = new Date(start.getTime() - REGISTRATION_WINDOW_DAYS * 24 * 60 * 60 * 1000)

  if (now > end) return 'Completed'
  if (now >= registrationOpensAt) return 'Open for Registration'
  return 'Coming Soon'
}

/**
 * Returns the single nearest upcoming (not yet completed) event.
 * The countdown widget only ever shows for this one event.
 */
export function getNextUpcomingEvent(now: Date = new Date()): EventData | undefined {
  const upcoming = events
    .filter((e) => new Date(`${e.endDate}T23:59:59`) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  return upcoming[0]
}
