'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Photo, Stat } from './types'

interface AboutSectionProps {
  heading?: string
  story: string
  image?: Photo
  stats?: Stat[]
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
}

export function AboutSection({ heading = 'About Us', story, image, stats }: AboutSectionProps) {
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`grid ${image ? 'md:grid-cols-2' : ''} gap-16 items-center`}>
          {image && (
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5"
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </motion.div>
          )}
          <motion.div {...fadeInUp}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">{heading}</h2>
            <div className="mt-8 text-[var(--brand-muted)] text-base md:text-lg leading-relaxed space-y-5 line-clamp-6">
              {story.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {stats && stats.length > 0 && (
              <div className="mt-12 grid grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="font-display text-3xl md:text-4xl font-bold text-[var(--brand-primary)]">
                      {stat.prefix}
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-[var(--brand-muted)] mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
