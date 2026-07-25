'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Portfolio() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack marketplace solution with real-time inventory',
      tags: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      title: 'Mobile Learning App',
      description: 'Cross-platform educational application for interactive courses',
      tags: ['React Native', 'Firebase', 'TypeScript'],
    },
    {
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization and reporting system',
      tags: ['Next.js', 'Charts', 'API Integration'],
    },
  ]

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Recent Work
          </h2>
          <p className="text-lg text-muted-foreground">
            Showcase of our latest projects and achievements
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl overflow-hidden border border-border hover-lift"
            >
              {/* Placeholder Image */}
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary/30 mb-2">{index + 1}</div>
                  <p className="text-muted-foreground text-sm">Project Preview</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                  View Demo <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium text-lg"
          >
            View All Projects <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
