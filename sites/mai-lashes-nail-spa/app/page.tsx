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
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BRAND = {
  copper: '#b87333',
  accent: '#d4956a',
  cream: '#fdf8f3',
  dark: '#1c1410',
}

// ─── Data constants ───────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Mai Lashes & Nail Spa photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Mai Lashes & Nail Spa photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'Mai Lashes & Nail Spa photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Mai Lashes & Nail Spa photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'Mai Lashes & Nail Spa photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Mai Lashes & Nail Spa photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'Mai Lashes & Nail Spa photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'Mai Lashes & Nail Spa photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Mai Lashes & Nail Spa photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Mai Lashes & Nail Spa photo 10', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Builder Gel Nails',
    description: 'A durable, sculpted gel application praised by customers for its flawless shape and long-lasting finish.',
    icon: 'sparkles',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Full Set Acrylic Nails',
    description: 'Custom acrylic sets shaped and finished to your preference, with consistently clean, precise results.',
    icon: 'wand-2',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Gel Manicure',
    description: 'A chip-resistant gel polish manicure with a glossy, salon-quality finish that lasts for weeks.',
    icon: 'paint-bucket',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Classic Manicure',
    description: 'A quick, expertly finished manicure ideal for maintaining neat, polished nails between appointments.',
    icon: 'hand',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Lash Services',
    description: "Professional eyelash enhancements to complement your nail look, offered alongside the salon's core nail menu.",
    icon: 'eye',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Pedicure',
    description: 'A relaxing foot care treatment including nail shaping, cuticle work, and polish in your choice of finish.',
    icon: 'footprints',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'I had a wonderful experience here. The builder gel looks amazing and the shape is flawless — exactly how I like it. The tech was gentle and detail-oriented. I\'ll definitely return!',
    author: 'Thanh Mai',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Took my daughter to get her fingernails done after we just got back in town from Miami so they would be fresh to start the week at school. Tech was available as soon as we arrived and got her out of there with everything she wanted in under 20 minutes.',
    author: 'Paul Thomas',
    rating: 5,
    source: 'google',
  },
  {
    text: 'my first time here after hearing about this salon and definitely 10/10. i went to Win, she\'s very nice and communicates well. i\'ll definitely be back !!',
    author: 'Kayla Dnae',
    rating: 5,
    source: 'google',
  },
  {
    text: 'This is my first time using the service here and I\'m quite satisfied with these nails. I recommend everyone to come and try it out 😍',
    author: 'Quỳnh Anh Lê Trương',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Win did my nails, she was great! The shape was immaculate, and the service was amazing!! Great work, I will definitely be back.',
    author: 'Astan D',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.8, suffix: '★', label: 'Average Customer Rating' },
  { value: 319, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 6, suffix: ' Days', label: 'Open Every Week' },
  { value: 98, suffix: '%', label: 'Clients Who Say They\'ll Return' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do I need an appointment or can I walk in?',
    answer: 'Walk-ins are welcome and often accommodated right away — at least one customer was seated and served immediately upon arrival. Calling ahead helps during busy periods.',
  },
  {
    question: 'How long does a typical nail appointment take?',
    answer: 'Appointments are known for being efficient without feeling rushed. Clients have reported being in and out in under 20 minutes for simpler services.',
  },
  {
    question: 'Is this a good salon for first-time visitors?',
    answer: 'Absolutely. Multiple first-time clients left 5-star reviews and immediately said they\'d be back. The technicians communicate well and make new clients feel comfortable.',
  },
  {
    question: 'Can I request a specific technician like Win?',
    answer: 'Yes — calling ahead to request Win or another preferred technician is the best way to ensure availability. Win is a frequently requested technician known for immaculate shape work.',
  },
]

const businessContact = {
  name: 'Mai Lashes & Nail Spa',
  address: '2910 S 70th St Unit 3',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19142',
  phone: '(267) 969-5262',
  email: '',
  hours: {
    Monday: 'Closed',
    Tuesday: '9:00 AM – 6:30 PM',
    Wednesday: '9:00 AM – 6:30 PM',
    Thursday: '9:00 AM – 6:30 PM',
    Friday: '9:00 AM – 6:30 PM',
    Saturday: '9:00 AM – 6:30 PM',
    Sunday: '10:30 AM – 4:00 PM',
  },
}

