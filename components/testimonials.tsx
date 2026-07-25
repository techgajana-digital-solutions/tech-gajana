'use client'

import { Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'TechGajana helped me transition into tech. The mentorship was invaluable and the community support was amazing.',
      name: 'Michael Chen',
      role: 'Junior Developer',
    },
    {
      quote:
        'Outstanding courses and real-world projects. I built my portfolio and landed my dream job within 6 months.',
      name: 'Priya Patel',
      role: 'Software Engineer',
    },
    {
      quote:
        'The e-store quality is exceptional. Every resource has been crucial to my development journey.',
      name: 'James Wilson',
      role: 'Full Stack Dev',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by students and professionals worldwide
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 border border-border hover-lift relative"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-border">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
