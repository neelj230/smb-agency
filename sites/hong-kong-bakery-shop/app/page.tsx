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
import { motion } from 'framer-motion'

// ─── Brand Tokens ──────────────────────────────────────────
const BRAND = '#FF7A27'
const ACCENT = '#f4ff27'

// ─── Data ──────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Menu', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit Us', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Hong Kong Bakery Shop photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Hong Kong Bakery Shop photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'Hong Kong Bakery Shop photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Hong Kong Bakery Shop photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'Hong Kong Bakery Shop photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Hong Kong Bakery Shop photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'Hong Kong Bakery Shop photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'Hong Kong Bakery Shop photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Hong Kong Bakery Shop photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Hong Kong Bakery Shop photo 10', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Hong Kong-Style Baked Buns',
    description: 'Classic Chinese bakery buns including char siu (BBQ pork) and red bean varieties, baked fresh and sold for around $2 each.',
    icon: 'cookie',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Egg Tarts',
    description: 'Traditional Hong Kong egg custard tarts with a flaky pastry shell, a beloved Chinatown staple available daily.',
    icon: 'sun',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Mochi & Specialty Sweets',
    description: 'Handmade mochi filled with coconut and peanut — described by customers as phenomenal and generously sized.',
    icon: 'star',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Late-Night Bakery Service',
    description: 'One of the only Chinatown bakeries open until 2–3 AM, serving fresh baked goods to night owls and late-shift workers.',
    icon: 'moon',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Steamed Buns (Dim Sum Style)',
    description: 'Soft steamed bao with various savory and sweet fillings, reflecting traditional Hong Kong dim sum bakery traditions.',
    icon: 'zap',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Daily Fresh Baked Pastries',
    description: 'A rotating selection of fresh Chinese pastries and breads available from early morning through late night every day of the week.',
    icon: 'coffee',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'The egg tart was ok but the mochi filled with coconut and peanut was phenomenal (and huge!)',
    author: 'Jenn Gray',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Pretty good buns honestly. And cheap too ($2 each). Though I will say that the filling is kinda lacking and concentrated in the middle of the bun so you get inconsistent bites. Owners were friendly though. I bet the food here is gas, super authentic place.',
    author: 'Dhruv Patel',
    rating: 4,
    source: 'google',
  },
  {
    text: 'Coolest bakery. Super raw. Lady up front is incredibly nice. Loved speaking Canto with her. Breads and such aren\'t top tier, but service makes up for it, the simple idea of supporting a small business immigrant-owned bakery.',
    author: 'Kiujoy Jay Kokko',
    rating: 4,
    source: 'google',
  },
  {
    text: 'I bought some chinese bun here fews days ago, and it was not the best I ever eaten. They were dry, the filling ( red bean) was hard and not melted. Also, it was only in the center, so it was not soft at all.',
    author: 'Jeanne COUSTIER',
    rating: 2,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 93, suffix: '+', label: 'Customer Reviews on Google' },
  { value: 3, suffix: ' AM', label: 'Latest We Stay Open (Fri & Sat)' },
  { value: 7, suffix: ' Days', label: 'Open Every Week Including Holidays' },
  { value: 2, suffix: '$', label: 'Starting Price Per Fresh Bun' },
]

const faqItems: FAQItem[] = [
  {
    question: 'What are your hours, and are you really open that late?',
    answer: 'Yes, really! We\'re open Monday through Thursday 7 AM to 2 AM, Friday and Saturday 7 AM to 3 AM, and Sunday 7:30 AM to 2 AM.',
  },
  {
    question: 'What\'s the most popular item to try?',
    answer: 'Customers rave about our mochi filled with coconut and peanut — one reviewer called it \'phenomenal and huge.\' Our egg tarts are also a beloved Chinatown staple.',
  },
  {
    question: 'Is the food quality consistent, and are the buns fresh?',
    answer: 'We bake throughout the day, but like any small bakery, freshness can vary by visit and time of day. Some customers have noted that buns are best enjoyed right after a fresh batch.',
  },
  {
    question: 'Is this an authentic Hong Kong-style bakery?',
    answer: 'Absolutely. We\'re an immigrant-owned shop rooted in Hong Kong baking traditions, from egg tarts and red bean buns to mochi and steamed bao.',
  },
]

