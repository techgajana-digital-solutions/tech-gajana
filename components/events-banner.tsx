'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

export default function EventsBanner() {
  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary via-primary/90 to-accent rounded-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 w-fit">
                <Calendar size={18} />
                <span className="text-sm font-medium">Upcoming Event</span>
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  Tech Summit 2024
                </h2>
                <p className="text-xl text-white/90 max-w-lg">
                  Join industry leaders for workshops, networking, and hands-on learning sessions.
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-lg font-medium">
                  📅 July 15-17, 2024 | 🌍 Virtual & In-Person
                </p>
                <p className="text-white/80">
                  Early bird registration now open — limited spots available!
                </p>
              </div>
              <Button className="bg-white hover:bg-white/90 text-primary rounded-lg h-12 px-8 font-medium">
                Register Now
              </Button>
            </div>

            {/* Right Visual */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-64">
                <div className="absolute inset-0 bg-white/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full">
                      <Calendar size={40} className="text-white" />
                    </div>
                    <p className="text-white/80 text-sm font-medium">Event Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
