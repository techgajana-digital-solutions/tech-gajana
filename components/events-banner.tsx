'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: number
  quote: string
  authorName: string
  authorRole: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'I asked them to create an app... They did a great job in a short period of time... Also they do corrections in the technical glitches which happen whenever I ask them... Perfect people for software solutions is techgajana...',
    authorName: 'Janarthanan',
    authorRole: 'Professor',
    company: 'AVMC',
  },
  {
    id: 2,
    quote:
      'The team at TechGajana Private Limited is exceptional! They delivered our project on time and within budget. Their attention to detail and commitment to quality is unmatched.',
    authorName: 'Vignesh V',
    authorRole: 'Franchise Owner of Ice Bay',
    company: 'Ice Bay',
  },
  {
    id: 3,
    quote:
      'Rare to find a team that\u2019s equally comfortable in a whiteboard session and a production incident at 2am. Both happened. Both went well.',
    authorName: 'Anburaja',
    authorRole: 'Founder & CEO of Ouiya',
    company: 'Ouiya',
  },
]

const AUTOPLAY_INTERVAL = 6000

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback((newDirection: 1 | -1) => {
    setDirection(newDirection)
    setIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return testimonials.length - 1
      if (next >= testimonials.length) return 0
      return next
    })
  }, [])

  useEffect(() => {
    if (!AUTOPLAY_INTERVAL || isPaused) return
    const timer = setInterval(() => goTo(1), AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [isPaused, goTo])

  const active = testimonials[index]

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
      y: 12,
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      y: -12,
    }),
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#f4f4f4] px-6 sm:px-10 lg:px-16 py-24">
      <div className="relative w-full max-w-5xl text-center overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-gray-900 tracking-tight leading-[1.15] mb-10">
              &ldquo;{active.quote}&rdquo;
            </p>

            <p className="text-sm uppercase tracking-widest text-gray-500">
              {active.authorName} &mdash; {active.authorRole}, {active.company}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="flex items-center gap-4 mt-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          onClick={() => goTo(-1)}
          aria-label="Previous testimonial"
          className="w-12 h-12 rounded-full border-2 border-gray-900 bg-transparent hover:bg-[#00ff00] hover:border-transparent flex items-center justify-center transition-colors duration-150"
        >
          <ChevronLeft size={20} className="text-gray-900" />
        </button>

        <div className="flex items-center gap-2 px-2">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-gray-900' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(1)}
          aria-label="Next testimonial"
          className="w-12 h-12 rounded-full border-2 border-gray-900 bg-transparent hover:bg-[#00ff00] hover:border-transparent flex items-center justify-center transition-colors duration-150"
        >
          <ChevronRight size={20} className="text-gray-900" />
        </button>
      </div>
    </section>
  )
}