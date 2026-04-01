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
import type { NavLink, Service, Review, Stat, FAQItem } from '@/components/types'
import { motion } from 'framer-motion'

// ─── Brand tokens ───────────────────────────────────────────────────────────
const BRAND_GREEN = '#1B3A2D'
const BRAND_TEAL  = '#004055'

// ─── Navigation ─────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services',     href: '#services'      },
  { label: 'Why Larry',    href: '#about'         },
  { label: 'Reviews',      href: '#reviews'       },
  { label: 'FAQ',          href: '#faq'           },
  { label: 'Contact',      href: '#contact'       },
]

// ─── Services ────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'AC Repair & Emergency Service',
    description: 'Same-day and weekend emergency air conditioning repairs, including capacitor replacement, electrical diagnostics, and cooling restoration — even on holidays.',
    icon: 'zap',
  },
  {
    name: 'Heat Pump Installation & Replacement',
    description: 'Full heat pump system replacement with energy-efficient equipment and competitive pricing that routinely comes in thousands below larger competitors.',
    icon: 'thermometer',
  },
  {
    name: 'Furnace Repair & Diagnostics',
    description: 'Fast furnace troubleshooting including remote diagnosis, same-day part sourcing, and rapid restoration — David Brown had heat back within three hours of his call.',
    icon: 'flame',
  },
  {
    name: 'AC Installation',
    description: 'New air conditioning system installation scheduled promptly, including weekend installs, when other companies are booked out for months.',
    icon: 'wind',
  },
  {
    name: 'HVAC Estimates & Honest Assessments',
    description: "Straightforward second opinions and replacement estimates — Larry will tell you if your unit can be repaired rather than pushing an unnecessary replacement.",
    icon: 'clipboard-check',
  },
  {
    name: 'Preventive Maintenance & Optimization',
    description: 'Tune-up services to keep aging systems running efficiently, including showing homeowners how to cool down and maintain their units to prevent future failures.',
    icon: 'settings',
  },
]

// ─── Reviews ─────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "Larry is outstanding! He installed my AC on a Saturday on Memorial Day weekend. He is professional, easy to talk to, and very happy. I will absolutely call him again if I have any issues with my HVAC.",
    author: 'Danielle Stelmach',
    rating: 5,
    source: 'google',
  },
  {
    text: "Larry came out on a Sunday afternoon on the hottest day in recorded history when our AC stopped working. He was professional, knowledgeable and friendly. He fixed the problem quickly (it was a bad capacitor) and showed us how to cool down the unit to prevent it from happening again.",
    author: 'Cathie Myers',
    rating: 5,
    source: 'google',
  },
  {
    text: "Our AC unit has not been cooling our house and we are planning to replace. I have been scheduling estimates from many different companies and everyone is months out for installation. When I called Larry he immediately knew what the problem was with ours and said he could come out promptly.",
    author: 'Brenda Webb',
    rating: 5,
    source: 'google',
  },
  {
    text: "Our 12 year old heat pump failed and I was complaining to a friend about it. My friend recommended I give Larry a call. Larry's bid was way more reasonable and he was very responsive when I called with questions and scheduled me just a few days later.",
    author: 'Dustin Burgess',
    rating: 5,
    source: 'google',
  },
  {
    text: "Larry McGinnis HVAC and his tech Jason are SUPERB. I have gotten extremely timely and ETHICAL service with Larry McGinnis Heating & Air Conditioning. I started using them a few years ago on the recommendation of another property manager and I am glad I did!",
    author: 'David Brown',
    rating: 5,
    source: 'google',
  },
]

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.9,  suffix: '★',    label: 'Average Customer Rating'              },
  { value: 34,   suffix: '+',    label: 'Verified Customer Reviews'            },
  { value: 100,  suffix: '%',    label: '5-Star Reviews from Named Customers'  },
  { value: 3,    suffix: ' hrs', label: 'Fastest Furnace Restoration on Record'},
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'Do you offer emergency or weekend HVAC service?',
    answer:   "Yes — and this is one of the things customers praise most about Larry. He has responded on Sundays during record-breaking heat waves, on Memorial Day weekend, and during mid-winter furnace failures. If your system is down, call — Larry picks up.",
  },
  {
    question: 'How does your pricing compare to other HVAC companies?',
    answer:   "Multiple customers report that Larry's pricing is dramatically lower than competitors — one customer received quotes thousands higher from larger companies before calling Larry. The tagline says it all: Real Help. Real Fast. No Arm, No Leg.",
  },
  {
    question: 'How quickly can you schedule an appointment?',
    answer:   "While many larger HVAC companies in the area are booked months out, Larry typically schedules within a few days — and often same-day or next-day for urgent situations. Emergency calls get same-day priority.",
  },
  {
    question: 'Will you tell me honestly if my unit needs to be replaced or if it can be repaired?',
    answer:   "Absolutely — Larry is known for his honesty. He has fixed units that competitors said needed full replacement, sometimes diagnosing the issue over the phone before he even arrives. You'll get a straight answer, not a sales pitch.",
  },
]

// ─── Contact object ──────────────────────────────────────────────────────────
const businessContact = {
  name:    'Larry McGinnis Heating & Air Conditioning',
  address: '1156 Anderson Pl SE',
  city:    'Albany',
  state:   'OR',
  zip:     '97322',
  phone:   '(541) 928-0460',
  email:   '',
}

