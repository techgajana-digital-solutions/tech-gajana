import type { Metadata } from 'next'
import { getEvents, getNextUpcomingEvent, EventData } from '@/lib/events-data'
import EventsPageClient from './EventsPageClient'

export const metadata: Metadata = {
  title: 'Tech Events, Workshops & Bootcamps',
  description:
    'Discover TechGajana events, coding workshops, and hands-on bootcamps. Learn practical technology skills, connect with the community, and reserve your place in upcoming sessions.',
  keywords: [
    'technology events',
    'coding workshops',
    'tech bootcamps',
    'programming events',
    'student tech events',
    'hands-on technology workshops',
  ],
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.techgajana.org/events',
    title: 'Tech Events, Workshops & Bootcamps | TechGajana',
    description:
      'Explore TechGajana technology events, coding workshops, and practical bootcamps. Find an upcoming session and register.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Events, Workshops & Bootcamps | TechGajana',
    description:
      'Explore TechGajana technology events, coding workshops, and practical bootcamps. Find an upcoming session and register.',
  },
}

export default async function EventsPage() {
  let events: EventData[] = []
  let loadError = false
  try {
    events = await getEvents()
  } catch {
    loadError = true
  }

  console.log('events loaded:', events.length, 'loadError:', loadError)
  const nextEvent = getNextUpcomingEvent(events)

  return <EventsPageClient events={events} nextEvent={nextEvent} loadError={loadError} />
}

export const revalidate = 60