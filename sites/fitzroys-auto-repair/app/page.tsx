'use client'

import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { ProcessSteps } from '@/components/ProcessSteps'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import type { NavLink, Service, Review, Stat, ProcessStep, FAQItem } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── Brand tokens ────────────────────────────────────────────────
const BRAND = '#156cc2'
const ACCENT = '#0ea158'

// ─── Contact ─────────────────────────────────────────────────────
const businessContact = {
  name: "Fitzroy's Auto Repair",
  address: '5100 W Thompson St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(215) 473-6565',
  email: '',
}

// ─── Nav ─────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── Services ────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Electrical Diagnostics & Repair',
    description:
      "Fitzroy's is widely recognized as the go-to shop for complex automotive electrical problems, from dead batteries and faulty alternators to wiring shorts and mystery fault codes.",
    icon: 'zap',
  },
  {
    name: 'General Engine Repair',
    description:
      "Full engine diagnostics and repair for cars and trucks of all makes, with a clear explanation of what's wrong and what it will cost before any work begins.",
    icon: 'settings',
  },
  {
    name: 'Truck & Heavy Vehicle Service',
    description:
      'Specialized repair and maintenance for pickup trucks and larger personal vehicles, getting commercial and personal truck owners back on the road fast.',
    icon: 'truck',
  },
  {
    name: 'Brake Service & Repair',
    description:
      'Inspection, pad replacement, rotor resurfacing, and full brake system repair to keep your vehicle safe and stopping reliably.',
    icon: 'circle-dot',
  },
  {
    name: 'Pre-Purchase Inspection',
    description:
      "Thorough vehicle inspection with a full verbal and written breakdown of condition and costs — ideal before buying a used car.",
    icon: 'clipboard-check',
  },
  {
    name: 'Routine Maintenance & Oil Change',
    description:
      'Oil changes, fluid top-offs, filter replacements, and scheduled maintenance to keep your vehicle running at its best between major repairs.',
    icon: 'droplets',
  },
]

// ─── Reviews ─────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "Best shop around and they say he's the best at electrical work",
    author: 'mike jones',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Service was fantastic, they explained the scope of work and cost. I would recommend them. Mrs Rudd',
    author: 'Theresa Terri Rudd',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Owner is very wholesome, does a great job and gets the job done!',
    author: 'Quadeera Burchette',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Thank you guys. I am forever grateful!',
    author: 'Nadra R',
    rating: 5,
    source: 'google',
  },
  {
    text: "Took care of my truck now I'm back on the road.",
    author: 'Richie Rumble',
    rating: 5,
    source: 'google',
  },
]

// ─── Stats ───────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.9, suffix: ' Stars', label: 'Average Customer Rating' },
  { value: 17, suffix: '+', label: 'Verified 5-Star Reviews' },
  { value: 100, suffix: '%', label: 'Customers Who Would Recommend' },
  { value: 1, suffix: ' Specialty', label: 'Best Electrical Repair in West Philly' },
]

// ─── Process ─────────────────────────────────────────────────────
const process: ProcessStep[] = [
  {
    step: 1,
    title: 'Drop Off',
    description:
      'Bring your car or truck to 5100 W Thompson St. We listen to what you've noticed and do a thorough diagnostic from there.',
  },
  {
    step: 2,
    title: 'Clear Estimate',
    description:
      'Before we touch anything, we walk you through exactly what's wrong and what it will cost. No surprises, no pressure.',
  },
  {
    step: 3,
    title: 'Expert Repair',
    description:
      'Fitzroy and the team get to work — whether it's a tricky electrical fault, a brake job, or full engine repair.',
  },
  {
    step: 4,
    title: 'Back on Road',
    description:
      'We do a final check, explain what was done, and send you off confident. Fixed right, every time.',
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: "What makes Fitzroy's different from other auto shops in Philadelphia?",
    answer:
      "Fitzroy's stands out for two big reasons: radical transparency and electrical expertise. Every job comes with a clear explanation of the scope of work and the cost — before anything is touched. Customers consistently say they felt informed and respected, not pressured.",
  },
  {
    question: 'Do you specialize in electrical repair?',
    answer:
      "Yes — electrical diagnostics and repair is one of Fitzroy's signature strengths. If you've been to other shops and they couldn't figure it out, this is the place to bring it. From mystery fault codes to dead batteries and wiring shorts, Fitzroy's has a reputation as the best in West Philly for electrical work.",
  },
  {
    question: "Will you explain what's wrong with my car before you fix it?",
    answer:
      "Absolutely. Explaining the scope of work and the cost before touching your vehicle is a core part of how Fitzroy's operates. You'll never be handed a surprise bill.",
  },
  {
    question: 'Do you work on trucks?',
    answer:
      "Yes. Fitzroy's services cars and trucks alike. Several customers have specifically praised the shop for truck repair, including getting trucks back on the road quickly after major service.",
  },
]

