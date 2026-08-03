'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  className: string
}

// 1. Realistic Project Data mapped to Bento Grid spans
const projects: Project[] = [
  {
    title: 'Dark Web Crawler & NLP Analysis',
    description: 'Autonomous deep web indexing system for illicit trafficking detection utilizing advanced Natural Language Processing.',
    tags: ['Python', 'NLP', 'Web Scraping', 'Data Indexing'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    className: 'md:col-span-2 md:row-span-2 min-h-[450px] md:min-h-[600px]', // Featured project
  },
  {
    title: 'LPG Gas Detection & Isolation',
    description: 'IoT hardware safety prototype featuring automated household power cutoff mechanisms to prevent combustion during gas leaks.',
    tags: ['IoT', 'Arduino', 'C++', 'Hardware'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    className: 'md:col-span-1 md:row-span-1 min-h-[350px] md:min-h-[288px]',
  },
  {
    title: 'AWS Cloud Deployment Pipeline',
    description: 'Cloud-native infrastructure focused on automated AWS deployment pipelines and Linux system administration scripting.',
    tags: ['AWS', 'Linux', 'Bash Scripting', 'CI/CD'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    className: 'md:col-span-1 md:row-span-1 min-h-[350px] md:min-h-[288px]',
  },
]

// 2. Magnetic Button Component
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    // Adjust the multiplier to control the "magnetic pull" strength
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-slate-950 flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 transition-transform duration-300"
    >
      {children}
    </motion.div>
  )
}

// 3. 3D Tilt Card Component
function BentoCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Framer Motion values for tracking cursor
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth springs for fluid tilt returning to center
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // Transform coordinates into rotation angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      // Individual card entrance stagger variants
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          transition: { type: 'spring', stiffness: 80, damping: 20 } 
        }
      }}
      className={`relative group [perspective:1000px] ${project.className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-[32px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-3xl overflow-hidden shadow-2xl flex flex-col justify-end p-6 sm:p-8"
      >
        {/* Parallax Image Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[32px]">
          <motion.div
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 opacity-40 group-hover:opacity-60"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-6 right-6">
          <MagneticButton>
            <ArrowUpRight size={22} strokeWidth={2.5} />
          </MagneticButton>
        </div>

        {/* Content (Slightly elevated in 3D space) */}
        <div 
          className="relative z-10 flex flex-col gap-4 transform-gpu" 
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-white/10 border border-white/20 text-slate-200 text-xs font-mono font-medium rounded-full backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            {project.title}
          </h3>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PortfolioPage() {
  return (
    <>
      <Navbar isScrolled={true} />

      {/* Deep Dark Theme Wrapper */}
      <main className="relative bg-slate-950 pt-32 pb-32 min-h-screen overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
        
        {/* Subtle Glowing Radial Gradient Background */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <div className="flex items-center gap-2 mb-6">
              
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-6">
              Engineering the edge of<br />
              <span className="text-transparent bg-clip-text bg-primary">
                what's possible.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
              An asymmetrical showcase of sophisticated infrastructure, hardware innovation, and deep-web intelligence systems.
            </p>
          </motion.div>

          {/* Staggered Bento Grid */}
          <motion.div 
            // Orchestrates the stagger effect for children (BentoCard)
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(0,1fr)]"
          >
            {projects.map((project) => (
              <BentoCard key={project.title} project={project} />
            ))}
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  )
}