'use client'

import { useState } from 'react'
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

export default function DarkNavbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
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
                    : "text-slate-400 hover:text-white hover:bg-primary/10"
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <a
            href="/login"
            className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
          >
            Login
          </a>
          <a
            href="/signup"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white flex-shrink-0"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      {/* Mobile menu panel */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-3 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 mt-3 border-t border-white/10 space-y-2 px-4">
            <a href="/login" className="block text-sm text-slate-400 hover:text-white">
              Login
            </a>
            <a
              href="/signup"
              className="block text-center bg-white text-slate-950 text-sm font-semibold py-2.5 rounded-full"
            >
              Sign Up
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  )
}