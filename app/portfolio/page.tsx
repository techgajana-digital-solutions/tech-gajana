'use client'

import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  className: string
  url: string
}

// 1. Project Data 
const projects: Project[] = [
  {
    title: 'ADN Adventures',
    description: 'A travel and adventure website developed with an engaging interface to showcase destinations,services and customer experiences.',
    tags: ['React Js', 'Javascript'],
    image: '/adn.png',
    className: 'col-span-1 md:col-span-12 mb-12 md:mb-32',
    url: 'https://adnadventures.com/',
  },
  {
    title: 'Hotel Neidhal',
    description: 'Customized billing and business management software solutions.',
    tags: ['Flutter'],
    image: '/neidhal.png',
    className: 'col-span-1 md:col-span-5 md:mt-24',
    url: '#',
  },
  {
    title: 'ICE BAY',
    description: 'A cutting-edge ice cream manufacturing and distribution solution.',
    tags: ['Flutter'],
    image: '/icebay.png',
    className: 'col-span-1 md:col-span-6 md:col-start-7',
    url: '#',
  },
  {
    title: 'Metaport Shipping',
    description: 'Premium shipping solutions connecting continents with precision and reliability.',
    tags: ['React Js', 'Javascript'],
    image: '/metaport.png',
    className: 'col-span-1 md:col-span-10 md:col-start-2 mt-12 md:mt-32',
    url: 'https://metaportshipping.org/',
  },
  {
    title: 'Barq Printings',
    description: 'Creative business website developed for printing services.',
    tags: ['HTML', 'CSS'],
    image: '/printers.png',
    className: 'col-span-1 md:col-span-6',
    url: 'https://barqprintings.com/',
  },
 {
    title: 'CycleStore',
    description: '',
    tags: ['Flutter'],
    image: '/cycle.png',
    // FIXED: Changed col-span-4 to col-span-1 for mobile view
    className: 'col-span-1 md:col-span-2 md:col-start-8 md:-mt-05', 
    url: '#',
  },
  {
    title: '',
    description: 'CycleStore Billing Application.',
    tags: ['Flutter'],
    image: '/cycle2.png',
    // FIXED: Changed col-span-4 to col-span-1 for mobile view
    className: 'col-span-1 md:col-span-2 md:col-start-10 md:-mt-10', 
    url: '#',
  },
  {
    title: 'Battery Car',
    description: 'Billing and business management software solutions.',
    tags: ['Flutter'],
    image: '/kid.png',
    className: 'col-span-1 md:col-span-2 md:col-start-2 mt-12 md:mt-10',
    url: '#',
  },
  {
    title: '', 
    description: '', 
    tags: [], 
    image: '/kid2.png', // Make sure this extension is correct in your folder
    className: 'col-span-1 md:col-span-2 md:col-start-4 mt-12 md:mt-22',
    url: '#',
  },
   {
    title: 'EuroZiel',
    description: 'Creative business website developed for Education consultancy.',
    tags: ['React Js', 'Javascript'],
    image: '/Euroziel.png',
    className: 'col-span-1 md:col-span-6',
    url: 'https://www.euroziel.com/#/',
  },
  {
    title: 'Hotel Billing',
    description: '',
    tags: ['Flutter','Dashboard'],
    image: '/hotel.png',
    className: 'col-span-1 md:col-span-2 md:col-start-7 mt-12 md:mt-24',
    url: '#',
  },
  {
    title: '',
    description: 'Billing and business management software solutions.', 
    tags: [], 
    image: '/hotel2.png', // Make sure this extension is correct in your folder
    className: 'col-span-1 md:col-span-2 md:col-start-9 mt-12 md:mt-24',
    url: '#',
  },
]

