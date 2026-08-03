'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Slide {
  category: string
  headline: string
  buttonText: string
  image: string
}


const slides: Slide[] = [
  {
    category: 'E-Commerce Platform',
    headline: 'Full-stack marketplace solution with real-time inventory.',
    buttonText: 'Read',
    image:
      'https://plus.unsplash.com/premium_vector-1682311028452-0220af078701?q=80&w=793&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    category: 'Mobile Learning App',
    headline: 'Cross-platform educational application for interactive courses.',
    buttonText: 'Read',
    image:
      'https://plus.unsplash.com/premium_photo-1722209813892-147158a0d4ec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    category: 'Analytics Dashboard',
    headline: 'Real-time data visualization and reporting system.',
    buttonText: 'Read',
    image:
      'https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    category: 'Digital Marketing',
    headline: 'Comprehensive marketing strategy with SEO and social media integration.',
    buttonText: 'Read',
    image:
      'https://plus.unsplash.com/premium_photo-1683872921964-25348002a392?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ',
  },
]

const CUBE_SIZE = 280
const HALF = CUBE_SIZE / 2

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(slides.length - 1) * 100}%`]
  )

  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(slides.length - 1) * 90]
  )

  return (
    <div ref={containerRef} className="relative bg-[#f4f4f4] lg:h-[400vh]">
      <div className="lg:sticky lg:top-0 lg:h-screen overflow-hidden">
        <div className="relative h-full w-full flex flex-col lg:flex-row lg:items-center">
          <div className="relative lg:w-[55%] lg:h-full overflow-hidden flex flex-col lg:block">
            <motion.div
              style={isDesktop ? { x: trackX } : undefined}
              className="flex flex-col lg:flex-row lg:h-full"
            >
              {slides.map((slide) => (
                <div
                  key={slide.headline}
                  className="flex-shrink-0 w-full lg:w-full lg:h-full flex items-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0"
                >
                  <div className="max-w-xl">
                    <p className="text-sm font-medium text-gray-400 mb-4">
                      {slide.category}
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-8">
                      {slide.headline}
                    </h2>
                    <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-6 py-3 rounded-full transition-colors">
                      {slide.buttonText}
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative lg:w-[45%] flex items-center justify-center py-12 lg:py-0">
            <div
              className="relative"
              style={{ width: CUBE_SIZE, height: CUBE_SIZE, perspective: 1400 }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  rotateY: isDesktop ? rotateY : 0,
                }}
              >
                {slides.map((slide, index) => {
                  const faceRotation = index * 90
                  return (
                    <div
                      key={slide.headline}
                      className="absolute inset-0 rounded-3x0 overflow-hidden shadow-2xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        transform: `rotateY(${faceRotation}deg) translateZ(${HALF}px)`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}