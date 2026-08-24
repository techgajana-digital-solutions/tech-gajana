'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Slide {
  category: string
  headline: string
  buttonText: string
  image: string
  href: string
}

const slides: Slide[] = [
  {
    category: 'E-Commerce Platform',
    headline: 'Full-stack marketplace solution with real-time inventory.',
    buttonText: 'Read',
    image:
      'https://plus.unsplash.com/premium_vector-1682311028452-0220af078701?q=80&w=793&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/portfolio',
  },
  {
    category: 'Mobile Learning App',
    headline: 'Cross-platform application for trending offers.',
    buttonText: 'Read',
    image:
      'https://plus.unsplash.com/premium_photo-1722209813892-147158a0d4ec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/portfolio',
  },
  {
    category: 'Analytics Dashboard',
    headline: 'Real-time data visualization and reporting system.',
    buttonText: 'Read',
    image:
      'https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/portfolio',
  },
  {
    category: 'Digital Marketing',
    headline: 'Comprehensive marketing strategy with SEO and social media integration.',
    buttonText: 'Read',
    image:
      'https://plus.unsplash.com/premium_photo-1683872921964-25348002a392?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/portfolio',
  },
]

export default function Portfolio() {
  const router = useRouter()
  
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Dynamically calculate the cube size based on screen width
  const [cubeSize, setCubeSize] = useState(260) // Default for mobile

  useEffect(() => {
    const checkSize = () => {
      // 340px for desktop, 260px for mobile to prevent overflow
      setCubeSize(window.innerWidth >= 1024 ? 280 : 260) 
    }
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const half = cubeSize / 2

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  // For 4 slides: movePercent = (4 - 1) * (100 / 4) = 75%
 
  // Text slides horizontally on ALL devices now
  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
  ['0%', `-${(slides.length - 1) * 100}%`]
  )

  // Cube rotates on ALL devices now
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(slides.length - 1) * 90]
  )

  return (
    // 1. Added overflow-x-clip and w-full to prevent body expansion
    <div ref={containerRef} className="relative bg-[#f4f4f4] h-[400vh] overflow-x-clip w-full">
      
      // 2. Added [clip-path:inset(0)] to strictly enforce clipping of 3D children on iOS
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden [clip-path:inset(0)]">
        <div className="relative h-full w-full flex flex-col lg:flex-row items-center">
          
          {/* Text Section: Top 50% on mobile, Left 55% on desktop */}
          <div className="relative w-full h-[50%] lg:w-[55%] lg:h-full overflow-hidden flex items-center bg-[#f4f4f4] z-10">
            <motion.div
              style={{ x: trackX }}
              className="flex w-full h-full items-center"
            >
              {slides.map((slide) => (
                <div
                  key={slide.headline}
                  className="flex-shrink-0 w-full lg:h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20"
                >
                  <div className="max-w-xl">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4 uppercase tracking-wider">
                      {slide.category}
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 sm:mb-8">
                      {slide.headline}
                    </h2>
                    <button 
                    onClick={() => {router.push(slide.href)}}
                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold uppercase tracking-wide px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-transform hover:scale-105">
                      {slide.buttonText}
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Cube Section: Bottom 50% on mobile, Right 45% on desktop */}
          <div className="relative w-full h-[50%] lg:w-[45%] lg:h-full flex items-start lg:items-center justify-center pt-8 lg:pt-0">
            <div
              className="relative"
              style={{ width: cubeSize, height: cubeSize, perspective: 1400 }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  rotateY,
                }}
              >
                {slides.map((slide, index) => {
                  const faceRotation = index * 90
                  return (
                    <div
                      key={slide.headline}
                      className="absolute inset-0 rounded-1xl overflow-hidden shadow-2xl bg-cover bg-center border border-black/5"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        transform: `rotateY(${faceRotation}deg) translateZ(${half}px)`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/40" />
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