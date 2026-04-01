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
import { motion } from 'framer-motion'

// ─── NAV ───────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── HERO ──────────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'HVAC technician in work apron inspecting air conditioning unit outside residential home',
  category: 'work',
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Emergency AC Repair',
    description:
      'Rapid-response air conditioner repair with technicians on-site in as little as 45 minutes to diagnose and fix breakdowns fast.',
    icon: 'zap',
  },
  {
    name: 'AC Installation',
    description:
      'Full air conditioning system installation handled efficiently by a professional team, with on-time arrival and a spotless job site on completion.',
    icon: 'wind',
  },
  {
    name: 'Preventive AC Maintenance',
    description:
      'Thorough tune-up and inspection service that keeps your air conditioner running smoothly and prevents costly breakdowns before they happen.',
    icon: 'shield-check',
  },
  {
    name: 'Ventilated Ceiling Installation & Repair',
    description:
      'Expert installation and restoration of ventilated ceilings to dramatically improve airflow and indoor comfort throughout your home.',
    icon: 'layout-panel-top',
  },
  {
    name: 'Heating System Service',
    description:
      "Inspection, maintenance, and repair of residential heating systems to keep your home warm and efficient through Oregon's wet winters.",
    icon: 'flame',
  },
  {
    name: 'Indoor Air Quality Consultation',
    description:
      "Assessment of your home's ventilation and air circulation with tailored recommendations to enhance comfort and air quality.",
    icon: 'airplay',
  },
]

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: 'Sweltering afternoons are now a thing of the past thanks to their swift and expert AC installation. The team arrived right on time and worked efficiently, leaving everything spotless. Highly recommend!',
    author: 'Luciano Jonah',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Our A/C suddenly stopped working, and their technician arrived 45 minutes later. He fixed the issue quickly and explained everything thoroughly. Highly recommend!',
    author: 'Catalina Kayleigh',
    rating: 5,
    source: 'google',
  },
  {
    text: 'The team transformed our living room with a stunning ventilated ceiling. They were meticulous and completed everything perfectly in just under two hours. Highly recommended!',
    author: 'Roderick Bernier',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Just 45 minutes, and my A/C is now running smoothly! Truly impressed with their thorough preventive maintenance.',
    author: 'Samantha Adison',
    rating: 5,
    source: 'google',
  },
  {
    text: 'The team swiftly restored our ventilated ceiling, enhancing airflow and comfort remarkably.',
    author: 'Cash Ruben',
    rating: 5,
    source: 'google',
  },
]

// ─── STATS ────────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.9, suffix: '★', label: 'Average Customer Rating' },
  { value: 17, suffix: '+', label: 'Verified 5-Star Reviews' },
  { value: 45, suffix: ' min', label: 'Rapid Response Time' },
  { value: 7, suffix: ' days', label: 'Available Every Day of the Week' },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'How fast can you get a technician to my home for an AC repair?',
    answer:
      'Very fast. Multiple customers have had technicians arrive within 45 minutes of calling. We prioritize urgent AC issues and dispatch the nearest available technician immediately.',
  },
  {
    question: "Will the technician explain what's wrong before doing the repair?",
    answer:
      'Absolutely. Our technicians are known for walking customers through exactly what failed, why it happened, and what the fix involves — before any work begins.',
  },
  {
    question: 'How long does a typical AC installation or repair take?',
    answer:
      'Most repairs are completed in a single visit, often within an hour. Installations and more involved work like ventilated ceiling projects typically wrap up in under two hours.',
  },
  {
    question: 'Do you leave a mess after the job is done?',
    answer:
      "No. Customers consistently note that our team leaves the work area spotless when they're finished. Clean job sites are a standard — not an exception.",
  },
]

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const businessContact = {
  name: 'Eugene Heating and Air Conditioning',
  address: '2130 W 7th Ave',
  city: 'Eugene',
  state: 'OR',
  zip: '97402',
  phone: '(541) 234-4801',
  email: '',
  hours: {
    Monday: '8:00 AM – 8:00 PM',
    Tuesday: '8:00 AM – 8:00 PM',
    Wednesday: '8:00 AM – 8:00 PM',
    Thursday: '8:00 AM – 8:00 PM',
    Friday: '8:00 AM – 8:00 PM',
    Saturday: '9:00 AM – 5:00 PM',
    Sunday: '9:00 AM – 5:00 PM',
  },
}

