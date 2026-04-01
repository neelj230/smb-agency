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
import type { NavLink, Photo, Service, Review, Stat, FAQItem, SocialLinks } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── NAV ────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── HERO ────────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Outdoor plaza with lamp posts, benches, and surrounding coniferous trees under clear blue sky',
  category: 'exterior',
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
const aboutPhoto: Photo = {
  src: '/photos/photo-5.webp',
  alt: 'Modern wooden storefront with glass doors and recessed lighting under covered entryway',
  category: 'exterior',
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Kitchen & Bathroom Electrical Remodels',
    description: 'Complete electrical upgrades for renovation projects including new outlets, light fixtures, and recessed lighting installed precisely to your vision.',
    icon: 'lightbulb',
    image: '/photos/photo-1.webp',
  },
  {
    name: 'EV Charger & RV Hookup Installation',
    description: 'Professional installation of Level 2 EV charging stations and 50-amp RV hookups for residential properties, done cleanly and to code.',
    icon: 'zap',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Panel Upgrades & Breaker Replacement',
    description: 'Service panel installations, breaker replacements, and electrical system upgrades to keep your home or business safe and up to standard.',
    icon: 'cpu',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Commercial & Industrial Wiring',
    description: 'Precision high-amperage wiring for warehouses, commercial builds, and industry-specific machinery requiring complex power configurations.',
    icon: 'factory',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'New Construction Electrical',
    description: 'Full electrical rough-in and finish work for new home and commercial construction, from framing-stage wiring to final fixture installation.',
    icon: 'hard-hat',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Residential Repairs & Outlet Service',
    description: 'Fast, safe repairs for loose outlets, faulty wiring, and other household electrical issues handled with professionalism and thoroughness.',
    icon: 'wrench',
    image: '/photos/photo-8.webp',
  },
]

// ─── REVIEWS ─────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: 'OC Electric was great to work with in our kitchen renovation project. Decided mid way through it that we needed more things changed and they were easy to accommodate. It was great to get their help at my mom\'s home too. From loose outlets to replacing breakers, work was great.',
    author: 'Ruth Ann Albro',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Joe and his crew are AMAZING! I\'ve worked with electricians for over 30 years and I can honestly say he is the nicest and most knowledgeable I have ever met! Very straightforward and easy to work with. Thank you so much guys!',
    author: 'Nicky Bruce',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Great experience working with OC Electric for our bathroom remodel. The bid was thorough and timely, everything from new outlets, light fixtures, and recessed lighting came out exactly how we wanted it. We will definitely be using OC Electric for our future electrical needs.',
    author: 'James Wohlmacher',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Joe ended up doing some electrical work for us in a pinch. He was quick, professional and does good work. He is clean and very thorough. Whenever electrical issues arise, we will be calling Joe back for help.',
    author: 'Ben Boyer',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I highly recommend OC electric. OC electric did outstanding work for both my home and my business. Joe came to my house on two separate occasions and installed a EV car charging unit as well as a 50-amp RV hookup. Everything was done cleanly, safely, and professionally.',
    author: 'Kevin Fish',
    rating: 5,
    source: 'google',
  },
]

