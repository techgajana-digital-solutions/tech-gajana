'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Calendar, Clock, User, ArrowUpRight, Sparkles, Radio } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

// ---------------------------------------------------------------------------
// Realistic Event Data
// ---------------------------------------------------------------------------
interface EventItem {
  id: string
  title: string
  category: 'Live Workshops' | 'Q&A Sessions' | 'Past Recordings'
  speaker: string
  date: string
  time: string
  status: 'Registration Open' | 'Upcoming' | 'Available on Demand'
  image: string
  featured?: boolean
  targetDate?: string // For countdown simulation (future date)
}

const EVENTS: EventItem[] = [
  {
    id: 'ev_1',
    title: 'Live System Architecture Deep Dive: Scaling AWS Infrastructure to 10M Users',
    category: 'Live Workshops',
    speaker: 'Alex Kumar',
    date: 'August 15, 2026',
    time: '6:00 PM IST',
    status: 'Registration Open',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    targetDate: '2026-08-15T18:00:00',
  },
  {
    id: 'ev_2',
    title: 'Frontend Masterclass: Building Blazingly Fast Next.js Apps with Server Actions',
    category: 'Live Workshops',
    speaker: 'Sarah Johnson',
    date: 'August 22, 2026',
    time: '5:00 PM IST',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    targetDate: '2026-08-22T17:00:00',
  },
  {
    id: 'ev_3',
    title: 'Cybersecurity & OSINT: Practical Threat Hunting and Dark Web Analysis',
    category: 'Q&A Sessions',
    speaker: 'Guest Expert',
    date: 'August 29, 2026',
    time: '7:00 PM IST',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    targetDate: '2026-08-29T19:00:00',
  },
  {
    id: 'ev_4',
    title: 'Founder AMA: Bootstrapping a Cloud Kitchen and Quick-Commerce Strategy',
    category: 'Q&A Sessions',
    speaker: 'Community Leads',
    date: 'September 5, 2026',
    time: '4:00 PM IST',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    targetDate: '2026-09-05T16:00:00',
  },
  {
    id: 'ev_5',
    title: 'Advanced Linux Systems Administration & Automated Cron Workflows',
    category: 'Past Recordings',
    speaker: 'Alex Kumar',
    date: 'July 10, 2026',
    time: 'Recorded',
    status: 'Available on Demand',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
  },
]

const CATEGORIES = ['All', 'Live Workshops', 'Q&A Sessions', 'Past Recordings'] as const

