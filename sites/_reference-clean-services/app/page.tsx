// REFERENCE: CLEAN SERVICES — blue radial gradient, service grid on blue bg, simple clean layout, no marquee
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink, FAQItem } from "@/components/types";
import { motion } from "framer-motion";
import {
  Droplets,
  Waves,
  Flame,
  Bath,
  Filter,
  Wrench,
  CheckCircle,
  Phone,
  Star,
  ArrowRight,
  PhoneCall,
  ClipboardCheck,
  Headphones,
  MapPin,
  Clock,
  Mail,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Home 1", href: "#" },
  { label: "Home 2", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
];

const services = [
  {
    name: "Leak Detection",
    description: "Advanced technology to locate and repair hidden leaks.",
    icon: Droplets,
  },
  {
    name: "Drain Cleaning",
    description: "Effective unclogging and thorough drain cleaning solutions.",
    icon: Waves,
  },
  {
    name: "Water Heater",
    description:
      "Professional installation, service and repair of water heaters.",
    icon: Flame,
  },
  {
    name: "Bathroom and Kitchen",
    description: "Comprehensive plumbing services for kitchens and bathrooms.",
    icon: Bath,
  },
  {
    name: "Water Filtration",
    description:
      "Ensure clean, safe water with our reliable filtration systems.",
    icon: Filter,
  },
  {
    name: "Pipe Repair",
    description: "Reliable repair and replacement services for damaged pipes.",
    icon: Wrench,
  },
];

const reviews = [
  {
    text: "I provided quick and efficient help for our clogged drain. Highly recommend their plumbing system to anyone!",
    author: "Ryan Johnson",
    role: "Owner at TechStart",
    avatar: "/photos/avatar-1.webp",
  },
  {
    text: "We're impressed with Plumbing's outstanding job on our kitchen. Their thoroughness and expertise immediately exceeded our expectations.",
    author: "Michael Brown",
    role: "CEO at Innovate",
    avatar: "/photos/avatar-2.webp",
  },
  {
    text: "Plumbing's team is reliable and courteous, resolving our plumbing issues promptly with meticulous attention to detail.",
    author: "David Martinez",
    role: "Director at BuildCo",
    avatar: "/photos/avatar-3.webp",
  },
  {
    text: "Plumbing's expert handled our emergency leak with remarkable efficiency, saving our day. Highly recommended!",
    author: "Sarah Williams",
    role: "Manager at HomeFirst",
    avatar: "/photos/avatar-4.webp",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Are your plumbers licensed and insured?",
    answer:
      "Yes, all our plumbers are fully licensed, insured, and have undergone extensive training to ensure the highest quality service.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes, we provide free estimates for all plumbing services. Contact us to schedule an assessment.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, cash, checks, and offer financing options for larger projects.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes, we offer flexible financing options to help you manage the cost of larger plumbing projects.",
  },
];

const blogPosts = [
  {
    title: "How to Identify and Fix Common Plumbing Leaks",
    date: "Apr 8, 2026",
    image: "/photos/blog-1.webp",
  },
  {
    title: "The Benefits of Installing a Tankless Water Heater",
    date: "Mar 15, 2026",
    image: "/photos/blog-2.webp",
  },
  {
    title: "Eco-Friendly Solutions to Reduce Your Water Bill",
    date: "Feb 22, 2026",
    image: "/photos/blog-3.webp",
  },
];

const featureCards = [
  {
    icon: PhoneCall,
    title: "Call us 555-0123",
    description: "We remain available 24/7 for any plumbing emergency.",
  },
  {
    icon: ClipboardCheck,
    title: "Expert evaluation",
    description:
      "Our experts will assess your needs and provide tailored solutions.",
  },
  {
    icon: Headphones,
    title: "Customer support",
    description: "Dedicated support team ready to assist you at every step.",
  },
];

const businessContact = {
  name: "Plumbing Co.",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zip: "10001",
  phone: "(595) 555-0123",
  email: "info@plumbing.com",
  hours: {
    Monday: "8:00 AM - 6:00 PM",
    Tuesday: "8:00 AM - 6:00 PM",
    Wednesday: "8:00 AM - 6:00 PM",
    Thursday: "8:00 AM - 6:00 PM",
    Friday: "8:00 AM - 6:00 PM",
    Saturday: "9:00 AM - 4:00 PM",
    Sunday: "Closed",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────
// NARRATIVE FLOW: Hero (blue radial gradient + worker photo on yellow card) → Get Started (3 feature cards on light blue) → About (split + checklist) → Services (6 cards on blue radial gradient) → FAQ (split layout) → Testimonials (card grid on light blue) → Blog (3 article cards) → Contact → Footer
// This is CLEAN SERVICES: simple, professional, blue monochrome with yellow accent. No marquee, no section dividers. Confidence through clarity.

export default function PlumbingPage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-accent)] flex items-center justify-center">
            <Wrench className="w-4 h-4 text-[var(--brand-text)]" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-white text-lg font-semibold">
            plumbing
          </span>
        </div>
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md rounded-[10px] px-8 py-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:+15955550123"
            className="hidden md:flex items-center gap-2 text-white text-sm"
          >
            <Phone className="w-4 h-4" />
            (595) 555-0123
          </a>
          <a
            href="#contact"
            className="bg-[var(--brand-accent)] text-[var(--brand-text)] px-6 py-2.5 rounded-[10px] text-xs font-medium hover:brightness-110 transition"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ── HERO: Blue radial gradient bg + worker photo on yellow card ── */}
      <section
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #1D65D1 0%, #184FA1 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-36 pb-20 grid md:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-[clamp(3rem,5.5vw,4.7rem)] font-semibold text-white leading-[1.05] tracking-[-0.04em]">
              Your trusted plumbing solutions in New York
            </h1>
            <p className="mt-6 text-[#CCCCCC] text-lg max-w-md leading-[1.7]">
              With over 20 years of experience, we have built a reputation for
              delivering top-notch plumbing solutions tailored to meet your
              needs.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="bg-[var(--brand-accent)] text-[var(--brand-text)] px-7 py-4 rounded-[10px] font-medium text-sm hover:brightness-110 transition"
              >
                Get template for free
              </a>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                      />
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-0.5">
                    From 2000+ ratings
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Worker photo on yellow rounded card */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full max-w-md aspect-[3/4] rounded-[20px] bg-[var(--brand-accent)] overflow-hidden shadow-2xl flex items-end justify-center">
              <div className="w-[85%] h-[90%] rounded-t-[16px] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-amber-200/60 to-amber-300/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GET STARTED: 3 feature cards on light blue ── */}
      <section className="py-16 lg:py-20 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {featureCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                className="flex items-start gap-5 bg-white rounded-[16px] p-7 group cursor-pointer hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-full bg-[var(--brand-bg-alt)] flex items-center justify-center flex-shrink-0">
                  <Icon
                    className="w-6 h-6 text-[var(--brand-primary)]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <ArrowRight className="w-5 h-5 text-[var(--brand-muted)] group-hover:text-[var(--brand-primary)] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── ABOUT: Split layout — image left, text + checklist right ── */}
      <section id="about" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image with overlay link */}
          <motion.div {...fadeUp} className="relative">
            <div className="aspect-[4/5] rounded-[20px] bg-slate-200 overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 text-white text-sm font-medium hover:underline"
                >
                  Learn more about us
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Text + checklist */}
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em] leading-[1.15]">
              Plumbing solutions tailored to your needs
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              Our team of licensed and experienced plumbers is committed to
              providing prompt, professional, and courteous service, ensuring
              that your plumbing system is always in optimal condition.
            </p>
            <div className="mt-8 space-y-5">
              {[
                "Experienced and certified plumbers",
                "High-quality materials and equipment",
                "Customer satisfaction guarantee",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-primary)] flex items-center justify-center flex-shrink-0">
                    <CheckCircle
                      className="w-4 h-4 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-[var(--brand-text)] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES: 6 cards on blue radial gradient ── */}
      <section
        id="services"
        className="py-24 lg:py-32 px-8 lg:px-16"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #1D65D1 0%, #184FA1 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold text-white tracking-[-0.03em]">
              Our services
            </h2>
            <p className="mt-4 text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
              We offer a comprehensive range of plumbing services designed to
              address all your plumbing needs.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white/8 backdrop-blur-sm rounded-[20px] p-8 border border-white/10 hover:bg-white/12 transition-colors group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-[12px] bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/15 transition-colors">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 tracking-[-0.02em]">
                    {service.name}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ: Split layout — heading left, accordion right ── */}
      <section id="faq" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-16">
          {/* Left: Heading + CTA */}
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em] leading-[1.15]">
              Your questions, answered
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] leading-relaxed text-sm">
              Answers to the most common questions our customers have. If you
              don&apos;t find the information you&apos;re looking for, feel free
              to contact us.
            </p>
            <a
              href="#contact"
              className="inline-block mt-8 bg-[var(--brand-accent)] text-[var(--brand-text)] px-7 py-3.5 rounded-[10px] font-medium text-sm hover:brightness-110 transition"
            >
              Contact Us
            </a>
          </motion.div>

          {/* Right: FAQ items */}
          <motion.div {...fadeUp}>
            <div className="divide-y divide-slate-200">
              {faqItems.map((item, i) => (
                <details key={i} className="group py-6 first:pt-0">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="text-lg font-medium pr-8 tracking-[-0.01em]">
                      {item.question}
                    </span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-open:rotate-45 transition-transform text-lg">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-[var(--brand-muted)] text-sm leading-relaxed pr-16">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS: Auto-scrolling horizontal marquee on light blue bg ── */}
      <section
        id="reviews"
        className="py-24 lg:py-32 bg-[var(--brand-bg-alt)] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em]">
              What our customers say
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto text-sm leading-relaxed">
              Our customers are at the heart of everything we do. We listen to
              your needs and tailor our services to meet them.
            </p>
          </motion.div>
        </div>
        {/* Auto-scrolling marquee — duplicated for seamless loop */}
        <div className="testimonial-marquee flex gap-6 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] bg-white rounded-[20px] p-8 shadow-sm"
            >
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>
              <p className="text-sm text-[var(--brand-text)] leading-relaxed mb-8">
                {review.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{review.author}</p>
                  <p className="text-xs text-[var(--brand-muted)]">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOG: 3 article cards ── */}
      <section id="blog" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em]">
              Latest blog posts
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto text-sm leading-relaxed">
              Our blog is designed to help you understand your plumbing system
              better and provide valuable insights to keep it running smoothly.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden mb-6 bg-slate-200">
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-400 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-xs text-[var(--brand-muted)] mb-2">
                  {post.date}
                </p>
                <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] group-hover:text-[var(--brand-primary-light)] transition-colors">
                  {post.title}
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[var(--brand-primary-light)] text-sm font-medium mt-3 hover:underline"
                >
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT: Inline with white text on blue gradient ── */}
      <section
        id="contact"
        className="py-24 lg:py-32 px-8 lg:px-16"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #1D65D1 0%, #184FA1 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em] text-white">
              Get In Touch
            </h2>
          </motion.div>
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[var(--brand-accent)] text-[var(--brand-text)] rounded-[10px] font-semibold text-sm hover:brightness-110 transition"
              >
                Send Message
              </button>
            </form>

            {/* Contact info — white text */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p className="text-white/60 mt-0.5">
                    {businessContact.address}, {businessContact.city},{" "}
                    {businessContact.state} {businessContact.zip}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-white/60 mt-0.5">
                    {businessContact.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-white/60 mt-0.5">
                    {businessContact.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <p className="font-semibold text-white">Hours</p>
                  <div className="text-white/60 font-mono text-sm space-y-1.5 mt-1">
                    {Object.entries(businessContact.hours).map(
                      ([day, hours]) => (
                        <div key={day} className="flex justify-between gap-8">
                          <span>{day}</span>
                          <span>{hours}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BAR: "Need a plumber fast?" ── */}
      <section className="bg-[var(--brand-primary)] py-8 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
            Need a plumber fast?
          </h3>
          <a
            href="tel:+15955550123"
            className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-[var(--brand-text)] px-8 py-4 rounded-[10px] font-semibold text-sm hover:brightness-110 transition"
          >
            <Phone className="w-5 h-5" />
            Call Us 555-0123
          </a>
        </div>
      </section>

      {/* ── FOOTER: Rich multi-column matching original ── */}
      <footer className="bg-white py-16 px-8 lg:px-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr] gap-12">
          {/* Logo + description + socials */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-xl font-bold">
                plumbing
              </span>
            </div>
            <p className="text-sm text-[var(--brand-muted)] leading-relaxed max-w-xs">
              Top-notch residential and commercial plumbing service
            </p>
            <div className="flex gap-4 mt-6">
              {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-[var(--brand-muted)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
                >
                  <span className="text-xs font-bold uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-3 gap-2 self-start">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-lg overflow-hidden bg-slate-200"
              >
                <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400" />
              </div>
            ))}
          </div>

          {/* Location 1 */}
          <div>
            <h4 className="font-bold text-lg mb-3">Manhattan</h4>
            <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
              1234 Broadway
              <br />
              New York, NY 1001
            </p>
            <a
              href="#"
              className="text-sm text-[var(--brand-primary)] font-medium mt-3 inline-block hover:underline"
            >
              View on Google
            </a>
          </div>

          {/* Location 2 */}
          <div>
            <h4 className="font-bold text-lg mb-3">Brooklyn</h4>
            <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
              1234 Broadway
              <br />
              New York, NY 1001
            </p>
            <a
              href="#"
              className="text-sm text-[var(--brand-primary)] font-medium mt-3 inline-block hover:underline"
            >
              View on Google
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-[var(--brand-muted)]">
            &copy; {new Date().getFullYear()} - Plumbing
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
            >
              About
            </a>
          </div>
        </div>
      </footer>

      <ClickToCall phone="(595) 555-0123" />
    </>
  );
}
