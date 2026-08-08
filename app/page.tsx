'use client'

import { useState, useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import TrustBar from '@/components/trust-bar'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import Mentors from '@/components/mentors'
import Testimonials from '@/components/testimonials'
import Articles from '@/components/articles'
import EventsBanner from '@/components/events-banner'
import FinalCTA from '@/components/final-cta'
import Footer from '@/components/footer'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {/* <main className="bg-background max-w-[100vw]"> */}
        <Navbar />
        <Hero />
        <TrustBar />
        <Services />
        <Portfolio />
        <Mentors />
        <Testimonials />
        <Articles />
        <EventsBanner />
        <FinalCTA />
        <Footer />
      {/* </main> */}
    </ReactLenis>
  )
}