const businessContact = {
  name: 'Hong Kong Bakery Shop',
  address: '917 Race St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19107',
  phone: '(215) 925-1288',
  email: '',
  hours: {
    Monday: '7:00 AM – 2:00 AM',
    Tuesday: '7:00 AM – 2:00 AM',
    Wednesday: '7:00 AM – 2:00 AM',
    Thursday: '7:00 AM – 2:00 AM',
    Friday: '7:00 AM – 3:00 AM',
    Saturday: '7:00 AM – 3:00 AM',
    Sunday: '7:30 AM – 2:00 AM',
  },
}

const socialLinks: SocialLinks = {}

const footerLinks: NavLink[] = [
  { label: 'Menu', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── Floating Tag Component ─────────────────────────────────
function FloatingTag({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="hkb-floating-tag"
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Late Night Banner ──────────────────────────────────────
function LateNightBanner() {
  const items = [
    '🥮 Egg Tarts',
    '🍡 Coconut Mochi',
    '🥐 BBQ Pork Buns',
    '🌙 Open Till 3 AM',
    '🫖 Red Bean Buns',
    '✨ Chinatown Soul',
    '💛 $2 Fresh Buns',
    '🍮 Daily Pastries',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="hkb-banner-wrap">
      <div className="hkb-banner-track">
        {doubled.map((item, i) => (
          <span key={i} className="hkb-banner-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      

      <Navbar
        businessName="HK Bakery"
        links={navLinks}
        ctaText="Call Us"
        ctaHref="tel:2159251288"
      />

      {/* ── HERO ── */}
      <section id="home">
        <HeroSection
          headline="Chinatown's Late-Night Bakery"
          subheadline="Fresh buns from $2. Open until 3 AM on weekends. 917 Race St, Philadelphia."
          ctaText="See Our Menu"
          ctaHref="#services"
          secondaryCtaText="Call Now"
          secondaryCtaHref="tel:2159251288"
          rating={3.1}
          reviewCount={93}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* ── SCROLLING BANNER ── */}
      <LateNightBanner />

      {/* ── STATS — dark ── */}
      <section id="stats" className="hkb-stats-wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <StatsCounter stats={stats} variant="dark" />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="hkb-about-wrap">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <AboutSection
            heading="Baked in Chinatown"
            story="An immigrant-owned Hong Kong bakery on Race St since the beginning — egg tarts, mochi, buns baked daily. One reviewer put it best: 'Super raw. Lady up front is incredibly nice.' We're not a chain. We're a corner of Chinatown that stays lit when the rest of the street goes dark."
            image={aboutPhoto}
          />
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="hkb-services-wrap dot-pattern">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="hkb-section-label"
        >
          <span className="hkb-pill">What We Bake</span>
          <h2 className="hkb-section-title">Fresh Every Day</h2>
          <p className="hkb-section-sub">From dawn until the small hours — classic Hong Kong flavors at Chinatown prices.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ServiceCards
            heading=""
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="hkb-gallery-wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hkb-section-label"
        >
          <span className="hkb-pill hkb-pill--accent">Inside the Bakery</span>
          <h2 className="hkb-section-title">See the Spread</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <ImageGallery
            heading=""
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.div>
      </section>

      {/* ── TESTIMONIALS — dark bg ── */}
      <section id="reviews" className="hkb-reviews-dark">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hkb-section-label hkb-section-label--light"
        >
          <span className="hkb-pill hkb-pill--light">Real Reviews</span>
          <h2 className="hkb-section-title" style={{ color: '#fff' }}>What People Say</h2>
          <p className="hkb-section-sub" style={{ color: 'rgba(255,255,255,0.6)' }}>Unfiltered Google reviews — the good and the honest.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TestimonialCarousel
            heading=""
            reviews={reviews}
            variant="scroll"
          />
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="hkb-faq-wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hkb-section-label"
        >
          <span className="hkb-pill">Good to Know</span>
          <h2 className="hkb-section-title">Questions Asked</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="hkb-faq-inner"
        >
          <FAQAccordion heading="" items={faqItems} />
        </motion.div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="hkb-contact-wrap">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hkb-section-label"
        >
          <span className="hkb-pill hkb-pill--accent">Come Find Us</span>
          <h2 className="hkb-section-title">Visit the Shop</h2>
          <p className="hkb-section-sub">917 Race St in Philly's Chinatown. Walk-ins always welcome.</p>
        </motion.div>
        <ContactSection
          business={businessContact}
          heading=""
          showMap={true}
        />
      </section>

      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 925-1288" />
    </>
  )
}