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
import type { NavLink, Photo, Service, Review, Stat, FAQItem } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND_BLUE = '#156cc2'
const BRAND_GREEN = '#0ea158'

// ─── Data ─────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Kens Automotive photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Kens Automotive photo 2',
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'Pennsylvania State Inspection',
    description:
      'Official PA safety and emissions inspection with fast scheduling and same-week sticker turnaround.',
    icon: 'clipboard-check',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Oil Change',
    description:
      'Full oil and filter service with a multi-point visual check to catch issues before they become problems.',
    icon: 'droplets',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Tire Replacement & Repair',
    description:
      'Tire mounting, balancing, nail repair, and full replacement with brand options and upfront pricing.',
    icon: 'circle',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Brake Service',
    description:
      'Brake pad, rotor, and caliper inspection and replacement to keep your stopping power reliable.',
    icon: 'octagon',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Diagnostic & Maintenance Check',
    description:
      'Full vehicle health assessment with staff who explain findings and walk you through repair options and costs.',
    icon: 'scan',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Battery Service',
    description:
      'Battery testing, replacement, and post-replacement drive cycle guidance for emissions readiness.',
    icon: 'battery-charging',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: "The guys at Ken's ROCK! First, it's fun to walk into the place. The guys at the front desk are friendly, knowledgeable, and efficient. You'll get an appointment quickly and their excellent work is done on time, at a reasonable cost. No job too small, no problem too big.",
    author: 'Ginny Christensen',
    rating: 5,
    source: 'google',
  },
  {
    text: 'They man who helped me was extremely nice and took the time to explain costs upfront as well as different options that would be more cost effective. He went above and beyond checking on different parts of my car to help diagnose the problem as well. Really solid and honest shop!!',
    author: 'Kaitlin Petersen',
    rating: 5,
    source: 'google',
  },
  {
    text: "We love Ken's Automotive!! They were recommended by a close family member. I recently took my Lexus to Ken's for annual inspection and a maintenance check. They were able to schedule me right away and I had new inspection stickers within a matter of a few days. The staff there are wonderful.",
    author: 'William Perry',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.8, suffix: ' stars', label: 'Average Google Rating' },
  { value: 726, suffix: '+', label: 'Customer Reviews' },
  { value: 5, suffix: ' days', label: 'Weekly Availability (Mon–Fri)' },
  { value: 4, suffix: '+ years', label: 'Loyalty Span of Repeat Customers' },
]

const faqItems: FAQItem[] = [
  {
    question: 'How quickly can I get an appointment?',
    answer:
      "Ken's Automotive is known for fast scheduling — most customers report being seen within a day or two, and same-day availability is often possible. Call ahead and the team will find the earliest opening.",
  },
  {
    question: 'Will you explain the costs before doing any work?',
    answer:
      "Yes — multiple customers highlight upfront pricing as one of Ken's biggest strengths. Staff walk you through costs and options before any wrench turns, so there are no surprises on the invoice.",
  },
  {
    question: 'Do you service luxury vehicles like Lexus or European makes?',
    answer:
      "Absolutely. Ken's services a wide range of vehicles including luxury makes. Customers specifically mention bringing Lexus and other higher-end vehicles in for inspections and maintenance.",
  },
  {
    question: 'What happens if you find additional issues during my service?',
    answer:
      "The team performs visual checks during routine services and will flag anything they find — like a nail in a tire or worn brakes — and walk you through your options with no pressure.",
  },
]

