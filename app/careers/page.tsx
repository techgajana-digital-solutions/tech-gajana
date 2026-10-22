'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  Clock,
  Code2,
  Cpu,
  Database,
  Gamepad2,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

// ---------------------------------------------------------------------------
// Config: edit these in one place
// ---------------------------------------------------------------------------
const COMPANY = 'TECHGAJANA'
const APPLY_EMAIL = 'techgajana@gmail.com'
const LOCATION = 'Villiyanur, Puducherry'
const DEADLINE_LABEL = 'Nov 05, 2026'
const DEADLINE = new Date('2026-11-05T23:59:59')

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
interface TrainerDomain {
  id: string
  name: string
  icon: typeof Code2
  skills: string
}

interface Job {
  id: string
  title: string
  icon: typeof Code2
  type: string
  experienceShort: string
  experience: string
  location: string
  about: string
  responsibilities: string[]
  requirements: string[]
  nice?: string
  domains?: TrainerDomain[]
}

const trainerDomains: TrainerDomain[] = [
  {
    id: 'game',
    name: 'Game Development',
    icon: Gamepad2,
    skills: 'Unity or Unreal Engine, C# or C++, game design, 2D/3D concepts',
  },
  {
    id: 'robotics',
    name: 'Robotics and Automation',
    icon: Cpu,
    skills: 'Arduino, Raspberry Pi, sensors, IoT, PLC basics, embedded C',
  },
  {
    id: 'ai',
    name: 'AI, Data Science and ML',
    icon: Database,
    skills:
      'Python, NumPy, Pandas, Scikit-learn, TensorFlow or PyTorch, data visualization, model deployment',
  },
  {
    id: 'cyber',
    name: 'Cyber Security',
    icon: ShieldCheck,
    skills:
      'Network security, ethical hacking, penetration testing, Kali Linux, security tools and frameworks',
  },
  {
    id: 'java',
    name: 'Java Developer (Full Stack)',
    icon: Code2,
    skills: 'Core and advanced Java, Spring Boot, Hibernate, SQL, REST APIs, front-end basics',
  },
  {
    id: 'sap',
    name: 'SAP',
    icon: Layers,
    skills:
      'Hands-on knowledge of any SAP module (ABAP, FICO, MM, SD, HANA, etc.), with real-time project exposure',
  },
]

const jobs: Job[] = [
  {
    id: 'mobile',
    title: 'Mobile App Developer',
    icon: Smartphone,
    type: 'Full-time',
    experienceShort: '1-3 yrs',
    experience: '1-3 years (freshers with strong projects can apply)',
    location: LOCATION,
    about:
      'Build and maintain high-quality mobile apps for our clients and internal projects.',
    responsibilities: [
      'Develop Android/iOS apps using Flutter, React Native, or native technologies',
      'Convert UI/UX designs into functional apps',
      'Integrate REST APIs, databases, and third-party services',
      'Test, debug, and optimize app performance',
      'Publish and maintain apps on Play Store and App Store',
      'Work with designers and backend developers to deliver on time',
    ],
    requirements: [
      'Bachelor\'s degree in CS, IT, or a related field',
      'Hands-on experience in Flutter, React Native, Kotlin, or Swift',
      'Knowledge of API integration, Firebase, and Git',
      'Understanding of app publishing and version control',
      'Good problem-solving skills',
    ],
    nice: 'Portfolio of published apps, backend knowledge (Node.js or similar)',
  },
  {
    id: 'bdm',
    title: 'Business Development Manager',
    icon: TrendingUp,
    type: 'Full-time (field and office)',
    experienceShort: '2-5 yrs',
    experience: '2-5 years',
    location: LOCATION,
    about:
      'Grow our client base by promoting our software, campus training, and research guidance services.',
    responsibilities: [
      'Identify and approach colleges, schools, startups, and businesses',
      'Meet decision-makers and present tailored proposals',
      'Prepare quotations, negotiate, and close deals',
      'Coordinate MoUs and hand over clients to the delivery team',
      'Maintain client relationships for renewals and repeat business',
      'Organize seminars, demos, and workshops',
      'Track leads in a CRM and report against monthly targets',
    ],
    requirements: [
      'Bachelor\'s or MBA in any discipline',
      'Proven experience in sales or business development (education or IT services preferred)',
      'Excellent communication, presentation, and negotiation skills',
      'Willingness to travel for client visits',
      'Basic understanding of software and training services',
    ],
  },
  {
    id: 'trainer',
    title: 'Trainers',
    icon: GraduationCap,
    type: 'Full-time / Part-time / Freelance',
    experienceShort: '1-5 yrs',
    experience:
      '1-5 years in industry or training (freshers with strong skills and teaching ability may apply)',
    location: `${LOCATION} and partner campuses`,
    about:
      'Deliver high-quality, hands-on training in our private batches and in our on-campus programs at colleges and schools. Trainers are needed across six domains.',
    responsibilities: [
      'Conduct classroom, lab, and online sessions for private batches and campus programs',
      'Prepare and update course content, lesson plans, assignments, and practical labs',
      'Guide students through projects, assessments, and certification preparation',
      'Travel to partner colleges and schools to deliver on-campus training',
      'Evaluate student performance and share progress reports',
      'Mentor students for internships, placements, and industry readiness',
      'Keep up with current tools, technologies, and industry trends',
    ],
    requirements: [
      'Bachelor\'s or Master\'s degree in a relevant field',
      'Strong subject knowledge with practical, project-based experience',
      'Prior teaching or training experience preferred',
      'Excellent communication and presentation skills',
      'Industry certifications are an added advantage',
      'Willingness to travel for campus programs',
    ],
    domains: trainerDomains,
  },
]

