'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { Stat } from './types'

interface StatsCounterProps {
  heading?: string
  stats: Stat[]
  /** Dark background with light text, or light background */
  variant?: 'dark' | 'light'
}

function Counter({ target, prefix, suffix }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const display = useTransform(rounded, (v) => `${prefix || ''}${v.toLocaleString()}${suffix || ''}`)

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: 'easeOut' })
    }
  }, [isInView, count, target])

  return <motion.span ref={ref}>{display}</motion.span>
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export function StatsCounter({ heading, stats, variant = 'dark' }: StatsCounterProps) {
  const isDark = variant === 'dark'

  return (
    <section className={`py-20 px-6 ${isDark ? 'bg-[var(--brand-text)]' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {heading && (
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2
              className={`font-display text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[var(--brand-text)]'}`}
            >
              {heading}
            </h2>
          </motion.div>
        )}
        <motion.div
          {...fadeInUp}
          className={`grid grid-cols-2 lg:grid-cols-${stats.length > 4 ? 4 : stats.length} gap-8 text-center`}
        >
          {stats.map((stat, i) => (
            <div key={i}>
              <p
                className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-[var(--brand-primary)]'}`}
              >
                <Counter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className={`mt-2 text-sm md:text-base ${isDark ? 'text-white/60' : 'text-[var(--brand-muted)]'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
