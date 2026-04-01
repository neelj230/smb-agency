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
  secondaryCtaText?: string
  secondaryCtaHref?: string
  backgroundImage?: Photo
  foregroundImage?: Photo
  videoSrc?: string
  rating?: number
  reviewCount?: number
  variant?: 'photo-bg' | 'split' | 'centered' | 'minimal' | 'dark-bold' | 'video-bg' | 'blurred-reveal'
}

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
}

function RatingBadge({ rating, reviewCount, light = false }: { rating: number; reviewCount?: number; light?: boolean }) {
  return (
    <motion.div
      variants={fadeIn}
      className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${
        light ? 'bg-white/15 backdrop-blur-sm' : 'bg-[var(--brand-primary)]/10'
      }`}
    >
      <div className="flex gap-0.5 text-lg">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < Math.round(rating) ? 'text-yellow-400' : light ? 'text-white/30' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
      <span className={`text-sm font-semibold ${light ? 'text-white/90' : 'text-[var(--brand-text)]'}`}>
        {rating.toFixed(1)}
      </span>
      {reviewCount && (
        <span className={`text-sm ${light ? 'text-white/60' : 'text-[var(--brand-muted)]'}`}>
          ({reviewCount} reviews)
        </span>
      )}
    </motion.div>
  )
}

function PrimaryButton({ href, children, variant = 'brand' }: { href: string; children: React.ReactNode; variant?: 'brand' | 'white' }) {
  const base = 'inline-flex items-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
  const styles = variant === 'white'
    ? `${base} bg-white text-[var(--brand-text)]`
    : `${base} bg-[var(--brand-primary)] text-white`
  return <a href={href} className={styles}>{children}</a>
}

function SecondaryButton({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center px-8 py-4 border-2 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
        light
          ? 'border-white/30 text-white hover:bg-white/10'
          : 'border-[var(--brand-primary)]/30 text-[var(--brand-text)] hover:bg-[var(--brand-primary)] hover:text-white hover:border-[var(--brand-primary)]'
      }`}
    >
      {children}
    </a>
  )
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
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-5xl py-32"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {rating && <RatingBadge rating={rating} reviewCount={reviewCount} light />}
          <motion.h1 variants={fadeIn} className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mt-6">
            {headline}
          </motion.h1>
          {subheadline && (
            <motion.p variants={fadeIn} className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {subheadline}
            </motion.p>
          )}
          <motion.div variants={fadeIn} className="mt-10 flex gap-4 justify-center flex-wrap">
            <PrimaryButton href={ctaHref} variant="white">{ctaText}</PrimaryButton>
            {secondaryCtaText && (
              <SecondaryButton href={secondaryCtaHref || '#services'} light>{secondaryCtaText}</SecondaryButton>
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
            <Image src={backgroundImage.src} alt={backgroundImage.alt} fill className="object-cover" priority />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <motion.div
            className="relative z-10 text-center text-white px-6 max-w-5xl"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={fadeIn}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] lowercase"
            >
              {headline}
            </motion.h1>
            {subheadline && (
              <motion.p variants={fadeIn} className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto italic leading-relaxed">
                {subheadline}
              </motion.p>
            )}
            <motion.div variants={fadeIn} className="mt-10">
              <PrimaryButton href={ctaHref} variant="white">{ctaText}</PrimaryButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    )
  }

  if (variant === 'photo-bg' && backgroundImage) {
    return (
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          className="object-cover"
          priority
          placeholder={backgroundImage.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={backgroundImage.blurDataURL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-5xl py-32"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {rating && <RatingBadge rating={rating} reviewCount={reviewCount} light />}
          <motion.h1 variants={fadeIn} className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mt-6">
            {headline}
          </motion.h1>
          {subheadline && (
            <motion.p variants={fadeIn} className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {subheadline}
            </motion.p>
          )}
          <motion.div variants={fadeIn} className="mt-10 flex gap-4 justify-center flex-wrap">
            <PrimaryButton href={ctaHref}>{ctaText}</PrimaryButton>
            {secondaryCtaText && (
              <SecondaryButton href={secondaryCtaHref || '#services'} light>{secondaryCtaText}</SecondaryButton>
            )}
          </motion.div>
        </motion.div>
      </section>
    )
  }

  if (variant === 'split' && foregroundImage) {
    return (
      <section className="min-h-[90vh] flex items-center py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={stagger} initial="initial" animate="animate">
            {rating && <RatingBadge rating={rating} reviewCount={reviewCount} />}
            <motion.h1
              variants={fadeIn}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-[var(--brand-text)] mt-6"
            >
              {headline}
            </motion.h1>
            {subheadline && (
              <motion.p variants={fadeIn} className="mt-6 text-lg md:text-xl text-[var(--brand-muted)] max-w-lg leading-relaxed">
                {subheadline}
              </motion.p>
            )}
            <motion.div variants={fadeIn} className="mt-10 flex gap-4 flex-wrap">
              <PrimaryButton href={ctaHref}>{ctaText}</PrimaryButton>
              {secondaryCtaText && (
                <SecondaryButton href={secondaryCtaHref || '#services'}>{secondaryCtaText}</SecondaryButton>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5"
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
      <section className="min-h-[95vh] flex items-center bg-[var(--brand-text)] relative overflow-hidden py-32">
        {/* Decorative gradient orb */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--brand-primary)]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-4xl">
            {rating && <RatingBadge rating={rating} reviewCount={reviewCount} light />}
            <motion.h1
              variants={fadeIn}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white mt-6"
            >
              {headline}
            </motion.h1>
            {subheadline && (
              <motion.p variants={fadeIn} className="mt-8 text-xl md:text-2xl text-white/50 max-w-xl leading-relaxed">
                {subheadline}
              </motion.p>
            )}
            <motion.div variants={fadeIn} className="mt-12 flex gap-4 flex-wrap">
              <PrimaryButton href={ctaHref}>{ctaText}</PrimaryButton>
              {secondaryCtaText && (
                <SecondaryButton href={secondaryCtaHref || '#services'} light>{secondaryCtaText}</SecondaryButton>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Default: centered
  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden py-32">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-primary)]/[0.03] via-transparent to-transparent" />
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {rating && <RatingBadge rating={rating} reviewCount={reviewCount} />}
        <motion.h1
          variants={fadeIn}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-[var(--brand-text)] mt-6"
        >
          {headline}
        </motion.h1>
        {subheadline && (
          <motion.p variants={fadeIn} className="mt-8 text-lg md:text-xl text-[var(--brand-muted)] max-w-2xl mx-auto leading-relaxed">
            {subheadline}
          </motion.p>
        )}
        <motion.div variants={fadeIn} className="mt-10 flex gap-4 justify-center flex-wrap">
          <PrimaryButton href={ctaHref}>{ctaText}</PrimaryButton>
          {secondaryCtaText && (
            <SecondaryButton href={secondaryCtaHref || '#services'}>{secondaryCtaText}</SecondaryButton>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