// ─── STATS ───────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 5, suffix: '★', label: 'Perfect Rating on Every Review' },
  { value: 21, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 7, suffix: ' days', label: 'Available Every Day of the Week' },
  { value: 50, suffix: '+', label: 'Residential & Commercial Projects Completed' },
]

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const galleryPhotos: Photo[] = [
  { src: '/photos/photo-1.webp', alt: 'Construction site interior with electrical wiring, wooden framing, and service panel installation in progress.', category: 'work' },
  { src: '/photos/photo-3.webp', alt: 'Interior construction site showing wooden framing, electrical wiring, and doorway installation in progress.', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Modern living room with gray sectional sofa, white paneling, and wood flooring', category: 'interior' },
  { src: '/photos/photo-6.webp', alt: 'Luxury kitchen and dining area with wooden cabinets, island seating, and pool view', category: 'interior' },
  { src: '/photos/photo-7.webp', alt: 'Interior framing of new home construction showing wooden studs and electrical wiring', category: 'interior' },
  { src: '/photos/photo-8.webp', alt: 'Renovation interior with task list, tools, electrical wiring, and construction materials organized.', category: 'interior' },
  { src: '/photos/photo-9.webp', alt: 'Interior renovation in progress with protective coverings and construction tools scattered throughout room', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Interior construction site with framing, wiring, and building materials in progress', category: 'work' },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'Does OC Electric handle both residential and commercial work?',
    answer: 'Yes — Joe regularly works across both. He has installed EV chargers and done kitchen and bathroom remodel wiring for homeowners, and has completed commercial and warehouse electrical projects as well.',
  },
  {
    question: 'What if my project changes scope partway through?',
    answer: 'Not a problem. Multiple customers, including Ruth Ann Albro during her kitchen renovation, have changed plans mid-project and OC Electric adapted without issue.',
  },
  {
    question: 'How quickly can OC Electric respond to an urgent electrical need?',
    answer: 'Joe has stepped in on short notice for customers in a pinch and delivered fast, professional results. OC Electric is available seven days a week, 7 AM to 6 PM.',
  },
  {
    question: 'What does the bidding process look like?',
    answer: 'Customers consistently describe OC Electric\'s bids as thorough and timely. James Wohlmacher noted that the estimate for his bathroom remodel was detailed and the final result matched exactly what was quoted.',
  },
]

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const businessContact = {
  name: 'OC Electric',
  address: '14960 S Victory Rd',
  city: 'Oregon City',
  state: 'OR',
  zip: '97045',
  phone: '(503) 801-9038',
  email: '',
  hours: {
    Monday: '7:00 AM – 6:00 PM',
    Tuesday: '7:00 AM – 6:00 PM',
    Wednesday: '7:00 AM – 6:00 PM',
    Thursday: '7:00 AM – 6:00 PM',
    Friday: '7:00 AM – 6:00 PM',
    Saturday: '7:00 AM – 6:00 PM',
    Sunday: '7:00 AM – 6:00 PM',
  },
}

const socialLinks: SocialLinks = {}

// ─── FADE UP ANIMATION WRAPPER ────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── BOLT DIVIDER ─────────────────────────────────────────────────────────────
function BoltDivider({ light = false }: { light?: boolean }) {
  return (
    <div className={`oc-bolt-divider ${light ? 'oc-bolt-divider--light' : ''}`}>
      <span className="oc-bolt-line" />
      <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden="true">
        <path d="M10.5 0L0 16H8L7.5 28L18 12H10L10.5 0Z" fill="currentColor" />
      </svg>
      <span className="oc-bolt-line" />
    </div>
  )
}

// ─── TRUST BADGE STRIP ────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    '5-Star Rated',
    'Licensed & Insured',
    'Oregon City, OR',
    '7 Days a Week',
    'Residential & Commercial',
    'Ask for Joe',
  ]
  const doubled = [...items, ...items]
  return (
    <div className="oc-trust-strip">
      <div className="oc-trust-track">
        {doubled.map((item, i) => (
          <span key={i} className="oc-trust-item">
            <svg width="14" height="14" viewBox="0 0 18 28" fill="none" aria-hidden="true" className="oc-trust-bolt">
              <path d="M10.5 0L0 16H8L7.5 28L18 12H10L10.5 0Z" fill="currentColor" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function OCElectricPage() {
  const statsRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* ── CSS VARIABLES ──────────────────────────────────────────────────── */}
      

      <Navbar
        businessName="OC Electric"
        links={navLinks}
        ctaText="Call Joe Now"
        ctaHref="tel:5038019038"
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <HeroSection
        headline="Wired Right. Ask Joe."
        subheadline="Oregon City's electrician with a perfect 5-star record across every review."
        ctaText="Call (503) 801-9038"
        ctaHref="tel:5038019038"
        secondaryCtaText="See Our Work"
        secondaryCtaHref="#gallery"
        rating={5}
        reviewCount={21}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── TRUST STRIP ──────────────────────────────────────────────────────── */}
      <TrustStrip />

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <div ref={statsRef} id="stats">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section id="services" className="oc-services-wrapper dot-pattern">
        <div className="oc-section-label">
          <FadeUp>
            <span className="oc-eyebrow">What We Do</span>
          </FadeUp>
        </div>
        <FadeUp delay={0.05}>
          <ServiceCards
            heading="Services"
            subheading="From your first outlet to a full commercial build — Joe handles it."
            services={services}
            columns={3}
            variant="grid"
          />
        </FadeUp>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" className="oc-about-wrapper bg-[#0f1f18] text-white">
        <FadeUp>
          <BoltDivider light />
        </FadeUp>
        <FadeUp delay={0.1}>
          <AboutSection
            heading="Built on Trust"
            story="Joe has been doing electrical work in and around Oregon City for years — kitchens, bathrooms, new builds, warehouses, EV chargers, and emergency repairs. Nicky Bruce, who has worked with electricians for over 30 years, calls him the nicest and most knowledgeable she's ever met. He shows up, does the job right, and doesn't leave a mess."
            image={aboutPhoto}
          />
        </FadeUp>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────────── */}
      <section id="reviews" className="oc-reviews-wrapper">
        <FadeUp>
          <BoltDivider />
        </FadeUp>
        <FadeUp delay={0.1}>
          <TestimonialCarousel
            heading="From Customers"
            reviews={reviews}
            variant="featured"
          />
        </FadeUp>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────────────────────── */}
      <section id="gallery" className="oc-gallery-wrapper bg-[#0f1f18] text-white">
        <FadeUp>
          <ImageGallery
            heading="The Work"
            photos={galleryPhotos}
            variant="masonry"
          />
        </FadeUp>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="oc-faq-wrapper dot-pattern">
        <FadeUp>
          <BoltDivider />
        </FadeUp>
        <FadeUp delay={0.1}>
          <FAQAccordion
            heading="Common Questions"
            items={faqItems}
          />
        </FadeUp>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────────── */}
      <section className="oc-cta-band">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="oc-cta-inner"
        >
          <p className="oc-cta-eyebrow">Ready to start?</p>
          <h2 className="oc-cta-heading">Let's Get You Wired Right.</h2>
          <p className="oc-cta-sub">Available 7 days a week · Oregon City, OR · (503) 801-9038</p>
          <a href="tel:5038019038" className="oc-cta-btn">
            Call Joe
            <svg width="16" height="16" viewBox="0 0 18 28" fill="none" aria-hidden="true">
              <path d="M10.5 0L0 16H8L7.5 28L18 12H10L10.5 0Z" fill="currentColor" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section id="contact">
        <ContactSection
          business={businessContact}
          heading="Find Us"
          showMap={true}
        />
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      {/* ── CLICK TO CALL ─────────────────────────────────────────────────────── */}
      <ClickToCall phone="(503) 801-9038" />
    </>
  )
}