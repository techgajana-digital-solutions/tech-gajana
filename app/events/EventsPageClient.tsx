'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Poppins, Caveat } from 'next/font/google'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Mic,
  MessageCircle,
  Video,
  X,
  Sparkles,
  Inbox,
  Smartphone,
  Code2,
  Gamepad2,
  Coffee,
  Brain,
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  BookOpen,
  Wrench,
  Trophy,
  Rocket,
  User,
  Phone,
  Check,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import { EventData } from '@/lib/events-data'
import StatusBadge from '@/components/events/StatusBadge'
import CountdownWidget from '@/components/events/CountdownWidget'
import OpinionForm from '@/components/events/OpinionForm'
import RiseLabFooter from '@/components/events/riselabfooter'
import { submitRegistration } from '@/lib/eventsRegistration'

// ---------------------------------------------------------------------------
// Fonts / tokens
// ---------------------------------------------------------------------------
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '600', '700'] })

const PLUM = '#704A74'
const PLUM_DARK = '#3B1F40'
const PLUM_DEEPER = '#2C1730'
const PLUM_TINT = '#F4EEF5'
const INK = '#241A26'
const INK_SOFT = '#7A6E7E'
const CREAM = '#FDFBFC'

// PLACEHOLDER — content team to supply real link
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@techgajana'
// PLACEHOLDER — content team to update weekly
const THIS_WEEKS_TOPIC = 'Is a CS degree still worth it in the age of AI?'
// PLACEHOLDER — final banner photo, content team to supply real event photography
const JOIN_BANNER_IMAGE =
  'https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=1200&auto=format&fit=crop'

// ---------------------------------------------------------------------------
// Presentation-only mapping — icon + pastel palette per event. Kept out of
// lib/events-data.ts on purpose so the data file stays pure content/CMS
// data and this file owns how it's visually represented.
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  smartphone: Smartphone,
  code2: Code2,
  gamepad2: Gamepad2,
  coffee: Coffee,
  brain: Brain,
  sparkles: Sparkles, // fallback default
}

function getEventTheme(event: EventData) {
  const IconComponent = ICON_MAP[event.iconKey] ?? Sparkles
  return {
    icon: <IconComponent size={36} />,
    panelBg: `linear-gradient(135deg, ${event.colorFrom}, ${event.colorTo})`,
    accent: event.accentColor,
    accentDark: event.accentDarkColor,
  }
}

function shortDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
}

// ---------------------------------------------------------------------------
// Mode badge
// ---------------------------------------------------------------------------
function ModeBadge({ mode }: { mode: 'Offline' | 'Online' }) {
  const isOffline = mode === 'Offline'
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: isOffline ? '#E3EEFA' : '#FBEBDD',
        color: isOffline ? '#1F3A5F' : '#8A4A11',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isOffline ? '#2E6FB0' : '#C1701F' }} />
      {mode}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Pastel bootcamp card
// ---------------------------------------------------------------------------
function BootcampCard({ event, index }: { event: EventData; index: number }) {
  const theme = getEventTheme(event)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group rounded-[1.5rem] overflow-hidden bg-white border border-gray-100 shadow-[0_10px_30px_-15px_rgba(59,31,64,0.2)] hover:shadow-[0_20px_40px_-15px_rgba(59,31,64,0.3)] transition-shadow duration-300 flex flex-col"
    >
      <Link href={`/events/${event.slug}`} className="contents cursor-pointer">
        <div className="relative h-28 flex items-center justify-center" style={{ background: theme.panelBg }}>
          <div
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white flex items-center justify-center font-extrabold text-[11px] shadow-sm"
            style={{ color: theme.accentDark }}
          >
            {event.tag.replace('Bootcamp ', '')}
          </div>
          <div
            className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3"
            style={{ color: theme.accent }}
          >
            {theme.icon}
          </div>
        </div>

        <div className="px-5 pt-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <ModeBadge mode={event.mode} />
            <StatusBadge
              startDate={event.startDate}
              endDate={event.endDate}
              registrationOpenDate={event.registrationOpenDate}
              registrationCloseDate={event.registrationCloseDate}
              size="sm"
            />
          </div>

          <h3 className="text-base font-bold mb-2 leading-snug" style={{ color: INK }}>
            {event.title}
          </h3>
          <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: INK_SOFT }}>
            {event.description}
          </p>

          <div className="space-y-1.5 mb-4 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-2 text-xs font-medium" style={{ color: INK_SOFT }}>
              <Calendar size={13} /> {event.dateRange}
            </span>
            <span className="flex items-center gap-2 text-xs font-medium" style={{ color: INK_SOFT }}>
              <Clock size={13} /> {event.durationBadge}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <Link
          href={`/events/${event.slug}`}
          className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full text-xs font-bold text-white transition-all cursor-pointer hover:brightness-110 active:scale-[0.97]"
          style={{ backgroundColor: theme.accentDark }}
        >
          View Details &amp; Register <ChevronRight size={14} />
        </Link>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Event schedule timeline node
