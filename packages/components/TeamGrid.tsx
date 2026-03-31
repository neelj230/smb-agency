'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { TeamMember } from './types'

interface TeamGridProps {
  heading?: string
  subheading?: string
  members: TeamMember[]
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export function TeamGrid({ heading = 'Meet Our Team', subheading, members }: TeamGridProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--brand-text)]">{heading}</h2>
          {subheading && <p className="mt-4 text-lg text-[var(--brand-muted)] max-w-2xl mx-auto">{subheading}</p>}
        </motion.div>
        <motion.div
          {...staggerContainer}
          className={`grid gap-8 ${members.length <= 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : members.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}
        >
          {members.map((member) => (
            <motion.div key={member.name} variants={staggerItem} className="text-center">
              {member.image ? (
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-2xl bg-[var(--brand-primary)]/10 mb-4 flex items-center justify-center">
                  <span className="font-display text-5xl text-[var(--brand-primary)]/30">{member.name.charAt(0)}</span>
                </div>
              )}
              <h3 className="font-display text-lg font-semibold text-[var(--brand-text)]">{member.name}</h3>
              <p className="text-sm text-[var(--brand-muted)]">{member.role}</p>
              {member.credentials && member.credentials.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 justify-center">
                  {member.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="px-2 py-0.5 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs rounded-full"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              )}
              {member.bio && <p className="mt-3 text-sm text-[var(--brand-muted)]">{member.bio}</p>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
