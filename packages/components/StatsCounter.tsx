'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { Stat } from './types'

interface StatsCounterProps {
  heading?: string
  stats: Stat[]
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
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
}

export function StatsCounter({ heading, stats, variant = 'dark' }: StatsCounterProps) {
  const isDark = variant === 'dark'

  return (
    <section className={`py-20 lg:py-28 px-6 ${isDark ? 'bg-[var(--brand-text)]' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {heading && (
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2
              className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[var(--brand-text)]'}`}
            >
              {heading}
            </h2>
          </motion.div>
        )}
        <motion.div
          {...fadeInUp}
          className={`grid grid-cols-2 lg:grid-cols-${stats.length > 4 ? 4 : stats.length} gap-12 text-center`}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p
                className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[var(--brand-primary)]'}`}
              >
                <Counter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className={`mt-3 text-sm md:text-base tracking-wide ${isDark ? 'text-white/50' : 'text-[var(--brand-muted)]'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
