'use client'

import { useRef, useState, useId } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Microscope, Rocket } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ContactModal from '@/components/contact-modal'

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------
const timelineEvents = [
  {
    title: 'Freelancing & Independent Work',
    content: 'TECHGAJANA was founded by Dinesh, who started the journey through freelancing and independent technology work Our journey started small, working remotely and bringing ideas to life with limited resources'
  },
  {
    title: 'A Shared Vision',
    content: 'The vision soon grew beyond one person Adhi Karthik, Murali Karthik, and Krishna Kumar joined as co-founders Together, we continued building everything online—projects, ideas, experiments, and a growing community around technology'
  },
  {
    title: 'February 6, 2026',
    content: 'We opened our first workspace and began a new chapter together, officially becoming TECHGAJANA PRIVATE LIMITED From working virtually to having our own physical workspace, our journey has been a gradual transition from an idea into an organization'
  },
  {
    title: 'Building an Ecosystem',
    content: 'We want TECHGAJANA to evolve into an ecosystem connecting technology, education, business, creativity, research, and everyday life We are still young, we are still building, and we want people to grow with us as we build it'
  }
]

const philosophy = [
  { step: '01', label: 'Learn', desc: 'Learning becomes meaningful when it leads to creation' },
  { step: '02', label: 'Research', desc: 'Research becomes valuable when it can be translated into practical outcomes' },
  { step: '03', label: 'Build', desc: 'Build a feasible solution and test it in the real world.' },
  { step: '04', label: 'Solve', desc: 'Technology becomes powerful when it solves problems that actually matter' },
]

const founders = [
  { name: 'Dinesh', role: 'Founder' ,image:'/dinesh.png'},
  { name: 'Adhi Karthik', role: 'Co-Founder',image:'/adhi.png' },
  { name: 'Murali Karthik', role: 'Co-Founder',image:'/murali.jpeg' },
  { name: 'Krishna Kumar', role: 'Co-Founder' ,image:'/krishna.jpeg'},
]

const coreTeam = [
  { name: 'Vishnuselvam', role: 'Software Developer', image: '/vishnu.jpg' },
  { name: 'Deepak', role: 'Game Developer',image:'/deepak.jpeg' },
  { name: 'Abinaya', role: 'Tutor' },
  { name: 'Seran', role: 'Software Developer / Tutor',image:'/seran.jpeg' },
]