// 2. Magnetic Button (Now supports onClick interception)
function MagneticButton({
  children,
  href,
  onClick
}: {
  children: React.ReactNode
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <motion.a
      href={href}
      target={href !== '#' && href.startsWith('http') ? '_blank' : undefined}
      rel={href !== '#' && href.startsWith('http') ? 'noopener noreferrer' : undefined}
      ref={ref as any}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick} // Added click handler here
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative flex items-center justify-center w-16 h-16 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors duration-300"
    >
      {children}
    </motion.a>
  )
}

/// 3. Contact Form Modal Component (Detailed Agency Version)
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full max-w-3xl bg-black text-white p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
              Project Inquiry.
            </h2>
            <p className="text-neutral-400 font-medium mb-10 md:mb-12">
              Tell us about your next big idea and we'll get back to you within 24 hours.
            </p>

            <form className="flex flex-col gap-8 md:gap-10" onSubmit={(e) => e.preventDefault()}>
              
              {/* Row 1: Name & Email */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    placeholder="FULL NAME *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Company */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <input
                    type="tel"
                    required
                    placeholder="PHONE NUMBER *"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="COMPANY / ORGANIZATION"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Row 3: Budget Range (Dropdown) */}
              <div>
                <select 
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors text-white/30 focus:text-white cursor-pointer appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-black text-white/50">ESTIMATED BUDGET</option>
                  <option value="10k-25k" className="bg-black text-white">₹10,000 - ₹50,000</option>
                  <option value="25k-50k" className="bg-black text-white">₹50,000 - ₹1,00,000</option>
                  <option value="50k-100k" className="bg-black text-white">₹1,00,000 - ₹5,00,000</option>
                  <option value="100k+" className="bg-black text-white">₹5,00,000+</option>
                </select>
              </div>

              {/* Row 4: Message */}
              <div>
                <textarea
                  required
                  placeholder="TELL US ABOUT YOUR PROJECT *"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors placeholder:text-white/30 resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="self-start mt-4 px-10 py-5 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// 4. Project Card
function ProjectCard({ 
  project, 
  index, 
  onOpenContact 
}: { 
  project: Project; 
  index: number;
  onOpenContact: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col gap-6 cursor-pointer ${project.className}`}
    >
      <div className="relative w-full overflow-hidden bg-transparent aspect-[4/3] md:aspect-auto">
        {/* <motion.div
          className="w-full h-full transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
          style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        /> */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
        />

        <div className="absolute h-1/2 inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-start justify-end p-6 md:p-12">
          <div className="scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
            
            {/* The Magic Happens Here */}
            <MagneticButton 
              href={project.url}
              onClick={(e) => {
                if (project.url === '#') {
                  e.preventDefault(); // Stops the page from jumping
                  onOpenContact();    // Opens the modal
                }
              }}
            >
              <ArrowUpRight size={28} strokeWidth={2} />
            </MagneticButton>

          </div>
        </div>
      </div>


      {/* Text block (hidden if empty, perfect for your decorative images) */}
      {project.title && (
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8 pr-4">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none group-hover:text-neutral-500 transition-colors duration-500">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm md:text-base font-medium text-neutral-500 max-w-sm leading-relaxed hidden md:block">
            {project.description}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default function PortfolioPage() {
  // State to control the Contact Modal
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      <Navbar />

      <main className="relative bg-white text-black pt-32 pb-48 min-h-screen overflow-x-hidden selection:bg-black selection:text-white">
        
        <section className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24 md:pt-32 md:pb-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[14vw] md:text-[11vw] font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Selected<br />
              <span className="text-neutral-300">Work.</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <p className="md:col-span-5 md:col-start-8 text-lg md:text-2xl font-medium text-neutral-600 leading-relaxed">
                An asymmetrical showcase of sophisticated infrastructure, hardware innovation, and premium digital experiences.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                index={index} 
                onOpenContact={() => setIsContactModalOpen(true)} // Passes the trigger to the card
              />
            ))}
          </div>
        </section>
      </main>

      {/* Render the Modal overlay at the bottom */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      <Footer />
    </>
  )
}