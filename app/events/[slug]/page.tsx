import { notFound } from 'next/navigation'
import { getEvents, getEventBySlug } from '@/lib/events-data'
import EventDetailsClient from './EventDetailsClient'

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const events = await getEvents()
  const event = getEventBySlug(events, slug)

  if (!event) {
    notFound()
  }

  return <EventDetailsClient event={event} />
}