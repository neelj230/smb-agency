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

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BRAND_PURPLE = '#814AC8'
const BRAND_PINK   = '#c84abb'

// ─── Data ────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about'    },
  { label: 'Reviews',  href: '#reviews'  },
  { label: 'FAQ',      href: '#faq'      },
  { label: 'Contact',  href: '#contact'  },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: "Paco's Auto Repair shop photo 1",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "Paco's Auto Repair shop photo 2",
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'Engine Diagnostics & Check Engine Light',
    description:
      "Paco runs independent diagnostic tests to find the real problem — not just what a code scanner says — so you're only paying to fix what's actually wrong.",
    icon: 'search',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Engine Replacement & Motor Swap',
    description:
      'Full engine sourcing and replacement service, including finding the right motor at the right price and completing the swap with fast turnaround.',
    icon: 'settings',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Fuel System Repair',
    description:
      'Diagnosis and repair of fuel pump, fuel injector, and fuel line issues with hands-on testing rather than guesswork.',
    icon: 'droplets',
  },
  {
    name: 'Multi-Point Inspection & Preventive Repair',
    description:
      'Comprehensive vehicle inspection that often catches hidden issues before they become expensive emergencies — customers frequently leave with more fixed than they came in for.',
    icon: 'clipboard-check',
  },
  {
    name: 'Brake Service & Suspension Repair',
    description:
      'Brake pad replacement, rotor resurfacing, and suspension diagnostics to keep your ride smooth and safe on Philadelphia streets.',
    icon: 'circle-dot',
  },
  {
    name: 'General Mechanical Repair',
    description:
      'From oil changes and belts to electrical issues and exhaust, Paco handles the full range of everyday mechanical repairs with honest pricing.',
    icon: 'wrench',
  },
]

const reviews: Review[] = [
  {
    text: "PACO's auto repair shop is the best shop in Philly HANDS DOWN! My car's motor went out on me. Paco allowed me to tow my car to the shop after hours. Also, he found the perfect motor for my car and completed the repairs quickly. Last but not least, his prices are reasonable.",
    author: 'Kelli Morris',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I went there because auto zone said i need a new fuel pump! When i went to paco he run his own test to figure out the problem. He went above and beyond to help me for comfortable and every step he took he informed me what was happening. He also have reasonable prices !!!!!!!',
    author: 'Briana Allen',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Paco is THE BEST Mechanic in West Philly. I\'m glad he mine Mechanic 👨‍🔧and his prices are so reasonable.. forget the rest Paco the BEST',
    author: 'Carmen Velazquez',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Paco is amazing. I came in with one problem and he fixed multiple I was unaware of. He is very professional and funny. His prices are Hella affordable',
    author: 'Evelyn Williams',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.8, suffix: '★', label: 'Average Customer Rating' },
  { value: 17,  suffix: '+', label: 'Verified Customer Reviews' },
  { value: 6,   suffix: ' days', label: 'Open Every Week, 7AM Start' },
  { value: 100, suffix: '+', label: 'West Philly Vehicles Repaired' },
]

const faqItems: FAQItem[] = [
  {
    question: 'How are your prices compared to dealerships and other shops?',
    answer:
      "Multiple customers — including Kelli Morris, Briana Allen, and Carmen Velazquez — specifically call out Paco's prices as reasonable and affordable. You won't be overcharged for parts or labor here.",
  },
  {
    question: 'Can I trust your diagnosis, or should I get a second opinion?',
    answer:
      "Paco runs his own independent diagnostic tests rather than relying solely on generic code readers. One customer came in expecting a fuel pump replacement and left with the actual root cause fixed — saving real money.",
  },
  {
    question: 'What if my car breaks down after hours — can I still bring it in?',
    answer:
      'Yes. Paco has accommodated customers who needed to tow their vehicle in after regular business hours. Call ahead at (267) 748-7397 so he knows to expect you.',
  },
  {
    question: 'Will you explain what\'s wrong with my car and keep me updated?',
    answer:
      "Absolutely — this is one of the things customers praise most. Paco informs you at every step of the process, explaining what he found and what he's doing to fix it.",
  },
]

const businessContact = {
  name: "Paco's Auto Repair shop",
  address: '5302 Warren St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(267) 748-7397',
  email: '',
  hours: {
    Monday:    '7:00 AM – 5:00 PM',
    Tuesday:   '7:00 AM – 5:00 PM',
    Wednesday: '7:00 AM – 5:00 PM',
    Thursday:  '7:00 AM – 5:00 PM',
    Friday:    '7:00 AM – 5:00 PM',
    Saturday:  '7:00 AM – 5:00 PM',
    Sunday:    'Closed',
  },
}

