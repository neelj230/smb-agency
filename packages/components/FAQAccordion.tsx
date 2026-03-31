'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { FAQItem } from './types'

interface FAQAccordionProps {
  heading?: string
  items: FAQItem[]
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

function AccordionItem({ item, index, isOpen, toggle }: { item: FAQItem; index: number; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-black/10 last:border-0">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-[var(--brand-primary)]">{String(index + 1).padStart(3, '0')}</span>
          <h3 className="font-display text-lg font-semibold text-[var(--brand-text)]">{item.question}</h3>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
          {isOpen ? (
            <Minus className="w-4 h-4 text-[var(--brand-primary)]" />
          ) : (
            <Plus className="w-4 h-4 text-[var(--brand-primary)]" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-12 text-[var(--brand-muted)] leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQAccordion({ heading = 'Frequently Asked Questions', items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
        </motion.div>
        <motion.div {...fadeInUp}>
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
