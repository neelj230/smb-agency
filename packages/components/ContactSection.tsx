'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'
import type { BusinessData } from './types'

interface ContactSectionProps {
  business: Pick<BusinessData, 'name' | 'address' | 'city' | 'state' | 'zip' | 'phone' | 'email' | 'hours'>
  heading?: string
  showMap?: boolean
  formAction?: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
}

export function ContactSection({
  business,
  heading = 'Get In Touch',
  showMap = true,
  formAction,
}: ContactSectionProps) {
  const fullAddress = `${business.address}, ${business.city}, ${business.state} ${business.zip}`
  const mapsQuery = encodeURIComponent(fullAddress)

  return (
    <section id="contact" className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">{heading}</h2>
        </motion.div>

        <motion.div {...fadeInUp} className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form action={formAction} method="POST" className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--brand-text)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-black/10 bg-white text-[var(--brand-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 focus:border-transparent transition-shadow"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--brand-text)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-black/10 bg-white text-[var(--brand-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--brand-text)] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-5 py-3.5 rounded-xl border border-black/10 bg-white text-[var(--brand-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 focus:border-transparent transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--brand-text)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-black/10 bg-white text-[var(--brand-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/50 focus:border-transparent transition-shadow resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[var(--brand-primary)] text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info + Map */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/[0.07] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--brand-text)]">Address</p>
                  <p className="text-[var(--brand-muted)] mt-0.5">{fullAddress}</p>
                </div>
              </div>

              <a href={`tel:${business.phone}`} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/[0.07] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--brand-primary)]/15 transition-colors">
                  <Phone className="w-5 h-5 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--brand-text)]">Phone</p>
                  <p className="text-[var(--brand-muted)] group-hover:text-[var(--brand-primary)] transition-colors mt-0.5">
                    {business.phone}
                  </p>
                </div>
              </a>

              {business.email && (
                <a href={`mailto:${business.email}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/[0.07] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--brand-primary)]/15 transition-colors">
                    <Mail className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--brand-text)]">Email</p>
                    <p className="text-[var(--brand-muted)] group-hover:text-[var(--brand-primary)] transition-colors mt-0.5">
                      {business.email}
                    </p>
                  </div>
                </a>
              )}

              {business.hours && Object.keys(business.hours).length > 0 && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/[0.07] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--brand-text)]">Hours</p>
                    <div className="text-[var(--brand-muted)] font-mono text-sm space-y-1.5 mt-1">
                      {Object.entries(business.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between gap-8">
                          <span>{day}</span>
                          <span>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showMap && (
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-black/[0.08] shadow-sm">
                <iframe
                  title={`Map of ${business.name}`}
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${mapsQuery}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
