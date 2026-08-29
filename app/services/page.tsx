'use client'

import { useRef, useState } from 'react'
import {
  ArrowRight,
  Layers,
  ShoppingCart,
  Briefcase,
  CalendarCheck,
  Receipt,
  Smartphone,
  Bot,
  FileSearch,
  Link2,
  PenTool,
  Share2,
  MousePointerClick,
  ArrowUpRight,
  Users,
  TrendingUp,
  Fingerprint,
  Headset,
} from 'lucide-react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ContactModal from '@/components/contact-modal'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const pillars = [
  {
    numeral: '01',
    title: 'Custom Software',
    description:
      "Off-the-shelf platforms force you to bend your business around their limitations. We build software that bends around you — faster to use, easier to scale, and designed around how your team and customers actually work.",
    bgImage: "https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subServices: [
      { icon: Layers, label: 'Landing Pages' },
      { icon: ShoppingCart, label: 'E-Commerce' },
      { icon: Briefcase, label: 'Business Tools' },
      { icon: CalendarCheck, label: 'Booking Portals' },
      { icon: Receipt, label: 'Billing Systems' },
      { icon: Smartphone, label: 'Mobile Solutions' },
      { icon: Bot, label: 'AI Automation' },
    ],
  },
  {
    numeral: '02',
    title: 'SEO & Content',
    description:
      "Every day, people are searching for exactly what you offer. Our SEO and content strategy puts your business in front of high-intent buyers, combining technical optimization with content that actually persuades.",
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    subServices: [
      { icon: FileSearch, label: 'On-Page SEO' },
      { icon: Link2, label: 'Off-Page SEO' },
      { icon: PenTool, label: 'Blog & Articles' },
    ],
  },
  {
    numeral: '03',
    title: 'Paid Marketing',
    description:
      "Running ads without a conversion strategy is just an expensive way to get clicks. We build and manage campaigns engineered around ROI from day one — precise targeting and continuous optimization that lowers cost per lead over time.",
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    subServices: [
      { icon: Share2, label: 'Meta Ads' },
      { icon: MousePointerClick, label: 'Google Ads' },
    ],
  },
]

const advantages = [
  {
    icon: Users,
    numeral: '01',
    title: 'One Team, One Strategy',
    desc: "No handoffs between developers and marketers. We build and market as a single connected system.",
  },
  {
    icon: TrendingUp,
    numeral: '02',
    title: 'Data-Driven, Not Guesswork',
    desc: 'Every decision is backed by data, tested, and refined. We report on revenue, never vanity metrics.',
  },
  {
    icon: Fingerprint,
    numeral: '03',
    title: 'Never Templated',
    desc: "Your business isn't generic. Every solution is architected around your actual operational workflow.",
  },
  {
    icon: Headset,
    numeral: '04',
    title: 'End-to-End Support',
    desc: 'From the first whiteboard strategy call to post-launch scaling, you have a single point of contact.',
  },
]

