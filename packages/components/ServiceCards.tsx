'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Service } from './types'

interface ServiceCardsProps {
  heading?: string
  subheading?: string
  services: Service[]
  variant?: 'grid' | 'alternating'
  columns?: 2 | 3 | 4
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
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
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">{heading}</h2>
            {subheading && <p className="mt-5 text-lg md:text-xl text-[var(--brand-muted)] max-w-2xl mx-auto">{subheading}</p>}
          </motion.div>
          <div className="space-y-24">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                {...fadeInUp}
                className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {service.image && (
                  <div className="flex-1 relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <Image src={service.image} alt={service.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <span className="font-mono text-sm text-[var(--brand-primary)] tracking-wider uppercase">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--brand-text)] mt-3 tracking-tight">
                    {service.name}
                  </h3>
                  <p className="mt-4 text-base md:text-lg text-[var(--brand-muted)] leading-relaxed">{service.description}</p>
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
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">{heading}</h2>
          {subheading && <p className="mt-5 text-lg md:text-xl text-[var(--brand-muted)] max-w-2xl mx-auto">{subheading}</p>}
        </motion.div>
        <motion.div {...staggerContainer} className={`grid gap-8 ${colClass}`}>
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={staggerItem}
              className="group bg-white rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {service.image && (
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
              )}
              <div className="p-8">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--brand-text)]">{service.name}</h3>
                <p className="mt-3 text-[var(--brand-muted)] text-base leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