// ---------------------------------------------------------------------------
// AUTO-SCROLLING HORIZONTAL MARQUEE CARDS
// ---------------------------------------------------------------------------
function AutoMarquee({ items, type, direction = -1, speed = 40 }: { items: any[], type: 'founder' | 'core', direction?: number, speed?: number }) {
  const isFounder = type === 'founder'
  const accent = isFounder ? '#f5d082' : '#ffffff'
  const tagText = isFounder ? 'Leadership' : 'Engineering'

  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items]

  return (
    <div className="relative w-full overflow-hidden flex whitespace-nowrap py-4">
      <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 md:gap-6 px-3 w-max"
        animate={{ x: direction === -1 ? [0, "-50%"] : ["-50%", 0] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        {duplicatedItems.map((member, i) => (
          <div 
            key={i} 
            className="relative w-[240px] md:w-[280px] h-[320px] md:h-[380px] shrink-0 bg-[#0f0f0f] border border-white/5 overflow-hidden group hover:border-white/20 transition-colors duration-500 rounded-2xl"
          >
            <div className="absolute top-4 left-4 border border-white/10 bg-black/40 backdrop-blur-md px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-mono uppercase text-white/60 z-20 rounded-md">
              {tagText}
            </div>

           <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] group-hover:scale-105 transition-transform duration-700 z-0">
  {member.image ? (
    <img
      src={member.image}
      alt={member.name}
            className="absolute inset-0 w-full h-full object-cover md:grayscale md:brightness-[0.45] md:contrast-125 md:saturate-0 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:saturate-100 md:group-hover:contrast-100 transition-all duration-700 ease-out"
      draggable="false"
    />
  ) : (
    <>
      <div 
        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: `radial-gradient(circle at center, ${accent}30 0%, transparent 70%)` }}
      />
      <div 
        className="text-[10rem] font-black opacity-[0.03] select-none" 
        style={{ color: accent }}
      >
        {member.name.charAt(0)}
      </div>
    </>
  )}
</div>

            <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20">
              <h3 className="text-lg md:text-xl font-bold text-white tracking-tight truncate">
                {member.name}
              </h3>
              {!isFounder ? (
                <p className="text-[11px] md:text-xs text-neutral-400 mt-1 uppercase tracking-widest font-mono truncate">
                  {member.role}
                </p>
              ) : (
                <div className="h-4" />
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// INTERACTIVE TOGGLE ENGINE
// ---------------------------------------------------------------------------
const engineData = {
  rise: {
    id: 'rise',
    eyebrow: 'Research & Education',
    title: 'RISE Labs',
    desc: 'A space for exploring ideas, conducting research, experimenting with emerging technologies, and developing prototypes.',
    icon: Microscope,
    tags: ['AI', 'Machine Learning', 'Robotics', 'Quantum Tech', 'Blockchain', 'EnviroTech']
  },
  digital: {
    id: 'digital',
    eyebrow: 'Products & Deployment',
    title: 'Digital Solutions',
    desc: 'Engineering usable, scalable solutions for people, businesses, institutions, and communities.',
    icon: Rocket,
    tags: ['Web Apps', 'Mobile', 'AI Systems', 'Automation', 'Enterprise']
  }
}

function EngineSwitchSection() {
  const [activeTab, setActiveTab] = useState<'rise' | 'digital'>('rise')
  const data = engineData[activeTab]
  
  const isRise = activeTab === 'rise'
  const accent = isRise ? '#9038b3' : '#f5d082'
  const toggleTextColor = isRise ? 'text-white' : 'text-black'

  const mWidth = 340
  const mRowHeight = 65 
  const mHeight = data.tags.length * mRowHeight + 20
  const mTrunkX = mWidth / 2

  const dWidth = 1200
  const dHeight = 220 
  const dTrunkX = dWidth / 2
  const dSpread = 950

  return (
    <section 
      className="relative flex flex-col justify-center min-h-[100dvh] py-12 md:py-16 px-4 sm:px-6 border-b border-white/10 overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: isRise ? '#0b0412' : '#050505' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none opacity-80" />
      
      <div className="relative z-10 max-w-[1600px] w-full mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span 
            className="inline-block font-mono text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase transition-colors duration-500"
            style={{ color: accent, textShadow: `0 0 15px ${accent}80` }}
          >
            Two Engines, One Direction
          </span>
        </motion.div>

        <div className="relative flex p-1 mb-8 mx-auto bg-white/[0.03] border border-white/10 rounded-full w-full max-w-[360px] backdrop-blur-xl shadow-2xl">
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full"
            animate={{ 
              left: activeTab === 'rise' ? '4px' : 'calc(50%)',
              backgroundColor: accent,
              boxShadow: `0 0 20px ${accent}60`
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          <button
            onClick={() => setActiveTab('rise')}
            className={`relative z-10 w-1/2 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === 'rise' ? toggleTextColor : 'text-neutral-400 hover:text-white'}`}
          >
            RISE Labs
          </button>
          <button
            onClick={() => setActiveTab('digital')}
            className={`relative z-10 w-1/2 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === 'digital' ? toggleTextColor : 'text-neutral-400 hover:text-white'}`}
          >
            Digital Solutions
          </button>
        </div>

        <div className="w-full relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full flex flex-col items-center"
            >
              <div 
                className="relative w-full max-w-[500px] p-6 md:p-8 rounded-[2rem] border bg-black/50 backdrop-blur-3xl overflow-hidden group transition-all duration-500"
                style={{ borderColor: `${accent}40`, boxShadow: `0 30px 80px ${accent}20` }}
              >
                <div 
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[90px] opacity-40 pointer-events-none transition-opacity duration-700 group-hover:opacity-60"
                  style={{ backgroundColor: accent }}
                />
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none transition-colors duration-500"
                  style={{ background: `linear-gradient(to bottom, ${accent}40, transparent)` }} 
                />
                
                <div className="relative z-10 text-center flex flex-col items-center">
                  <div 
                    className="w-12 h-12 rounded-xl border flex items-center justify-center mb-5 transition-colors duration-500"
                    style={{ backgroundColor: `${accent}20`, borderColor: `${accent}60`, boxShadow: `0 0 30px ${accent}40` }}
                  >
                    <data.icon size={24} style={{ color: isRise ? '#ffffff' : accent }} />
                  </div>
                  <span 
                    className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold transition-colors duration-500"
                    style={{ color: isRise ? '#ffffff' : accent }}
                  >
                    {data.eyebrow}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-2 mb-4 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                    {data.title}
                  </h3>
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-medium">
                    {data.desc}
                  </p>
                </div>
              </div>

              <div className="hidden lg:block relative w-full mt-0" style={{ maxWidth: dWidth, height: dHeight }}>
                <svg viewBox={`0 0 ${dWidth} ${dHeight}`} className="absolute inset-0 w-full h-full overflow-visible" style={{ filter: `drop-shadow(0 0 12px ${accent}80)` }}>
                  <motion.path
                    d={`M ${dTrunkX} 0 L ${dTrunkX} 40`}
                    stroke={accent} strokeWidth="3" fill="none" opacity="0.8"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
                  />
                  {data.tags.map((_, i) => {
                    const t = data.tags.length === 1 ? 0.5 : i / (data.tags.length - 1)
                    const endX = dTrunkX - dSpread / 2 + t * dSpread
                    const endY = 160 
                    const path = `M ${dTrunkX} 40 C ${dTrunkX} 90, ${endX} 80, ${endX} ${endY}`

                    return (
                      <g key={`d-branch-${i}`}>
                        <motion.path
                          id={`d-path-${activeTab}-${i}`} d={path} stroke={accent} strokeWidth="2" fill="none" opacity="0.6"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                        />
                        <motion.circle
                          cx={endX} cy={endY} r="4" fill={isRise ? '#ffffff' : accent}
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }}
                        />
                        <circle r="3" fill="#ffffff" style={{ filter: `drop-shadow(0 0 10px ${accent})` }}>
                          <animateMotion dur={`${2.5 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.2}s`}>
                            <mpath href={`#d-path-${activeTab}-${i}`} />
                          </animateMotion>
                        </circle>
                      </g>
                    )
                  })}
                </svg>

                {data.tags.map((label, i) => {
                  const t = data.tags.length === 1 ? 0.5 : i / (data.tags.length - 1)
                  const endX = dTrunkX - dSpread / 2 + t * dSpread
                  const endY = 160 
                  
                  return (
                    <motion.div
                      key={`d-tag-${label}`}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}
                      className="absolute -translate-x-1/2 whitespace-nowrap z-10"
                      style={{ left: `${(endX / dWidth) * 100}%`, top: `${(endY / dHeight) * 100}%` }}
                    >
                      <div 
                        className="relative overflow-hidden rounded-xl border bg-black/80 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center transition-colors duration-500"
                        style={{ borderColor: `${accent}50` }}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />
                        <span 
                          className="pl-5 pr-4 py-2 text-xs lg:text-[13px] font-mono uppercase tracking-[0.1em] font-bold transition-colors duration-500"
                          style={{ color: isRise ? '#ffffff' : accent }}
                        >
                          {label}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="lg:hidden relative w-full mt-2" style={{ maxWidth: mWidth, height: mHeight }}>
                <svg viewBox={`0 0 ${mWidth} ${mHeight}`} className="absolute inset-0 w-full h-full overflow-visible" style={{ filter: `drop-shadow(0 0 10px ${accent}60)` }}>
                  <motion.path
                    d={`M ${mTrunkX} 0 L ${mTrunkX} 15`}
                    stroke={accent} strokeWidth="3" fill="none" opacity="0.8"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
                  />
                  {data.tags.map((_, i) => {
                    const originY = i === 0 ? 0 : i * mRowHeight
                    const endY = originY + mRowHeight - 10
                    const side = i % 2 === 0 ? -1 : 1
                    const endX = mTrunkX + side * 35 
                    const path = `M ${mTrunkX} ${originY} C ${mTrunkX} ${originY + 25}, ${endX} ${endY - 25}, ${endX} ${endY}`

                    return (
                      <g key={`m-branch-${i}`}>
                        <motion.path
                          id={`m-path-${activeTab}-${i}`} d={path} stroke={accent} strokeWidth="2" fill="none" opacity="0.6"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                        />
                        <motion.circle
                          cx={endX} cy={endY} r="4" fill={isRise ? '#ffffff' : accent}
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }}
                        />
                        <circle r="3" fill="#ffffff" style={{ filter: `drop-shadow(0 0 10px ${accent})` }}>
                          <animateMotion dur={`${2.5 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.2}s`}>
                            <mpath href={`#m-path-${activeTab}-${i}`} />
                          </animateMotion>
                        </circle>
                      </g>
                    )
                  })}
                </svg>

                {data.tags.map((label, i) => {
                  const originY = i === 0 ? 0 : i * mRowHeight
                  const endY = originY + mRowHeight - 10
                  const side = i % 2 === 0 ? -1 : 1
                  const endX = mTrunkX + side * 35

                  return (
                    <motion.div
                      key={`m-tag-${label}`}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + i * 0.1 }}
                      className="absolute -translate-y-1/2 whitespace-nowrap z-10"
                      style={{
                        left: `${(endX / mWidth) * 100}%`, top: `${(endY / mHeight) * 100}%`,
                        transform: `translate(${side === -1 ? '-100%' : '0%'}, -50%)`,
                        marginLeft: side === -1 ? '-8px' : '8px',
                      }}
                    >
                      <div 
                        className="relative overflow-hidden rounded-lg border bg-black/80 backdrop-blur-md shadow-2xl transition-colors duration-500" 
                        style={{ borderColor: `${accent}40` }}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }} />
                        <span 
                          className="block px-3 py-1.5 pl-4 text-[10px] font-mono uppercase tracking-widest font-bold transition-colors duration-500"
                          style={{ color: isRise ? '#ffffff' : accent }}
                        >
                          {label}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------------------------
export default function AboutPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })

  const drawLine = useSpring(timelineProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const lineHeight = useTransform(drawLine, [0, 1], ["0%", "100%"])

  return (
    <>
      <Navbar />

      <main className="bg-[#0a0a0a] text-white selection:bg-[#f5d082] selection:text-black" ref={containerRef}>
        
        {/* 1. THE HOOK */}
        <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-12 border-b border-white/10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#f5d082]/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="relative z-10 max-w-[1600px] mx-auto w-full">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.9] mb-10">
              We are building more <br />
              <span className="text-[#f5d082]">than a technology company</span>
            </h1>

            <div className="grid lg:grid-cols-12 gap-8">
              <p className="lg:col-span-7 text-lg md:text-2xl text-neutral-400 font-medium leading-relaxed">
                TECHGAJANA began with a simple idea: technology should not only create products; it should create possibilities
              </p>
              <p className="lg:col-span-5 text-lg md:text-xl text-white font-bold leading-relaxed border-l-2 border-[#f5d082]/40 pl-6">
                Our incorporation is not the destination It is simply the beginning of a much larger journey
              </p>
            </div>
          </div>
        </section>

        {/* 2. THE TIMELINE */}
        <section className="relative py-32 md:py-48 px-4 sm:px-6 lg:px-12 bg-[#050505] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto relative" ref={timelineRef}>
            <div className="absolute left-[20px] md:left-[50px] top-0 bottom-0 w-[2px] bg-white/10 rounded-full">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#f5d082] rounded-full shadow-[0_0_20px_#f5d082]"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="flex flex-col gap-32 md:gap-48 py-10">
              {timelineEvents.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-[60px] md:pl-[120px] grid lg:grid-cols-12 gap-6 lg:gap-16 items-start group"
                >
                  <div className="absolute left-[13px] md:left-[43px] top-2 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/20 group-hover:border-[#f5d082] group-hover:bg-[#f5d082] transition-colors duration-500 shadow-[0_0_0_#f5d082] group-hover:shadow-[0_0_20px_#f5d082]" />
                  <div className="lg:col-span-5">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                      {item.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-7 pt-1 md:pt-2">
                    <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed font-medium">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. THE PHILOSOPHY */}
        <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white text-black border-b border-black/10 overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85]">
                The <br/> Philosophy
              </h2>
            </div>

            <div className="hidden md:flex flex-col w-full border-t border-black/10">
              {philosophy.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative border-b border-black/10 py-12 md:py-20 flex flex-col lg:flex-row lg:items-center justify-between gap-8 cursor-default overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#050505] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
                  <div className="relative z-10 flex items-center gap-6 md:gap-12 lg:w-1/2 px-4 md:px-8">
                    <h3
                      className="text-[15vw] sm:text-7xl md:text-[7rem] font-black uppercase tracking-tighter leading-none text-transparent transition-all duration-700 group-hover:text-[#f5d082]"
                      style={{ WebkitTextStroke: '2px rgba(0,0,0,0.15)' }}
                    >
                      {p.label}
                    </h3>
                  </div>
                  <div className="relative z-10 lg:w-1/2 lg:pl-12 flex items-center px-4 md:px-8">
                    <p className="text-lg md:text-3xl text-neutral-500 group-hover:text-white font-medium leading-relaxed transition-colors duration-700">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="md:hidden flex flex-col w-full border-t border-black/10">
              {philosophy.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-black/10 py-10"
                >
                  <span className="font-mono text-xs text-neutral-400 mb-3 block">{p.step}</span>
                  <h3 className="inline-block bg-[#f5d082] px-3 py-1 mb-4">
                    <span className="text-5xl xs:text-6xl font-black uppercase tracking-tighter leading-none text-black">
                      {p.label}
                    </span>
                  </h3>
                  <p className="text-lg text-neutral-500 font-medium leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-24 md:mt-40 max-w-5xl mx-auto text-center">
              <p className="text-2xl md:text-4xl text-black font-black uppercase tracking-tight leading-[1.3]">
                We are interested not only in what is technologically possible, but also in what is practical, affordable, sustainable, and scalable
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-12 h-[2px] bg-black/20" />
                <p className="text-lg md:text-2xl text-neutral-500 font-medium">Innovation should work with nature, not against it</p>
                <div className="w-12 h-[2px] bg-black/20" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. TOGGLE ENGINES */}
        <EngineSwitchSection />

        {/* 5. THE ECOSYSTEM / VISION */}
        <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-black border-b border-white/10 overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5d082]/5 rounded-full blur-[180px]" />
          <div className="max-w-[1600px] mx-auto relative">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95]">
                  Not a software company. An ecosystem
                </h2>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-8 text-lg md:text-xl text-neutral-400 leading-relaxed font-medium border-l-2 border-[#f5d082]/30 pl-8">
                <p>
                  We envision a future where technology, education, business, creativity, research, and everyday life are connected through a common platform
                </p>
                <p>
                  Some ideas may begin as experiments Some may become open platforms And some may completely change direction along the way. We are comfortable with that. Because innovation rarely follows a straight line
                </p>
                <p className="text-white font-black uppercase tracking-tight text-2xl md:text-3xl">
                  We are not trying to create something perfect from day one. We are trying to create something meaningful, useful, sustainable, and capable of growing with people
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. THE TEAM - EXTREME PRO: INFINITE MARQUEE CARDS */}
        <section className="relative py-24 md:py-32 bg-[#050505] overflow-hidden border-b border-white/10">
          
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-[0.9]">
                Builders, not <br className="hidden sm:block" />just roles
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 max-w-md font-medium leading-relaxed pb-2">
                We see our team not simply as employees, but as individuals contributing distinct expertise toward the exact same trajectory.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-12 w-full mt-10">
            {/* Founders Auto Scroll Row */}
            <AutoMarquee items={founders} type="founder" direction={-1} speed={45} />
            
            {/* Core Team Auto Scroll Row */}
            <AutoMarquee items={coreTeam} type="core" direction={1} speed={55} />
          </div>

        </section>

        {/* 7. CTA */}
        <section className="py-24 md:py-32 h-[800px] px-4 sm:px-6 lg:px-12 bg-white text-black text-center">
          <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center justify-center h-full">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-10">
              Grow with us <br /> while we build it
            </h2>

            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="hand-btn"
            >
              <span className="hand-btn__sweep" aria-hidden="true" />
              <img
                src="/assets/hand/hand.webp"
                alt=""
                aria-hidden="true"
                className="hand-btn__hand"
                draggable="false"
              />
              <span className="hand-btn__content">
                <span>Get In Touch</span>
                <ArrowRight size={18} className="hand-btn__arrow" />
              </span>
            </button>
          </div>
        </section>
      </main>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <Footer />
    </>
  )
}