// ---------------------------------------------------------------------------
// Live Countdown Hook & Component
// ---------------------------------------------------------------------------
function useCountdown(targetDateStr?: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (!targetDateStr) return
    const target = new Date(targetDateStr).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDateStr])

  return timeLeft
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate)

  return (
    <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
      <div className="flex flex-col items-center px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
        <span className="font-bold text-white text-base">{String(days).padStart(2, '0')}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Days</span>
      </div>
      <span className="text-white font-bold">:</span>
      <div className="flex flex-col items-center px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
        <span className="font-bold text-white text-base">{String(hours).padStart(2, '0')}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Hours</span>
      </div>
      <span className="text-white font-bold">:</span>
      <div className="flex flex-col items-center px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
        <span className="font-bold text-white text-base">{String(minutes).padStart(2, '0')}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Mins</span>
      </div>
      <span className="text-white font-bold">:</span>
      <div className="flex flex-col items-center px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
        <span className="font-bold text-white text-base">{String(seconds).padStart(2, '0')}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Secs</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 3D Tilt Event Card Component
// ---------------------------------------------------------------------------
function EventCard3D({ event }: { event: EventItem }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isRegistered, setIsRegistered] = useState(false)

  // Motion values for 3D Tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    x.set((e.clientX - rect.left) / width - 0.5)
    y.set((e.clientY - rect.top) / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
      className="group relative [perspective:1200px] h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col h-full rounded-[2rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl overflow-hidden shadow-2xl"
      >
        {/* Cover Image */}
        <div className="relative w-full h-52 overflow-hidden rounded-t-[2rem]">
          <motion.div
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${event.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-mono tracking-wider">
              {event.category}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border ${
              event.status === 'Registration Open' 
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' 
                : 'bg-white/10 border-white/10 text-slate-300'
            }`}>
              {event.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6 sm:p-8 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-4 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <div className="flex flex-col gap-2 mb-6 text-xs text-slate-400 font-mono mt-auto">
            <span className="flex items-center gap-2">
              <User size={14} className="text-emerald-400" /> Speaker: <strong className="text-slate-200">{event.speaker}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-cyan-400" /> {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-indigo-400" /> {event.time}
            </span>
          </div>

          {/* Action Button */}
          <div className="pt-5 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setIsRegistered(!isRegistered)}
              className={`relative inline-flex items-center gap-2 h-11 px-6 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg ${
                isRegistered 
                  ? 'bg-emerald-500 text-slate-950 scale-95 cursor-default' 
                  : 'bg-white text-slate-950 hover:bg-slate-200 hover:scale-105'
              }`}
            >
              <span>{isRegistered ? 'Registered ✓' : (event.status === 'Available on Demand' ? 'Watch Recording' : 'Register Now')}</span>
              {!isRegistered && <ArrowUpRight size={16} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Events Page
// ---------------------------------------------------------------------------
export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All')

  const featuredEvent = EVENTS.find(e => e.featured) || EVENTS[0]

  const filteredEvents = useMemo(() => {
    return EVENTS.filter(e => {
      if (activeCategory === 'All') return true
      return e.category === activeCategory
    })
  }, [activeCategory])

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[#0a0a0a] text-slate-50 pt-32 pb-32 overflow-hidden selection:bg-primary selection:text-[#0a0a0a]">
        
        {/* Soft Glowing Radial Background Orbs */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }} 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
           
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-primary to-cyan-400">Events & Workshops</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Deep-dive architectural sessions, live coding walkthroughs, and Q&A panels hosted by industry veterans.
            </p>
          </motion.div>

          {/* Featured Upcoming Masterclass Hero Card */}
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl overflow-hidden shadow-2xl mb-20 p-8 sm:p-12 lg:p-16"
            >
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
                  style={{ backgroundImage: `url(${featuredEvent.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
              </div>

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider uppercase">
                      Featured Masterclass
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-mono">
                      {featuredEvent.status}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                    {featuredEvent.title}
                  </h2>

                  <div className="flex flex-wrap gap-6 text-sm text-slate-300 font-mono">
                    <span className="flex items-center gap-2">
                      <User size={16} className="text-emerald-400" /> Speaker: <strong className="text-white">{featuredEvent.speaker}</strong>
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-cyan-400" /> {featuredEvent.date}
                    </span>
                  </div>

                  {/* Live Countdown Timer */}
                  {featuredEvent.targetDate && (
                    <div className="pt-2">
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mb-2">Event starts in:</p>
                      <CountdownTimer targetDate={featuredEvent.targetDate} />
                    </div>
                  )}

                  <div className="pt-4">
                    <button className="inline-flex items-center gap-2 bg-white text-slate-950 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-primary transition-colors shadow-lg">
                      <span>Reserve Your Seat</span>
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 hidden lg:flex justify-end">
                  {/* Decorative Spatial UI element */}
                  <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                    <Sparkles className="w-12 h-12 text-emerald-400 mb-4 animate-bounce" />
                    <h4 className="font-bold text-white text-lg mb-2">Interactive Q&A</h4>
                    <p className="text-xs text-slate-400">Direct code reviews and live troubleshooting included with registration.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Interactive Filter Tabs */}
          <div className="flex items-center justify-center overflow-x-auto gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative whitespace-nowrap px-6 py-2.5 text-sm font-medium transition-colors rounded-full z-10 ${
                  activeCategory === cat ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeEventCategory"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <EventCard3D key={event.id} event={event} />
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  )
}