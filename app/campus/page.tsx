'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileText,
  Gamepad2,
  Globe,
  Laptop,
  Lightbulb,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  Send,
  Smartphone,
  Target,
  Terminal,
  Users,
  X,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const GOLD = '#f5d082'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
interface TechTrack {
  id: string
  name: string
  icon: typeof Code2
  tagline: string
  topics: string[]
  outcome: string
  duration: string
}

const techTracks: TechTrack[] = [
  {
    id: 'python',
    name: 'Python',
    icon: Terminal,
    tagline: 'The ideal first language, and the one industry keeps hiring for.',
    topics: ['Core syntax & logic', 'OOP', 'File & data handling', 'Automation scripts', 'APIs', 'Mini projects'],
    outcome: 'Students build working automation tools and a data-driven capstone.',
    duration: '4 to 8 weeks',
  },
  {
    id: 'java',
    name: 'Java',
    icon: Code2,
    tagline: 'Strong object-oriented foundations for enterprise-grade careers.',
    topics: ['Core Java', 'OOP principles', 'Collections', 'Exception handling', 'JDBC & databases', 'Project build'],
    outcome: 'Students ship a database-backed Java application end to end.',
    duration: '6 to 10 weeks',
  },
  {
    id: 'cpp',
    name: 'C & C++',
    icon: Cpu,
    tagline: 'Programming fundamentals that make every other language easier.',
    topics: ['Programming logic', 'Pointers & memory', 'Functions & recursion', 'STL basics', 'DSA foundations'],
    outcome: 'Students gain the problem-solving base that technical interviews test.',
    duration: '6 to 8 weeks',
  },
  {
    id: 'web',
    name: 'Web Development',
    icon: Globe,
    tagline: 'From a blank file to a deployed, live website.',
    topics: ['HTML, CSS, JavaScript', 'React', 'Next.js', 'APIs & backends', 'Git & deployment'],
    outcome: 'Every student publishes a real, live project online.',
    duration: '8 to 12 weeks',
  },
  {
    id: 'mobile',
    name: 'Mobile Apps',
    icon: Smartphone,
    tagline: 'Cross-platform app development with Flutter.',
    topics: ['Dart & Flutter', 'UI design systems', 'State management', 'REST APIs', 'App publishing'],
    outcome: 'Students build and demo a complete mobile application.',
    duration: '8 to 12 weeks',
  },
  {
    id: 'dsa',
    name: 'DSA & Problem Solving',
    icon: BarChart3,
    tagline: 'Placement-grade problem solving, taught through patterns.',
    topics: ['Arrays & strings', 'Linked lists', 'Trees & graphs', 'Recursion & DP', 'Interview patterns'],
    outcome: 'Students solve interview-style problems with structure and confidence.',
    duration: '8 to 12 weeks',
  },
  {
    id: 'ai',
    name: 'AI & Data',
    icon: Database,
    tagline: 'Practical AI and data skills, not just theory.',
    topics: ['Data analysis', 'ML fundamentals', 'Model basics', 'AI tooling', 'Applied mini projects'],
    outcome: 'Students apply ML concepts to a real dataset and present findings.',
    duration: '6 to 10 weeks',
  },
  {
    id: 'cloud',
    name: 'Cloud & Linux',
    icon: Cloud,
    tagline: 'The infrastructure skills behind every modern product.',
    topics: ['Linux administration', 'Shell scripting', 'Cloud fundamentals', 'Deployment pipelines'],
    outcome: 'Students deploy and manage a working service in the cloud.',
    duration: '6 to 8 weeks',
  },
  {
    id: 'game',
    name: 'Game Development',
    icon: Gamepad2,
    tagline: 'Creative engineering with Unity.',
    topics: ['Unity editor', 'C# scripting', 'Game loop & physics', 'Level design', 'Publishing'],
    outcome: 'Students ship a small playable game.',
    duration: '6 to 10 weeks',
  },
]

