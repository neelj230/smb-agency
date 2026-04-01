'use client'

import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { ImageGallery } from '@/components/ImageGallery'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import type { NavLink, Photo, Service, Review, Stat, FAQItem } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ── Brand tokens ──────────────────────────────────────────────────────────────
const BRAND = '#00A64C'
const ACCENT = '#0091a6'

// ── Nav ───────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ── Photos ────────────────────────────────────────────────────────────────────
const heroPhoto: Photo = { src: '/photos/photo-1.webp', alt: "Duran's LANDSCAPING LLC photo 1", category: 'exterior' }
const aboutPhoto: Photo = { src: '/photos/photo-2.webp', alt: "Duran's LANDSCAPING LLC photo 2", category: 'interior' }
const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: "Duran's LANDSCAPING LLC photo 3", category: 'work' },
  { src: '/photos/photo-4.webp', alt: "Duran's LANDSCAPING LLC photo 4", category: 'work' },
  { src: '/photos/photo-5.webp', alt: "Duran's LANDSCAPING LLC photo 5", category: 'work' },
  { src: '/photos/photo-6.webp', alt: "Duran's LANDSCAPING LLC photo 6", category: 'work' },
  { src: '/photos/photo-7.webp', alt: "Duran's LANDSCAPING LLC photo 7", category: 'work' },
  { src: '/photos/photo-8.webp', alt: "Duran's LANDSCAPING LLC photo 8", category: 'work' },
  { src: '/photos/photo-9.webp', alt: "Duran's LANDSCAPING LLC photo 9", category: 'work' },
  { src: '/photos/photo-10.webp', alt: "Duran's LANDSCAPING LLC photo 10", category: 'work' },
]

// ── Services ──────────────────────────────────────────────────────────────────
const services: Service[] = [
  { name: 'Sod Installation', description: 'Full-yard or targeted sod laying to deliver an instantly lush, green lawn with quick scheduling and professional preparation.', icon: 'sprout', image: '/photos/photo-3.webp' },
  { name: 'Bluestone & Hardscape Installation', description: 'Custom installation of bluestone landings, walkways, and step areas that blend function with curb appeal.', icon: 'layers', image: '/photos/photo-4.webp' },
  { name: 'Drainage & Pipe Extensions', description: 'Expert drain pipe extension and water management solutions to protect your property from runoff and moisture damage.', icon: 'droplets', image: '/photos/photo-5.webp' },
  { name: 'Weed Control & Barrier Installation', description: 'Complete weed removal followed by professional-grade weed barrier and stone application for long-lasting clean results.', icon: 'shield', image: '/photos/photo-6.webp' },
  { name: 'Property Cleanouts', description: 'Full-scale cleanouts of overgrown driveways, yards, and commercial lots — debris removed, surfaces restored.', icon: 'trash-2', image: '/photos/photo-7.webp' },
  { name: 'Landscape Consultation & Design', description: 'One-on-one consultations where Gustavo listens to your vision and provides expert recommendations tailored to your space.', icon: 'pencil-ruler', image: '/photos/photo-8.webp' },
]