const offers = [
  {
    icon: Wallet,
    title: 'Skill advancement support',
    desc: 'Sponsored certifications and professional development resources.',
  },
  {
    icon: MapPin,
    title: 'Performance-linked bonuses',
    desc: 'Awarded for achieving milestones and high student satisfaction.',
  },
  {
    icon: TrendingUp,
    title: 'Training & growth',
    desc: 'Room to learn new tools and grow into bigger roles.',
  },
  {
    icon: Users,
    title: 'A supportive team',
    desc: 'A small team where your work is seen and your voice counts.',
  },
]

const whatWeDo = [
  'Software & automation solutions',
  'Campus training: technical, design & soft skills',
  'Research & publication guidance',
]

const applySteps = [
  { n: '01', title: 'Send your resume', desc: `Email it to ${APPLY_EMAIL} with the role in the subject line.` },
  { n: '02', title: 'Get shortlisted', desc: 'Our team reviews every application.' },
  { n: '03', title: 'Interview', desc: 'Shortlisted candidates are contacted for an interview.' },
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
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
      className={`inline-block font-mono text-xs tracking-[0.3em] uppercase mb-6 ${
        dark ? 'text-[#f5d082]' : 'text-neutral-400'
      }`}
    >
      {children}
    </span>
  )
}

function BulletList({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              light ? 'bg-black' : 'bg-[#f5d082]/15 border border-[#f5d082]/30'
            }`}
          >
            <Check size={11} className="text-[#f5d082]" strokeWidth={3} />
          </span>
          <span className={`leading-relaxed ${light ? 'text-neutral-700' : 'text-neutral-300'}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// Job card: expandable, with a domain picker for the Trainers role
// ---------------------------------------------------------------------------
function JobCard({
  job,
  index,
  isOpen,
  onToggle,
}: {
  job: Job
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = job.icon
  const [domainId, setDomainId] = useState<string | null>(job.domains ? job.domains[0].id : null)
  const activeDomain = job.domains?.find((d) => d.id === domainId) ?? null

  const subject = activeDomain
    ? `Application: ${job.title} (${activeDomain.name})`
    : `Application: ${job.title}`
  const body = [
    `Hello ${COMPANY} team,`,
    '',
    `I would like to apply for the ${job.title} position${activeDomain ? ` in ${activeDomain.name}` : ''}.`,
    '',
    'Name:',
    'Phone:',
    'Years of experience:',
    '',
    'My resume is attached.',
  ].join('\n')
  const applyHref = `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <Reveal delay={index * 0.08}>
      <div
        className={`rounded-[2rem] border transition-colors duration-500 overflow-hidden ${
          isOpen ? 'border-[#f5d082]/40 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02] hover:border-[#f5d082]/25'
        }`}
      >
        {/* Header (always visible, tap to expand) */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 sm:gap-6 p-6 sm:p-8 text-left"
          aria-expanded={isOpen}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-colors duration-500 ${
              isOpen ? 'bg-[#f5d082] border-[#f5d082]' : 'bg-[#f5d082]/10 border-[#f5d082]/30'
            }`}
          >
            <Icon size={24} className={isOpen ? 'text-black' : 'text-[#f5d082]'} />
          </div>

          <div className="flex-1 min-w-0">
            <span className="font-mono text-xs text-[#f5d082]/60 uppercase tracking-widest">
              Opening {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1 text-white">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 rounded-full border border-white/15 bg-black/40 text-[11px] font-mono uppercase tracking-wide text-neutral-300">
                {job.type}
              </span>
              <span className="px-3 py-1 rounded-full border border-white/15 bg-black/40 text-[11px] font-mono uppercase tracking-wide text-neutral-300">
                {job.experienceShort}
              </span>
            </div>
          </div>

          <ChevronDown
            size={26}
            className={`flex-shrink-0 text-[#f5d082] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/10">
                <p className="text-lg md:text-xl text-neutral-300 font-medium leading-relaxed max-w-3xl mt-6 mb-10">
                  {job.about}
                </p>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#f5d082] mb-5">
                      Responsibilities
                    </h4>
                    <BulletList items={job.responsibilities} />
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#f5d082] mb-5">
                      Requirements
                    </h4>
                    <BulletList items={job.requirements} />

                    {job.nice && (
                      <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-black/40">
                        <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
                          Nice to have
                        </span>
                        <p className="text-neutral-300 text-sm leading-relaxed">{job.nice}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trainer domain picker */}
                {job.domains && (
                  <div className="mt-12">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#f5d082] mb-5">
                      Domains we're hiring for
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.domains.map((d) => {
                        const DIcon = d.icon
                        const selected = d.id === domainId
                        return (
                          <button
                            key={d.id}
                            onClick={() => setDomainId(d.id)}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                              selected
                                ? 'bg-[#f5d082] border-[#f5d082] text-black'
                                : 'bg-black/40 border-white/15 text-neutral-300 hover:border-[#f5d082]/50'
                            }`}
                          >
                            <DIcon size={14} />
                            {d.name}
                          </button>
                        )
                      })}
                    </div>

                    {activeDomain && (
                      <motion.div
                        key={activeDomain.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="p-6 rounded-2xl border border-[#f5d082]/25 bg-[#f5d082]/[0.04]"
                      >
                        <span className="block font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
                          Skills we look for: {activeDomain.name}
                        </span>
                        <p className="text-neutral-200 leading-relaxed">{activeDomain.skills}</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Facts + apply */}
                <div className="mt-12 pt-8 border-t border-white/10 grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 grid sm:grid-cols-3 gap-5">
                    <div>
                      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
                        <Briefcase size={12} /> Experience
                      </span>
                      <p className="text-sm text-neutral-200 leading-snug">{job.experience}</p>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
                        <MapPin size={12} /> Location
                      </span>
                      <p className="text-sm text-neutral-200 leading-snug">{job.location}</p>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
                        <Clock size={12} /> Type
                      </span>
                      <p className="text-sm text-neutral-200 leading-snug">{job.type}</p>
                    </div>
                  </div>

                  <div className="md:col-span-4 md:text-right">
                    <a
                      href={applyHref}
                      className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-[#f5d082] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
                    >
                      Apply Now
                      <ArrowUpRight
                        size={18}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function CareersPage() {
  const [openId, setOpenId] = useState<string | null>(jobs[0].id)
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  // Computed on the client only, so server and client HTML never disagree.
  useEffect(() => {
    const diff = Math.ceil((DEADLINE.getTime() - Date.now()) / 86400000)
    setDaysLeft(diff >= 0 ? diff : null)
  }, [])

  const scrollToOpenings = () => {
    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#0a0a0a] text-white selection:bg-[#f5d082] selection:text-black">
        {/* 1. HERO */}
        <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-12 border-b border-white/10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px),)',
              backgroundSize: '56px 56px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#f5d082]/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        
             
           

            <div className="uppercase font-black tracking-tighter leading-[0.88] text-[14vw] md:text-[10vw] lg:text-[9rem] mb-10">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Build with
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#f5d082]"
                >
                  us.
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
                Join our team at {COMPANY}. We deliver software and
                automation solutions, campus training programs, and research
                guidance. Collaborate with us to accelerate sustainable growth.
              </p>
              <div className="lg:col-span-5 flex lg:justify-end">
                <button
                  onClick={scrollToOpenings}
                  className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-[#f5d082] text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
                >
                  View Openings
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. WHAT WE DO */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-white text-black border-b border-black/10">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            <Reveal className="lg:col-span-5">
              <Eyebrow dark={false}>who you'd work with</Eyebrow>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95]">
                A young team, <br />
                <span className="text-neutral-300">still building.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
              {whatWeDo.map((item, i) => (
                <div
                  key={item}
                  className="p-6 rounded-2xl border border-black/10 bg-neutral-50 min-h-[140px] flex flex-col justify-between"
                >
                  <span className="font-mono text-xs text-neutral-400">0{i + 1}</span>
                  <p className="text-lg font-black uppercase tracking-tight leading-tight">{item}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* 3. OPENINGS */}
        <section
          id="openings"
          className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
        >
          <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5d082]/5 rounded-full blur-[180px]" />

          <div className="max-w-[1200px] mx-auto relative">
            <Reveal className="mb-12 md:mb-16">
              <Eyebrow>current openings</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                {jobs.length} roles. <br />
                <span className="text-[#f5d082]">Real work.</span>
              </h2>
            </Reveal>

            <div className="flex flex-col gap-4">
              {jobs.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={i}
                  isOpen={openId === job.id}
                  onToggle={() => setOpenId(openId === job.id ? null : job.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. WHAT WE OFFER */}
        <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-12 bg-white text-black border-b border-black/10">
          <div className="max-w-[1600px] mx-auto">
            <Reveal className="mb-12 md:mb-16">
              <Eyebrow dark={false}>what we offer</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Why join <br />
                <span className="text-neutral-300">{COMPANY}.</span>
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/10">
              {offers.map((offer, i) => {
                const OfferIcon = offer.icon
                return (
                  <Reveal key={offer.title} delay={i * 0.08}>
                    <div className="group h-full p-8 border-r border-b border-black/10 hover:bg-black transition-colors duration-500 min-h-[260px] flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-black group-hover:bg-[#f5d082] flex items-center justify-center mb-8 transition-colors duration-500">
                        <OfferIcon
                          size={20}
                          className="text-[#f5d082] group-hover:text-black transition-colors duration-500"
                        />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-3 group-hover:text-white transition-colors duration-500">
                        {offer.title}
                      </h3>
                      <p className="text-neutral-500 group-hover:text-neutral-300 leading-relaxed transition-colors duration-500">
                        {offer.desc}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* 5. HOW TO APPLY */}
        <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-b border-white/10">
          <div className="max-w-[1600px] mx-auto">
            <Reveal className="mb-12 md:mb-16 max-w-3xl">
              <Eyebrow>how to apply</Eyebrow>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                Three steps. <br />
                <span className="text-[#f5d082]">No forms.</span>
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {applySteps.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.1}>
                  <div className="h-full p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <span className="font-mono text-xs text-[#f5d082]">{step.n}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight mt-4 mb-3">{step.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[#f5d082]/30 bg-[#f5d082]/5">
                <Clock size={16} className="text-[#f5d082]" />
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-200">
                  Last date to apply: <span className="text-[#f5d082] font-bold">{DEADLINE_LABEL}</span>
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. CLOSING CTA */}
        <section className="py-24 md:py-36 px-4 sm:px-6 lg:px-12 bg-white text-black text-center">
          <div className="max-w-[1600px] mx-auto flex flex-col items-center">
            <Reveal>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
                Don't see your role? <br />
                Tell us anyway.
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 font-medium max-w-xl mx-auto mb-10 leading-relaxed">
                Send your resume and a line about what you'd like to build.
                Shortlisted candidates will be contacted for an interview.
              </p>
              <a
                href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application: General')}`}
                className="inline-flex items-center gap-3 h-16 px-10 rounded-full bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-[#f5d082] hover:text-black transition-colors duration-300"
              >
                <Mail size={18} />
                {APPLY_EMAIL}
                <Send size={16} />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}