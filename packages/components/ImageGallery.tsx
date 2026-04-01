'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Photo } from './types'

interface ImageGalleryProps {
  heading?: string
  photos: Photo[]
  variant?: 'grid' | 'scroll' | 'masonry'
  columns?: 2 | 3 | 4
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
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
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">{heading}</h2>
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          >
            {duplicated.map((photo, i) => (
              <div key={i} className="flex-shrink-0 w-80 md:w-96 aspect-[4/3] relative rounded-2xl overflow-hidden group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    )
  }

  if (variant === 'masonry') {
    return (
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">{heading}</h2>
          </motion.div>
          <motion.div {...fadeInUp} className="columns-2 md:columns-3 gap-6 space-y-6">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="break-inside-avoid rounded-2xl overflow-hidden group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width || 600}
                  height={photo.height || 400}
                  className="w-full h-auto group-hover:scale-110 transition-transform duration-700 ease-out"
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
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">{heading}</h2>
        </motion.div>
        <motion.div {...fadeInUp} className={`grid gap-6 ${colClass}`}>
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm ring-1 ring-black/5"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
