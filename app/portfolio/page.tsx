'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ContactModal from '@/components/contact-modal'

interface Project {
  title: string
  description: string
  image?: string
  className: string
  url: string
  image2?: string
}

const projects: Project[] = [
  {
    title: 'ADN Adventures',
    description: 'A travel and adventure website developed with an engaging interface to showcase destinations,services and customer experiences.',
    image2: '/adn.png',
    className: 'col-span-1 md:col-span-12 mb-12 md:mb-32',
    url: 'https://adnadventures.com/',
  },
  {
    title: 'Hotel Neidhal',
    description: 'Customized billing and business management software solutions.',
    image2: '/neidhal.png',
    className: 'col-span-1 md:col-span-5 md:mt-24',
    url: '#',
  },
  {
    title: 'Battery Car',
    description: 'Billing and business management software solutions.',
    image: '/kid.png',
    className: 'col-span-1 md:col-span-2 md:col-start-8 mt-12 md:mt-10',
    url: '#',
  },
  {
    title: '',
    description: '',
    image: '/kid2.png',
    className: 'col-span-1 md:col-span-2 md:col-start-10 mt-12 md:mt-24',
    url: '#',
  },
  {
    title: 'Metaport Shipping',
    description: 'Premium shipping solutions connecting continents with precision and reliability.',
    image2: '/metaport.png',
    className: 'col-span-1 md:col-span-10 md:col-start-2 mt-12 md:mt-32',
    url: 'https://metaportshipping.org/',
  },
  {
    title: 'Barq Printings',
    description: 'Creative business website developed for printing services.',
    image2: '/printers.png',
    className: 'col-span-1 md:col-span-6',
    url: 'https://barqprintings.com/',
  },
  {
    title: 'CycleStore',
    description: '',
    image: '/cycle.png',
    className: 'col-span-1 md:col-span-2 md:col-start-8 md:-mt-1',
    url: '#',
  },
  {
    title: '',
    description: 'CycleStore Billing Application.',
    image: '/cycle2.png',
    className: 'col-span-1 md:col-span-2 md:col-start-10 md:-mt-10',
    url: '#',
  },
  {
    title: 'ICE BAY',
    description: 'A cutting-edge ice cream manufacturing and distribution solution.',
    image2: '/icebay.png',
    className: 'col-span-1 md:col-span-6 md:col-start-1 ',
    url: '#',
  },
  {
    title: 'EuroZiel',
    description: 'Creative business website developed for Education consultancy.',
    image2: '/Euroziel.png',
    className: 'col-span-1 md:col-span-6',
    url: 'https://www.euroziel.com/#/',
  },
  {
    title: 'Hotel Billing',
    description: '',
    image: '/hotel.png',
    className: 'col-span-1 md:col-span-2 md:col-start-5 mt-12 md:mt-24',
    url: '#',
  },
  {
    title: '',
    description: 'Billing and business management software solutions.',
    image: '/hotel2.png',
    className: 'col-span-1 md:col-span-2 md:col-start-7 mt-12 md:mt-24',
    url: '#',
  },
]

function MagneticButton({
  children,
  href,
  onClick,
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
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors duration-300"
    >
      {children}
    </motion.a>
  )
}

