'use client'

import { motion } from 'framer-motion'
import type { MenuItem } from './types'

interface MenuDisplayProps {
  heading?: string
  items: MenuItem[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function MenuDisplay({ heading = 'Our Menu', items }: MenuDisplayProps) {
  const categories = [...new Set(items.map((item) => item.category))]

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-6xl font-bold text-[var(--brand-text)] text-center mb-16"
        >
          {heading}
        </motion.h2>

        <div className="space-y-16">
          {categories.map((category) => (
            <motion.div
              key={category}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeUp}
                className="font-display text-2xl font-bold text-[var(--brand-primary)] uppercase tracking-wider mb-8 border-b border-[var(--brand-primary)]/20 pb-3"
              >
                {category}
              </motion.h3>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <motion.div key={item.name} variants={fadeUp} className="flex justify-between items-baseline gap-4">
                      <div className="flex-1">
                        <h4 className="font-display text-xl md:text-2xl font-semibold text-[var(--brand-text)]">
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-sm text-[var(--brand-muted)] mt-1">{item.description}</p>
                        )}
                      </div>
                      {item.price && (
                        <span className="font-mono text-lg font-semibold text-[var(--brand-primary)] shrink-0">
                          {item.price}
                        </span>
                      )}
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