// ─── Fade-up animation wrapper ────────────────────────────────────────────────
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
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Marquee strip ────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const items = [
    'Flawless Shape',
    'Builder Gel',
    'Acrylic Sets',
    'Gel Manicure',
    'Lash Services',
    'Pedicures',
    'Walk-ins Welcome',
    '4.8 ★ Rating',
  ]
  const doubled = [...items, ...items]

  return (
    <div
      className="mai-marquee-outer"
      style={{ background: BRAND.copper, overflow: 'hidden', padding: '12px 0' }}
    >
      <div className="mai-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="mai-marquee-item">
            <span className="mai-marquee-dot" style={{ color: BRAND.cream, opacity: 0.5 }}>◆</span>
            <span
              style={{
                fontFamily: "'Libre Baskerville', serif",
                color: BRAND.cream,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Decorative divider ───────────────────────────────────────────────────────
function CopperDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        margin: '0 auto 40px',
        maxWidth: '180px',
      }}
    >
      <span
        style={{
          flex: 1,
          height: '1px',
          background: light
            ? 'rgba(255,255,255,0.25)'
            : `rgba(184,115,51,0.35)`,
        }}
      />
      <span style={{ color: light ? 'rgba(255,255,255,0.5)' : BRAND.copper, fontSize: '0.65rem' }}>
        ◆
      </span>
      <span
        style={{
          flex: 1,
          height: '1px',
          background: light
            ? 'rgba(255,255,255,0.25)'
            : `rgba(184,115,51,0.35)`,
        }}
      />
    </div>
  )
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* CSS variables */}
      <div
        style={
          {
            '--brand-primary': BRAND.copper,
            '--brand-accent': BRAND.accent,
            '--brand-text': BRAND.dark,
            '--brand-bg': BRAND.cream,
          } as React.CSSProperties
        }
      />

      {/* Navbar */}
      <Navbar
        businessName="Mai Lashes & Nail Spa"
        links={navLinks}
        ctaText="Call to Book"
        ctaHref="tel:+12679695262"
      />

      {/* Hero */}
      <HeroSection
        headline="Mai Lashes & Nail Spa"
        subheadline="Flawless shape, every single time — in Southwest Philadelphia."
        ctaText="Call to Book"
        ctaHref="tel:+12679695262"
        secondaryCtaText="See Our Work"
        secondaryCtaHref="#gallery"
        rating={4.8}
        reviewCount={319}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* Marquee strip */}
      <MarqueeStrip />

      {/* Stats — dark */}
      <FadeUp>
        <section id="stats" style={{ background: BRAND.dark }}>
          <StatsCounter stats={stats} variant="dark" />
        </section>
      </FadeUp>

      {/* Services */}
      <section
        id="services"
        style={{
          background: BRAND.cream,
          padding: '96px 0 80px',
        }}
        className="mai-dot-bg"
      >
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '8px', padding: '0 24px' }}>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: BRAND.copper,
                fontWeight: 600,
              }}
            >
              What We Offer
            </span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '12px', padding: '0 24px' }}>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: BRAND.dark,
                margin: 0,
              }}
            >
              Services
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <CopperDivider />
          </div>
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

      {/* About */}
      <section
        id="about"
        style={{ background: '#fff', padding: '80px 0' }}
      >
        <FadeUp>
          <AboutSection
            heading="About the Spa"
            story="Mai Lashes & Nail Spa has built its reputation one flawless set at a time right here in Southwest Philadelphia. Technicians like Win are known for communicating clearly, working precisely, and turning first-time visitors into regulars — many customers say they'll be back before they even leave the chair. Walk-ins are always welcome, and most clients are in and out in under 30 minutes."
            image={aboutPhoto}
          />
        </FadeUp>
      </section>

      {/* Testimonials — dark */}
      <section
        id="reviews"
        style={{
          background: BRAND.dark,
          padding: '96px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative copper arc */}
        <div className="mai-dark-arc" aria-hidden />

        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '8px', padding: '0 24px' }}>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: BRAND.accent,
                fontWeight: 600,
              }}
            >
              319 Reviews · 4.8 Stars
            </span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '12px', padding: '0 24px' }}>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
              }}
            >
              Client Stories
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <CopperDivider light />
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <TestimonialCarousel
            heading=""
            reviews={reviews}
            variant="scroll"
          />
        </FadeUp>
      </section>

      {/* Gallery */}
      <section
        id="gallery"
        style={{ background: BRAND.cream, padding: '96px 0 80px' }}
      >
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '8px', padding: '0 24px' }}>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: BRAND.copper,
                fontWeight: 600,
              }}
            >
              Real Work · Real Clients
            </span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '12px', padding: '0 24px' }}>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: BRAND.dark,
                margin: 0,
              }}
            >
              The Work
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <CopperDivider />
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ImageGallery
            heading=""
            photos={galleryPhotos}
            variant="masonry"
          />
        </FadeUp>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        style={{
          background: '#fff',
          padding: '96px 0 80px',
          borderTop: `1px solid rgba(184,115,51,0.12)`,
        }}
      >
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '8px', padding: '0 24px' }}>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: BRAND.copper,
                fontWeight: 600,
              }}
            >
              Good to Know
            </span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '12px', padding: '0 24px' }}>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: BRAND.dark,
                margin: 0,
              }}
            >
              Questions
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <CopperDivider />
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <FAQAccordion heading="" items={faqItems} />
        </FadeUp>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{ background: BRAND.dark, padding: '96px 0 0' }}
      >
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '8px', padding: '0 24px' }}>
            <span
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: BRAND.accent,
                fontWeight: 600,
              }}
            >
              Find Us
            </span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '12px', padding: '0 24px' }}>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#fff',
                margin: 0,
              }}
            >
              Visit Us
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
            <CopperDivider light />
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ContactSection
            business={businessContact}
            heading=""
            showMap={true}
          />
        </FadeUp>
      </section>

      {/* Footer */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      {/* Click to call */}
      <ClickToCall phone="(267) 969-5262" />
    </>
  )
}