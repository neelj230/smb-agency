'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Photo, Stat } from './types'

interface AboutSectionProps {
  heading?: string
  story: string
  /** Optional owner/team photo */
  image?: Photo
  /** Optional stats row below the story */
  stats?: Stat[]
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export function AboutSection({ heading = 'About Us', story, image, stats }: AboutSectionProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className={`grid ${image ? 'md:grid-cols-2' : ''} gap-12 items-center`}>
          {image && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </motion.div>
          )}
          <motion.div {...fadeInUp}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
            <div className="mt-6 text-[var(--brand-muted)] leading-relaxed space-y-4">
              {story.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {stats && stats.length > 0 && (
              <div className="mt-10 grid grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="font-display text-3xl font-bold text-[var(--brand-primary)]">
                      {stat.prefix}
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-[var(--brand-muted)] mt-1">{stat.label}</p>
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