// ─── Footer links ─────────────────────────────────────────────────
const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── Fade-up animation helper ────────────────────────────────────
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
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Trust Badge Strip ───────────────────────────────────────────
function TrustStrip() {
  const items = [
    '⚡ #1 Electrical Repair in West Philly',
    '🔧 Clear Estimates Before Every Job',
    '🚛 Cars & Trucks Welcome',
    '⭐ 4.9 Stars on Google',
    '📍 5100 W Thompson St, Philadelphia',
    '📞 (215) 473-6565',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="fitzroy-trust-strip overflow-hidden bg-[#0d1a2e] py-3 border-y border-[#1e3a5f]">
      <div className="fitzroy-trust-inner flex gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-wide text-slate-300 flex-shrink-0"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Signature About Block ────────────────────────────────────────
function SignatureAbout() {
  return (
    <section
      id="about"
      className="relative bg-white py-24 overflow-hidden"
    >
      {/* Dot pattern bg */}
      <div className="dot-pattern absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <FadeUp>
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full border"
              style={{
                color: BRAND,
                borderColor: `${BRAND}33`,
                background: `${BRAND}0d`,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Why Fitzroy's
            </span>
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-[#0d1a2e]"
              style={{ fontFamily: 'Figtree, sans-serif' }}
            >
              Fixed Right.
              <br />
              <span style={{ color: BRAND }}>Explained Clear.</span>
            </h2>
            <p
              className="text-slate-600 text-lg leading-relaxed mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Fitzroy's Auto Repair has built a name on West Thompson Street for one reason: they tell
              you exactly what's wrong and what it costs before they pick up a wrench. Customers call
              it by name — "fantastic service," "wholesome owner," "best at electrical work."
            </p>
            <p
              className="text-slate-600 text-lg leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Whether it's a mystery fault code nobody else could crack or a straightforward oil
              change, the standard is the same: fixed right, every single time.
            </p>

            {/* inline trust badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: '⚡', label: 'Electrical Expert' },
                { icon: '📋', label: 'Upfront Pricing' },
                { icon: '🚛', label: 'Trucks Welcome' },
              ].map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-slate-100 text-slate-700"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span>{b.icon}</span>
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Right — big accent card */}
        <FadeUp delay={0.15}>
          <div
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{ background: `linear-gradient(135deg, #0d1a2e 0%, #1a3a6b 100%)` }}
          >
            {/* Decorative circle */}
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10"
              style={{ background: BRAND }}
            />
            <div
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
              style={{ background: ACCENT }}
            />

            <div className="relative z-10 space-y-6">
              {/* Pull quote */}
              <div>
                <span
                  className="text-6xl leading-none"
                  style={{ color: `${BRAND}80`, fontFamily: 'Figtree, sans-serif' }}
                >
                  "
                </span>
                <p
                  className="text-white text-xl leading-snug font-medium mt-2"
                  style={{ fontFamily: 'Figtree, sans-serif' }}
                >
                  Best shop around and they say he's the best at electrical work
                </p>
                <p
                  className="text-slate-400 text-sm mt-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  — mike jones, Google Review
                </p>
              </div>

              <hr className="border-white/10" />

              {/* Stat row */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { val: '4.9★', label: 'Rating' },
                  { val: '17+', label: 'Reviews' },
                  { val: '100%', label: 'Recommend' },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: ACCENT, fontFamily: 'Figtree, sans-serif' }}
                    >
                      {s.val}
                    </div>
                    <div
                      className="text-xs text-slate-400 mt-1"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────
export default function FitzroysAutoRepairPage() {
  return (
    <>
      {/* CSS variables */}
      

      <Navbar
        businessName="Fitzroy's Auto Repair"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2154736565"
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        headline="West Philly's Auto Shop"
        subheadline="Fixed Right. Explained Clear. Back on Road — 5100 W Thompson St, Philadelphia."
        ctaText="Call (215) 473-6565"
        ctaHref="tel:2154736565"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.9}
        reviewCount={17}
        variant="dark-bold"
      />

      {/* ── TRUST STRIP ──────────────────────────────────── */}
      <TrustStrip />

      {/* ── STATS ────────────────────────────────────────── */}
      <div className="bg-[#0d1a2e]">
        <FadeUp>
          <StatsCounter stats={stats} variant="dark" />
        </FadeUp>
      </div>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <SignatureAbout />

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section
        id="services"
        className="relative py-24"
        style={{ background: 'linear-gradient(180deg, #f0f6ff 0%, #ffffff 100%)' }}
      >
        <FadeUp className="text-center mb-4 px-6">
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full border"
            style={{
              color: BRAND,
              borderColor: `${BRAND}33`,
              background: `${BRAND}0d`,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            What We Fix
          </span>
        </FadeUp>
        <ServiceCards
          heading="Services Offered"
          subheading="Cars, trucks, electrical — if it rolls, Fitzroy's can fix it."
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <div className="bg-[#0d1a2e] text-white">
        <FadeUp>
          <ProcessSteps
            heading="How It Works"
            subheading="Simple, honest, no surprises."
            steps={process}
            variant="grid"
          />
        </FadeUp>
      </div>

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section
        id="reviews"
        className="py-24 bg-white"
      >
        <FadeUp>
          <TestimonialCarousel
            heading="Customer Reviews"
            reviews={reviews}
            variant="grid"
          />
        </FadeUp>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-24"
        style={{ background: '#f7faff' }}
      >
        <FadeUp>
          <FAQAccordion heading="Common Questions" items={faqItems} />
        </FadeUp>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <div id="contact" className="bg-[#0d1a2e]">
        <FadeUp>
          <ContactSection
            business={businessContact}
            heading="Find Us"
            showMap={true}
          />
        </FadeUp>
      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={{}}
      />

      {/* ── CLICK TO CALL ─────────────────────────────────── */}
      <ClickToCall phone="(215) 473-6565" />
    </>
  )
}