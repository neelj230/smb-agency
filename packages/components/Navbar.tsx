'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import type { NavLink } from './types'

interface NavbarProps {
  businessName: string
  links: NavLink[]
  ctaText?: string
  ctaHref?: string
  variant?: 'light' | 'dark' | 'transparent'
}

export function Navbar({
  businessName,
  links,
  ctaText = 'Contact Us',
  ctaHref = '#contact',
  variant = 'light',
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bgClass = scrolled
    ? variant === 'dark'
      ? 'bg-[var(--brand-text)]/95 backdrop-blur-xl shadow-lg shadow-black/5'
      : 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5'
    : {
        light: 'bg-white/80 backdrop-blur-md',
        dark: 'bg-[var(--brand-text)]/90 backdrop-blur-md',
        transparent: 'bg-transparent',
      }[variant]

  const textClass = variant === 'dark' || (variant === 'transparent' && !scrolled) ? 'text-white' : 'text-[var(--brand-text)]'
  const mutedClass = variant === 'dark' || (variant === 'transparent' && !scrolled)
    ? 'text-white/60 hover:text-white'
    : 'text-[var(--brand-muted)] hover:text-[var(--brand-text)]'

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className={`font-display text-xl font-bold ${textClass} transition-colors`}>
          {businessName}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${mutedClass}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="px-6 py-2.5 bg-[var(--brand-primary)] text-white rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
          >
            {ctaText}
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${textClass}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden overflow-hidden backdrop-blur-xl ${
              variant === 'dark' ? 'bg-[var(--brand-text)]/95' : 'bg-white/95'
            }`}
          >
            <div className="px-6 py-6 space-y-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`block py-3 text-lg font-medium transition-colors ${mutedClass}`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4">
                <a
                  href={ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-6 py-3.5 bg-[var(--brand-primary)] text-white rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-95"
                >
                  {ctaText}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
