'use client'

import { Code, BookOpen, ShoppingBag, BookMarked, ArrowRight } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom solutions built with modern tech stack',
      link: '#',
    },
    {
      icon: BookOpen,
      title: 'Live Mentorship & Courses',
      description: 'Real-time guidance from industry experts',
      link: '#',
    },
    {
      icon: ShoppingBag,
      title: 'Tech E-Store',
      description: 'Premium tools and resources for developers',
      link: '#',
    },
    {
      icon: BookMarked,
      title: 'Research Publishing',
      description: 'Publish and share your technical research',
      link: '#',
    },
  ]

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive services designed to accelerate your growth
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-border hover-lift"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <a
                  href={service.link}
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                >
                  Learn more <ArrowRight size={16} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