// ─── Footer nav links ────────────────────────────────────────────────────────
const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About',    href: '#about'    },
  { label: 'Reviews',  href: '#reviews'  },
  { label: 'FAQ',      href: '#faq'      },
  { label: 'Contact',  href: '#contact'  },
]

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  initial:   { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
}

// ─── Badge strip component (inline — no style tags) ──────────────────────────
function TrustBadgeStrip() {
  const badges = [
    { icon: '🔧', label: 'Same-Day Service'        },
    { icon: '📅', label: 'Weekends & Holidays'     },
    { icon: '💰', label: 'Honest, Fair Pricing'    },
    { icon: '⭐', label: '4.9-Star Rated'          },
    { icon: '☎️', label: 'Always Picks Up'         },
  ]

  return (
    <div className="lm-badge-strip" aria-label="Trust indicators">
      <div className="lm-badge-track">
        {[...badges, ...badges].map((b, i) => (
          <span key={i} className="lm-badge-item">
            <span>{b.icon}</span>
            <span>{b.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Divider wave ─────────────────────────────────────────────────────────────
function WaveDivider({ flip = false, fill = '#1B3A2D' }: { flip?: boolean; fill?: string }) {
  return (
    <div
      style={{
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : undefined,
        display: 'block',
        marginBottom: -1,
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 60 }}
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

// ─── Highlight callout ────────────────────────────────────────────────────────
function TaglineCallout() {
  return (
    <motion.div
      {...fadeUp}
      className="lm-tagline-callout"
    >
      <span className="lm-tagline-quote">"</span>
      <p className="lm-tagline-text">Real Help. Real Fast.<br />No Arm, No Leg.</p>
      <span className="lm-tagline-attr">— Larry McGinnis, Albany OR</span>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* CSS variables */}
      <div
        style={{
          ['--brand-primary' as string]: BRAND_GREEN,
          ['--brand-accent'  as string]: BRAND_TEAL,
        }}
      />

      {/* Navbar */}
      <Navbar
        businessName="Larry McGinnis H&AC"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:5419280460"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="Albany's HVAC Guy"
        subheadline="Same-day repairs, fair prices, and a guy who actually picks up the phone."
        ctaText="Call (541) 928-0460"
        ctaHref="tel:5419280460"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.9}
        reviewCount={34}
        variant="dark-bold"
      />

      {/* ── TRUST BADGE STRIP ── */}
      <TrustBadgeStrip />

      {/* ── STATS — dark green ── */}
      <div id="about" className="lm-dark-section" style={{ background: BRAND_GREEN }}>
        <WaveDivider flip fill={BRAND_GREEN} />
        <div className="lm-stats-inner">
          <motion.h2 {...fadeUp} className="lm-section-heading lm-heading-light">
            By the Numbers
          </motion.h2>
          <StatsCounter stats={stats} variant="dark" />
        </div>
        <WaveDivider fill="#fff" />
      </div>

      {/* ── TAGLINE CALLOUT ── */}
      <section className="lm-callout-section">
        <TaglineCallout />
      </section>

      {/* ── ABOUT ── */}
      <section className="lm-about-wrapper">
        <motion.div {...fadeUp}>
          <AboutSection
            heading="Who Is Larry?"
            story="Larry McGinnis has been keeping Albany homes comfortable for years — showing up on Sunday afternoons during record heat waves, on Memorial Day weekend, and at 7 AM when the furnace dies. Customers call him because larger companies are booked for months and quote prices that require a second mortgage. Larry fixes what competitors say can't be saved, and he'll tell you the truth about whether you need a new unit or just a $30 part."
          />
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <div
        id="services"
        className="lm-services-wrapper dot-pattern"
      >
        <motion.div {...fadeUp}>
          <div className="lm-section-label">What We Do</div>
        </motion.div>
        <ServiceCards
          heading="Full HVAC Coverage"
          subheading="From emergency Sunday calls to complete heat pump replacements — one call covers it all."
          services={services}
          columns={3}
          variant="grid"
        />
      </div>

      {/* ── REVIEWS — dark teal ── */}
      <div id="reviews" style={{ background: BRAND_TEAL }}>
        <WaveDivider flip fill={BRAND_TEAL} />
        <div className="lm-reviews-inner">
          <motion.div {...fadeUp}>
            <div className="lm-section-label lm-label-light">What Customers Say</div>
          </motion.div>
          <TestimonialCarousel
            heading="Real Words, Real People"
            reviews={reviews}
            variant="featured"
          />
        </div>
        <WaveDivider fill="#F7F5F0" />
      </div>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="lm-faq-section"
        style={{ background: '#F7F5F0' }}
      >
        <motion.div {...fadeUp} className="lm-faq-inner">
          <div className="lm-section-label">Common Questions</div>
          <FAQAccordion
            heading="Quick Answers"
            items={faqItems}
          />
        </motion.div>
      </section>

      {/* ── CONTACT ── */}
      <div id="contact" style={{ background: '#fff' }}>
        <ContactSection
          business={businessContact}
          heading="Get In Touch"
          showMap={true}
        />
      </div>

      {/* ── FOOTER ── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={{}}
      />

      {/* ── STICKY CLICK-TO-CALL ── */}
      <ClickToCall phone="(541) 928-0460" />
    </>
  )
}