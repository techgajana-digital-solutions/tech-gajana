'use client'

import { ArrowRight, Mail, MessageCircle, GraduationCap, Layers } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B0B0F] overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-primary/90 uppercase mb-6">
            Let's Build Something
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-4 leading-[1.1]">
            Ready to get started?
          </h2>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking to learn, build, and Services. TechGajana has
            the right path for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col items-start">
            <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
              <GraduationCap size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Learn from mentors
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Live sessions with people currently building at scale — real
              guidance, not recycled slides.
            </p>
            <button className="group mt-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-primary text-[#0B0B0F] hover:text-white rounded-full h-12 px-7 font-semibold text-sm transition-colors">
              Book a class
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col items-start">
            <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center mb-5">
              <Layers size={20} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Explore our services
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              From custom software to research publishing — see everything
              TechGajana can build with you.
            </p>
            <button className="group mt-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 rounded-full h-12 px-7 font-semibold text-sm transition-colors">
              Explore services
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/10 text-sm text-white/40">
          <a
            href="mailto:hello@techgajana.com"
            className="inline-flex items-center gap-2 hover:text-white/70 transition-colors"
          >
            <Mail size={15} />
            hello@techgajana.com
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
          <a
            href="#"
            className="inline-flex items-center gap-2 hover:text-white/70 transition-colors"
          >
            <MessageCircle size={15} />
            Chat with support
          </a>
        </div>
      </div>
    </section>
  )
}