function ProjectCard({
  project,
  index,
  onOpenContact,
  containerClass,
  imageAspectClass,
}: {
  project: Project
  index: number
  onOpenContact: () => void
  containerClass?: string
  imageAspectClass?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col gap-4 sm:gap-6 cursor-pointer ${containerClass ?? project.className}`}
    >
      <div
        className={`relative w-full rounded-[25px] overflow-hidden  bg-transparent md:aspect-auto ${
          imageAspectClass ?? 'aspect-[4/3] sm:aspect-[3/2]'
        }`}
      >
        {project.image && (
          <motion.img
            src={project.image}
            alt={project.title || 'Project image'}
            onClick={() => {
              if (typeof window !== 'undefined') {
                const isMobile = window.matchMedia('(max-width: 767px)').matches
                if (!isMobile) return

                if (project.url === '#') {
                  onOpenContact()
                } else if (project.url && project.url.startsWith('http')) {
                  window.open(project.url, '_blank', 'noopener noreferrer')
                } else if (project.url) {
                  window.location.href = project.url
                }
              }
            }}
            className="w-full h-full object-contain  transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105 rounded-[25px] cursor-pointer"
          />
        )}
        {project.image2 && (
          <motion.img
            src={project.image2}
            alt={project.title || 'Project image'}
            onClick={() => {
            if (typeof window !== 'undefined') {
              const isMobile = window.matchMedia('(max-width: 767px)').matches
              if (!isMobile) return

              if (project.url === '#') {
                onOpenContact()
              } else if (project.url && project.url.startsWith('http')) {
                window.open(project.url, '_blank', 'noopener noreferrer')
              } else if (project.url) {
                window.location.href = project.url
              }
            }
            }}
          className="w-full h-full object-contain border border-black/10 border-2 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105 rounded-[25px] cursor-pointer"
        />
        )}

        {/* Action button — always visible on mobile (no hover available on touch),
            fades in on hover only from md breakpoint up */}
        <div className="hidden md:flex absolute h-1/2 inset-0 bg-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 items-start justify-end p-4 sm:p-6 md:p-12">
          <div className="md:scale-50 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
            <MagneticButton
              href={project.url}
              onClick={(e) => {
                if (project.url === '#') {
                  e.preventDefault()
                  onOpenContact()
                }
              }}
            >
              <ArrowUpRight size={24} strokeWidth={2} />
            </MagneticButton>
          </div>
        </div>
      </div>

      {project.title && (
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8 pr-4">
          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none group-hover:text-neutral-500 transition-colors duration-500">
              {project.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base font-medium text-neutral-500 max-w-sm leading-relaxed md:block">
            {project.description}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default function PortfolioPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      <Navbar />

      <main className="relative bg-white text-black pt-24 sm:pt-32 pb-32 sm:pb-48 min-h-screen overflow-x-hidden selection:bg-black selection:text-white">
        <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-6 sm:pt-12 pb-12 sm:pb-24 md:pt-32 md:pb-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[15vw] sm:text-[16vw] md:text-[11vw] font-black tracking-tighter uppercase leading-[0.85] mb-5 sm:mb-8">
              Selected<br />
              <span className="text-neutral-300">Work.</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <p className="md:col-span-5 md:col-start-8 text-base sm:text-lg md:text-2xl font-medium text-neutral-600 leading-relaxed max-w-[36rem] md:ml-auto">
                An asymmetrical showcase of sophisticated infrastructure, hardware innovation, and premium digital experiences.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 sm:gap-y-16 md:gap-y-24 md:gap-x-12">
            {(() => {
              const rows: React.JSX.Element[] = []
              for (let i = 0; i < projects.length; i++) {
                // group pairs for mobile: indices 2+3, 6+7, 10+11
                if (i === 2 || i === 6 || i === 10) {
                  rows.push(
                    <div key={`group-${i}`} className="flex min-w-0 gap-4 sm:gap-6 md:contents justify-center">
                      <div className={`${projects[i].className} w-[48%] sm:w-[45%] md:w-auto`}>
                        <ProjectCard
                          project={projects[i]}
                          index={i}
                          onOpenContact={() => setIsContactModalOpen(true)}
                          containerClass="w-full"
                          imageAspectClass="aspect-[9/16] sm:aspect-[3/2]"
                        />
                      </div>
                      <div className={`${projects[i + 1].className} w-[48%] sm:w-[45%] md:w-auto`}>
                        <ProjectCard
                          project={projects[i + 1]}
                          index={i + 1}
                          onOpenContact={() => setIsContactModalOpen(true)}
                          containerClass="w-full"
                          imageAspectClass="aspect-[9/16] sm:aspect-[3/2]"
                        />
                      </div>
                    </div>
                  )
                  i++ // skip next since grouped
                } else {
                  rows.push(
                    <ProjectCard
                      key={i}
                      project={projects[i]}
                      index={i}
                      onOpenContact={() => setIsContactModalOpen(true)}
                      containerClass={projects[i].className}
                    />
                  )
                }
              }
              return rows
            })()}
          </div>
        </section>
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Footer />
    </>
  )
}