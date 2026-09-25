import { getEvents, getNextUpcomingEvent } from '@/lib/events-data'
import EventsPageClient from './EventsPageClient'

export default async function EventsPage() {
  const events = await getEvents()
  const nextEvent = getNextUpcomingEvent(events)

  return <EventsPageClient events={events} nextEvent={nextEvent} />
}