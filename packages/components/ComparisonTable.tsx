'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface ComparisonTableProps {
  heading?: string
  withUs: string[]
  withoutUs: string[]
  ourLabel?: string
  theirLabel?: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export function ComparisonTable({
  heading = 'Why Choose Us',
  withUs,
  withoutUs,
  ourLabel = 'With Us',
  theirLabel = 'Without Us',
}: ComparisonTableProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
        </motion.div>
        <motion.div {...fadeInUp} className="grid md:grid-cols-2 gap-6">
          {/* Without Us */}
          <div className="bg-gray-100 rounded-2xl p-8">
            <h3 className="font-display text-lg font-semibold text-gray-500 mb-6">{theirLabel}</h3>
            <div className="space-y-4">
              {withoutUs.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* With Us */}
          <div className="bg-[var(--brand-primary)] text-white rounded-2xl p-8">
            <h3 className="font-display text-lg font-semibold mb-6">{ourLabel}</h3>
            <div className="space-y-4">
              {withUs.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