interface SoftSkill {
  icon: typeof Mic
  title: string
  desc: string
}

const softSkills: SoftSkill[] = [
  { icon: Mic, title: 'Communication', desc: 'Speak clearly and write professionally in any room, interview, or inbox.' },
  { icon: MessageSquare, title: 'Presentation Skills', desc: 'Structure ideas and deliver them with confidence, from a classroom to a boardroom.' },
  { icon: FileText, title: 'Resume & Profile Building', desc: 'Craft a resume, portfolio, and professional profile that earns interviews.' },
  { icon: Briefcase, title: 'Interview Readiness', desc: 'Mock interviews, group discussions, and feedback until it feels natural.' },
  { icon: Users, title: 'Teamwork & Collaboration', desc: 'Learn to build with others, resolve conflict, and deliver as a unit.' },
  { icon: Clock, title: 'Time & Priority Management', desc: 'Plan, prioritise, and meet deadlines like a working professional.' },
  { icon: Lightbulb, title: 'Critical Thinking', desc: 'Break down unfamiliar problems and reason toward practical solutions.' },
  { icon: Target, title: 'Leadership & Ownership', desc: 'Take initiative, own outcomes, and lead small teams with accountability.' },
]

const phases = [
  { step: '01', label: 'Learn', desc: 'Concept-first sessions that build real understanding, not memorisation.' },
  { step: '02', label: 'Research', desc: 'Students investigate problems, compare approaches, and form their own judgement.' },
  { step: '03', label: 'Build', desc: 'Every module ends with something working: code, a project, a demo.' },
  { step: '04', label: 'Solve', desc: 'Capstones address real problems, tested and presented to a panel.' },
]

const engagementModels = [
  {
    icon: Building2,
    title: 'On-Campus',
    desc: 'Our trainers come to your campus and teach in your labs and classrooms, scheduled around your timetable.',
  },
  {
    icon: Laptop,
    title: 'Live Online',
    desc: 'Interactive live sessions with recordings, assignments, and mentor support for geographically spread batches.',
  },
  {
    icon: Calendar,
    title: 'Hybrid',
    desc: 'Intensive on-campus sessions combined with guided online practice, with the best reach and the lowest disruption.',
  },
]

const formats = [
  { name: 'Workshops', range: '1 to 3 days', note: 'Focused skill sprints and awareness sessions' },
  { name: 'Certification Programs', range: '4 to 8 weeks', note: 'Structured tracks with assessments and certificates' },
  { name: 'Semester Integration', range: '12 to 16 weeks', note: 'Embedded into your academic calendar' },
]

const deliverables = [
  'Customised curriculum mapped to your students and departments',
  'Hands-on projects, not slide-only sessions',
  'Regular assessments with student-wise progress reports',
  'Completion certificates for every participating student',
  'Capstone project showcase with a review panel',
  'Placement-readiness support: resumes, mock interviews, GDs',
  'Optional access to RISE Labs research and prototyping',
  'A single point of contact for your institution',
]

const processSteps = [
  { n: '01', title: 'Enquire', desc: 'Share your institution details and goals through the form below.' },
  { n: '02', title: 'Discovery Call', desc: 'We understand your students, departments, and constraints.' },
  { n: '03', title: 'Custom Proposal', desc: 'You receive a tailored program plan, timeline, and format.' },
  { n: '04', title: 'Launch', desc: 'Batches are formed, schedules fixed, and training begins.' },
  { n: '05', title: 'Review & Report', desc: 'Progress reports and outcomes shared with your leadership.' },
]

