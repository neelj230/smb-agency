"use client";

import { Navbar } from "@/components/Navbar";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionDivider } from "@/components/SectionDivider";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ParallaxImage } from "@/components/ParallaxImage";
import type { NavLink, Review, FAQItem, Service } from "@/components/types";
import { motion } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services: Service[] = [
  {
    name: "Infant Care",
    description:
      "Nurturing, attentive care for babies in their earliest months, with consistent caregivers who parents trust completely.",
    icon: "baby",
  },
  {
    name: "Toddler Program",
    description:
      "Age-appropriate learning and socialization for toddlers in a structured, warm, and stimulating environment.",
    icon: "smile",
  },
  {
    name: "Early Learning Curriculum",
    description:
      "Developmentally appropriate activities and lessons that build foundational skills through play and exploration.",
    icon: "book-open",
  },
  {
    name: "Full-Day Childcare",
    description:
      "Reliable weekday care from 6:30 AM to 5:00 PM, designed to support working families with consistent daily schedules.",
    icon: "clock",
  },
  {
    name: "Family-Centered Environment",
    description:
      "A community-first approach where parents are treated as partners and families feel welcomed and valued every day.",
    icon: "heart",
  },
  {
    name: "Safe & Professional Setting",
    description:
      "A professionally run center with trained, consistent staff who parents describe as trustworthy and deeply caring.",
    icon: "shield-check",
  },
];

const reviews: Review[] = [
  {
    text: "We love Little Village. The owner and teachers pour their hearts into making this a great place for our kids. I can't believe how hard they work. We have a toddler and infant who attend. It is such a blessing to have a professional, consistent, and caring daycare to count on.",
    author: "Christine Clair",
    rating: 5,
    source: "google",
  },
  {
    text: "Ball the places that my children have went to this was the place that not only they but we as parents where the most happiest about. Mrs. Johnson and her staff are the most trusted caretakers and they are like family.",
    author: "Hector L. Garcia",
    rating: 5,
    source: "google",
  },
  {
    text: "This place is such a blessing for our family. Thank you Little Village.",
    author: "Jill Miguez",
    rating: 5,
    source: "google",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What age groups does Little Village Learning Center serve?",
    answer:
      "Little Village cares for both infants and toddlers. Parents like Christine Clair have both an infant and a toddler enrolled simultaneously, and the team is experienced in meeting the different developmental needs of each age group.",
  },
  {
    question: "What makes Little Village different from other daycares in Salem?",
    answer:
      "Families who have tried multiple childcare providers — like Hector Garcia — consistently say Little Village is the place where they felt happiest and most at ease. The difference comes down to trust: Mrs. Johnson and her staff are described as 'like family,' not just service providers.",
  },
  {
    question: "What are your hours, and are you open on weekends?",
    answer:
      "Little Village is open Monday through Friday, 6:30 AM to 5:00 PM. The center is closed on Saturdays and Sundays, making it ideal for families with standard workweek schedules.",
  },
  {
    question: "How consistent is the staff at Little Village?",
    answer:
      "Consistency is one of the qualities parents specifically call out. Christine Clair describes the center as 'professional, consistent, and caring' — which means families can count on seeing the same familiar faces caring for their children each day.",
  },
  {
    question: "How do I enroll my child or learn about availability?",
    answer:
      "The best way to connect with Little Village Learning Center is to call directly at (503) 363-3866. Given the center's strong reputation and loyal families, it's worth reaching out early to ask about current openings.",
  },
  {
    question: "Is the environment warm and welcoming for parents too, or just children?",
    answer:
      "Parents consistently describe Little Village as a blessing for their entire family — not just their kids. The culture Mrs. Johnson has built makes parents feel included, valued, and at ease. It's a community, not just a drop-off point.",
  },
];