// ── Reviews ───────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  { text: "Gustavo and his team did an excellent job from start to finish! Communication and scheduling was quick and easy, and the pricing was very reasonable. They even completed the work ahead of schedule. Gustavo was incredibly consultative—he really listened to what I wanted and made t...", author: 'sumit sethi', rating: 5, source: 'google' },
  { text: "Gustavo and his crew did a fantastic job laying sod at my home at a reasonable price and quick scheduling - looks fantastic! Look forward to working with Duran again", author: 'Scott', rating: 5, source: 'google' },
  { text: "Gustavo and his team did an amazing job! I had asked him to extend a drain pipe and also to put in a new bluestone landing at the bottom of our deck steps. He delivered within a week, and it turned out beautifully! And pricing was reasonable. Also very communicative.", author: 'Michael Katz', rating: 5, source: 'google' },
  { text: "Can't really say enough about this company they do great work! Had them do a complete clean out of a driveway behind our auto repair shop remove weeds put weed barrier down with stone looks great. Highly recommended. 👍", author: 'Rich DiGrosso', rating: 5, source: 'google' },
  { text: "Gustavo Duran provides first class customer service and support for all our landscaping needs. All labor, materials and services are provided at very reasonable cost. No job is too big or little to address. His advice and recommendations are always on target.", author: 'Harry J. Gaffney', rating: 5, source: 'google' },
]

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.9, suffix: '★', label: 'Average Customer Rating' },
  { value: 40, suffix: '+', label: 'Verified 5-Star Reviews' },
  { value: 100, suffix: '%', label: 'On or Ahead of Schedule' },
  { value: 5, suffix: '-day', label: 'Average Project Turnaround' },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  { question: "How quickly can Duran's Landscaping schedule my project?", answer: "Gustavo is known for fast, easy scheduling. Multiple customers have noted that projects were booked quickly and often completed ahead of the original timeline. Reach out by phone and expect a same-day response." },
  { question: 'Is pricing transparent and reasonable?', answer: "'Reasonable pricing' is one of the most consistent themes across all reviews. Gustavo provides clear, fair quotes upfront — no surprises, no hidden fees. You'll know exactly what you're paying before any work begins." },
  { question: 'Does Gustavo work on both residential and commercial properties?', answer: "Absolutely. Duran's Landscaping serves both homeowners and businesses. Past commercial work includes a full driveway cleanout for an auto repair shop — weed removal, barrier install, and stone application." },
  { question: "What makes Duran's different from other landscaping companies?", answer: "Customers consistently highlight three things: Gustavo's hands-on involvement and consultative approach, his team's speed and reliability, and consistently fair pricing. He treats every yard like his own." },
]

