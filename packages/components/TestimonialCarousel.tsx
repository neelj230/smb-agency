'use client'

import { motion } from 'framer-motion'
import type { Review } from './types'

interface TestimonialCarouselProps {
  heading?: string
  reviews: Review[]
  /** Auto-scrolling horizontal or static grid */
  variant?: 'scroll' | 'grid' | 'featured'
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-[var(--brand-bg)] rounded-2xl p-6 border border-black/5 flex flex-col justify-between min-w-[300px]">
      <div>
        <StarRating rating={review.rating} />
        <p className="mt-4 text-[var(--brand-text)] leading-relaxed">"{review.text}"</p>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center font-display font-bold text-[var(--brand-primary)]">
          {review.author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm text-[var(--brand-text)]">{review.author}</p>
          <p className="text-xs text-[var(--brand-muted)] capitalize">{review.source}</p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialCarousel({
  heading = 'What Our Customers Say',
  reviews,
  variant = 'scroll',
}: TestimonialCarouselProps) {
  if (variant === 'featured' && reviews.length > 0) {
    const [featured, ...rest] = reviews
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
          </motion.div>
          <motion.div {...fadeInUp}>
            {/* Featured large review */}
            <div className="bg-[var(--brand-primary)] text-white rounded-3xl p-10 md:p-14 mb-8">
              <span className="text-6xl leading-none opacity-30">"</span>
              <p className="text-xl md:text-2xl leading-relaxed mt-2">{featured.text}</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-lg">
                  {featured.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{featured.author}</p>
                  <StarRating rating={featured.rating} />
                </div>
              </div>
            </div>
            {/* Smaller cards below */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  if (variant === 'grid') {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Default: auto-scrolling horizontal carousel
  const duplicated = [...reviews, ...reviews]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
        </motion.div>
      </div>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {duplicated.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
