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
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'B Auto Repair Inc photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'B Auto Repair Inc photo 2',
  category: 'interior',
}

const services: Service[] = [
  {
    name: 'Brake & Rotor Replacement',
    description:
      'Full brake system service including pad and rotor replacement, performed same-day when possible at prices that consistently beat dealership quotes.',
    icon: 'circle-slash',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Axle & Drivetrain Repair',
    description:
      "Expert diagnosis and repair of front and rear axle issues, including emergency same-day turnarounds for vehicles that can't wait.",
    icon: 'settings',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Suspension & Steering',
    description:
      "Inspection and repair of steering components, tie rods, and suspension systems to keep your ride safe and stable on Philly's roads.",
    icon: 'sliders-horizontal',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'General Diagnostics & Repair',
    description:
      'Thorough diagnostic services with honest, plain-language explanations of what your car needs — no upselling, no jargon.',
    icon: 'stethoscope',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Oil Change & Preventive Maintenance',
    description:
      'Routine maintenance services including oil changes, fluid checks, and tune-ups to extend the life of your vehicle.',
    icon: 'droplets',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Emergency & Same-Day Service',
    description:
      'Rapid-response repairs for urgent situations, including tow coordination and priority service to get you back on the road fast.',
    icon: 'zap',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'On September 9, 2024 we were traveling back from Wildwood, NJ, our car lost a front axle when we hit Phillie. We limped into Wynnfield. We found B Auto Repair. There was a guardian angel with us. Benjamin and his team were wonderful. They got us towed to their garage, had us up i...',
    author: 'Kelly Renee',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Ben is definitely trustworthy and charges fair prices for his solid work. He\'s taken very good care of my Mustang when I needed work done.',
    author: 'Paul H',
    rating: 5,
    source: 'google',
  },
  {
    text: 'As a young woman who does not know much about cars, this was the FIRST TIME mechanics at an auto shop have ever been kind to me and treated me like I wasn\'t beneath them. They were quick, efficient, fair-priced, and very helpful. They took the time to explain everything to me and...',
    author: 'Paige Martin',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Fast, reliable, affordable. What more could you want from a garage? I went in to replace my brakes and rotors. They were able to squeeze me in the same day, while charging half as much as what the Honda Dealership quoted. They did a fantastic job and were super friendly throughou...',
    author: 'Ashley Cook',
    rating: 5,
    source: 'google',
  },
  {
    text: 'B Auto Repair is my go-to mechanic in Philly. Benjamin is very honest, communicative, and pleasant to work with. His prices are always very fair, sometimes a fraction of what other shops quote me. He always fixes my car in a timely manner, and works with me when I need a tight tu...',
    author: 'Ian Gaskin',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.8, suffix: ' stars', label: 'Average Customer Rating' },
  { value: 149, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 6, suffix: ' days', label: 'Open Every Week, Monday–Saturday' },
  { value: 3, suffix: '-hour', label: 'Emergency Repair Turnaround (reported)' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Are your prices really lower than the dealership?',
    answer:
      'Consistently, yes. Multiple customers have reported paying significantly less than dealership quotes — one customer paid half the price a Honda dealership quoted for the same brake and rotor job. Benjamin keeps overhead lean and passes the savings to you.',
  },
  {
    question: 'Can you fit me in the same day if my car breaks down?',
    answer:
      'B Auto Repair does its best to accommodate urgent situations. The team has a strong track record of same-day service, and has even coordinated tows for customers who couldn\'t drive in. Call ahead so they can prepare.',
  },
  {
    question: "I don't know much about cars — will I feel comfortable here?",
    answer:
      'Absolutely. This is one of the most common things customers mention in reviews. Benjamin and his team take the time to explain what\'s wrong in plain language, without talking down to you. Everyone is welcome here.',
  },
  {
    question: 'What kinds of vehicles do you work on?',
    answer:
      'B Auto Repair works on a wide range of vehicles including everyday commuters, Honda models, and performance cars like the Ford Mustang. If you\'re unsure, just call — they\'ll let you know if they can help.',
  },
]

const businessContact = {
  name: 'B Auto Repair Inc',
  address: '1701 N 54th St #7',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(215) 477-8575',
  email: '',
  hours: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 5:00 PM',
    Saturday: '8:00 AM – 5:00 PM',
    Sunday: 'Closed',
  },
}

