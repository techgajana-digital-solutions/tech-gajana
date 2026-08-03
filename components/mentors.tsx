'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

function LinkedinIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

function TwitterIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 3H21l-6.7 7.66L22.2 21h-6.16l-4.83-6.31L5.7 21H3.6l7.16-8.19L2.9 3h6.32l4.37 5.77L18.9 3zm-1.08 16.17h1.18L7.28 4.75H6.02l11.8 14.42z" />
    </svg>
  )
}

interface Mentor {
  name: string
  expertise: string
  rating: number
  bio: string
  images: string[]
}

const mentors: Mentor[] = [
  {
    name: 'Sarah Johnson',
    expertise: 'Full Stack Development',
    rating: 4.9,
    bio: '8+ years building production systems at scale, ex-Stripe. Specializes in React, Node.js, and high-performance microservices. Mentored over 50+ developers to senior roles.',
    images: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop'
    ],
  },
  {
    name: 'Alex Kumar',
    expertise: 'Cloud Architecture',
    rating: 4.8,
    bio: 'AWS-certified architect, has scaled infra for 3 YC startups. Passionate about serverless technologies, cost optimization, and building resilient distributed systems.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
    ],
  },
  {
    name: 'Emma Davis',
    expertise: 'Mobile Development',
    rating: 4.9,
    bio: 'Shipped 12+ apps to the App Store, iOS lead at a Series B startup. Expert in Swift, UI/UX animations, and scaling mobile teams from scratch.',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop'
    ],
  },
]

export default function Mentors() {
  // Start at index 0 immediately so it displays on the page load
  const [activeMentorIndex, setActiveMentorIndex] = useState<number>(0)

  // Auto-looping through all mentors directly on the page
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMentorIndex((prev) => (prev + 1) % mentors.length)
    }, 5000) // Transitions to the next mentor every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="mentors" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-primary/80 uppercase mb-4">
            Meet The Team
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#0B0B0F] tracking-tight mb-4">
            Learn from mentors{' '}
            <span className="text-primary">who've done it</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Real practitioners, not just instructors — people currently building at scale
          </p>
        </div>

        {/* --- Cycling Inline Block --- */}
        <div className="relative w-full max-w-4xl mx-auto rounded-[32px] shadow-2xl overflow-hidden h-[75vh] min-h-[600px] flex flex-col bg-gray-900">
          
          {/* Map through ALL mentors to create the crossfade effect inside the block */}
          {mentors.map((mentor, idx) => (
            <div
              key={mentor.name}
              className={`absolute inset-0 flex flex-col transition-opacity duration-1000 ease-in-out ${
                idx === activeMentorIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Mentor's Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${mentor.images[0]})` }}
              />
              
              {/* Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />
              <div className="absolute inset-0 bg-black/30" />

              {/* Scrollable Content Area */}
              <div className="relative z-20 flex-1 flex flex-col p-8 sm:p-12 overflow-y-auto scrollbar-hide">
                
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md w-fit mb-6 border border-white/10 mt-auto sm:mt-0">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-white">{mentor.rating}</span>
                </div>

                <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2 drop-shadow-md">
                  {mentor.name}
                </h3>
                <p className="text-xl font-medium text-indigo-300 mb-8 drop-shadow-sm">
                  {mentor.expertise}
                </p>
                
                <div className="prose prose-invert max-w-none mb-12">
                  <p className="text-white/90 text-[17px] leading-relaxed drop-shadow-sm">
                    {mentor.bio}
                  </p>
                  <p className="text-white/80 text-[17px] leading-relaxed mt-4">
                    In our 1-on-1 sessions, we will dive deep into your codebase, review architecture patterns, and outline actionable career growth strategies. Whether you are prepping for a senior technical interview or trying to unblock a massive architectural challenge, I am here to guide you through the exact frameworks I use in production.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex flex-wrap items-center justify-end gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <a
                      href="#"
                      aria-label={`${mentor.name} on LinkedIn`}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors pointer-events-auto"
                    >
                      <LinkedinIcon size={18} className="text-white" />
                    </a>
                    <a
                      href="#"
                      aria-label={`${mentor.name} on Twitter`}
                      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors pointer-events-auto"
                    >
                      <TwitterIcon size={18} className="text-white" />
                    </a>
                  </div>
                  
                  <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 text-base font-bold px-8 py-3.5 rounded-full transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transform duration-200 pointer-events-auto">
                    Book a session
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Optional: Pagination dots at the bottom to show progress */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
            {mentors.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMentorIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  idx === activeMentorIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}