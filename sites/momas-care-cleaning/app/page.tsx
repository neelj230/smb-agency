'use client'

import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { ProcessSteps } from '@/components/ProcessSteps'
import type { NavLink, Photo, Service, Review, Stat, ProcessStep, FAQItem } from '@/components/types'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── Brand tokens ──────────────────────────────────────────────────────────────
const BRAND = '#218544'
const ACCENT = '#ace38f'

// ── Contact object ────────────────────────────────────────────────────────────
const businessContact = {
  name: "Moma's Care Cleaning",
  address: '6140 Lansdowne Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(267) 990-2478',
  email: '',
  hours: {
    Monday: 'Open 24 hours',
    Tuesday: 'Open 24 hours',
    Wednesday: 'Open 24 hours',
    Thursday: 'Open 24 hours',
    Friday: 'Open 24 hours',
    Saturday: 'Open 24 hours',
    Sunday: 'Closed',
  },
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ── Photos ────────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: "Moma's Care Cleaning photo 1",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "Moma's Care Cleaning photo 2",
  category: 'interior',
}

// ── Services ──────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Deep Home Cleaning',
    description:
      'A thorough top-to-bottom cleaning of every room including cabinets, nooks, and hard-to-reach areas — ideal for homes that need a serious reset.',
    icon: 'sparkles',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Move-In / Move-Out Cleaning',
    description:
      'Fast-turnaround cleaning for apartments and homes before or after a move, with flexible scheduling to match your timeline.',
    icon: 'door-open',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Carpet Shampooing & Steam Cleaning',
    description:
      'Professional carpet cleaning using steam and shampoo methods to lift dirt, odors, and stains from all floor types.',
    icon: 'wind',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Post-Surgery & Recovery Home Cleaning',
    description:
      'Gentle, thorough cleaning for households where a family member is recovering — coordinated with family caregivers for peace of mind.',
    icon: 'heart-handshake',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Recurring Maintenance Cleaning',
    description:
      'Scheduled weekly, bi-weekly, or monthly cleaning to keep your home consistently spotless without the stress of one-time bookings.',
    icon: 'calendar-check',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Vacant Property Cleaning',
    description:
      'Full cleaning of unoccupied homes and rental units, including garages and storage areas, for landlords and property managers.',
    icon: 'building-2',
    image: '/photos/photo-8.webp',
  },
]

// ── Reviews ───────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "The best cleaning company I have ever used. Came highly recommended by a friend & I was not disappointed at all! Arrived in a timely manner and the team was friendly and attentive to my needs during initial walk through. Cleaning job was exactly what I asked for and exceeded expectations.",
    author: 'Susan Schuman',
    rating: 5,
    source: 'google',
  },
  {
    text: "The service here was absolutely wonderful. I scheduled a cleaning for the apartment I was moving into (as it wasn't at a level I wanted) and scheduled a cleaning for the apartment I was moving out of. They were wonderful at getting me on the books on a quick turnaround which I needed.",
    author: 'Summer P',
    rating: 5,
    source: 'google',
  },
  {
    text: "I hired Moma's cleaning service to help my parents after my mom had hip replacement surgery. From the first call I felt like I was in great hands. The professionalism and contact were spectacular and the company so easy to work with for my needs.",
    author: 'Denise Dalton',
    rating: 5,
    source: 'google',
  },
]

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 55, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 4.5, suffix: '★', label: 'Average Star Rating' },
  { value: 6, suffix: ' days', label: 'Available Every Week, 24 Hours a Day' },
  { value: 100, suffix: '+', label: 'Philadelphia Homes Cleaned' },
]

// ── Process ───────────────────────────────────────────────────────────────────
const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Book Your Clean',
    description:
      'Call or message us any day Monday–Saturday. We move fast — same-week bookings are our norm, not the exception.',
  },
  {
    step: 2,
    title: 'Walk & Talk',
    description:
      'A quick walkthrough at the start so we know exactly what matters to you. Your priorities become our checklist.',
  },
  {
    step: 3,
    title: 'Moma-Level Clean',
    description:
      'Our team gets to work top-to-bottom. Every nook, every corner — nothing gets skipped.',
  },
  {
    step: 4,
    title: 'You Come Home',
    description:
      'Walk in to a home that feels like someone who actually cared cleaned it. That's the standard we hold ourselves to.',
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'Can I book a cleaning on short notice or same week?',
    answer:
      "Yes — Moma's Care Cleaning operates Monday through Saturday, 24 hours a day, and has a track record of accommodating urgent requests. If you need a quick turnaround, call us directly and we'll do our best to get you scheduled.",
  },
  {
    question: "What makes Moma's different from other cleaning companies in Philadelphia?",
    answer:
      "Customers consistently point to three things: the warmth and professionalism of the team from the very first call, the attention to detail during the actual clean, and the ease of communication throughout. It feels personal — not transactional.",
  },
  {
    question: 'Do I need to be home during the cleaning?',
    answer:
      "You don't have to be present, but we recommend a walkthrough at the start when possible. Customers who have been on-site report that the initial conversation helps the team prioritize exactly what matters to you.",
  },
  {
    question: 'Do you offer carpet shampooing and steam cleaning?',
    answer:
      'Yes, carpet shampooing and steam cleaning are offered as part of deep cleaning packages. If this service is important to you, mention it when booking so the team comes prepared with the right equipment.',
  },
]

