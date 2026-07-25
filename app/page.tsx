'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
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
    <main className="bg-background">
      <Navbar isScrolled={isScrolled} />
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
    </main>
  )
}
