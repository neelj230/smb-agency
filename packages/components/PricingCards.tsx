'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { PricingTier } from './types'

interface PricingCardsProps {
  heading?: string
  subheading?: string
  tiers: PricingTier[]
  /** 'standard' = clean 3-tier cards, 'nature-highlight' = thematic indicator on recommended tier */
  variant?: 'standard' | 'nature-highlight'
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function PricingCards({
  heading = 'Pricing',
  subheading,
  tiers,
  variant = 'standard',
}: PricingCardsProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-[var(--brand-muted)] max-w-2xl mx-auto">{subheading}</p>
          )}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 items-stretch"
        >
          {tiers.map((tier, i) => {
            const isHighlighted = tier.highlighted ?? i === 1
            return (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  isHighlighted
                    ? 'bg-[var(--brand-primary)] text-white scale-[1.03] shadow-xl z-10'
                    : 'bg-[var(--brand-bg-alt,#f5f5f5)] text-[var(--brand-text)]'
                }`}
              >
                {isHighlighted && variant === 'nature-highlight' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[var(--brand-primary)] text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}
                {isHighlighted && variant === 'standard' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--brand-accent)] text-[var(--brand-text)] text-xs font-semibold px-4 py-1 rounded-full">
                    Recommended
                  </div>
                )}

                <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                <div className="mt-4">
                  <span className="font-display text-4xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className={`text-sm ${isHighlighted ? 'text-white/70' : 'text-[var(--brand-muted)]'}`}>
                      /{tier.period}
                    </span>
                  )}
                </div>
                {tier.description && (
                  <p className={`mt-3 text-sm ${isHighlighted ? 'text-white/80' : 'text-[var(--brand-muted)]'}`}>
                    {tier.description}
                  </p>
                )}

                <ul className="mt-8 space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isHighlighted ? 'text-white' : 'text-[var(--brand-primary)]'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 block text-center py-3 px-6 rounded-lg font-semibold transition-opacity hover:opacity-90 ${
                    isHighlighted
                      ? 'bg-white text-[var(--brand-primary)]'
                      : 'bg-[var(--brand-primary)] text-white'
                  }`}
                >
                  {tier.cta}
                </a>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
