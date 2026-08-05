'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Search, Sparkles, BookOpen, Clock, ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

// ---------------------------------------------------------------------------
// Realistic Authentic Data (Mapped from your profile & requests)
// ---------------------------------------------------------------------------
interface Course {
  id: string
  title: string
  category: string
  description: string
  duration: string
  level: string
  image: string
}

const categories = ['All', 'Cloud & DevOps', 'Systems Admin', 'Design', 'Architecture', 'Security & IoT'] as const

const courses: Course[] = [
  {
    id: 'aws-restart',
    title: 'AWS re/Start Curriculum',
    category: 'Cloud & DevOps',
    description: 'Master Cloud Infrastructure, AWS Lambda serverless computing, and building robust Automated Deployment pipelines.',
    duration: '12 Weeks',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'linux-admin',
    title: 'Advanced Linux Systems Administration',
    category: 'Systems Admin',
    description: 'Deep dive into Process Management, scheduling automated Cron Jobs, and writing advanced Shell Scripts for server automation.',
    duration: '8 Weeks',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Principles',
    category: 'Design',
    description: 'Design systems for scalable web platforms. Focus on spatial layouts, glassmorphism, and intuitive user experiences.',
    duration: '6 Weeks',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'quick-commerce',
    title: 'Architecting Quick-Commerce',
    category: 'Architecture',
    description: 'Learn the system architecture behind Zomato/Zepto style frameworks. Map routing, real-time inventory, and driver dispatch.',
    duration: '10 Weeks',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'iot-safety',
    title: 'Cybersecurity & IoT Safety Systems',
    category: 'Security & IoT',
    description: 'Build hardware safety systems. From LPG Gas Detectors to automated household power isolation mechanisms and secure networks.',
    duration: '14 Weeks',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
]

// ---------------------------------------------------------------------------
// Magnetic Button Component
// ---------------------------------------------------------------------------
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative z-50 inline-flex items-center gap-2 bg-white text-slate-950 text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]"
    >
      {children}
    </motion.button>
  )
}

// ---------------------------------------------------------------------------
// 3D Tilt Course Card Component
// ---------------------------------------------------------------------------
function CourseCard3D({ course }: { course: Course }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Cursor tracking for 3D tilt and glare
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Fluid spring physics
  const springConfig = { stiffness: 150, damping: 20 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Subtle rotation mapping
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-5deg', '5deg'])
  
  // Glare effect positioning
  const glareX = useTransform(mouseX, (v) => `${v}px`)
  const glareY = useTransform(mouseY, (v) => `${v}px`)
  const glareOpacity = useTransform(xSpring, [-0.5, 0, 0.5], [0.3, 0, 0.3])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    
    x.set(clientX / width - 0.5)
    y.set(clientY / height - 0.5)
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      layout // This handles the fluid reshuffling when filtering
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
      className="group relative [perspective:1200px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col h-full rounded-[2rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl overflow-hidden shadow-2xl"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.2) 0%, transparent 50%)`
            ),
          }}
        />

        {/* Cover Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-[2rem]">
          <motion.div
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${course.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-emerald-400 text-xs font-mono tracking-wider">
              {course.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6 sm:p-8 transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
            {course.description}
          </p>

          {/* Meta & Action */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <Clock size={14} /> {course.duration}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <BookOpen size={14} /> {course.level}
              </span>
            </div>
            
            <MagneticButton>
              <span>Enroll</span>
              <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Catalog Page
// ---------------------------------------------------------------------------
export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory
      const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase()) || 
                           c.description.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-white text-slate-50 pt-32 pb-32 overflow-hidden selection:bg-white selection:text-[#0a0a0a]">
        
        {/* Animated Background Mesh */}
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
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
              Immersive <span className="text-transparent bg-clip-text bg-primary">Curriculums</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Production-grade architecture, deep systems administration, and cutting-edge spatial UI design.
            </p>
          </motion.div>

          {/* Spatial UI Command Bar (Sticky Filter Panel) */}
          <div className="sticky top-24 z-40 mx-auto w-full max-w-4xl mb-12">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-center gap-4 p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              {/* Search */}
              <div className="relative w-full sm:w-auto flex-grow flex items-center px-4">
                <Search size={18} className="text-slate-400 mr-2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none border-none ring-0 py-3"
                />
              </div>

              {/* Segmented Categories */}
              <div className="flex items-center overflow-x-auto w-full sm:w-auto no-scrollbar scroll-smooth gap-1 pr-2 pb-2 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors rounded-full z-10 ${
                      activeCategory === cat ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-white rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Fluid Grid */}
          {filtered.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((course) => (
                  <CourseCard3D key={course.id} course={course} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <p className="text-slate-500 mb-4 text-lg">No courses found matching your criteria.</p>
              <button 
                onClick={() => { setQuery(''); setActiveCategory('All') }}
                className="text-emerald-400 hover:text-primary font-mono text-sm tracking-wider uppercase underline underline-offset-4"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}