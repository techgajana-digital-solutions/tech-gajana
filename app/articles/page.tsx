'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, Clock, ChevronRight, Mail } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

// ---------------------------------------------------------------------------
// Authentic Editorial Data
// ---------------------------------------------------------------------------
const FEATURED_ARTICLE = {
  id: 'art_featured',
  title: 'Building a Dark Web Crawler: Deep Web Indexing and NLP',
  excerpt: 'An inside look into the autonomous indexing systems and Natural Language Processing architectures used to detect and map illicit trafficking networks across the deep web.',
  category: 'Cybersecurity',
  readTime: '12 min read',
  date: 'August 2, 2026',
  image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
}

const ARTICLES = [
  {
    id: 'art_1',
    title: 'Long-Distance Scooter Touring: Conquering Kolli Hills on a Honda Activa',
    excerpt: 'Pushing the limits of a 125cc engine. A comprehensive guide to route planning, vehicle endurance, and the logistics of conquering 70 continuous hairpin bends.',
    category: 'Travel & Logistics',
    readTime: '8 min read',
    date: 'February 24, 2026',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'art_2',
    title: 'Automating Infrastructure: AWS Lambda and Cloud Deployments',
    excerpt: 'Scaling from zero to infinity. How to leverage serverless architectures and automated pipelines to build resilient cloud-native platforms.',
    category: 'Cloud Computing',
    readTime: '10 min read',
    date: 'January 15, 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'art_3',
    title: 'Mastering Linux: Process Management and Cron Jobs',
    excerpt: 'The ultimate systems administration guide to mastering the command line, writing robust shell scripts, and scheduling automated server tasks.',
    category: 'Systems Admin',
    readTime: '7 min read',
    date: 'December 10, 2025',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
  },
]

const CATEGORIES = ['Cybersecurity', 'Cloud Computing', 'Systems Admin', 'Hardware & IoT', 'Travel & Logistics', 'UI/UX Design']
const TAGS = ['AWS', 'Next.js', 'Linux', 'NLP', 'Automation', 'Python', 'Networking']

// ---------------------------------------------------------------------------
// Magnetic Arrow Component
// ---------------------------------------------------------------------------
function MagneticArrow() {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors"
    >
      <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// 3D Tilt Hero Component
// ---------------------------------------------------------------------------
function HeroArticle() {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 })

  // 3D Rotation for the text layer
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg'])
  
  // Subtle image parallax shift
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ['-2%', '2%'])
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ['-2%', '2%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-[75vh] min-h-[500px] rounded-3xl overflow-hidden cursor-pointer group [perspective:1200px]"
    >
      {/* Background Layer */}
      <motion.div 
        className="absolute inset-[-5%] w-[110%] h-[110%] bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${FEATURED_ARTICLE.image})`, x: bgX, y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

      {/* 3D Tilted Text Layer */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16 transform-gpu"
      >
        <div style={{ transform: 'translateZ(50px)' }} className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium tracking-wide">
              {FEATURED_ARTICLE.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/70 text-sm font-mono">
              <Clock size={14} /> {FEATURED_ARTICLE.readTime}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1] mb-6 group-hover:text-primary transition-colors duration-500">
            {FEATURED_ARTICLE.title}
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl mb-8 line-clamp-2">
            {FEATURED_ARTICLE.excerpt}
          </p>

          <div className="flex items-center gap-4">
            <MagneticArrow />
            <span className="text-white font-medium tracking-wide uppercase text-sm">Read Featured Article</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main Editorial Page
// ---------------------------------------------------------------------------
export default function ArticlesPage() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Global Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-500 origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar isScrolled={true} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        
        {/* Page Header */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-neutral-900 mb-4">
            The <span className="text-transparent bg-clip-text bg-primary">Editorial</span>
          </h1>
          <p className="text-lg text-neutral-500">Insights on engineering, automation, and spatial design.</p>
        </div>

        {/* Featured Hero Article */}
        <div className="mb-20">
          <HeroArticle />
        </div>

        {/* 70/30 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          
          {/* LEFT COLUMN: Article Grid (70%) */}
          <div className="lg:col-span-8">
            <h3 className="text-2xl font-bold tracking-tight mb-8 pb-4 border-b border-neutral-200">Latest Publications</h3>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col gap-12"
            >
              {ARTICLES.map((article) => (
                <motion.article 
                  key={article.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
                  }}
                  className="group grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start cursor-pointer"
                >
                  {/* Article Image */}
                  <div className="sm:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  {/* Article Content */}
                  <div className="sm:col-span-7 flex flex-col justify-center h-full py-2">
                    <div className="flex items-center gap-3 mb-3 text-xs font-mono text-neutral-500">
                      <span className="text-primary font-semibold">{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-neutral-900 leading-tight mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    
                    <p className="text-neutral-500 leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                        <Clock size={14} /> {article.readTime}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-900 group-hover:border-neutral-900 group-hover:text-white transition-all duration-300">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar (30%) */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-32 flex flex-col gap-12">
              
              {/* Categories */}
              <div>
                <h4 className="text-sm font-bold tracking-widest uppercase text-neutral-900 mb-6">Categories</h4>
                <ul className="flex flex-col gap-3">
                  {CATEGORIES.map((cat) => (
                    <li key={cat}>
                      <a href="#" className="flex items-center justify-between group text-neutral-500 hover:text-neutral-900 transition-colors">
                        <span>{cat}</span>
                        <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-sm font-bold tracking-widest uppercase text-neutral-900 mb-6">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((tag) => (
                    <a key={tag} href="#" className="px-3 py-1.5 rounded-md bg-neutral-100 text-neutral-600 text-xs font-mono hover:bg-neutral-200 hover:text-neutral-900 transition-colors">
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Minimal Newsletter Box */}
              <div className="p-8 rounded-3xl bg-neutral-900 text-white shadow-2xl">
                <Mail className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-xl font-bold mb-2">The Insider</h4>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  Weekly deep dives into infrastructure, architecture, and extreme logistics. No spam.
                </p>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Engineering email..." 
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-primary transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  )
}   