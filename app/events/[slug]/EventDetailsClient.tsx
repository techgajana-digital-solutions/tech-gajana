'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, CheckCircle2, ChevronDown, Users, Laptop, IdCard, Utensils, Award, Wrench, Ticket, Armchair, Timer } from 'lucide-react';
import Navbar from '@/components/navbar'
import RiseLabFooter from '@/components/events/riselabfooter'
import { standardChecklist, EventData } from '@/lib/events-data'
import StatusBadge from '@/components/events/StatusBadge'
import CountdownWidget from '@/components/events/CountdownWidget'
import AddToCalendarButton from '@/components/events/AddToCalendarButton'
import RegistrationForm from '@/components/events/RegistrationForm'
import RegistrationModal from '@/components/events/RegistrationModal'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })

const PLUM = '#704A74'
const PLUM_DARK = '#3B1F40'
const PLUM_DEEPER = '#2C1730'
const PLUM_TINT = '#F4EEF5'
const INK = '#241A26'
const INK_SOFT = '#7A6E7E'
const CREAM = '#FDFBFC'

function ModeBadge({ mode }: { mode: 'Offline' | 'Online' }) {
    const isOffline = mode === 'Offline'
    return (
        <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
                backgroundColor: isOffline ? 'rgba(46,111,176,0.18)' : 'rgba(193,112,31,0.18)',
                color: '#fff',
            }}
        >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isOffline ? '#7EB2E8' : '#F0B87A' }} />
            {mode}
        </span>
    )
}

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
    return (
        <div className="border-b" style={{ borderColor: '#EDE4EF' }}>
            <button onClick={onToggle} className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer">
                <span className="text-sm sm:text-base font-semibold" style={{ color: INK }}>{q}</span>
                <ChevronDown
                    size={18}
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ color: PLUM, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm leading-relaxed pb-5" style={{ color: INK_SOFT }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function EventDetailsClient({ event }: { event: EventData }) {
    const [activeDay, setActiveDay] = useState(0)
    const [openFaq, setOpenFaq] = useState<number | null>(0)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    const checklist = [
        ...standardChecklist.slice(0, 3),
        `${event.toolToInstall} (pre-install before arriving)`,
        ...standardChecklist.slice(3),
        `Lunch/refreshments: ${event.refreshments}`,
    ]

    const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
        `${event.venue}, ${event.address}`
    )}&output=embed`

    return (
        <>
            <Navbar />

            <main className={poppins.className} style={{ backgroundColor: CREAM, color: INK }}>
                {/* ------------------------------------------------------------- */}
                {/* 1. EVENT HEADER */}
                {/* ------------------------------------------------------------- */}
                <section className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 px-6 lg:px-12 overflow-hidden">
                    <div className="absolute inset-0">
                        {/* PLACEHOLDER — hero banner image per event */}
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.heroImage})` }} />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${PLUM_DARK}E6, ${PLUM_DEEPER}F2)` }} />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors mb-8 cursor-pointer"
                        >
                            <ArrowLeft size={16} /> Back to all events
                        </Link>

                        <div className="flex flex-wrap items-center gap-2.5 mb-5">
                            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white" style={{ color: PLUM_DARK }}>
                                {event.tag}
                            </span>
                            <ModeBadge mode={event.mode} />
                            <StatusBadge startDate={event.startDate} endDate={event.endDate} />
                            <AddToCalendarButton
                                title={event.title}
                                description={event.description}
                                location={event.venue}
                                startDate={event.startDate}
                                endDate={event.endDate}
                                accent={PLUM}
                            />
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 max-w-2xl">
                            {event.title}
                        </h1>

                        <div className="flex flex-wrap gap-3 mb-9">
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-medium border border-white/20">
                                <Calendar size={14} /> {event.dateRange}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-medium border border-white/20">
                                <Clock size={14} /> {event.durationBadge}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm font-medium border border-white/20">
                                <MapPin size={14} /> {event.venue}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                            <button
                                onClick={() => setIsRegisterModalOpen(true)}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-white transition-all cursor-pointer hover:scale-105 hover:shadow-xl active:scale-95"
                                style={{ color: PLUM_DARK }}
                            >
                                Register Now <ArrowRight size={16} />
                            </button>
                            <CountdownWidget targetDate={event.startDate} label="Starts in" variant="dark" />
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* 2. OVERVIEW */}
                {/* ------------------------------------------------------------- */}
                <section className="py-14 sm:py-20 px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xs font-bold tracking-[0.15em] mb-3" style={{ color: PLUM }}>ABOUT THIS BOOTCAMP</p>
                        <p className="text-base sm:text-lg leading-relaxed" style={{ color: INK }}>
                            {event.description}
                        </p>
                    </div>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* 3. SCHEDULE / AGENDA */}
                {/* ------------------------------------------------------------- */}
                <section className="py-14 sm:py-20 px-6 lg:px-12" style={{ backgroundColor: PLUM_TINT }}>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xs font-bold tracking-[0.15em] mb-3" style={{ color: PLUM }}>SCHEDULE</p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: PLUM_DARK }}>
                            What each day looks like
                        </h2>

                        <div className="flex gap-2 mb-6">
                            {event.schedule.map((d, i) => (
                                <button
                                    key={d.day}
                                    onClick={() => setActiveDay(i)}
                                    className="flex-1 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                                    style={{
                                        backgroundColor: activeDay === i ? PLUM_DARK : '#ffffff',
                                        color: activeDay === i ? '#fff' : INK_SOFT,
                                    }}
                                >
                                    {d.day} · {d.date}
                                </button>
                            ))}
                        </div>

                        <div className="bg-white rounded-[1.5rem] p-6 sm:p-7">
                            <p className="text-xs font-semibold mb-5" style={{ color: INK_SOFT }}>
                                {event.schedule[activeDay].hours}
                            </p>
                            <div className="space-y-4">
                                {event.schedule[activeDay].sessions.map((s, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="text-xs font-bold w-16 flex-shrink-0 pt-0.5" style={{ color: PLUM }}>
                                            {s.time}
                                        </span>
                                        <div className="flex-1 pb-4 border-b last:border-0 last:pb-0" style={{ borderColor: '#F1EDEE' }}>
                                            <p className="text-sm font-medium" style={{ color: INK }}>{s.session}</p>
                                            {s.speaker && (
                                                <p className="text-xs mt-0.5" style={{ color: INK_SOFT }}>{s.speaker}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* 4. WHAT YOU'LL LEARN */}
                {/* ------------------------------------------------------------- */}
                <section className="py-14 sm:py-20 px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xs font-bold tracking-[0.15em] mb-3" style={{ color: PLUM }}>WHAT YOU&apos;LL LEARN</p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: PLUM_DARK }}>
                            Skills you&apos;ll walk away with
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {event.whatYoullLearn.map((point, i) => (
                                <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-gray-100">
                                    <CheckCircle2 size={19} className="flex-shrink-0 mt-0.5" style={{ color: PLUM }} />
                                    <p className="text-sm leading-relaxed" style={{ color: INK }}>{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* 5. WHO SHOULD ATTEND */}
                {/* ------------------------------------------------------------- */}
                <section className="py-14 sm:py-20 px-6 lg:px-12" style={{ backgroundColor: PLUM_TINT }}>
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-start gap-4 bg-white rounded-[1.5rem] p-7">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: PLUM_TINT, color: PLUM }}>
                                <Users size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-[0.15em] mb-2" style={{ color: PLUM }}>WHO SHOULD ATTEND</p>
                                <p className="text-sm sm:text-base leading-relaxed" style={{ color: INK }}>{event.whoShouldAttend}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* 6. THINGS TO KNOW BEFORE YOU COME */}
                {/* ------------------------------------------------------------- */}
                <section className="py-14 sm:py-20 px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xs font-bold tracking-[0.15em] mb-3" style={{ color: PLUM }}>THINGS TO KNOW BEFORE YOU COME</p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: PLUM_DARK }}>
                            Come prepared
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {checklist.map((item, i) => {
                                const icons = [Laptop, Wrench, IdCard, Timer, Award, Utensils]
                                const Icon = icons[i % icons.length]
                                return (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: PLUM_TINT, color: PLUM }}>
                                            <Icon size={16} />
                                        </div>
                                        <p className="text-sm leading-relaxed pt-1.5" style={{ color: INK }}>{item}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* 7. VENUE & TIMING */}
                {/* ------------------------------------------------------------- */}
                <section className="py-14 sm:py-20 px-6 lg:px-12" style={{ backgroundColor: PLUM_TINT }}>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xs font-bold tracking-[0.15em] mb-3" style={{ color: PLUM }}>VENUE & TIMING</p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: PLUM_DARK }}>
                            {event.venue}
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white rounded-2xl p-5">
                                <p className="text-xs font-semibold mb-1" style={{ color: INK_SOFT }}>Address</p>
                                <p className="text-sm font-medium" style={{ color: INK }}>{event.address}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-5">
                                <p className="text-xs font-semibold mb-1" style={{ color: INK_SOFT }}>Timing</p>
                                <p className="text-sm font-medium" style={{ color: INK }}>{event.timing}</p>
                            </div>
                        </div>

                        {/* Google Maps embed — generated from the venue/address; content
                team to confirm exact venue name once finalized. */}
                        <div className="rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-sm mb-4" style={{ height: 320 }}>
                            <iframe
                                title={`Map to ${event.venue}`}
                                src={mapEmbedSrc}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        <a
                            href={event.mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer"
                            style={{ color: PLUM }}
                        >
                            <MapPin size={15} /> Get Directions
                        </a>
                    </div>
                </section>



                {/* ------------------------------------------------------------- */}
                {/* 9. FAQ */}
                {/* ------------------------------------------------------------- */}
                {event.faqs.length > 0 && (
                    <section className="py-14 sm:py-20 px-6 lg:px-12">
                        <div className="max-w-2xl mx-auto">
                            <p className="text-xs font-bold tracking-[0.15em] mb-3 text-center" style={{ color: PLUM }}>FAQ</p>
                            <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 text-center" style={{ color: PLUM_DARK }}>
                                Good to know
                            </h2>
                            <div className="bg-white rounded-[1.5rem] px-6 sm:px-7 border border-gray-100">
                                {event.faqs.map((f, i) => (
                                    <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* spacer so sticky mobile bar never covers footer content */}
                <div className="h-20 sm:hidden" />
            </main>

            {/* ------------------------------------------------------------- */}
            {/* Sticky mobile Register Now bar — opens the popup directly       */}
            {/* ------------------------------------------------------------- */}
            <div
                className="fixed bottom-0 left-0 right-0 z-40 sm:hidden px-4 py-3 border-t"
                style={{ backgroundColor: '#fff', borderColor: '#EDE4EF' }}
            >
                <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm text-white cursor-pointer"
                    style={{ backgroundColor: PLUM }}
                >
                    Register Now <ArrowRight size={16} />
                </button>
            </div>

            <RegistrationModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                eventSlug={event.slug}
                eventTitle={event.title}
                tag={event.tag}
                accent={PLUM}
                accentDark={PLUM_DARK}
            />

            <RiseLabFooter />
        </>
    )
}