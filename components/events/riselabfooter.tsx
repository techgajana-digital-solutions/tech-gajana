'use client'

import Link from 'next/link'
import { Poppins, Caveat } from 'next/font/google'
import {
  Mail,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react'
import { LuYoutube, LuMail, LuMessageCircle, LuArrowUpRight } from 'react-icons/lu'; // Lucide
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'; // FontAwesome Brands


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] })
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '600', '700'] })

const PLUM = '#704A74'
const PLUM_DEEPER = '#2C1730'

// ---------------------------------------------------------------------------
// Content — pulled from the real TechGajana site copy, not placeholders
// ---------------------------------------------------------------------------
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Events', href: '/events' },
]

const services = [
  { label: 'Digital Transformation', href: '/services#digital-transformation' },
  { label: 'Live Mentorship & Courses', href: '/services#mentorship' },
  { label: 'Tech E-Store', href: '/services#e-store' },
  { label: 'Research Publishing', href: '/services#research' },
]

// PLACEHOLDER — swap in the real social URLs
const socials = [
  { icon: <FaInstagram size={16} />, href: 'https://instagram.com/techgajana', label: 'Instagram' },
  { icon: <FaFacebook size={16} />, href: 'https://facebook.com/techgajana', label: 'Facebook' },
  { icon: <FaLinkedin size={16} />, href: 'https://linkedin.com/company/techgajana', label: 'LinkedIn' },
  { icon: <LuYoutube size={16} />, href: 'https://www.youtube.com/@techgajana', label: 'YouTube' },
]

export default function RiseLabFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={poppins.className} style={{ backgroundColor: PLUM_DEEPER }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10 lg:gap-8 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 cursor-pointer group">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white border-2 transition-transform duration-300 group-hover:scale-105"
                style={{ borderColor: '#ffffff30', backgroundColor: PLUM }}
              >
                TG
              </div>
              <div className="leading-tight">
                <p className="text-base font-extrabold text-white">TechGajana</p>
                <p className="text-[11px] tracking-wide" style={{ color: '#B7A5B9' }}>Learn · Build · Grow</p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: '#C8B9CA' }}>
              Software, mentorship, and tools for builders — comprehensive tech solutions
              tailored for developers and students.
            </p>

            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer hover:scale-110 active:scale-95"
                  style={{ borderColor: '#ffffff25', color: '#fff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PLUM)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-bold tracking-[0.15em] mb-5" style={{ color: '#8C7A8E' }}>
              QUICK LINKS
            </p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    style={{ color: '#D8CBDA' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#D8CBDA')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold tracking-[0.15em] mb-5" style={{ color: '#8C7A8E' }}>
              SERVICES
            </p>
            <ul className="space-y-3">
              {services.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm cursor-pointer transition-colors"
                    style={{ color: '#D8CBDA' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#D8CBDA')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <p className="text-xs font-bold tracking-[0.15em] mb-5" style={{ color: '#8C7A8E' }}>
              GET IN TOUCH
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@techgajana.org"
                className="flex items-center gap-2.5 text-sm cursor-pointer transition-colors group"
                style={{ color: '#D8CBDA' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#D8CBDA')}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ backgroundColor: '#ffffff10', color: 'inherit' }}
                >
                  <Mail size={14} />
                </span>
                info@techgajana.org
              </a>
              <button
                className="flex items-center gap-2.5 text-sm cursor-pointer transition-colors group w-full text-left"
                style={{ color: '#D8CBDA' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#D8CBDA')}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#ffffff10' }}
                >
                  <MessageCircle size={14} />
                </span>
                Chat with support
              </button>
            </div>

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-all hover:gap-2.5"
              style={{ color: '#fff' }}
            >
              See all events <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ backgroundColor: '#ffffff14' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs order-2 sm:order-1" style={{ color: '#8C7A8E' }}>
            © {year} TechGajana. All rights reserved.
          </p>
          <p className={`${caveat.className} text-2xl order-1 sm:order-2 text-white`}>
            Code Today. Lead Tomorrow.
          </p>
        </div>
      </div>
    </footer>
  )
}