const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── FADE-UP WRAPPER ──────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <Navbar
        businessName="Eugene Heating & Air"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:5412344801"
      />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <HeroSection
          headline="Eugene Heating & Air"
          subheadline="Technicians on-site in 45 minutes. Cool homes, fast fixes, zero mess."
          ctaText="Call (541) 234-4801"
          ctaHref="tel:5412344801"
          secondaryCtaText="Our Services"
          secondaryCtaHref="#services"
          rating={4.9}
          reviewCount={17}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />

        {/* ── TRUST BAND ───────────────────────────────────────────── */}
        <div className="trust-band">
          <div className="trust-band__inner">
            {[
              { icon: '⚡', text: '45-Minute Response' },
              { icon: '✓', text: 'Spotless Job Sites' },
              { icon: '★', text: '4.9-Star Rated' },
              { icon: '📅', text: 'Open 7 Days a Week' },
              { icon: '🛡', text: 'Fully Licensed & Insured' },
            ].map((item, i) => (
              <span key={i} className="trust-band__item">
                <span className="trust-band__icon">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS — dark ─────────────────────────────────────────── */}
        <div id="about">
          <FadeUp>
            <StatsCounter stats={stats} variant="dark" />
          </FadeUp>
        </div>

        {/* ── ABOUT ────────────────────────────────────────────────── */}
        <div className="about-wrapper">
          <FadeUp>
            <AboutSection
              heading="Local HVAC, Done Right"
              story="Eugene Heating and Air Conditioning has been keeping Eugene homes comfortable year-round from our base on W 7th Ave. Customers consistently call out our 45-minute response windows, clean work habits, and technicians who explain every repair before touching a thing. No surprises, no shortcuts — just reliable HVAC work from a team that treats your home like their own."
            />
          </FadeUp>
        </div>

        {/* ── SERVICES ─────────────────────────────────────────────── */}
        <div id="services" className="services-wrapper dot-pattern">
          <FadeUp>
            <ServiceCards
              heading="Services Offered"
              subheading="Heating, cooling, ventilation — handled from one call."
              services={services}
              columns={3}
              variant="grid"
            />
          </FadeUp>
        </div>

        {/* ── PROCESS CALLOUT — inline dark strip ──────────────────── */}
        <div className="process-strip">
          <div className="process-strip__container">
            <FadeUp>
              <p className="process-strip__eyebrow">How It Works</p>
              <h2 className="process-strip__heading">Three Steps to Comfort</h2>
            </FadeUp>
            <div className="process-strip__steps">
              {[
                {
                  num: '01',
                  title: 'Call Us',
                  body: 'Reach us at (541) 234-4801 any day of the week. Describe your issue and we dispatch the nearest technician immediately.',
                },
                {
                  num: '02',
                  title: 'We Diagnose',
                  body: 'Your tech arrives — often within 45 minutes — walks you through exactly what failed, and presents a clear fix before starting work.',
                },
                {
                  num: '03',
                  title: 'Problem Solved',
                  body: 'We fix it, test it, clean up completely, and leave you with a comfortable home. Most jobs done in a single visit.',
                },
              ].map((step, i) => (
                <FadeUp key={i} delay={i * 0.12}>
                  <div className="process-strip__card">
                    <span className="process-strip__num">{step.num}</span>
                    <h3 className="process-strip__title">{step.title}</h3>
                    <p className="process-strip__body">{step.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        {/* ── REVIEWS ──────────────────────────────────────────────── */}
        <div id="reviews" className="reviews-wrapper">
          <FadeUp>
            <TestimonialCarousel
              heading="From Customers"
              reviews={reviews}
              variant="featured"
            />
          </FadeUp>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <div id="faq" className="faq-wrapper dot-pattern">
          <FadeUp>
            <FAQAccordion heading="Common Questions" items={faqItems} />
          </FadeUp>
        </div>

        {/* ── CTA BANNER ───────────────────────────────────────────── */}
        <div className="cta-banner">
          <FadeUp>
            <div className="cta-banner__inner">
              <div className="cta-banner__text">
                <h2 className="cta-banner__heading">AC down? Call now.</h2>
                <p className="cta-banner__sub">
                  Technicians available Mon–Fri 8 AM–8 PM, weekends 9 AM–5 PM.
                </p>
              </div>
              <a href="tel:5412344801" className="cta-banner__btn">
                (541) 234-4801
              </a>
            </div>
          </FadeUp>
        </div>

        {/* ── CONTACT ──────────────────────────────────────────────── */}
        <div id="contact">
          <FadeUp>
            <ContactSection
              business={businessContact}
              heading="Reach Us"
              showMap={true}
            />
          </FadeUp>
        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={{}}
      />

      {/* ── CLICK-TO-CALL ─────────────────────────────────────────── */}
      <ClickToCall phone="(541) 234-4801" />
    </>
  )
}