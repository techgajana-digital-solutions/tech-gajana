'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Slide {
  number: string
  title: string
  description: string
  image: string
}

const slides: Slide[] = [
  {
    number: '01',
    title: 'Software Development',
    description:
      'Custom solutions built with a modern tech stack — from web apps to complex platforms, engineered for performance and built to scale with your product.',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    number: '02',
    title: 'Live Mentorship & Courses',
    description:
      'Real-time guidance from industry experts, paired with structured courses to help you learn faster and build with confidence.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    number: '03',
    title: 'Tech E-Store',
    description:
      'Premium tools and resources for developers — curated products that save you time and help you ship better software.',
    image: 'https://plus.unsplash.com/premium_photo-1683288662057-2ac296955d32?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    number: '04',
    title: 'Research Publishing',
    description:
      'Publish and share your technical research with a community of builders, from drafting to peer review to release.',
    image: 'https://plus.unsplash.com/premium_photo-1681681061615-623d024005ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

export default function Service() {
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

  return (
    <div ref={containerRef} className="relative bg-[#f4f4f4] lg:h-[400vh]">
      <div className="lg:sticky lg:top-0 lg:h-screen overflow-hidden">
        <motion.div
          style={isDesktop ? { x: trackX } : undefined}
          className="flex flex-col lg:flex-row lg:h-full w-full"
        >
          {slides.map((slide) => (
            <div
              key={slide.number}
              className="flex-shrink-0 w-full lg:w-screen lg:h-full flex items-center px-6 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-0"
            >
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 w-full max-w-7xl mx-auto items-center">
                <div>
                  <div className="flex items-start gap-3 mb-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight leading-none">
                      {slide.title}
                    </h2>
                    <span className="text-base font-medium text-gray-400 mt-1">
                      {slide.number}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-md mb-8">
                    {slide.description}
                  </p>
                  <a
  href="#"
  className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-[#4F46E5] text-white hover:text-black px-6 py-2 rounded-sm transition-colors duration-150 text-sm font-medium"
>
  Explore
  <ArrowUpRight
    size={16}
    className="text-white group-hover:text-black transition-transform duration-300 group-hover:rotate-45"
  />
</a>
                </div>

                <div
                  className="w-full h-64 sm:h-80 lg:h-[60vh] rounded-2xl bg-cover bg-center bg-gray-200"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}