// ─── Marquee strip data ───────────────────────────────────────────────────────
const marqueeItems = [
  'Fixed Right', 'No Runaround', 'Just Paco', "West Philly's Best",
  'Honest Prices', 'Real Diagnostics', 'Fixed Right', 'No Runaround',
  'Just Paco', "West Philly's Best", 'Honest Prices', 'Real Diagnostics',
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PacosAutoRepairPage() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* ── Global brand tokens ─────────────────────────────────────────── */}
      <div
        style={
          {
            '--brand-primary': BRAND_PURPLE,
            '--brand-accent':  BRAND_PINK,
          } as React.CSSProperties
        }
      >
        {/* ── Navbar ──────────────────────────────────────────────────────── */}
        <Navbar
          businessName="Paco's Auto Repair"
          links={navLinks}
          ctaText="Call Now"
          ctaHref="tel:+12677487397"
        />

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section id="hero">
          <HeroSection
            headline="Fixed Right. Just Paco."
            subheadline="West Philly's go-to mechanic — honest prices, real diagnostics, no BS."
            ctaText="Call (267) 748-7397"
            ctaHref="tel:+12677487397"
            secondaryCtaText="See Services"
            secondaryCtaHref="#services"
            rating={4.8}
            reviewCount={17}
            variant="photo-bg"
            backgroundImage={heroPhoto}
          />
        </section>

        {/* ── Marquee strip ───────────────────────────────────────────────── */}
        <div className="paco-marquee-wrapper" aria-hidden="true">
          <div className="paco-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="paco-marquee-item">
                {item}
                <span className="paco-marquee-dot">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats (dark) ────────────────────────────────────────────────── */}
        <section id="stats" className="paco-dark-section">
          <StatsCounter stats={stats} variant="dark" />
        </section>

        {/* ── Services ────────────────────────────────────────────────────── */}
        <section id="services" className="paco-section-lg">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ServiceCards
              heading="What Paco Fixes"
              subheading="Six services. One honest mechanic. Zero runaround."
              services={services}
              columns={3}
              variant="grid"
            />
          </motion.div>
        </section>

        {/* ── About ───────────────────────────────────────────────────────── */}
        <section id="about" className="paco-about-wrapper">
          {/* Decorative accent blob */}
          <div className="paco-blob paco-blob--left" aria-hidden="true" />
          <div className="paco-blob paco-blob--right" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="paco-about-inner"
          >
            <AboutSection
              heading="Real Mechanic. Real Answers."
              story="Paco has been turning wrenches in West Philadelphia long enough to know that most shops charge you for the guess, not the fix. He runs his own tests, explains every step, and has been known to open up the shop after hours for customers who need it. Reasonable prices, no surprises — that's the deal."
              image={aboutPhoto}
            />
          </motion.div>
        </section>

        {/* ── Testimonials (dark) ─────────────────────────────────────────── */}
        <section id="reviews" className="paco-dark-section paco-section-lg">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TestimonialCarousel
              heading="Straight From Customers"
              reviews={reviews}
              variant="featured"
            />
          </motion.div>

          {/* Star badges strip */}
          <div className="paco-star-strip">
            {['★★★★★', '4.8 on Google', '17 Reviews', '★★★★★'].map((t, i) => (
              <motion.span
                key={i}
                className="paco-star-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        <section id="faq" className="paco-faq-wrapper">
          <div className="paco-faq-accent" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="paco-faq-inner"
          >
            {/* Eyebrow label */}
            <div className="paco-eyebrow">Got Questions?</div>
            <FAQAccordion heading="Real Answers" items={faqItems} />
          </motion.div>
        </section>

        {/* ── CTA Banner ──────────────────────────────────────────────────── */}
        <section className="paco-cta-banner">
          <motion.div
            className="paco-cta-inner"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="paco-cta-label">Ready to get fixed?</p>
            <h2 className="paco-cta-headline">Call Paco Today.</h2>
            <p className="paco-cta-sub">5302 Warren St, Philadelphia · Mon–Sat 7AM–5PM</p>
            <a href="tel:+12677487397" className="paco-cta-btn">
              (267) 748-7397
            </a>
          </motion.div>
        </section>

        {/* ── Contact ─────────────────────────────────────────────────────── */}
        <section id="contact">
          <ContactSection
            business={businessContact}
            heading="Find Paco"
            showMap={true}
          />
        </section>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <Footer
          business={businessContact}
          links={navLinks}
          socialLinks={{}}
        />

        {/* ── Click to Call (floating) ─────────────────────────────────────── */}
        <ClickToCall phone="(267) 748-7397" />
      </div>
    </>
  )
}