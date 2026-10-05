import { getEvents, getNextUpcomingEvent, EventData } from '@/lib/events-data'
import EventsPageClient from './EventsPageClient'

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