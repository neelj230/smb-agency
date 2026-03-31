'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import type { NavLink } from './types'

interface NavbarProps {
  businessName: string
  links: NavLink[]
  ctaText?: string
  ctaHref?: string
  /** Sticky top nav style */
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

  const bgClass = {
    light: 'bg-white/90 backdrop-blur-md border-b border-black/5',
    dark: 'bg-[var(--brand-text)]/95 backdrop-blur-md border-b border-white/10',
    transparent: 'bg-transparent',
  }[variant]

  const textClass = variant === 'dark' ? 'text-white' : 'text-[var(--brand-text)]'
  const mutedClass = variant === 'dark' ? 'text-white/70 hover:text-white' : 'text-[var(--brand-muted)] hover:text-[var(--brand-text)]'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Business Name */}
        <a href="#" className={`font-display text-lg font-bold ${textClass}`}>
          {businessName}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${mutedClass}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="px-5 py-2 bg-[var(--brand-primary)] text-white rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {ctaText}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${textClass}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`md:hidden overflow-hidden ${variant === 'dark' ? 'bg-[var(--brand-text)]' : 'bg-white'}`}
          >
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-lg ${mutedClass}`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 bg-[var(--brand-primary)] text-white rounded-full font-semibold"
              >
                {ctaText}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
