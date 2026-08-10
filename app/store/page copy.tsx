'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Search, Sparkles, ShoppingBag, X, Plus, Minus, ArrowUpRight, Layers, Terminal, Zap } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

// ---------------------------------------------------------------------------
// Products — TechGajana's own Tech E-Store catalog
// ---------------------------------------------------------------------------
interface Product {
  id: string
  title: string
  category: string
  description: string
  price: number
  icon: typeof Layers
  image: string
}

const categories = ['All', 'Boilerplates', 'Design', 'Reference', 'Animation'] as const

const products: Product[] = [
  {
    id: 'nextjs-saas',
    title: 'Enterprise Next.js SaaS Boilerplate',
    category: 'Boilerplates',
    description: 'A complete, scalable foundation with auth, billing, and multi-tenant support pre-configured.',
    price: 249,
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'wireframe-kit',
    title: 'Pro UI/UX Wireframe Kit',
    category: 'Design',
    description: '500+ components for rapid Figma prototyping across web and mobile.',
    price: 79,
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'linux-cheatsheet',
    title: 'Advanced Linux Systems Admin Cheat Sheet',
    category: 'Reference',
    description: 'An interactive, digital command reference guide for daily ops work.',
    price: 19,
    icon: Terminal,
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'framer-motion-mastery',
    title: 'Framer Motion Mastery',
    category: 'Animation',
    description: 'Premium component animation library access, built for production.',
    price: 59,
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
]

interface CartItem extends Product {
  qty: number
}

// ---------------------------------------------------------------------------
// Magnetic Button — used for the primary "Add to cart" action per card
// ---------------------------------------------------------------------------
function MagneticButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative z-50 inline-flex items-center gap-2 bg-white text-slate-950 text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,1)]"
    >
      {children}
    </motion.button>
  )
}

// ---------------------------------------------------------------------------
// 3D Tilt Product Card
// ---------------------------------------------------------------------------
function ProductCard3D({
  product,
  onAdd,
}: {
  product: Product
  onAdd: (p: Product) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-5deg', '5deg'])

  const glareX = useTransform(mouseX, (v) => `${v}px`)
  const glareY = useTransform(mouseY, (v) => `${v}px`)
  const glareOpacity = useTransform(xSpring, [-0.5, 0, 0.5], [0.3, 0, 0.3])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    x.set(clientX / rect.width - 0.5)
    y.set(clientY / rect.height - 0.5)
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Icon = product.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
      className="group relative [perspective:1200px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative flex flex-col h-full rounded-[2rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl overflow-hidden shadow-2xl"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: glareOpacity,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.2) 0%, transparent 50%)`
            ),
          }}
        />

        <div className="relative w-full h-48 overflow-hidden rounded-t-[2rem]">
          <motion.div
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <Icon size={15} className="text-primary" />
            </div>
            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-emerald-400 text-xs font-mono tracking-wider">
              {product.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-grow p-6 sm:p-8" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <span className="text-2xl font-bold text-white font-mono">
              &#8377;{product.price}
            </span>

            <MagneticButton onClick={() => onAdd(product)}>
              <span>Add to cart</span>
              <ArrowUpRight size={16} />
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Slide-out cart drawer — dark themed to match this page's palette
// ---------------------------------------------------------------------------
function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
}: {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQty: (id: string, delta: number) => void
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">
                Your Cart ({items.reduce((n, i) => n + i.qty, 0)})
              </h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {items.length === 0 ? (
                <p className="text-slate-500 text-sm text-center mt-12">
                  Your cart is empty.
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div
                      className="w-16 h-20 rounded-lg bg-cover bg-center bg-white/5 flex-shrink-0"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 mb-2 font-mono">
                        ${item.price}
                      </p>
                      <div className="inline-flex items-center gap-3 border border-white/10 rounded-full px-3 py-1">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center text-white">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-white font-mono">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-6">
                <div className="flex items-center justify-between mb-1 text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-600 mb-5">
                  Instant digital delivery — no shipping required
                </p>
                <button className="w-full bg-white-500 hover:bg-primary text-[#0a0a0a] font-semibold py-4 rounded-full transition-colors">
                  Checkout — ${subtotal.toFixed(2)}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Main store page
// ---------------------------------------------------------------------------
export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const handleAdd = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setDrawerOpen(true)
  }

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    )
  }

  const cartCount = cart.reduce((n, i) => n + i.qty, 0)

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[#0a0a0a] text-slate-50 pt-32 pb-32 overflow-hidden selection:bg-emerald-500 selection:text-[#0a0a0a]">
        {/* Animated background mesh */}
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter mb-6">
              Tools built{' '}
              <span className="text-transparent bg-clip-text bg-primary">
                for builders
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Boilerplates, design systems, and references — curated for
              people who ship production code.
            </p>

            {/* Cart trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ShoppingBag size={16} className="text-primary" />
              <span className="text-sm font-medium text-white">
                Cart ({cartCount})
              </span>
            </button>
          </motion.div>

          {/* Sticky glass command bar */}
          <div className="sticky top-24 z-30 mx-auto w-full max-w-4xl mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-center gap-4 p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
            >
              <div className="relative w-full sm:w-auto flex-grow flex items-center px-4">
                <Search size={18} className="text-slate-400 mr-2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none border-none ring-0 py-3"
                />
              </div>

              <div className="flex items-center overflow-x-auto w-full sm:w-auto no-scrollbar gap-1 pr-2 pb-2 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors rounded-full z-10 ${
                      activeCategory === cat ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {activeCategory === cat && (
                      <motion.div
                        layoutId="activeStoreCategory"
                        className="absolute inset-0 bg-white rounded-full -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <ProductCard3D key={product.id} product={product} onAdd={handleAdd} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <p className="text-slate-500 mb-4 text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setQuery('')
                  setActiveCategory('All')
                }}
                className="text-emerald-400 hover:text-primary font-mono text-sm tracking-wider uppercase underline underline-offset-4"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <CartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
      />

      <Footer />
    </>
  )
}