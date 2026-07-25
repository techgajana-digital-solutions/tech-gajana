'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  isScrolled: boolean
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">TechGajana</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </a>
            <a href="#courses" className="text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </a>
            <a href="#store" className="text-muted-foreground hover:text-foreground transition-colors">
              Store
            </a>
            <a href="#articles" className="text-muted-foreground hover:text-foreground transition-colors">
              Articles
            </a>
            <a href="#events" className="text-muted-foreground hover:text-foreground transition-colors">
              Events
            </a>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Login
            </a>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <div className="md:hidden bg-white border-b border-border py-4 space-y-4">
            <a href="#portfolio" className="block px-4 py-2 text-muted-foreground hover:text-foreground">
              Portfolio
            </a>
            <a href="#courses" className="block px-4 py-2 text-muted-foreground hover:text-foreground">
              Courses
            </a>
            <a href="#store" className="block px-4 py-2 text-muted-foreground hover:text-foreground">
              Store
            </a>
            <a href="#articles" className="block px-4 py-2 text-muted-foreground hover:text-foreground">
              Articles
            </a>
            <a href="#events" className="block px-4 py-2 text-muted-foreground hover:text-foreground">
              Events
            </a>
            <div className="px-4 pt-4 border-t border-border space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-foreground text-sm">
                Login
              </a>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
