'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, BracesIcon, Briefcase, BriefcaseBusiness, FolderKanban, GalleryHorizontal, LayoutGrid, LucideWorkflow, PhoneCall, Presentation, Settings, Workflow, WorkflowIcon } from 'lucide-react'
import IntroVideo from '@/components/intro-video'

export default function Hero({ onOpenContact }: { onOpenContact?: () => void }) {
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
              <Button
                onClick={onOpenContact}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg h-12 px-8 font-medium flex items-center gap-2 hover-lift"
              >
                {/* Call icon */}
                <PhoneCall size={18} />
                Get in Touch <ArrowRight size={18} />
              </Button>
              <a
                href="/portfolio"
                className="border-2 border-primary text-primary hover:bg-primary/5 rounded-lg h-12 px-8 font-medium flex items-center gap-2 transition-all hover-lift"
              >
                <BriefcaseBusiness size={18} />
                See our work <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right Column - Intro Video */}
          <div className="flex items-center justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-border">
              <IntroVideo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}