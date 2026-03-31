'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ProcessStep } from './types'

interface ProcessStepsProps {
  heading?: string
  subheading?: string
  steps: ProcessStep[]
  /** Horizontal numbered grid or vertical timeline */
  variant?: 'grid' | 'timeline'
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export function ProcessSteps({
  heading = 'How It Works',
  subheading,
  steps,
  variant = 'grid',
}: ProcessStepsProps) {
  if (variant === 'timeline') {
    return (
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
            {subheading && <p className="mt-4 text-lg text-[var(--brand-muted)]">{subheading}</p>}
          </motion.div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--brand-primary)]/20" />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div key={i} {...fadeInUp} className="flex gap-6">
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-display font-bold">
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-display text-xl font-semibold text-[var(--brand-text)]">{step.title}</h3>
                    <p className="mt-2 text-[var(--brand-muted)]">{step.description}</p>
                    {step.image && (
                      <div className="mt-4 relative aspect-[16/9] rounded-xl overflow-hidden">
                        <Image src={step.image} alt={step.title} fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default: horizontal grid
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
          {subheading && <p className="mt-4 text-lg text-[var(--brand-muted)] max-w-2xl mx-auto">{subheading}</p>}
        </motion.div>
        <motion.div
          {...staggerContainer}
          className={`grid gap-8 md:grid-cols-2 ${steps.length >= 4 ? 'lg:grid-cols-4' : `lg:grid-cols-${steps.length}`}`}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={staggerItem} className="relative">
              <span className="font-mono text-5xl font-bold text-[var(--brand-primary)]/20">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl font-semibold text-[var(--brand-text)] mt-2">{step.title}</h3>
              <p className="mt-2 text-[var(--brand-muted)] text-sm">{step.description}</p>
              {step.image && (
                <div className="mt-4 relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={step.image} alt={step.title} fill className="object-cover" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