const faqs = [
  {
    q: 'Do you work with all departments, or only computer science?',
    a: 'Both. Technical tracks suit CS, IT, ECE, and allied departments, while soft skills programs are valuable for every department. We scope each program to the group it serves.',
  },
  {
    q: 'Can the curriculum be customised for our college?',
    a: 'Yes. Every program is designed after a discovery conversation, covering your students\' current level, your academic calendar, and your placement goals.',
  },
  {
    q: 'How large can a batch be?',
    a: 'We recommend batch sizes that keep sessions interactive and hands-on. For larger cohorts, we split into parallel batches so quality does not drop.',
  },
  {
    q: 'Will students receive certificates?',
    a: 'Yes. Students who complete a program receive a completion certificate, and capstone work can be showcased as part of their portfolio.',
  },
  {
    q: 'Do you help with placement preparation?',
    a: 'Our soft skills and problem-solving tracks are built around placement readiness: resumes, mock interviews, group discussions, and technical interview patterns.',
  },
  {
    q: 'How do we get started?',
    a: 'Fill in the enquiry form on this page. Our team will reach out to schedule a discovery call and prepare a proposal for your institution.',
  },
]

const institutionTypes = [
  'Engineering College',
  'Arts & Science College',
  'Polytechnic',
  'University',
  'School (Senior Secondary)',
  'Other',
]

const designations = ['Principal', 'Director', 'Dean', 'HOD', 'Placement Officer', 'Trustee / Management', 'Other']

const programInterests = [
  'Python',
  'Java',
  'C & C++',
  'Web Development',
  'Mobile Apps',
  'DSA & Problem Solving',
  'AI & Data',
  'Cloud & Linux',
  'Game Development',
  'Soft Skills',
  'Placement Readiness',
]

