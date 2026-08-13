'use client'

import { useState } from 'react'
import { Quote } from 'lucide-react'

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'It is a great place for students and beginners who want to enhance their technical knowledge,gain real world experience and grow both personally and professionally.overall ,a highly recommended place for learning,skill development.',
      name: 'Abinaya',
      role: 'Data Analyst',
    },
    {
      quote:
        '\"Finally, a platform for real tech solutions\"TechGajana\'s approach to offering both services and software tools is brilliant. As someone who juggles freelance work and personal learning, this feels like a one-stop tech companion.',
      name: 'Dinesh',
      role: 'Developer',
    },
    {
      quote:
        'I had a really great learning experience at TECHGAJANA! ❤️They taught programming from the very basics, starting completely from scratch, and gradually took us into deeper concepts. The teaching was clear, practical, and easy to understand. What I really liked is that they focused not just on learning the syntax but also on understanding the concepts and developing problem-solving skills. The guidance and support throughout the learning process were really helpful. ❤️ I’m truly grateful for the knowledge and confidence I gained through TECHGAJANA. Highly recommended for anyone who wants to learn programming from scratch to depth! 💯',
      name: 'Madhumitha',
      role: 'Full Stack Developer',
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
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        {/* <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 border border-border hover-lift relative"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                {testimonial.quote}
              </p>

              <div className="pt-6 border-t border-border">
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}


// Sub-component to manage "Read More" state independently for each card
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Set character threshold limit for truncation
  const CHARACTER_LIMIT = 180
  const isLongText = testimonial.quote.length > CHARACTER_LIMIT

  // Compute text to show based on expansion state
  const displayedText = isLongText && !isExpanded 
    ? `${testimonial.quote.slice(0, CHARACTER_LIMIT)}...` 
    : testimonial.quote

  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm relative flex flex-col justify-between h-full">
      <div>
        {/* Quote Icon */}
        <Quote className="w-10 h-10 text-blue-500/10 mb-4" />

        {/* Quote Content */}
        <p className="text-slate-600 mb-4 leading-relaxed italic transition-all duration-300">
          {displayedText}
          
          {isLongText && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-blue-600 hover:text-blue-700 font-semibold text-sm underline inline-block not-italic focus:outline-none"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </p>
      </div>

      {/* Author Details */}
      <div className="pt-6 mt-4 border-t border-slate-200">
        <p className="font-bold text-slate-900">{testimonial.name}</p>
        <p className="text-sm text-slate-500">{testimonial.role}</p>
      </div>
    </div>
  )
}