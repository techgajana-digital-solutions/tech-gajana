'use client'

import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

export default function Mentors() {
  const mentors = [
    {
      name: 'Sarah Johnson',
      expertise: 'Full Stack Development',
      rating: 4.9,
    },
    {
      name: 'Alex Kumar',
      expertise: 'Cloud Architecture',
      rating: 4.8,
    },
    {
      name: 'Emma Davis',
      expertise: 'Mobile Development',
      rating: 4.9,
    },
  ]

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Learn From Industry Mentors
          </h2>
          <p className="text-lg text-muted-foreground">
            Expert guidance from experienced professionals
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-border hover-lift text-center"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {mentor.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-foreground mb-2">{mentor.name}</h3>
              <p className="text-primary font-medium mb-4">{mentor.expertise}</p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(mentor.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">{mentor.rating}</span>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                Book a Session
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