// ---------------------------------------------------------------------------
// Small reusable pieces
// ---------------------------------------------------------------------------
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-block font-mono text-xs tracking-[0.3em] uppercase mb-6 ${dark ? 'text-[#f5d082]' : 'text-neutral-400'
        }`}
    >
      {children}
    </span>
  )
}

function scrollToEnquiry() {
  document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' })
}

// ---------------------------------------------------------------------------
// Technical tracks explorer: pick a language, see exactly what's taught
// ---------------------------------------------------------------------------
function TrackExplorer() {
  const [activeId, setActiveId] = useState(techTracks[0].id)
  const active = techTracks.find((t) => t.id === activeId) ?? techTracks[0]
  const ActiveIcon = active.icon

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
      {/* Track picker */}
      <div className="lg:col-span-4">
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {techTracks.map((track) => {
            const Icon = track.icon
            const isActive = track.id === activeId
            return (
              <button
                key={track.id}
                onClick={() => setActiveId(track.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 flex-shrink-0 lg:flex-shrink ${isActive
                  ? 'bg-[#f5d082] border-[#f5d082] text-black'
                  : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-[#f5d082]/40 hover:bg-white/[0.06]'
                  }`}
              >
                <Icon size={18} className={isActive ? 'text-black' : 'text-[#f5d082]'} />
                <span className="font-bold text-sm uppercase tracking-wide">{track.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="lg:col-span-8">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full p-8 md:p-12 rounded-[2rem] border border-[#f5d082]/25 bg-white/[0.03] overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#f5d082]/10 blur-[100px]" />

          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-[#f5d082]/10 border border-[#f5d082]/30 flex items-center justify-center mb-6">
              <ActiveIcon size={26} className="text-[#f5d082]" />
            </div>

            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-3 text-white">
              {active.name}
            </h3>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed mb-8 max-w-xl">
              {active.tagline}
            </p>

            <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
              What students learn
            </span>
            <div className="flex flex-wrap gap-2 mb-8">
              {active.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3.5 py-1.5 rounded-full border border-white/15 bg-black/40 text-xs font-mono uppercase tracking-wide text-neutral-200"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
                  Outcome
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed">{active.outcome}</p>
              </div>
              <div>
                <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
                  Typical duration
                </span>
                <p className="text-sm text-[#f5d082] font-bold">{active.duration}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// FAQ accordion
// ---------------------------------------------------------------------------
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-black/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="text-lg md:text-xl font-bold tracking-tight text-black group-hover:text-neutral-600 transition-colors">
          {q}
        </span>
        <ChevronDown
          size={22}
          className={`flex-shrink-0 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-neutral-600 text-base md:text-lg leading-relaxed max-w-3xl">{a}</p>
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Enquiry form: designed for principals / directors / placement heads
// ---------------------------------------------------------------------------
interface FormState {
  institution: string
  institutionType: string
  contactName: string
  designation: string
  email: string
  phone: string
  students: string
  mode: string
  message: string
}

const emptyForm: FormState = {
  institution: '',
  institutionType: '',
  contactName: '',
  designation: '',
  email: '',
  phone: '',
  students: '',
  mode: 'On-Campus',
  message: '',
}

function EnquiryForm() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [interests, setInterests] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const toggleInterest = (item: string) =>
    setInterests((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))

  const [error, setError] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, programsOfInterest: interests, website: honeypot }),
      })
      const result = await res.json()
      if (!res.ok || !result.ok) throw new Error(result.error || 'Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again, or email us at info@techgajana.org.')
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass =
    'w-full h-12 px-4 rounded-xl bg-black/40 border border-white/15 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#f5d082] focus:ring-2 focus:ring-[#f5d082]/20 transition-all'
  const labelClass = 'block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2'

  if (submitted) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-[#f5d082] flex items-center justify-center mx-auto mb-6">
          <Check size={30} className="text-black" strokeWidth={3} />
        </div>
        <h3 className="text-3xl font-black uppercase tracking-tight mb-3 text-white">
          Enquiry received
        </h3>
        <p className="text-neutral-400 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. Our team will contact you shortly to
          schedule a discovery call and understand what your students need.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Institution name *</label>
          <input
            required
            value={form.institution}
            onChange={(e) => update('institution', e.target.value)}
            className={fieldClass}
            placeholder="e.g. Sri Example College of Engineering"
          />
        </div>
        <div>
          <label className={labelClass}>Institution type *</label>
          <select
            required
            value={form.institutionType}
            onChange={(e) => update('institutionType', e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled className="bg-black">
              Select type
            </option>
            {institutionTypes.map((t) => (
              <option key={t} value={t} className="bg-black">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Your name *</label>
          <input
            required
            value={form.contactName}
            onChange={(e) => update('contactName', e.target.value)}
            className={fieldClass}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className={labelClass}>Your designation *</label>
          <select
            required
            value={form.designation}
            onChange={(e) => update('designation', e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled className="bg-black">
              Select designation
            </option>
            {designations.map((d) => (
              <option key={d} value={d} className="bg-black">
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Official email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={fieldClass}
            placeholder="principal@college.edu"
          />
        </div>
        <div>
          <label className={labelClass}>Phone number *</label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={fieldClass}
            placeholder="+91"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Approx. number of students *</label>
          <input
            required
            type="number"
            min={1}
            value={form.students}
            onChange={(e) => update('students', e.target.value)}
            className={fieldClass}
            placeholder="e.g. 250"
          />
        </div>
        <div>
          <label className={labelClass}>Preferred mode</label>
          <select
            value={form.mode}
            onChange={(e) => update('mode', e.target.value)}
            className={`${fieldClass} appearance-none`}
          >
            {['On-Campus', 'Live Online', 'Hybrid', 'Not sure yet'].map((m) => (
              <option key={m} value={m} className="bg-black">
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Programs you're interested in</label>
        <div className="flex flex-wrap gap-2">
          {programInterests.map((item) => {
            const selected = interests.includes(item)
            return (
              <button
                type="button"
                key={item}
                onClick={() => toggleInterest(item)}
                className={`px-4 py-2 rounded-full border text-xs font-mono uppercase tracking-wide transition-all duration-200 ${selected
                  ? 'bg-[#f5d082] border-[#f5d082] text-black font-bold'
                  : 'bg-black/40 border-white/15 text-neutral-300 hover:border-[#f5d082]/50'
                  }`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className={labelClass}>Anything we should know?</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#f5d082] focus:ring-2 focus:ring-[#f5d082]/20 transition-all resize-none"
          placeholder="Your goals, timeline, or specific challenges with student skill levels..."
        />
      </div>

      {/* Honeypot: hidden from real users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 h-14 px-10 rounded-full bg-[#f5d082] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300 disabled:opacity-60"
      >
        {submitting ? 'Sending...' : 'Request a Discovery Call'}
        <Send size={16} className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Enquiry modal: opens from the "Partner With Us" button
// ---------------------------------------------------------------------------
function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Partner with Campus Forge"
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <div className="relative min-h-full flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl p-6 sm:p-8 md:p-12 rounded-[2rem] border border-[#f5d082]/25 bg-[#0a0a0a] text-white shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#f5d082]/10 blur-[100px]" />

              <button
                onClick={onClose}
                aria-label="Close form"
                className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:border-[#f5d082] hover:text-[#f5d082] transition-colors"
              >
                <X size={18} />
              </button>

              <div className="relative">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10 pr-12">
                  <ClipboardCheck size={20} className="text-[#f5d082]" />
                  <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
                    Institutional enquiry form
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-3">
                  Partner with <span className="text-[#f5d082]">Campus Forge.</span>
                </h2>
                <p className="text-neutral-400 leading-relaxed mb-8 max-w-xl">
                  Tell us about your institution and we'll set up a discovery call.
                </p>

                <EnquiryForm />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function CampusForgePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const totalTopics = techTracks.reduce((sum, t) => sum + t.topics.length, 0)

  return (
    <>
      <Navbar />

      <main className="bg-[#0a0a0a] text-white selection:bg-[#f5d082] selection:text-black">
        {/* 1. HERO */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-12 border-b border-white/10"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-[#f5d082]/10 rounded-full blur-[160px] pointer-events-none" />

          <motion.div
            style={{ y: heroY }}
            className="relative z-10 max-w-[1600px] mx-auto w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}

            >

            </motion.div>

            <div className="uppercase font-black tracking-tighter leading-[0.88] text-[13vw] md:text-[9vw] lg:text-[8rem] mb-10">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Campus
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#f5d082]"
                >
                  Forge.
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="grid lg:grid-cols-12 gap-8 items-end"
            >
              <p className="lg:col-span-7 text-lg md:text-2xl text-neutral-400 font-medium leading-relaxed">
                Technical and soft skills training that turns your students
                into industry-ready graduates, delivered by working
                engineers, on your campus or online, shaped around your
                institution's goals.
              </p>
              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-[#f5d082] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
                >
                  Partner With Us
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#programs"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:border-[#f5d082] hover:text-[#f5d082] transition-colors duration-300"
                >
                  Explore Programs
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. AT-A-GLANCE STRIP */}
        <section className="border-b border-white/10 bg-[#050505]">
          <div className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: `${techTracks.length}`, label: 'Technical tracks' },
              { value: `${totalTopics}+`, label: 'Topics covered' },
              { value: `${softSkills.length}`, label: 'Soft skill modules' },
              { value: '1', label: 'Capstone per student' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="p-8 md:p-12 border-r border-b lg:border-b-0 border-white/10 last:border-r-0">
                  <div className="text-5xl md:text-6xl font-black tracking-tighter text-[#f5d082] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-mono uppercase tracking-widest text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 3. THE PROBLEM / POSITIONING (light section) */}
        <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-white text-black border-b border-black/10">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <Reveal className="lg:col-span-8">
              <Eyebrow dark={false}>the gap we close</Eyebrow>
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] uppercase">
                Degrees open the door.{' '}
                <span className="text-neutral-300">Skills decide who walks through it.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-4 border-l-2 border-black pl-8 flex flex-col gap-6 text-lg md:text-xl text-neutral-600 leading-relaxed font-medium pt-2">
              <p>
                Students graduate with strong theory and limited exposure to
                what employers actually test: working code, clear
                communication, and the confidence to solve unfamiliar
                problems.
              </p>
              <p className="text-black font-black uppercase tracking-widest text-sm">
                Campus Forge is built to close that gap, inside your academic calendar.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4. TECHNICAL TRACKS */}
        <section id="programs" className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-[#0a0a0a] border-b border-white/10 overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5d082]/5 rounded-full blur-[180px]" />
          <div className="max-w-[1600px] mx-auto relative">
            <Reveal className="mb-14 md:mb-20">
              <Eyebrow>technical skills</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                Languages & <br className="sm:hidden" />tools.
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
                Pick a track to see exactly what your students will learn,
                what they'll build, and how long it takes.
              </p>
            </Reveal>

            <TrackExplorer />
          </div>
        </section>

        {/* 5. SOFT SKILLS (light section) */}
        <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-white text-black border-b border-black/10">
          <div className="max-w-[1600px] mx-auto">
            <Reveal className="mb-14 md:mb-20">
              <Eyebrow dark={false}>soft skills</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                The skills <br className="sm:hidden" />
                <span className="text-neutral-300">no syllabus covers.</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl font-medium leading-relaxed">
                Technical ability gets students shortlisted. These skills
                get them hired, and promoted.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/10">
              {softSkills.map((skill, i) => {
                const Icon = skill.icon
                return (
                  <Reveal key={skill.title} delay={(i % 4) * 0.08}>
                    <div className="group h-full p-8 border-r border-b border-black/10 hover:bg-black transition-colors duration-500 min-h-[260px] flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-black group-hover:bg-[#f5d082] flex items-center justify-center mb-8 transition-colors duration-500">
                        <Icon size={20} className="text-[#f5d082] group-hover:text-black transition-colors duration-500" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-3 group-hover:text-white transition-colors duration-500">
                        {skill.title}
                      </h3>
                      <p className="text-neutral-500 group-hover:text-neutral-300 leading-relaxed transition-colors duration-500">
                        {skill.desc}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6. THE METHOD: LEARN → RESEARCH → BUILD → SOLVE */}
        <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-black border-b border-white/10">
          <div className="max-w-[1600px] mx-auto">
            <Reveal className="mb-14 md:mb-20 max-w-3xl">
              <Eyebrow>how students learn</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Learn. Research. <br />
                <span className="text-[#f5d082]">Build. Solve.</span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {phases.map((phase, i) => (
                <Reveal key={phase.step} delay={i * 0.1}>
                  <div className="relative h-full p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#f5d082]/40 transition-colors duration-500">
                    <span className="font-mono text-xs text-[#f5d082]/60">{phase.step}</span>
                    <h3 className="text-3xl font-black uppercase tracking-tight mt-4 mb-3">
                      {phase.label}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">{phase.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FORMATS & DELIVERY MODELS */}
        <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-[#0a0a0a] border-b border-white/10">
          <div className="max-w-[1600px] mx-auto">
            <Reveal className="mb-14 md:mb-20 max-w-3xl">
              <Eyebrow>flexible by design</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Fits your calendar, <br className="hidden md:block" />
                <span className="text-neutral-500">not the other way round.</span>
              </h2>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-4 mb-4">
              {engagementModels.map((model, i) => {
                const Icon = model.icon
                return (
                  <Reveal key={model.title} delay={i * 0.1}>
                    <div className="group h-full p-8 md:p-10 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:border-[#f5d082]/40 hover:bg-white/[0.04] transition-all duration-500">
                      <div className="w-14 h-14 rounded-2xl bg-[#f5d082]/10 border border-[#f5d082]/30 group-hover:bg-[#f5d082] flex items-center justify-center mb-8 transition-colors duration-500">
                        <Icon size={24} className="text-[#f5d082] group-hover:text-black transition-colors duration-500" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">
                        {model.title}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">{model.desc}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {formats.map((fmt, i) => (
                <Reveal key={fmt.name} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl border border-white/10 bg-black">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#f5d082]">
                      {fmt.range}
                    </span>
                    <h4 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">
                      {fmt.name}
                    </h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">{fmt.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 8. WHAT YOUR INSTITUTION GETS (light section) */}
        <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-white text-black border-b border-black/10">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24">
            <Reveal className="lg:col-span-5">
              <Eyebrow dark={false}>for your institution</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                What you <br />receive.
              </h2>
              <p className="text-lg text-neutral-600 font-medium leading-relaxed max-w-sm">
                A complete, accountable program, not just a set of
                lectures.
              </p>
            </Reveal>

            <div className="lg:col-span-7 border-t border-black/10">
              {deliverables.map((item, i) => (
                <Reveal key={item} delay={i * 0.05}>
                  <div className="flex items-start gap-5 py-5 md:py-6 border-b border-black/10">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={15} className="text-[#f5d082]" strokeWidth={3} />
                    </div>
                    <p className="text-lg md:text-xl font-bold tracking-tight leading-snug">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 9. PROCESS */}
        <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-[#050505] border-b border-white/10">
          <div className="max-w-[1600px] mx-auto">
            <Reveal className="mb-14 md:mb-20 max-w-3xl">
              <Eyebrow>working with us</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                From first call <br />
                <span className="text-[#f5d082]">to first batch.</span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-5 gap-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.08}>
                  <div className="relative h-full p-6 md:p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <span className="font-mono text-xs text-[#f5d082]">{step.n}</span>
                    <h3 className="text-xl font-black uppercase tracking-tight mt-4 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FAQ (light section) */}
        <section className="py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-white text-black border-b border-black/10">
          <div className="max-w-[1100px] mx-auto">
            <Reveal className="mb-12 md:mb-16">
              <Eyebrow dark={false}>questions, answered</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Before you <br className="sm:hidden" />reach out.
              </h2>
            </Reveal>

            <div className="border-t border-black/10">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={faq.q}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 11. ENQUIRY */}
        <section
          id="enquire"
          className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-12 bg-black overflow-hidden"
        >
          <div className="pointer-events-none absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#f5d082]/8 rounded-full blur-[180px]" />

          <div className="relative max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
              <Eyebrow>start the conversation</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                Bring Campus Forge <br />
                <span className="text-[#f5d082]">to your college.</span>
              </h2>
              <p className="text-lg text-neutral-400 font-medium leading-relaxed mb-10 max-w-md">
                Tell us about your institution and your students. We'll come
                back with a discovery call and a program plan shaped around
                your goals.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:info@techgajana.org"
                  className="flex items-center gap-4 text-neutral-300 hover:text-[#f5d082] transition-colors group"
                >
                  <span className="w-11 h-11 rounded-full border border-white/15 group-hover:border-[#f5d082] flex items-center justify-center">
                    <Mail size={17} />
                  </span>
                  <span className="font-medium">info@techgajana.org</span>
                </a>
                <a
                  href="tel:+916382619604"
                  className="flex items-center gap-4 text-neutral-300 hover:text-[#f5d082] transition-colors group"
                >
                  <span className="w-11 h-11 rounded-full border border-white/15 group-hover:border-[#f5d082] flex items-center justify-center">
                    <Phone size={17} />
                  </span>
                  <span className="font-medium">+91 6382619604</span>
                </a>
                <div className="flex items-center gap-4 text-neutral-500">
                  <span className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center">
                    <Award size={17} />
                  </span>
                  <span className="font-medium text-sm">
                    TECHGAJANA PRIVATE LIMITED
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="p-6 sm:p-8 md:p-12 rounded-[2rem] border border-[#f5d082]/25 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                  <ClipboardCheck size={20} className="text-[#f5d082]" />
                  <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">
                    Institutional enquiry form
                  </span>
                </div>
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  )
}