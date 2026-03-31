'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Service } from './types'

interface ServiceCardsProps {
  heading?: string
  subheading?: string
  services: Service[]
  /** Grid of cards with icons + images, or alternating rows */
  variant?: 'grid' | 'alternating'
  columns?: 2 | 3 | 4
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export function ServiceCards({
  heading = 'Our Services',
  subheading,
  services,
  variant = 'grid',
  columns = 3,
}: ServiceCardsProps) {
  const colClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns]

  if (variant === 'alternating') {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
            {subheading && <p className="mt-4 text-lg text-[var(--brand-muted)] max-w-2xl mx-auto">{subheading}</p>}
          </motion.div>
          <div className="space-y-20">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                {...fadeInUp}
                className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {service.image && (
                  <div className="flex-1 relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                    <Image src={service.image} alt={service.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <span className="font-mono text-sm text-[var(--brand-primary)] tracking-wide">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--brand-text)] mt-2">
                    {service.name}
                  </h3>
                  <p className="mt-4 text-[var(--brand-muted)] leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Default: grid
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
          {subheading && <p className="mt-4 text-lg text-[var(--brand-muted)] max-w-2xl mx-auto">{subheading}</p>}
        </motion.div>
        <motion.div {...staggerContainer} className={`grid gap-6 ${colClass}`}>
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={staggerItem}
              className="group bg-[var(--brand-bg)] rounded-2xl overflow-hidden border border-black/5 hover:shadow-lg transition-shadow"
            >
              {service.image && (
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-[var(--brand-text)]">{service.name}</h3>
                <p className="mt-2 text-[var(--brand-muted)] text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
