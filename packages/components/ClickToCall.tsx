'use client'

import { Phone } from 'lucide-react'

interface ClickToCallProps {
  phone: string
}

/** Sticky mobile-only click-to-call button */
export function ClickToCall({ phone }: ClickToCallProps) {
  return (
    <a
      href={`tel:${phone}`}
      className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 bg-[var(--brand-primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
      aria-label="Call us"
    >
      <Phone className="w-6 h-6" />
    </a>
  )
}
