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
import ContactModal from '@/components/contact-modal'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <Navbar />
      <Hero onOpenContact={() => setIsContactModalOpen(true)} />
      <TrustBar />
      <Services />
      <Portfolio />
      {/* <Mentors onOpenContact={() => setIsContactModalOpen(true)} /> */}
      <Testimonials />
      <Articles />
      <EventsBanner />
      <FinalCTA onOpenContact={() => setIsContactModalOpen(true)} />
      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </ReactLenis>
  )
}