const businessContact = {
  name: 'Kens Automotive',
  address: '341 N 10th St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19107',
  phone: '(215) 829-9898',
  email: '',
  hours: {
    Monday: '8:00 AM – 6:00 PM',
    Tuesday: '8:00 AM – 6:00 PM',
    Wednesday: '8:00 AM – 6:00 PM',
    Thursday: '8:00 AM – 6:00 PM',
    Friday: '8:00 AM – 6:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

// ─── Fade-up animation helper ──────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

// ─── Ticker strip ─────────────────────────────────────────────────────────────
const tickerItems = [
  'Real Philly Mechanics',
  'PA State Inspections',
  'Upfront Pricing — Always',
  'Oil Changes',
  'Brake Service',
  'Fast Scheduling',
  'Honest Diagnostics',
  'Battery Service',
  'Tire Repair & Replacement',
  '4.8 Stars · 726+ Reviews',
]

function TickerStrip() {
  const doubled = [...tickerItems, ...tickerItems]
  return (
    <div className="ticker-strip overflow-hidden py-3" style={{ background: BRAND_BLUE }}>
      <div className="ticker-inner flex gap-12 whitespace-nowrap" style={{ animation: 'ticker 30s linear infinite' }}>
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item text-white text-sm font-medium tracking-widest uppercase flex items-center gap-3">
            <span className="ticker-dot" style={{ background: BRAND_GREEN }}></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Trust badge bar ──────────────────────────────────────────────────────────
function TrustBar() {
  const badges = [
    { label: '4.8★ Google Rating', icon: '⭐' },
    { label: '726+ Reviews', icon: '💬' },
    { label: 'Upfront Pricing', icon: '✓' },
    { label: 'Same-Week Availability', icon: '📅' },
    { label: 'Philadelphia, PA', icon: '📍' },
  ]
  return (
    <div className="trust-bar border-b border-[rgba(21,108,194,0.12)]" style={{ background: '#f7f9fc' }}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap gap-4 items-center justify-center md:justify-between">
        {badges.map((b, i) => (
          <motion.span
            key={i}
            className="trust-badge flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#1a2236]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <span>{b.icon}</span>
            {b.label}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

// ─── Section divider ──────────────────────────────────────────────────────────
function Divider({ light = false }: { light?: boolean }) {
  return (
    <div className={`divider-line mx-auto my-0 ${light ? 'opacity-20' : 'opacity-10'}`}
      style={{ height: 1, background: light ? '#fff' : '#156cc2', maxWidth: 120, borderRadius: 1 }} />
  )
}

// ─── Service number badge ─────────────────────────────────────────────────────
function ServiceStrip() {
  return (
    <section className="py-16 bg-white" id="services">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: BRAND_GREEN }}>
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0f1c2e] leading-tight">
            Six Core Services
          </h2>
          <p className="mt-3 text-[#4b5b72] text-base max-w-xl mx-auto">
            Everything your car needs, handled under one roof at 341 N 10th Street.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.name}
              className="service-card group relative rounded-2xl overflow-hidden cursor-default"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i * 0.08}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{ boxShadow: '0 2px 24px rgba(21,108,194,0.08)' }}
            >
              {svc.image && (
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,28,46,0.18) 0%, rgba(15,28,46,0.72) 100%)' }} />
                  <span className="absolute top-4 left-4 font-mono text-xs font-bold tracking-widest text-white/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              )}
              <div className="p-5 bg-white">
                <h3 className="font-display text-lg font-bold text-[#0f1c2e] mb-2 leading-snug">{svc.name}</h3>
                <p className="text-sm text-[#4b5b72] leading-relaxed">{svc.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-300 rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GREEN})` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Marquee testimonials strip ───────────────────────────────────────────────
function ReviewMarquee() {
  const items = [
    '"Really solid and honest shop!!"',
    '"No job too small, no problem too big."',
    '"Scheduled me right away."',
    '"Explains costs upfront — no surprises."',
    '"4 years and still coming back."',
    '"Staff are wonderful."',
  ]
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-4" style={{ background: BRAND_GREEN }}>
      <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'ticker 22s linear infinite reverse' }}>
        {doubled.map((item, i) => (
          <span key={i} className="text-white text-sm font-medium italic tracking-wide flex items-center gap-4">
            {item}
            <span className="text-white/40 text-lg not-italic">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function KensAutomotivePage() {
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <>
      {/* CSS variables */}
      <div style={
        {
          '--brand-primary': BRAND_BLUE,
          '--brand-accent': BRAND_GREEN,
          '--brand-text': '#0f1c2e',
        } as React.CSSProperties
      } />

      <Navbar
        businessName="Ken's Automotive"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2158299898"
      />

      <TrustBar />

      {/* ── HERO ── */}
      <HeroSection
        headline="Real Philly Auto Repair"
        subheadline="Serving North Philadelphia since day one — upfront prices, fast turns."
        ctaText="Schedule Service"
        ctaHref="tel:2158299898"
        secondaryCtaText="Get Directions"
        secondaryCtaHref="https://maps.google.com/?q=341+N+10th+St+Philadelphia+PA+19107"
        rating={4.8}
        reviewCount={726}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      <TickerStrip />

      {/* ── STATS ── */}
      <section className="py-0">
        <StatsCounter stats={stats} variant="dark" />
      </section>

      {/* ── SERVICES ── */}
      <ServiceStrip />

      <ReviewMarquee />

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 about-section dot-pattern-bg">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-4 text-center"
          >
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: BRAND_BLUE }}>
              Our Story
            </span>
          </motion.div>
          <AboutSection
            heading="Philadelphia's Shop"
            story="Ken's Automotive sits at 341 N 10th St in the heart of Philly — a shop where the staff explain every cost before touching your car, take same-week appointments, and service everything from daily drivers to Lexus. Customers come back for years because the work is straight and the price is fair."
            image={aboutPhoto}
          />
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section
        id="reviews"
        className="py-20"
        style={{ background: '#0f1c2e' }}
      >
        <motion.div
          className="text-center mb-10 px-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: BRAND_GREEN }}>
            Customer Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            Straight From the Street
          </h2>
          <Divider light />
        </motion.div>
        <TestimonialCarousel
          heading=""
          reviews={reviews}
          variant="featured"
        />
      </section>

      {/* ── PARALLAX CALLOUT ── */}
      <section
        ref={parallaxRef}
        className="relative overflow-hidden py-28 flex items-center justify-center"
        style={{ minHeight: 320 }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/photos/photo-9.webp')",
            y: bgY,
            scale: 1.12,
          }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(21,108,194,0.82)' }} />
        <motion.div
          className="relative z-10 text-center px-6 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            "Real Talk, Real Repairs,<br />Real Philly."
          </p>
          <a
            href="tel:2158299898"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase text-[#0f1c2e] transition-transform hover:scale-105"
            style={{ background: BRAND_GREEN, letterSpacing: '0.12em' }}
          >
            📞 (215) 829-9898
          </a>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-20 bg-white"
      >
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: BRAND_GREEN }}>
              Common Questions
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0f1c2e] leading-tight">
              Good to Know
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            <FAQAccordion heading="" items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-0"
        style={{ background: '#f7f9fc' }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-16 text-center px-6"
        >
          <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-3" style={{ color: BRAND_BLUE }}>
            Find Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0f1c2e] leading-tight mb-2">
            Visit the Shop
          </h2>
          <p className="text-[#4b5b72] text-base mb-8">341 N 10th St, Philadelphia, PA 19107 · Mon–Fri 8 AM – 6 PM</p>
        </motion.div>
        <ContactSection
          business={businessContact}
          heading=""
          showMap={true}
        />
      </section>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      <ClickToCall phone="(215) 829-9898" />
    </>
  )
}