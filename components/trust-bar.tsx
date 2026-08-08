'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Rocket, BookMarked, Star } from 'lucide-react'

interface Stat {
  icon: typeof Users
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

const stats: Stat[] = [
  { icon: Users, value: 500, suffix: '+', label: 'Students Mentored' },
  { icon: Rocket, value: 50, suffix: '+', label: 'Projects Delivered' },
  { icon: BookMarked, value: 20, suffix: '+', label: 'Research Papers Published' },
  { icon: Star, value: 4.8, decimals: 1, label: 'Average Rating' },
]

function useCountUp(target: number, decimals: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Number((target * eased).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [active, target, decimals])

  return value
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const Icon = stat.icon 
  const count = useCountUp(stat.value, stat.decimals ?? 0, active)

  return (
    <div className="relative bg-white rounded-2xl border border-border p-8 text-center hover-lift shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
      </div>
      <div className="mt-6">
        <div className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight tabular-nums">
          {stat.prefix}
          {count}
          {stat.suffix}
          {stat.icon === Star && (
            <span className="text-primary">★</span>
          )}
        </div>
        <p className="mt-3 text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {stat.label}
        </p>
      </div>
    </div>
  )
}

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/[0.03] to-background overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary uppercase mb-3">
            Trusted by Builders
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Numbers that speak for themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}