// ── Marquee trust bar ───────────────────────────────────────────────────────
const trustItems = [
  '⭐ 4.8 Stars on Google',
  'Same-Day Service Available',
  'Fair Prices. Always.',
  '149+ Reviews',
  'Philadelphia\'s Neighborhood Shop',
  'Honest Mechanics',
  'Emergency Tow Coordination',
  '⭐ 4.8 Stars on Google',
  'Same-Day Service Available',
  'Fair Prices. Always.',
  '149+ Reviews',
  'Philadelphia\'s Neighborhood Shop',
  'Honest Mechanics',
  'Emergency Tow Coordination',
]

// ── Fade-up wrapper ─────────────────────────────────────────────────────────
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

// ── Page ────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* ── Globals: CSS vars ── */}
      

      <Navbar
        businessName="B Auto Repair"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2154778575"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="Philadelphia's Trusted Garage"
        subheadline="Honest hands, fair prices — Benjamin and his team have kept Philly moving since day one."
        ctaText="Call (215) 477-8575"
        ctaHref="tel:2154778575"
        secondaryCtaText="Our Services"
        secondaryCtaHref="#services"
        rating={4.8}
        reviewCount={149}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── TRUST MARQUEE ── */}
      <div className="b-marquee-bar" aria-hidden="true">
        <div className="b-marquee-track">
          {trustItems.map((item, i) => (
            <span key={i} className="b-marquee-item">
              {item}
              <span className="b-marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ── (dark) */}
      <FadeUp>
        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>
      </FadeUp>

      {/* ── SERVICES ── */}
      <section id="services" className="b-section-pad dot-pattern">
        <FadeUp>
          <ServiceCards
            heading="What We Fix"
            subheading="Six days a week, no dealership prices, no runaround."
            services={services}
            columns={3}
            variant="grid"
          />
        </FadeUp>
      </section>

      {/* ── ABOUT ── (dark band) */}
      <section id="about" className="b-dark-band">
        <FadeUp delay={0.1}>
          <AboutSection
            heading="Meet Your Mechanic"
            story="Benjamin has been running B Auto Repair at 1701 N 54th St in Philadelphia for years, building a reputation one honest repair at a time. Customers travel from across the city — and have even limped in from the Jersey shore — because they trust him with their cars. No upselling. No jargon. Just solid work at prices that make sense."
            image={aboutPhoto}
          />
        </FadeUp>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="b-section-pad b-reviews-bg">
        <FadeUp>
          <TestimonialCarousel
            heading="Real Customer Reviews"
            reviews={reviews}
            variant="featured"
          />
        </FadeUp>
      </section>

      {/* ── PROCESS STRIP ── */}
      <section className="b-process-strip">
        <div className="b-process-inner">
          <FadeUp className="b-process-heading-wrap">
            <p className="b-process-eyebrow">How It Works</p>
            <h2 className="b-process-heading">Simple. Straight. Done.</h2>
          </FadeUp>
          <div className="b-process-steps">
            {[
              {
                n: '01',
                title: 'Call or Drive In',
                body: 'Reach Benjamin directly at (215) 477-8575 or pull up to 1701 N 54th St. No appointment required for most jobs.',
              },
              {
                n: '02',
                title: 'Plain-Language Diagnosis',
                body: "They'll tell you exactly what's wrong and what it costs — before any work begins. No surprises on the invoice.",
              },
              {
                n: '03',
                title: 'Back on the Road',
                body: 'Most repairs are completed same-day. Emergency situations get priority. You leave knowing the job is done right.',
              },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.15} className="b-process-card">
                <span className="b-process-num">{step.n}</span>
                <h3 className="b-process-title">{step.title}</h3>
                <p className="b-process-body">{step.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="b-section-pad b-faq-bg">
        <FadeUp>
          <FAQAccordion heading="Common Questions" items={faqItems} />
        </FadeUp>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <FadeUp>
          <ContactSection
            business={businessContact}
            heading="Find Us in Philly"
            showMap={true}
          />
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      <ClickToCall phone="(215) 477-8575" />
    </>
  )
}