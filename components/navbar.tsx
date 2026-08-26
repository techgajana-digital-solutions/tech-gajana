'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Courses', href: '/courses' },
  { label: 'Store', href: '/store' },
  { label: 'Articles', href: '/articles' },
  { label: 'Events', href: '/events' },
]

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isOverDarkSection, setIsOverDarkSection] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const mediaQuery = window.matchMedia('(max-width: 767px)')
    let observer: IntersectionObserver | null = null

    const observeSections = () => {
      observer?.disconnect()
      setIsOverDarkSection(false)

      if (!mediaQuery.matches) return

      const navBounds = nav.getBoundingClientRect()
      const bottomInset = Math.max(0, window.innerHeight - navBounds.bottom)
      observer = new IntersectionObserver(
        (entries) => {
          setIsOverDarkSection(entries.some((entry) => entry.isIntersecting))
        },
        {
          rootMargin: `-${navBounds.top}px 0px -${bottomInset}px 0px`,
          threshold: 0,
        }
      )

      document
        .querySelectorAll<HTMLElement>('[data-navbar-theme="dark"]')
        .forEach((section) => observer?.observe(section))
    }

    observeSections()
    mediaQuery.addEventListener('change', observeSections)
    window.addEventListener('resize', observeSections)

    return () => {
      observer?.disconnect()
      mediaQuery.removeEventListener('change', observeSections)
      window.removeEventListener('resize', observeSections)
    }
  }, [])

  return (
    <nav ref={navRef} className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[80vw]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center justify-between gap-4 px-4 sm:px-6 py-3 rounded-full border backdrop-blur-xl shadow-2xl transition-colors duration-300 md:bg-white/5 md:border-white/10 ${
          isOverDarkSection
            ? 'bg-[#0B0B0F]/90 border-white/20'
            : 'bg-white/80 border-black/10'
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <img src="/tg.png" alt="TechGajana" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-primary hidden sm:inline">TechGajana</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  isActive
                    ? "text-white bg-primary"
                    : "text-slate-800 hover:bg-accent"
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Right actions */}
        {/* <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <a
            href="/login"
            className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
          >
            Login
          </a>
          <a
            href="/signup"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
          >
            Sign Up
          </a>
        </div> */}

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`md:hidden flex-shrink-100 p-2 rounded-full hover:bg-white/5 transition-colors ${
            isOverDarkSection ? 'text-white' : 'text-[#815901]'
          }`}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      {/* Mobile menu panel */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden mt-3 p-4 rounded-3xl border space-y-1 ${
            isOverDarkSection
              ? 'bg-white border-white/10'
              : 'bg-slate-500/30 border-black/10'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium rounded-2xl transition-colors ${
                isOverDarkSection
                  ? 'text-white bg-white/10'
                  : 'text-[#815901] bg-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          {/* <div className="pt-3 mt-3 border-t border-white/10 space-y-2 px-4">
            <a href="/login" className="block text-sm text-slate-400 hover:text-white">
              Login
            </a>
            <a
              href="/signup"
              className="block text-center bg-white text-slate-950 text-sm font-semibold py-2.5 rounded-full"
            >
              Sign Up
            </a>
          </div> */}
        </motion.div>
      )}
    </nav>
  )
}