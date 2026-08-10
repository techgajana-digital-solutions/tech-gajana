'use client'

import { useEffect, useRef, useState } from 'react'
import { Clock, BookOpen, ArrowRight } from 'lucide-react'

interface Article {
  category: string
  title: string
  excerpt: string
  author: string
  authorInitial: string
  date: string
  readTime: string
  badge: 'Free' | 'Subscriber'
  image: string
}

const articles: Article[] = [
  {
    category: 'Research',
    title: 'Building Scalable Microservices Architecture',
    excerpt: 'Deep dive into microservices patterns and best practices for production systems. Learn how to decouple services effectively.',
    author: 'Dr. Sarah Johnson',
    authorInitial: 'S',
    date: 'Jul 24, 2026',
    readTime: '8 min read',
    badge: 'Free',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Tutorial',
    title: 'Modern React Performance Optimization',
    excerpt: 'Techniques to make your React apps blazingly fast, from profiling to code splitting. Master the art of the smooth UI.',
    author: 'Alex Kumar',
    authorInitial: 'A',
    date: 'Jul 18, 2026',
    readTime: '6 min read',
    badge: 'Free',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'Research',
    title: 'AI Integration in Web Applications',
    excerpt: 'A practical guide to adding real AI capabilities to your apps without the hype. Build smarter, context-aware products.',
    author: 'Emma Davis',
    authorInitial: 'E',
    date: 'Jul 09, 2026',
    readTime: '11 min read',
    badge: 'Subscriber',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
  },
]

function StackedBookCard({ article, index, totalCards }: { article: Article; index: number; totalCards: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  
  // Alternate layout visually (image left vs right), but the 3D hinge will consistently swing from the left to right
  const isEven = index % 2 === 0
  
  // Sticky logic: offset slightly more for each card so the tops peek out like a deck
  const stickyTop = `calc(15vh + ${index * 40}px)`
  const zIndex = index * 10
  
  // 3D Hinge logic: All pages hinge on the RIGHT (the "spine") and swing in from the LEFT
  const transformOrigin = 'origin-right'
  // Starts angled up on the left side (negative rotation), slightly lower on the Y axis
  const hiddenRotation = '[transform:rotateY(-75deg)_translateY(4rem)_scale(0.95)] opacity-0'
  // Lands flat on top of the deck
  const visibleRotation = '[transform:rotateY(0deg)_translateY(0)_scale(1)] opacity-100'

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          // Disconnect so it stays flat and doesn't flip back closed when scrolling past
          observer.disconnect()
        }
      },
      // Trigger the page turn right before it hits the sticky pinning point
      { threshold: 0.20 } 
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    // The outer div handles the sticky stacking and provides 3D perspective
    <div
      className="sticky w-full max-w-5xl mx-auto pb-12"
      style={{ top: stickyTop, zIndex, perspective: '3000px' }}
    >
      {/* The inner div handles the left-to-right page turn animation and glassmorphic styling */}
      <div 
        ref={cardRef}
        className={`group relative flex flex-col md:flex-row bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[32px] overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_30px_80px_-15px_rgba(79,70,229,0.25)] ${
          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
        } ${transformOrigin} ${
          visible ? visibleRotation : hiddenRotation
        }`}
      >
        {/* Book Spine Divider */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent z-10 pointer-events-none" />
        <div className="hidden md:block absolute top-10 bottom-10 left-1/2 w-[1px] -translate-x-1/2 bg-black/[0.08] z-10 pointer-events-none" />

        {/* Page 1: Visuals (Image Side) */}
        <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 relative bg-white/40">
          <div className="w-full h-64 md:h-full min-h-[350px] relative rounded-[20px] overflow-hidden shadow-inner">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url(${article.image})` }}
            />
            {/* Inner page shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            <div className="absolute top-5 left-5 flex gap-2">
              <span
                className={`inline-block px-4 py-1.5 text-xs font-bold tracking-wide rounded-full backdrop-blur-md shadow-sm ${
                  article.badge === 'Free'
                    ? 'bg-emerald-400/90 text-emerald-950'
                    : 'bg-indigo-600/90 text-white'
                }`}
              >
                {article.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Page 2: Content (Text Side) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-white/50">
          <div className="flex items-center gap-3 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
            <span>{article.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="inline-flex items-center gap-1.5 text-gray-600">
              <Clock size={14} /> {article.readTime}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 leading-[1.15] group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-8 font-medium">
            {article.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-900/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md border-2 border-white">
                {article.authorInitial}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{article.author}</p>
                <p className="text-xs text-gray-500 font-semibold">{article.date}</p>
              </div>
            </div>

            <a
              href="/articles"
              className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-indigo-600 hover:scale-110 transition-all shadow-lg"
              aria-label="Read article"
            >
              <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Articles() {
  return (
    <section id="articles" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      
      {/* Ambient Background Blobs for Backdrop Blur effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-emerald-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
         
          <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            The Knowledge <span className="text-transparent bg-clip-text bg-primary">Library</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Scroll down to explore our latest research, tutorials, and deep dives curated by industry experts.
          </p>
        </div>

        {/* Stacked + Left-to-Right Page Turn Container */}
        <div className="flex flex-col relative pb-32">
          {articles.map((article, index) => (
            <StackedBookCard 
              key={article.title} 
              article={article} 
              index={index} 
              totalCards={articles.length} 
            />
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-12 relative z-50">
          <a
            href="/articles"
            className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-gray-200 text-gray-900 hover:text-indigo-600 hover:border-indigo-200 transition-all font-bold text-lg px-8 py-4 rounded-full shadow-md hover:shadow-lg"
          >
            Explore the Articles <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}