const businessContact = {
  name: "Little Village Learning Center",
  address: "445 High St SE #140",
  city: "Salem",
  state: "OR",
  zip: "97301",
  phone: "(503) 363-3866",
  email: "",
  hours: {
    Monday: "6:30 AM – 5:00 PM",
    Tuesday: "6:30 AM – 5:00 PM",
    Wednesday: "6:30 AM – 5:00 PM",
    Thursday: "6:30 AM – 5:00 PM",
    Friday: "6:30 AM – 5:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────
// NARRATIVE FLOW: Hero (split) → Stats hook → Reviews (social proof) → Services → About parallax → FAQ → Contact
// This is STATS-FORWARD: prove credibility before explaining what you do.

export default function BusinessPage() {
  return (
    <>
      <Navbar
        businessName="Little Village Learning Center"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+15033633866"
      />

      {/* ── HERO: Split layout — text left, photo right ── */}
      <section className="min-h-screen grid md:grid-cols-2">
        {/* Left: Text */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 md:py-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-2 mb-8">
              <span className="stat-badge">24/7</span>
              <span className="stat-badge">227+ reviews</span>
              <span className="stat-badge">4.8 ★</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              We nurture.
              <br />
              We care.
              <br />
              <span className="text-[var(--brand-primary)]">Done.</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--brand-muted)] max-w-md">
              Philadelphia&apos;s 24/7 plumber. The price you&apos;re quoted is
              the price you pay. Warren answers the phone himself.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="tel:+15033633866"
                className="px-8 py-4 bg-[var(--brand-primary)] text-white font-semibold rounded-full hover:bg-[var(--brand-primary)]/90 transition-colors"
              >
                Call (503) 363-3866
              </a>
              <a
                href="#services"
                className="px-8 py-4 border-2 border-[var(--brand-text)] rounded-full font-semibold hover:bg-[var(--brand-text)] hover:text-white transition-colors"
              >
                View Services
              </a>
            </div>
          </motion.div>
        </div>
        {/* Right: Photo */}
        <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
          <motion.img
            src="/photos/photo-1.webp"
            alt="Little Village Learning Center van"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--brand-bg)] md:w-24" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div className="bg-[var(--brand-accent)] text-white">
        <MarqueeTicker
          items={[
            "Little Village Learning Center",
            "Sewer Repair",
            "Drain Cleaning",
            "Water Heater Install",
            "24/7 Available",
            "Price Match Guarantee",
          ]}
          separator="✦"
          speed={30}
        />
      </div>

      {/* ── STATS: Big animated numbers — the hook ── */}
      <section
        id="stats"
        className="py-24 lg:py-32 px-6 bg-[var(--brand-accent)] text-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            {[
              { target: 227, suffix: "+", label: "5-Star Reviews" },
              { target: 4.8, suffix: " Stars", label: "Star Rating" },
              { target: 1, suffix: " Hour", label: "Programs Offered" },
              { target: 24, suffix: "/7", label: "Age Groups Served" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--brand-primary)]">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </p>
                <p className="mt-3 text-sm text-white/50 uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="wave" color="var(--brand-bg)" />

      {/* ── REVIEWS: Social proof before services ── */}
      <section id="reviews" className="py-20 lg:py-28">
        <TestimonialCarousel
          heading="Real Stories"
          reviews={reviews}
          variant="featured"
        />
      </section>

      <SectionDivider variant="diagonal" color="var(--brand-bg-alt)" />

      {/* ── SERVICES: Card grid with icons ── */}
      <section
        id="services"
        className="py-24 lg:py-32 px-6 bg-[var(--brand-bg-alt)] dot-bg"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--brand-primary)] font-semibold mb-2">
              Services
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight">
              What We Offer
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="service-card-icon">
                  {["📞", "🌊", "🔽", "🔥", "🔍", "📋"][i]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  {service.name}
                </h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="var(--brand-bg)" />

      {/* ── ABOUT: Full-width parallax photo with overlaid text ── */}
      <section className="relative">
        <ParallaxImage
          src="/photos/photo-9.webp"
          alt="Little Village Learning Center on the job"
          speed={0.2}
          overlay
          overlayOpacity={0.6}
          containerClassName="h-[70vh] md:h-[80vh]"
        >
          <div className="flex items-center justify-center h-[70vh] md:h-[80vh] px-6">
            <motion.div
              {...fadeUp}
              className="max-w-2xl text-center text-white"
            >
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Where Salem families found their blessing.
              </h2>
              <p className="mt-6 text-lg text-white/70 max-w-lg mx-auto">
                Finding trusted childcare is hard. Little Village made it easy. Families call it 'a blessing' — and the teachers who pour their hearts in every day prove why.
              </p>
            </motion.div>
          </div>
        </ParallaxImage>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 lg:py-28 px-6">
        <FAQAccordion heading="Questions" items={faqItems} />
      </section>

      <SectionDivider variant="wave" color="var(--brand-accent)" />

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[var(--brand-accent)]">
        <ContactSection
          business={businessContact}
          heading="Get In Touch"
          showMap={true}
        />
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(503) 363-3866" />
    </>
  );
}