// ── Footer nav ────────────────────────────────────────────────────────────────
const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ── Fade-up helper ────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Tagline banner ────────────────────────────────────────────────────────────
function TaglineBanner() {
  const items = Array(8).fill('Clean Like Moma Actually Did It')
  return (
    <div
      className="tagline-banner overflow-hidden py-3 border-y"
      style={{ borderColor: ACCENT, backgroundColor: BRAND }}
    >
      <div className="tagline-track flex gap-10 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: ACCENT, fontFamily: 'Figtree, sans-serif' }}
          >
            ✦ {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Trust badge strip ─────────────────────────────────────────────────────────
function TrustStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const badges = [
    { icon: '🕐', label: 'Mon–Sat, 24 Hours' },
    { icon: '📍', label: 'Philadelphia, PA' },
    { icon: '⭐', label: '4.5 Stars on Google' },
    { icon: '🤝', label: 'Same-Week Booking' },
    { icon: '🏠', label: '100+ Homes Cleaned' },
  ]

  return (
    <section className="py-6 bg-white border-b" style={{ borderColor: '#e8f5e0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {badges.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: '#f0faf0',
                color: '#1a6b35',
                border: '1px solid #c8edb4',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Green divider ─────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-px flex-1" style={{ backgroundColor: '#e0f0d8' }} />
      <div
        className="mx-4 w-2 h-2 rounded-full"
        style={{ backgroundColor: ACCENT }}
      />
      <div className="h-px flex-1" style={{ backgroundColor: '#e0f0d8' }} />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
export default function MomasCareCleaning() {
  return (
    <>
      {/* ── CSS vars ── */}
      <div
        style={
          {
            '--brand-primary': BRAND,
            '--brand-accent': ACCENT,
            '--brand-text': '#0f2318',
          } as React.CSSProperties
        }
      />

      {/* ── Navbar ── */}
      <Navbar
        businessName="Moma's Care Cleaning"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+12679902478"
      />

      {/* ── Hero ── */}
      <HeroSection
        headline="Clean Like Moma Did"
        subheadline="Philadelphia's most personal cleaning service — 24/6, same-week bookings available."
        ctaText="Book a Cleaning"
        ctaHref="tel:+12679902478"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.5}
        reviewCount={55}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── Tagline banner ── */}
      <TaglineBanner />

      {/* ── Trust strip ── */}
      <TrustStrip />

      {/* ── Stats (dark) ── */}
      <div id="stats">
        <FadeUp>
          <StatsCounter stats={stats} variant="dark" />
        </FadeUp>
      </div>

      {/* ── Services ── */}
      <section
        id="services"
        className="py-20 dot-pattern"
        style={{ backgroundColor: '#f7fdf4' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                style={{
                  color: BRAND,
                  backgroundColor: '#e0f5d4',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                What We Do
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold mt-2"
                style={{ color: '#0f2318', fontFamily: 'Figtree, sans-serif' }}
              >
                Every Room. Every Time.
              </h2>
              <p
                className="mt-4 text-lg max-w-xl mx-auto"
                style={{ color: '#4a7a5a', fontFamily: 'Inter, sans-serif' }}
              >
                Six specialized services for Philly homes — deep cleans, moves, recovery support, and more.
              </p>
            </div>
          </FadeUp>
          <ServiceCards
            heading=""
            services={services}
            columns={3}
            variant="grid"
          />
        </div>
      </section>

      <Divider />

      {/* ── About ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <AboutSection
              heading="Cleaning With Care"
              story="Moma's Care Cleaning started in Philadelphia because people deserve a clean home that feels handled — not just wiped down. Customers call us for post-surgery recoveries, move-out deadlines, and the kind of deep clean you've been putting off. From the first call to the last sweep, we show up like we actually care — because we do."
              image={aboutPhoto}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── Process (dark green) ── */}
      <div
        className="bg-[var(--brand-text)]"
        style={{ '--brand-text': '#0f2318' } as React.CSSProperties}
      >
        <FadeUp>
          <div className="py-4">
            <ProcessSteps
              heading="How It Works"
              subheading="Simple, clear, and built around your schedule."
              steps={processSteps}
              variant="grid"
            />
          </div>
        </FadeUp>
      </div>

      {/* ── Testimonials ── */}
      <section
        id="reviews"
        className="py-20"
        style={{ backgroundColor: '#f0faf0' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-10">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                style={{
                  color: BRAND,
                  backgroundColor: '#d4f0c4',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Real Reviews
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold"
                style={{ color: '#0f2318', fontFamily: 'Figtree, sans-serif' }}
              >
                Philly Speaks Up
              </h2>
            </div>
          </FadeUp>
          <TestimonialCarousel
            heading=""
            reviews={reviews}
            variant="featured"
          />
        </div>
      </section>

      <Divider />

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-10">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                style={{
                  color: BRAND,
                  backgroundColor: '#e0f5d4',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Questions
              </span>
              <h2
                className="text-4xl font-extrabold"
                style={{ color: '#0f2318', fontFamily: 'Figtree, sans-serif' }}
              >
                Good to Know
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <FAQAccordion heading="" items={faqItems} />
          </FadeUp>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        style={{ backgroundColor: '#f7fdf4' }}
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <ContactSection
              business={businessContact}
              heading="Book Your Clean"
              showMap={true}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={{}}
      />

      {/* ── Click to call ── */}
      <ClickToCall phone="(267) 990-2478" />
    </>
  )
}