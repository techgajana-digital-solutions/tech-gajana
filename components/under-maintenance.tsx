'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Wrench } from 'lucide-react'

export default function UnderMaintenance() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl p-8 sm:p-10 lg:p-12"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary mb-6">
          <Wrench size={24} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80 mb-4">
          Under Maintenance
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          This page is being updated.
        </h1>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed">
          We’re polishing this section and it will be available again soon. Please check back later.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