// ---------------------------------------------------------------------------
function TimelineNode({ event }: { event: EventData }) {
  const theme = getEventTheme(event)
  return (
    <Link href={`/events/${event.slug}`} className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
      <div
        className="w-16 h-16 rounded-full flex flex-col items-center justify-center text-white border-2 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: theme.accentDark, borderColor: '#ffffff22' }}
      >
        <span className="text-[10px] font-semibold tracking-wide opacity-80">{shortDate(event.startDate).split(' ')[0]}</span>
        <span className="text-base font-extrabold leading-none">{shortDate(event.startDate).split(' ')[1]}</span>
      </div>
      <span className="mt-3 text-xs font-medium text-center max-w-[84px]" style={{ color: '#D8CBDA' }}>
        {event.title.split(' ').slice(0, 2).join(' ')}
      </span>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// TG Talk About — Share Opinion modal
// ---------------------------------------------------------------------------
function OpinionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2C1730]/50 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-[1.75rem] shadow-2xl overflow-hidden z-10"
          >
            <div className="px-7 py-6 flex items-start justify-between" style={{ backgroundColor: PLUM_TINT }}>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest mb-1 block" style={{ color: PLUM }}>
                  TG Talk About
                </span>
                <h3 className="text-lg font-bold" style={{ color: INK }}>Share Your Opinion</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
                style={{ color: INK_SOFT }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-7">
              <p className="text-sm mb-5" style={{ color: INK_SOFT }}>
                This week&apos;s topic: <strong style={{ color: INK }}>{THIS_WEEKS_TOPIC}</strong>
              </p>
              <OpinionForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// "Ready to Join" quick registration form — Name, Phone, Event dropdown
// ---------------------------------------------------------------------------
function QuickRegisterForm({ events }: { events: EventData[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const form = e.currentTarget
    const eventSlug = (form.elements.namedItem('event') as HTMLSelectElement).value
    const eventTitle = events.find((ev) => ev.slug === eventSlug)?.title

    const result = await submitRegistration({
      event: eventSlug,
      eventTitle,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      source: 'events-page-quick-register-form',
    })

    setIsSubmitting(false)
    if (result.success) {
      setIsSuccess(true)
    } else {
      setError(result.message ?? 'Something went wrong. Please try again.')
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: PLUM_TINT, color: PLUM }}>
          <Check size={26} />
        </div>
        <h4 className="text-xl font-bold mb-1.5" style={{ color: INK }}>You&apos;re on the list!</h4>
        <p className="text-sm" style={{ color: INK_SOFT }}>We&apos;ll email/message you further details soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-2xl font-extrabold mb-1.5" style={{ color: INK }}>Ready to Join?</h3>
      <p className="text-sm mb-6" style={{ color: INK_SOFT }}>
        Fill the form and secure your spot in any of the {events.length} events.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold mb-1.5 block" style={{ color: INK_SOFT }}>Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: INK_SOFT }}>
              <User size={16} />
            </div>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:outline-none transition-all"
              style={{ color: INK }}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold mb-1.5 block" style={{ color: INK_SOFT }}>Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: INK_SOFT }}>
              <Phone size={16} />
            </div>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 98765 43210"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:outline-none transition-all"
              style={{ color: INK }}
            />
          </div>
        </div>
      </div>

      <div className="mb-5">
        <label className="text-xs font-semibold mb-1.5 block" style={{ color: INK_SOFT }}>Select Event</label>
        <select
          name="event"
          required
          defaultValue=""
          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-3.5 text-sm appearance-none focus:outline-none transition-all cursor-pointer"
          style={{ color: INK }}
        >
          <option value="" disabled hidden>Choose your event</option>
          {events.map((e) => (
            <option key={e.slug} value={e.slug}>{e.title}</option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-center mb-4" style={{ color: '#B4485A' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-full font-bold text-sm text-white transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:hover:scale-100"
        style={{ backgroundColor: isSubmitting ? PLUM_DARK : PLUM }}
      >
        {isSubmitting ? 'Registering…' : (
          <>Register Now <ArrowRight size={16} /></>
        )}
      </button>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function EventsPageClient({
  events,
  nextEvent,
}: {
  events: EventData[]
  nextEvent: EventData | undefined
}) {
  const [isOpinionModalOpen, setIsOpinionModalOpen] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)

  const allSameDuration = events.length > 0 && events.every(e => e.durationBadge === events[0].durationBadge)
  const durationLabel = events.length === 0 ? '' : allSameDuration ? events[0].durationBadge.toLowerCase() : 'multi-day'
  const allOffline = events.length > 0 && events.every(e => e.mode === 'Offline')
  const earliestEvent = [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0]

  // PLACEHOLDER — sample recap photos to preview the design; swap these for
  // real event photography (or wire to a CMS query) once the first bootcamp
  // wraps, per the spec's "empty until first event concludes" rule.
  const pastEvents: { title: string; recap: string; image: string }[] = [
    { title: 'Community Hack Night', recap: 'Students building through the night.', image: 'odoo.jpeg' },
    { title: 'Odoo Hackathon 2026', recap: 'Teams presenting their final builds.', image: 'odoo2.jpeg' },
    { title: 'Odoo Hackathon 2025', recap: 'Group photo after the awards.', image: 'odoo3.jpeg' },
    {
      title: 'Hackathon Floor',
      recap: 'Late-night collaboration during the hackathon.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Bootcamp Session',
      recap: 'A packed room during a live session.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
    },
  ]
  const scrollGallery = (dir: 'left' | 'right') => {
    galleryRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />

      <main className={poppins.className} style={{ backgroundColor: CREAM, color: INK }}>
        {/* --------------------------------------------------------------- */}
        {/* 1. HERO */}
        {/* --------------------------------------------------------------- */}
        <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="relative z-10">
              <p className="text-xs font-bold tracking-[0.2em] mb-5" style={{ color: PLUM }}>
                BOOTCAMPS &nbsp;/&nbsp; CONTESTS &nbsp;/&nbsp; HACKATHONS &nbsp;/&nbsp; CONFERENCES
              </p>
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.08] mb-6" style={{ color: PLUM_DARK }}>
                Events at<br />TechGajana
              </h1>
              <p className="text-base sm:text-lg max-w-md mb-9 leading-relaxed" style={{ color: INK_SOFT }}>
                Bootcamps. Contests. Hackathons. Conferences. Learn, build, and grow with a community that codes together.
              </p>

              <div className="flex flex-wrap gap-6 mb-9">
                <StatItem
                  icon={<Calendar size={18} />}
                  label={<>{events.length} Bootcamps<br /><span className="text-xs font-normal" style={{ color: INK_SOFT }}>{durationLabel} each</span></>}
                />
                <StatItem icon={<MapPin size={18} />} label={<>Offline Sessions<br /><span className="text-xs font-normal" style={{ color: INK_SOFT }}>TechGajana Riselab</span></>} />
                <StatItem icon={<Mic size={18} />} label={<>TG Talk About<br /><span className="text-xs font-normal" style={{ color: INK_SOFT }}>Online, weekly</span></>} />
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => document.getElementById('upcoming')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm text-white transition-all cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{ backgroundColor: PLUM_DARK }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PLUM)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PLUM_DARK)}
                >
                  Explore Events <ArrowRight size={16} />
                </button>

                {nextEvent && (
                  <div>
                    <p className="text-xs font-semibold mb-2" style={{ color: INK_SOFT }}>
                      Next: {nextEvent.title}
                    </p>
                    <CountdownWidget targetDate={nextEvent.startDate} variant="light" />
                  </div>
                )}
              </div>
            </div>

            {/* Right — image */}
            <div className="relative">
              <div
                className="relative aspect-[4/3] overflow-hidden bg-cover bg-center rounded-[3rem]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop')",
                  borderRadius: '3rem 3rem 3rem 8rem',
                }}
              >
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${PLUM_DARK}55, transparent 60%)` }} />
              </div>

              <div
                className="absolute -top-6 right-10 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white text-center shadow-xl border-4 border-white"
                style={{ backgroundColor: PLUM_DARK }}
              >
                <span className="text-2xl font-extrabold leading-none">TG</span>
                <span className="text-[9px] tracking-widest mt-1 opacity-80">RISELAB</span>
              </div>

              <p
                className={`${caveat.className} absolute top-10 right-2 text-3xl leading-tight text-white text-right rotate-[-4deg]`}
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
              >
                Code<br />Learn<br />Build<br />Grow
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* 2. UPCOMING EVENTS — pastel bootcamp cards */}
        {/* --------------------------------------------------------------- */}
        <section id="upcoming" className="py-20 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] mb-3" style={{ color: PLUM }}>
                  <span className="w-5 h-px inline-block" style={{ backgroundColor: PLUM }} /> UPCOMING EVENTS
                </p>
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: PLUM_DARK }}>
                  Mark Your Calendars
                </h2>
                <p className="text-base max-w-md" style={{ color: INK_SOFT }}>
                  Five hands-on bootcamps, one journey.
                </p>
              </div>
              <p className={`${caveat.className} text-2xl`} style={{ color: PLUM }}>
                {events.length} Bootcamps {allOffline && '✓ All Offline'} ✓ Beginner Friendly
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {events.map((event, i) => (
                <BootcampCard key={event.slug} event={event} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* EVENT SCHEDULE — dark band, timeline + community card */}
        {/* --------------------------------------------------------------- */}
        <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12 overflow-hidden" style={{ backgroundColor: PLUM_DEEPER }}>
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.4fr_1fr] gap-10 relative z-10">
            {/* left */}
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: PLUM }}>
                <Calendar size={22} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Event Schedule</h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#C8B9CA' }}>
                Every bootcamp runs offline at TechGajana Riselab, 9:00 AM – 5:00 PM across both days.
              </p>

              <div className="rounded-2xl p-5 space-y-3 mb-6" style={{ backgroundColor: '#ffffff10' }}>
                <ScheduleRow label="Starting from" value={shortDate(earliestEvent.startDate)} />
                <ScheduleRow label="Duration" value={`${durationLabel} each`} />
                <ScheduleRow label="Mode" value={allOffline ? 'Offline' : 'Mixed'} />
              </div>

              <a
                href="mailto:info@techgajana.org"
                className={`${caveat.className} text-2xl text-white inline-flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity`}
              >
                Have a question? Just ask ↗
              </a>
            </div>

            {/* middle — timeline */}
            <div className="flex min-w-0 flex-col justify-center">
              <p className="text-sm font-semibold mb-8 flex items-center gap-2" style={{ color: '#C8B9CA' }}>
                <ChevronRight size={16} /> 2026 Timeline
              </p>
              <div className="flex min-w-0 items-start gap-4 sm:gap-6 overflow-x-auto pb-2">
                {events.map((event, i) => (
                  <div key={event.slug} className="flex items-center">
                    <TimelineNode event={event} />
                    {i < events.length - 1 && (
                      <span className="w-6 sm:w-10 h-px mx-1 mt-[-24px]" style={{ backgroundColor: '#ffffff30' }} />
                    )}
                  </div>
                ))}
              </div>

              <div
                className="mt-8 mx-auto flex items-center gap-3 px-6 py-3.5 rounded-full transition-all cursor-pointer hover:scale-105"
                style={{ backgroundColor: PLUM }}
                onClick={() => document.getElementById('tg-talk')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mic size={18} className="text-white" />
                <div>
                  <p className="text-sm font-bold text-white leading-tight">TG Talk About</p>
                  <p className="text-xs leading-tight" style={{ color: '#E6D8E8' }}>Weekly, online — every week</p>
                </div>
              </div>
            </div>

            {/* right — community card */}
            <div className="w-full bg-white rounded-[1.75rem] p-6 sm:p-7 h-fit self-center">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: PLUM_TINT, color: PLUM }}>
                <Users size={20} />
              </div>
              <h4 className="text-lg font-bold mb-2" style={{ color: INK }}>
                Want to help run these events?
              </h4>
              <p className="text-sm leading-relaxed mb-5" style={{ color: INK_SOFT }}>
                If you&apos;re passionate about tech, community, and leadership, reach out — we&apos;d love to have you involved.
              </p>
              <a
                href="mailto:info@techgajana.org"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                style={{ backgroundColor: PLUM_DARK }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PLUM)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PLUM_DARK)}
              >
                <Mail size={13} /> info@techgajana.org
              </a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* 3. TG TALK ABOUT — visually distinct, online-only series */}
        {/* --------------------------------------------------------------- */}
        {/* <section id="tg-talk" className="py-20 px-6 lg:px-12" style={{ backgroundColor: PLUM_TINT }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-5"
                  style={{ backgroundColor: '#FBEBDD', color: '#8A4A11' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C1701F' }} />
                  Online
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: PLUM }}>
                    <Mic size={20} className="text-white" />
                  </div>
                  <h2 className={`${caveat.className} text-3xl sm:text-4xl`} style={{ color: PLUM_DARK }}>TG Talk About</h2>
                </div>
                <p className="text-sm font-medium mb-5" style={{ color: PLUM }}>
                  One topic. One week. Real opinions.
                </p>
                <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: INK_SOFT }}>
                  Every week, we put one bold question or topic on the table. You share your thoughts, we bring them
                  together, and the conversation goes live as a podcast on our YouTube channel. No scripts. No filters.
                  Just real voices from the community.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'We drop a new topic every week',
                    'You share your opinion',
                    'We publish the podcast on YouTube',
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3.5">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: PLUM }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm" style={{ color: INK }}>{step}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsOpinionModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                    style={{ backgroundColor: PLUM_DARK }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PLUM)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PLUM_DARK)}
                  >
                    <MessageCircle size={16} /> Share Your Opinion
                  </button>
                  <a
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border transition-all cursor-pointer hover:scale-105 active:scale-95"
                    style={{ borderColor: PLUM, color: PLUM }}
                  >
                    <Video size={16} /> Watch on YouTube
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.5rem] p-7 bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} style={{ color: '#C1701F' }} />
                    <p className="text-xs font-bold tracking-wide" style={{ color: '#C1701F' }}>
                      THIS WEEK&apos;S TOPIC
                    </p>
                  </div>
                  <p className="text-lg sm:text-xl font-bold leading-snug" style={{ color: INK }}>{THIS_WEEKS_TOPIC}</p>
                </div>

                <div className="rounded-[1.5rem] p-7 bg-white">
                  <p className="text-xs font-bold tracking-wide mb-5" style={{ color: INK_SOFT }}>
                    PAST EPISODES
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="aspect-video rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: PLUM_TINT }}
                      >
                        <Video size={18} style={{ color: PLUM }} />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs mt-4" style={{ color: INK_SOFT }}>
                    Episodes will appear here once published.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* --------------------------------------------------------------- */}
        {/* 4. MOMENTS FROM OUR PAST EVENTS */}
        {/* --------------------------------------------------------------- */}
        <section className="py-16 sm:py-20 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              <div>
                <p className="text-xs font-bold tracking-[0.15em] mb-3" style={{ color: PLUM }}>
                  PREVIOUS EVENTS
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: PLUM_DARK }}>
                  Moments from Our Past Events
                </h2>
                <p className="text-sm sm:text-base max-w-lg" style={{ color: INK_SOFT }}>
                  Here are some glimpses of our previous bootcamps, workshops and hackathons. The energy,
                  learning and community spirit are real!
                </p>
              </div>
              {pastEvents.length > 0 && (
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs border self-start flex-shrink-0 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  style={{ borderColor: PLUM, color: PLUM }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = PLUM
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = PLUM
                  }}
                >
                  View All Photos <ArrowRight size={14} />
                </Link>
              )}
            </div>

            {pastEvents.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center text-center py-16 rounded-[1.75rem] border-2 border-dashed"
                style={{ borderColor: '#E7DAE9' }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: PLUM_TINT, color: PLUM }}>
                  <Inbox size={24} />
                </div>
                <p className="text-base font-semibold mb-1.5" style={{ color: INK }}>
                  No recaps yet
                </p>
                <p className="text-sm max-w-xs" style={{ color: INK_SOFT }}>
                  Highlights from our first bootcamp will show up here once it wraps.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* left arrow — dark, semi-transparent, overlapping the first photo's edge */}
                <button
                  onClick={() => scrollGallery('left')}
                  aria-label="Scroll left"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer hover:scale-110 active:scale-95"
                  style={{ backgroundColor: 'rgba(44,23,48,0.6)', color: '#fff' }}
                >
                  <ChevronLeft size={18} />
                </button>

                <div
                  ref={galleryRef}
                  className="grid grid-flow-col auto-cols-[70%] xs:auto-cols-[55%] sm:auto-cols-[31%] lg:auto-cols-[19%] gap-3 sm:gap-4 overflow-x-auto pb-1 scroll-smooth"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {pastEvents.map((p, i) => (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden bg-cover bg-center cursor-pointer transition-transform duration-300 hover:scale-[1.03] aspect-[4/3]"
                      style={{ backgroundImage: `url(${p.image})`, scrollSnapAlign: 'start' }}
                      role="img"
                      aria-label={p.title}
                    />
                  ))}
                </div>

                {/* right arrow — dark, semi-transparent, overlapping the last photo's edge */}
                <button
                  onClick={() => scrollGallery('right')}
                  aria-label="Scroll right"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer hover:scale-110 active:scale-95"
                  style={{ backgroundColor: 'rgba(44,23,48,0.6)', color: '#fff' }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* 5. READY TO JOIN — photo banner + quick registration card       */}
        {/* --------------------------------------------------------------- */}
        <section className="py-16 sm:py-20 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-25px_rgba(59,31,64,0.35)]">
              {/* left — photo + script headline + icon row */}
              <div className="relative min-h-[320px] lg:min-h-[420px] flex flex-col justify-center p-8 sm:p-12" style={{ backgroundColor: PLUM_TINT }}>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${JOIN_BANNER_IMAGE})` }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, ${PLUM_TINT}F2 20%, ${PLUM_DARK}55 75%)` }} />

                <div className="relative z-10 max-w-sm">
                  <p className={`${caveat.className} text-4xl sm:text-5xl leading-tight mb-5`} style={{ color: PLUM_DARK }}>
                    Your Future in<br />Tech Starts Here!
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: INK }}>
                    Don&apos;t just watch from the sidelines. Be a part of something bigger.
                  </p>

                  <div className="flex flex-wrap gap-6">
                    <IconLabel icon={<BookOpen size={20} />} label="Learn" />
                    <IconLabel icon={<Wrench size={20} />} label="Build" />
                    <IconLabel icon={<Trophy size={20} />} label="Compete" />
                    <IconLabel icon={<Rocket size={20} />} label="Grow" />
                  </div>
                </div>
              </div>

              {/* right — quick registration card */}
              <div className="bg-white p-8 sm:p-12 flex items-center">
                <div className="w-full max-w-md mx-auto">
                  <QuickRegisterForm events={events} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <OpinionModal isOpen={isOpinionModalOpen} onClose={() => setIsOpinionModalOpen(false)} />

      <RiseLabFooter />
    </>
  )
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
function StatItem({ icon, label }: { icon: React.ReactNode; label: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: PLUM_TINT, color: PLUM }}>
        {icon}
      </div>
      <span className="text-sm font-semibold leading-tight" style={{ color: INK }}>{label}</span>
    </div>
  )
}

function ScheduleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span style={{ color: '#B7A5B9' }}>{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  )
}

function IconLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm" style={{ color: PLUM }}>
        {icon}
      </div>
      <span className="text-xs font-semibold" style={{ color: PLUM_DARK }}>{label}</span>
    </div>
  )
}