// ── Contact ───────────────────────────────────────────────────────────────────
const businessContact = {
  name: "Duran's LANDSCAPING LLC",
  address: '4832 N Hope St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19120',
  phone: '(267) 970-1289',
  email: '',
  hours: {
    Monday: '9:00 AM – 5:00 PM',
    Tuesday: '9:00 AM – 5:00 PM',
    Wednesday: '9:00 AM – 5:00 PM',
    Thursday: '9:00 AM – 5:00 PM',
    Friday: '9:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

// ── Fade-up helper ────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Marquee strip ─────────────────────────────────────────────────────────────
const marqueeItems = [
  'Sod Installation', '★ 4.9 Rating', 'Bluestone & Hardscape', 'Fast Scheduling',
  'Weed Control', 'On-Time Delivery', 'Property Cleanouts', 'Reasonable Pricing',
  'Drainage Solutions', 'Philadelphia PA',
]

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="durans-marquee-wrapper">
      <div className="durans-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="durans-marquee-item">
            {item}
            <span className="durans-marquee-dot" style={{ color: BRAND }}>●</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Trust badge row ───────────────────────────────────────────────────────────
function TrustBadges() {
  const badges = [
    { label: 'Licensed & Insured', icon: '🛡️' },
    { label: 'Philly-Based', icon: '📍' },
    { label: 'Free Estimates', icon: '💬' },
    { label: '5-Star Service', icon: '⭐' },
  ]
  return (
    <div className="durans-trust-row">
      {badges.map((b, i) => (
        <FadeUp key={i} delay={i * 0.08}>
          <div className="durans-trust-badge">
            <span className="durans-trust-icon">{b.icon}</span>
            <span className="durans-trust-label">{b.label}</span>
          </div>
        </FadeUp>
      ))}
    </div>
  )
}

// ── Green CTA band ────────────────────────────────────────────────────────────
function CTABand() {
  return (
    <section className="durans-cta-band" style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #007a38 50%, ${ACCENT} 100%)` }}>
      <div className="durans-cta-band-inner">
        <FadeUp>
          <p className="durans-cta-band-eyebrow">Ready to transform your yard?</p>
          <h2 className="durans-cta-band-headline">Get a Free Estimate Today</h2>
          <p className="durans-cta-band-sub">Quick scheduling · Transparent pricing · Gustavo answers personally</p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <a href="tel:+12679701289" className="durans-cta-band-btn">
            Call (267) 970-1289
          </a>
        </FadeUp>
      </div>
      {/* decorative circles */}
      <div className="durans-cta-circle durans-cta-circle-1" />
      <div className="durans-cta-circle durans-cta-circle-2" />
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Global font imports via next/head would go in layout — here we rely on globals.css */}
      <Navbar
        businessName="Duran's Landscaping"
        links={navLinks}
        ctaText="Free Estimate"
        ctaHref="tel:+12679701289"
      />

      {/* HERO */}
      <HeroSection
        headline="Your Yard, Transformed."
        subheadline="Philadelphia's landscaper known for fast scheduling, honest prices, and results that last."
        ctaText="Call for a Free Estimate"
        ctaHref="tel:+12679701289"
        secondaryCtaText="See Our Work"
        secondaryCtaHref="#gallery"
        rating={4.9}
        reviewCount={40}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* MARQUEE — immediately below hero */}
      <MarqueeStrip />

      {/* STATS — dark */}
      <div className="bg-[#0d1a0f]">
        <FadeUp>
          <StatsCounter stats={stats} variant="dark" />
        </FadeUp>
      </div>

      {/* TRUST BADGES */}
      <section className="durans-trust-section">
        <TrustBadges />
      </section>

      {/* SERVICES */}
      <section id="services" className="durans-section-light">
        <FadeUp>
          <div className="durans-section-label" style={{ color: BRAND }}>What We Do</div>
          <h2 className="durans-section-heading">Six Core Services</h2>
          <p className="durans-section-sub">
            From fresh sod to bluestone hardscape — Gustavo's crew handles it all, on time and on budget.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ServiceCards
            heading=""
            services={services}
            columns={3}
            variant="grid"
          />
        </FadeUp>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="durans-section-dark" style={{ background: '#0d1a0f' }}>
        <FadeUp>
          <div className="durans-section-label" style={{ color: BRAND }}>Project Photos</div>
          <h2 className="durans-section-heading durans-light-heading">Recent Work</h2>
          <p className="durans-section-sub durans-light-sub">
            Every project photographed. Browse real jobs from real Philadelphia yards.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ImageGallery
            heading=""
            photos={galleryPhotos}
            variant="masonry"
          />
        </FadeUp>
      </section>

      {/* ABOUT */}
      <section id="about" className="durans-section-light">
        <FadeUp>
          <div className="durans-section-label" style={{ color: ACCENT }}>The Team</div>
          <h2 className="durans-section-heading">Built on Trust</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <AboutSection
            heading=""
            story="Gustavo Duran runs every job personally — from the first call to the final cleanup. Based in Philadelphia, his crew has built a reputation for delivering bluestone landings, sod installs, and full cleanouts ahead of schedule. Customers keep coming back because Gustavo actually listens before he lifts a shovel."
            image={aboutPhoto}
          />
        </FadeUp>
      </section>

      {/* GREEN CTA BAND */}
      <CTABand />

      {/* REVIEWS */}
      <section id="reviews" className="durans-section-light">
        <FadeUp>
          <div className="durans-section-label" style={{ color: BRAND }}>40+ Google Reviews</div>
          <h2 className="durans-section-heading">Customers Agree</h2>
          <p className="durans-section-sub">Real words from real Philadelphia homeowners and businesses.</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <TestimonialCarousel
            heading=""
            reviews={reviews}
            variant="scroll"
          />
        </FadeUp>
      </section>

      {/* FAQ */}
      <section id="faq" className="durans-section-dark" style={{ background: '#0d1a0f' }}>
        <FadeUp>
          <div className="durans-section-label" style={{ color: BRAND }}>Quick Answers</div>
          <h2 className="durans-section-heading durans-light-heading">Common Questions</h2>
          <p className="durans-section-sub durans-light-sub">
            Everything you need to know before your first call.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <FAQAccordion heading="" items={faqItems} />
        </FadeUp>
      </section>

      {/* CONTACT */}
      <section id="contact" className="durans-section-light">
        <FadeUp>
          <div className="durans-section-label" style={{ color: ACCENT }}>Reach Out</div>
          <h2 className="durans-section-heading">Start Your Project</h2>
          <p className="durans-section-sub">
            Call Gustavo directly — he picks up, he listens, and he'll give you a fair quote fast.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ContactSection
            business={businessContact}
            heading=""
            showMap={true}
          />
        </FadeUp>
      </section>

      {/* FOOTER */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      {/* FLOATING CALL BUTTON */}
      <ClickToCall phone="(267) 970-1289" />
    </>
  )
}