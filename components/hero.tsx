'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight">
                Software, Mentorship, and Tools for{' '}
                <span className="text-primary">Builders</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Comprehensive tech solutions tailored for developers and students. From professional software development and live mentorship to cutting-edge tech products and research publishing.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg h-12 px-8 font-medium flex items-center gap-2 hover-lift">
                Book a Free Session
              </Button>
              <a
                href="#portfolio"
                className="border-2 border-primary text-primary hover:bg-primary/5 rounded-lg h-12 px-8 font-medium flex items-center gap-2 transition-all hover-lift"
              >
                See our work <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-primary/20 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-48 h-48 bg-accent/20 rounded-full blur-2xl absolute top-1/4 right-0 -translate-y-1/4"></div>
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-2xl shadow-lg border border-border">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <div className="w-4 h-4 bg-accent rounded"></div>
                      <div className="w-4 h-4 bg-primary/60 rounded"></div>
                      <div className="w-4 h-4 bg-accent/60 rounded"></div>
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <div className="w-4 h-4 bg-accent/40 rounded"></div>
                      <div className="w-4 h-4 bg-primary/40 rounded"></div>
                      <div className="w-4 h-4 bg-accent rounded"></div>
                      <div className="w-4 h-4 bg-primary/20 rounded"></div>
                    </div>
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
