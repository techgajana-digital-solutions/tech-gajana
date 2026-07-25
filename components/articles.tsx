'use client'

import { ArrowRight } from 'lucide-react'

export default function Articles() {
  const articles = [
    {
      category: 'Research',
      title: 'Building Scalable Microservices Architecture',
      excerpt: 'Deep dive into microservices patterns and best practices',
      author: 'Dr. Sarah Johnson',
      badge: 'Free',
    },
    {
      category: 'Tutorial',
      title: 'Modern React Performance Optimization',
      excerpt: 'Techniques to make your React apps blazingly fast',
      author: 'Alex Kumar',
      badge: 'Free',
    },
    {
      category: 'Research',
      title: 'AI Integration in Web Applications',
      excerpt: 'Practical guide to adding AI capabilities to your apps',
      author: 'Emma Davis',
      badge: 'Subscriber',
    },
  ]

  return (
    <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Latest Research & Articles
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay updated with cutting-edge tech insights
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-border hover-lift"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    {article.category}
                  </span>
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {article.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{article.title}</h3>
                <p className="text-muted-foreground mb-6">{article.excerpt}</p>

                {/* Author */}
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">By {article.author}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium text-sm"
                  >
                    Read Article <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
