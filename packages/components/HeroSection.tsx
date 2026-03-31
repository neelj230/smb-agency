'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import type { Photo } from './types'

interface HeroProps {
  headline: string
  subheadline?: string
  ctaText?: string
  ctaHref?: string
  /** Optional second CTA */
  secondaryCtaText?: string
  secondaryCtaHref?: string
  /** Background image — full-bleed behind text */
  backgroundImage?: Photo
  /** Foreground image — positioned alongside text */
  foregroundImage?: Photo
  /** Background video source for video-bg variant */
  videoSrc?: string
  /** Rating badge */
  rating?: number
  reviewCount?: number
  /** Visual variant */
  variant?: 'photo-bg' | 'split' | 'centered' | 'minimal' | 'dark-bold' | 'video-bg' | 'blurred-reveal'
}

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } },
}

export function HeroSection({
  headline,
  subheadline,
  ctaText = 'Get a Free Quote',
  ctaHref = '#contact',
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  foregroundImage,
  videoSrc,
  rating,
  reviewCount,
  variant = 'photo-bg',
}: HeroProps) {
  const blurRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: blurScroll } = useScroll({
    target: blurRef,
    offset: ['start start', 'end start'],
  })
  const blurValue = useTransform(blurScroll, [0, 0.6], [20, 0])
  const bgOpacity = useTransform(blurScroll, [0, 0.6], [0.4, 1])

  if (variant === 'video-bg' && videoSrc) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-4xl"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.h1 variants={fadeIn} className="font-display text-5xl md:text-7xl font-bold tracking-tight">
            {headline}
          </motion.h1>
          {subheadline && (
            <motion.p variants={fadeIn} className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {subheadline}
            </motion.p>
          )}
          <motion.div variants={fadeIn} className="mt-8 flex gap-4 justify-center flex-wrap">
            <a
              href={ctaHref}
              className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {ctaText}
            </a>
            {secondaryCtaText && (
              <a
                href={secondaryCtaHref || '#services'}
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-colors"
              >
                {secondaryCtaText}
              </a>
            )}
          </motion.div>
        </motion.div>
      </section>
    )
  }

  if (variant === 'blurred-reveal' && backgroundImage) {
    return (
      <section ref={blurRef} className="relative min-h-[120vh] overflow-hidden">
        <motion.div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              filter: useTransform(blurValue, (v) => `blur(${v}px)`),
              opacity: bgOpacity,
            }}
          >
            <Image
              src={backgroundImage.src}
              alt={backgroundImage.alt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/30" />
          <motion.div
            className="relative z-10 text-center text-white px-6 max-w-5xl"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={fadeIn}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight lowercase"
            >
              {headline}
            </motion.h1>
            {subheadline && (
              <motion.p variants={fadeIn} className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto italic">
                {subheadline}
              </motion.p>
            )}
            <motion.div variants={fadeIn} className="mt-10">
              <a
                href={ctaHref}
                className="inline-flex items-center px-10 py-4 bg-white text-[var(--brand-text)] rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {ctaText}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    )
  }

  if (variant === 'photo-bg' && backgroundImage) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          className="object-cover"
          priority
          placeholder={backgroundImage.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={backgroundImage.blurDataURL}
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-4xl"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {rating && (
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-white/30'}>
                    ★
                  </span>
                ))}
              </div>
              {reviewCount && <span className="text-sm text-white/80">{reviewCount} reviews</span>}
            </motion.div>
          )}
          <motion.h1 variants={fadeIn} className="font-display text-5xl md:text-7xl font-bold tracking-tight">
            {headline}
          </motion.h1>
          {subheadline && (
            <motion.p variants={fadeIn} className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {subheadline}
            </motion.p>
          )}
          <motion.div variants={fadeIn} className="mt-8 flex gap-4 justify-center flex-wrap">
            <a
              href={ctaHref}
              className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {ctaText}
            </a>
            {secondaryCtaText && (
              <a
                href={secondaryCtaHref || '#services'}
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-colors"
              >
                {secondaryCtaText}
              </a>
            )}
          </motion.div>
        </motion.div>
      </section>
    )
  }

  if (variant === 'split' && foregroundImage) {
    return (
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={stagger} initial="initial" animate="animate">
            {rating && (
              <motion.div variants={fadeIn} className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                {reviewCount && <span className="text-sm text-[var(--brand-muted)]">{reviewCount} reviews</span>}
              </motion.div>
            )}
            <motion.h1
              variants={fadeIn}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--brand-text)]"
            >
              {headline}
            </motion.h1>
            {subheadline && (
              <motion.p variants={fadeIn} className="mt-6 text-lg text-[var(--brand-muted)] max-w-lg">
                {subheadline}
              </motion.p>
            )}
            <motion.div variants={fadeIn} className="mt-8 flex gap-4 flex-wrap">
              <a
                href={ctaHref}
                className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {ctaText}
              </a>
              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref || '#services'}
                  className="inline-flex items-center px-8 py-4 border-2 border-[var(--brand-primary)]/20 text-[var(--brand-text)] rounded-full text-lg font-semibold hover:bg-[var(--brand-primary)]/5 transition-colors"
                >
                  {secondaryCtaText}
                </a>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <Image
              src={foregroundImage.src}
              alt={foregroundImage.alt}
              fill
              className="object-cover"
              priority
              placeholder={foregroundImage.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={foregroundImage.blurDataURL}
            />
          </motion.div>
        </div>
      </section>
    )
  }

  if (variant === 'dark-bold') {
    return (
      <section className="min-h-[90vh] flex items-center bg-[var(--brand-bg)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-3xl">
            <motion.h1
              variants={fadeIn}
              className="font-display text-6xl md:text-8xl font-bold tracking-tight text-[var(--brand-text)]"
            >
              {headline}
            </motion.h1>
            {subheadline && (
              <motion.p variants={fadeIn} className="mt-8 text-xl text-[var(--brand-muted)] max-w-xl">
                {subheadline}
              </motion.p>
            )}
            <motion.div variants={fadeIn} className="mt-10 flex gap-4 flex-wrap">
              <a
                href={ctaHref}
                className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-[var(--brand-bg)] rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {ctaText}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Default: centered minimal
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        className="text-center px-6 max-w-4xl"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {rating && (
          <motion.div variants={fadeIn} className="flex items-center justify-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            {reviewCount && <span className="text-sm text-[var(--brand-muted)]">{reviewCount} reviews</span>}
          </motion.div>
        )}
        <motion.h1
          variants={fadeIn}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[var(--brand-text)]"
        >
          {headline}
        </motion.h1>
        {subheadline && (
          <motion.p variants={fadeIn} className="mt-6 text-lg md:text-xl text-[var(--brand-muted)] max-w-2xl mx-auto">
            {subheadline}
          </motion.p>
        )}
        <motion.div variants={fadeIn} className="mt-8 flex gap-4 justify-center flex-wrap">
          <a
            href={ctaHref}
            className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {ctaText}
          </a>
          {secondaryCtaText && (
            <a
              href={secondaryCtaHref || '#services'}
              className="inline-flex items-center px-8 py-4 border-2 border-[var(--brand-primary)]/20 text-[var(--brand-text)] rounded-full text-lg font-semibold hover:bg-[var(--brand-primary)]/5 transition-colors"
            >
              {secondaryCtaText}
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
