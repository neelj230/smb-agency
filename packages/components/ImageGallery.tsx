'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Photo } from './types'

interface ImageGalleryProps {
  heading?: string
  photos: Photo[]
  /** Grid auto-fill, horizontal scroll, or masonry-inspired */
  variant?: 'grid' | 'scroll' | 'masonry'
  columns?: 2 | 3 | 4
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export function ImageGallery({
  heading = 'Our Work',
  photos,
  variant = 'grid',
  columns = 3,
}: ImageGalleryProps) {
  if (variant === 'scroll') {
    const duplicated = [...photos, ...photos]
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          >
            {duplicated.map((photo, i) => (
              <div key={i} className="flex-shrink-0 w-80 aspect-[4/3] relative rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    )
  }

  if (variant === 'masonry') {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
          </motion.div>
          <motion.div {...fadeInUp} className="columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="break-inside-avoid rounded-xl overflow-hidden"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width || 600}
                  height={photo.height || 400}
                  className="w-full h-auto hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    )
  }

  // Default: grid
  const colClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
        </motion.div>
        <motion.div {...fadeInUp} className={`grid gap-4 ${colClass}`}>
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