// ---------------------------------------------------------------------------
// Elite Magnetic Button
// ---------------------------------------------------------------------------
function MagneticButton({
  children,
  onClick,
  dark = false,
}: {
  children: React.ReactNode
  onClick: () => void
  dark?: boolean
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`group relative flex items-center justify-center gap-3 h-20 px-12 rounded-full font-black uppercase tracking-widest text-sm sm:text-base overflow-hidden transition-all duration-500 hover:scale-105 ${
        dark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <span
        className={`relative z-10 flex items-center gap-3 transition-colors duration-500 ${
          dark ? 'group-hover:text-black' : ''
        }`}
      >
        {children}
      </span>
      <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] bg-[#f5d082]" />
    </motion.button>
  )
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------
export default function ServicesPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0) // Driven by scroll progress

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '50%'])

  // --- Scroll-driven panel activation for the System Architecture section ---
  const archRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: archProgress } = useScroll({
    target: archRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(archProgress, 'change', (latest) => {
    const idx = Math.min(
      pillars.length - 1,
      Math.max(0, Math.floor(latest * pillars.length))
    )
    setActiveIndex(idx)
  })

  return (
    <>
      <Navbar />

      <main className="bg-[#0a0a0a] text-white selection:bg-[#f5d082] selection:text-black" ref={heroRef}>

       {/* 1. HUGE INC STYLE BRUTALIST HERO */}
        <section className="relative w-full h-[100px] flex flex-col justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-12 border-b border-white/10">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#f5d082]/10 rounded-full blur-[150px] pointer-events-none" />
          
          <motion.div style={{ y: heroY }} className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col">
            
            <div className="overflow-hidden mb-2">
              <motion.p 
                initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#f5d082] font-bold tracking-[0.3em] uppercase text-sm sm:text-base mb-6"
              >
              
              </motion.p>
            </div>

            <div className="flex flex-col uppercase font-black tracking-tighter leading-[0.85] text-[15vw] md:text-[11vw]">
              <div className="overflow-hidden">
                <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  Engineered
                </motion.h1>
              </div>
              <div className="overflow-hidden flex items-center gap-4 md:gap-8">
                <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                  For
                </motion.h1>
                <motion.div 
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2vw] md:h-[1.5vw] flex-1 bg-[#f5d082] origin-left mt-4 md:mt-8"
                />
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#f5d082]"
                >
                  Growth.
                </motion.h1>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
              className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end justify-between gap-10"
            >
              <p className="text-lg md:text-2xl text-neutral-400 max-w-2xl font-medium leading-relaxed">
                We design, build, and market digital systems that turn visitors into customers—combining custom software, SEO, and paid media under one roof.
              </p>
              
              <MagneticButton onClick={() => setIsContactModalOpen(true)}>
                Start Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. EDITORIAL HOOK (slides over sticky hero) */}
        <section className="relative z-10 py-32 md:py-48 px-4 sm:px-6 lg:px-12 bg-white text-black">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] uppercase">
                Most businesses don't have a marketing problem. <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
                  They have a disconnected systems problem.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-8 text-lg md:text-xl text-neutral-600 leading-relaxed font-medium pt-4 border-l-2 border-black pl-8">
              <p>
                Your website doesn't talk to your booking tool. Your ads send traffic to a page that doesn't convert. Your SEO agency doesn't understand your product.
              </p>
              <p className="text-black font-black uppercase tracking-widest text-sm">
                TechGajana exists to close that gap. We are a unified growth engine.
              </p>
            </div>
          </div>
        </section>

{/* 3. SYSTEM ARCHITECTURE (SCROLL-LINKED EXPANDING PANELS) */}
<section
  ref={archRef}
  className="relative z-10 bg-[#0a0a0a] text-white overflow-clip lg:[height:var(--arch-h)]"
  style={{ ['--arch-h' as any]: `${pillars.length * 100}vh` }}
>

  <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col lg:justify-center py-32 md:py-48 lg:py-0 px-4 sm:px-6 lg:px-12">
    <div className="max-w-[1600px] mx-auto relative z-10 w-full">
      <div className="mb-10 md:mb-14 lg:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
          System <br /> Architecture
        </h2>
        <div className="flex items-center gap-4 mb-4 md:mb-8">
          <p className="text-[#f5d082] font-mono tracking-widest uppercase text-sm md:text-base">
          </p>
        </div>
      </div>

      {/* The Dynamic Flex Container */}
      <div className="flex flex-col lg:flex-row w-full lg:h-[68vh] gap-4 md:gap-6">
        {pillars.map((pillar, index) => {
          const isActive = activeIndex === index

          return (
            <div
              key={pillar.numeral}
              onClick={() => setActiveIndex(index)}
              className={`relative rounded-[2rem] md:rounded-[3rem] border transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden cursor-pointer flex flex-col justify-end w-full group
                ${isActive 
                  ? 'lg:w-[60%] border-[#f5d082]/40 shadow-[0_0_80px_rgba(245,208,130,0.1)]' 
                  : 'lg:w-[20%] border-white/10'
                }
              `}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                <motion.img
                  src={pillar.bgImage}
                  alt={pillar.title}
                  className={`w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] 
                    ${isActive ? 'scale-105 opacity-60 mix-blend-luminosity' : 'scale-100 opacity-20 grayscale'}
                  `}
                />
                <div className={`absolute inset-0 transition-opacity duration-1000 
                  ${isActive ? 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent' : 'bg-black/70'}
                `} />
              </div>

              {/* Glowing Mesh Overlay on Active */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[#f5d082]/20 via-transparent to-transparent opacity-0 transition-opacity duration-1000 z-0 pointer-events-none ${isActive ? 'opacity-100' : ''}`} />

              {/* Massive Watermark Numeral */}
              <span 
                className={`absolute -top-10 -right-10 text-[200px] md:text-[300px] font-black leading-none tracking-tighter transition-all duration-1000 pointer-events-none select-none z-0
                  ${isActive ? 'text-white/[0.03] scale-100 translate-y-0' : 'text-transparent scale-50 -translate-y-20'}
                `}
                style={{ WebkitTextStroke: isActive ? '0px' : '1px rgba(255,255,255,0.05)' }}
              >
                {pillar.numeral}
              </span>

              {/* Content Container */}
              <div className="relative z-10 w-full h-full p-8 md:p-12 lg:p-16 flex flex-col justify-end">

                {/* Header (Always Visible) */}
                <div className="flex flex-col md:flex-row md:items-end gap-6 mb-2 shrink-0">
                  <span 
                    className={`text-6xl md:text-8xl font-black leading-none tracking-tighter transition-colors duration-700 ${isActive ? 'text-[#f5d082]' : 'text-transparent'}`}
                    style={{ WebkitTextStroke: isActive ? '0px' : '2px rgba(255,255,255,0.4)' }}
                  >
                    {pillar.numeral}
                  </span>
                  <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tight leading-[1.1] transition-all duration-700 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                    {pillar.title}
                  </h3>
                </div>

                {/* Expandable Grid Section */}
                <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                  <div className="overflow-hidden min-h-0">
                    <div className="flex flex-col gap-6 md:gap-8 max-h-[36vh] lg:max-h-[40vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                      <p className="text-base md:text-xl text-neutral-300 font-medium leading-relaxed max-w-2xl drop-shadow-md">
                        {pillar.description}
                      </p>

                      <div className="flex flex-wrap gap-3 md:gap-4">
                        {pillar.subServices.map((sub, i) => {
                          const SubIcon = sub.icon
                          return (
                            <div 
                              key={sub.label} 
                              className={`flex items-center gap-3 px-4 py-2.5 md:px-6 md:py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-700
                                ${isActive ? 'translate-y-0 opacity-100 hover:bg-white hover:text-black' : 'translate-y-10 opacity-0'}
                              `}
                              style={{ transitionDelay: `${isActive ? i * 50 : 0}ms` }}
                            >
                              <SubIcon size={16} className={isActive ? "text-[#f5d082] group-hover:text-black" : ""} />
                              <span className="text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                                {sub.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
</section>

        {/* 4. THE ADVANTAGE */}
        <section className="relative z-10 py-32 md:py-48 px-4 sm:px-6 lg:px-12 bg-[#0a0a0a] text-white border-t border-white/10 overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] bg-[#f5d082]/5 rounded-full blur-[180px]" />

          <div className="max-w-[1600px] mx-auto relative">
            <div className="grid lg:grid-cols-12 gap-8 mb-24 md:mb-32 items-end">
              <div className="lg:col-span-8">

                <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.85]">
                  The Advantage
                </h2>
              </div>
              <div className="lg:col-span-4 border-l-2 border-[#f5d082]/40 pl-8">
                <p className="text-neutral-400 text-lg font-medium leading-relaxed">
                  Four structural reasons growth-focused businesses choose to
                  build with us, not around us.
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              {advantages.map((item, i) => {
                const Icon = item.icon
                const reversed = i % 2 === 1

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="group grid lg:grid-cols-12 gap-8 lg:gap-16 items-center py-14 md:py-20 border-b border-white/10 last:border-b-0"
                  >
                    <div
                      className={`lg:col-span-4 flex items-center gap-6 ${
                        reversed ? 'lg:order-2 lg:justify-end' : ''
                      }`}
                    >
                      <span
                        className="text-[8rem] md:text-[11rem] font-black leading-none tracking-tighter text-transparent transition-all duration-700 group-hover:text-[#f5d082] select-none"
                        style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.25)' }}
                      >
                        {item.numeral}
                      </span>
                    </div>

                    <div className={`lg:col-span-8 ${reversed ? 'lg:order-1' : ''}`}>
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#f5d082] group-hover:border-[#f5d082] flex items-center justify-center mb-6 transition-colors duration-500">
                        <Icon
                          size={20}
                          className="text-[#f5d082] group-hover:text-black transition-colors duration-500"
                        />
                      </div>

                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 5. GIANT CTA */}
        <section className="relative z-10 py-32 md:py-48 px-4 sm:px-6 lg:px-12 bg-white text-black text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>

          <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col items-center">
            <h2 className="text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.8] mb-16 uppercase">
              Ready To <br /> Scale?
            </h2>

            <MagneticButton dark={true} onClick={() => setIsContactModalOpen(true)}>
              Initialize Project <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </MagneticButton>
          </div>
        </section>
      </main>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <Footer />
    </>
  )
}