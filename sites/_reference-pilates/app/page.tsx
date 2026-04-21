// REFERENCE: PILATES STUDIO — clean white design, green accent, centered serif hero, auto-scrolling gallery, class schedule grid, pricing tiers, studio gallery, FAQ
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  ChevronDown,
  Leaf,
} from "lucide-react";
import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Instructors", href: "#instructors" },
  { label: "Classes", href: "#classes" },
  { label: "Schedule", href: "#schedule" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Studio", href: "#studio" },
  { label: "Location", href: "#location" },
  { label: "FAQ", href: "#faq" },
];

const galleryImages = [
  {
    alt: "Reformer class in session",
    gradient: "from-[#2D6A4F]/20 to-[#40916C]/30",
  },
  {
    alt: "Studio interior with natural light",
    gradient: "from-[#40916C]/20 to-[#2D6A4F]/25",
  },
  {
    alt: "Mat pilates group session",
    gradient: "from-[#52B788]/20 to-[#2D6A4F]/30",
  },
];

const instructors = [
  {
    name: "Sarah Mitchell",
    role: "Lead Instructor",
    specialty: "Reformer & Mat",
    image: "from-[#D4E7DC] to-[#A7C4B5]",
  },
  {
    name: "James Chen",
    role: "Instructor",
    specialty: "Barre & Flexibility",
    image: "from-[#C8DFD0] to-[#95B8A5]",
  },
  {
    name: "Maria Santos",
    role: "Instructor",
    specialty: "Prenatal & Recovery",
    image: "from-[#B8D4C4] to-[#8AAF9A]",
  },
];

const classTypes = [
  {
    name: "Reformer",
    description: "Full-body resistance training on the reformer machine",
    gradient: "from-[#2D6A4F]/15 to-[#40916C]/25",
  },
  {
    name: "Mat Pilates",
    description: "Classical mat work for core strength and flexibility",
    gradient: "from-[#40916C]/15 to-[#52B788]/20",
  },
  {
    name: "Barre Fusion",
    description: "Pilates meets ballet-inspired toning",
    gradient: "from-[#52B788]/15 to-[#2D6A4F]/20",
  },
  {
    name: "Stretch & Restore",
    description: "Deep stretching and myofascial release",
    gradient: "from-[#2D6A4F]/10 to-[#40916C]/20",
  },
  {
    name: "Prenatal",
    description: "Safe movement for expecting mothers",
    gradient: "from-[#40916C]/15 to-[#2D6A4F]/25",
  },
  {
    name: "Private Session",
    description: "One-on-one instruction for your goals",
    gradient: "from-[#52B788]/15 to-[#40916C]/20",
  },
];

const schedule = [
  { day: "Monday", time: "7:00 AM", class: "Reformer", instructor: "Sarah" },
  { day: "Monday", time: "9:30 AM", class: "Mat Pilates", instructor: "James" },
  {
    day: "Monday",
    time: "12:00 PM",
    class: "Stretch & Restore",
    instructor: "Maria",
  },
  {
    day: "Monday",
    time: "5:30 PM",
    class: "Barre Fusion",
    instructor: "James",
  },
  {
    day: "Tuesday",
    time: "7:00 AM",
    class: "Mat Pilates",
    instructor: "James",
  },
  { day: "Tuesday", time: "10:00 AM", class: "Prenatal", instructor: "Maria" },
  { day: "Tuesday", time: "4:30 PM", class: "Reformer", instructor: "Sarah" },
  { day: "Tuesday", time: "6:00 PM", class: "Reformer", instructor: "Sarah" },
  { day: "Wednesday", time: "7:00 AM", class: "Reformer", instructor: "Sarah" },
  {
    day: "Wednesday",
    time: "9:30 AM",
    class: "Barre Fusion",
    instructor: "James",
  },
  {
    day: "Wednesday",
    time: "12:00 PM",
    class: "Mat Pilates",
    instructor: "Maria",
  },
  {
    day: "Wednesday",
    time: "5:30 PM",
    class: "Stretch & Restore",
    instructor: "Maria",
  },
  {
    day: "Thursday",
    time: "7:00 AM",
    class: "Mat Pilates",
    instructor: "James",
  },
  { day: "Thursday", time: "10:00 AM", class: "Prenatal", instructor: "Maria" },
  { day: "Thursday", time: "4:30 PM", class: "Reformer", instructor: "Sarah" },
  {
    day: "Thursday",
    time: "6:00 PM",
    class: "Barre Fusion",
    instructor: "James",
  },
  { day: "Friday", time: "7:00 AM", class: "Reformer", instructor: "Maria" },
  { day: "Friday", time: "9:30 AM", class: "Mat Pilates", instructor: "James" },
  {
    day: "Friday",
    time: "12:00 PM",
    class: "Stretch & Restore",
    instructor: "Maria",
  },
];

const pricingTiers = [
  {
    name: "Drop-in",
    price: "$25",
    period: "per class",
    features: ["Any group class", "No commitment", "Towel service"],
    highlighted: false,
  },
  {
    name: "Monthly",
    price: "$100",
    period: "per month",
    features: [
      "8 classes per month",
      "All class types",
      "Priority booking",
      "Guest pass",
    ],
    highlighted: true,
  },
  {
    name: "Unlimited",
    price: "$180",
    period: "per month",
    features: [
      "Unlimited classes",
      "All class types",
      "Priority booking",
      "2 guest passes",
      "Private session discount",
    ],
    highlighted: false,
  },
];

const reviews = [
  {
    text: "I have been coming here for two years and my back pain is completely gone. Sarah really understands the body.",
    author: "Maria S.",
    rating: 5,
  },
  {
    text: "The reformer classes are challenging but never intimidating. The instructors meet you where you are.",
    author: "David K.",
    rating: 5,
  },
  {
    text: "Best prenatal classes in the city. I felt safe and supported throughout my entire pregnancy.",
    author: "Aisha P.",
    rating: 5,
  },
  {
    text: "Clean studio, small classes, genuinely caring instructors. This place changed how I move.",
    author: "Tom R.",
    rating: 5,
  },
];

const studioImages = [
  { alt: "Reformer room", gradient: "from-[#D4E7DC] to-[#A7C4B5]" },
  { alt: "Reception area", gradient: "from-[#C8DFD0] to-[#95B8A5]" },
  { alt: "Mat studio", gradient: "from-[#B8D4C4] to-[#8AAF9A]" },
  { alt: "Lounge area", gradient: "from-[#D4E7DC] to-[#B8D4C4]" },
];

const faqs = [
  {
    q: "Do I need experience to start?",
    a: "Not at all. Our classes welcome all levels and our instructors provide modifications for beginners.",
  },
  {
    q: "What should I wear?",
    a: "Comfortable, form-fitting clothing that allows you to move freely. Grip socks are required for reformer classes (available for purchase).",
  },
  {
    q: "How do I book a class?",
    a: "You can book online through our scheduling system, call us, or drop by the studio.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We ask for at least 12 hours notice for cancellations. Late cancellations will be charged as a used class.",
  },
  {
    q: "Do you offer private sessions?",
    a: "Yes, private one-on-one and duet sessions are available with all our instructors. Contact us to schedule.",
  },
];

const businessContact = {
  name: "Body & Mind Pilates",
  address: "1428 Walnut Street",
  city: "Philadelphia",
  state: "PA",
  zip: "19102",
  phone: "(215) 555-0312",
  email: "hello@bodyandmind.com",
  hours: "Mon-Fri 6:30 AM - 7:30 PM  |  Sat 8 AM - 12 PM  |  Sun Closed",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function groupScheduleByDay(items: typeof schedule) {
  const days: Record<string, typeof schedule> = {};
  for (const item of items) {
    if (!days[item.day]) days[item.day] = [];
    days[item.day].push(item);
  }
  return days;
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function PilatesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const grouped = groupScheduleByDay(schedule);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-[var(--brand-primary)]" />
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--brand-text)]">
              Body & Mind Pilates
            </span>
          </a>
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--brand-muted)] hover:text-[var(--brand-text)] text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#pricing"
            className="bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--brand-primary)]/90 transition-colors"
          >
            Book a Class
          </a>
        </div>
      </nav>

      {/* ── HERO: Centered, white bg, serif heading, green stars ── */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Stars + rating */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-5 h-5 fill-[var(--brand-primary)] text-[var(--brand-primary)]"
                />
              ))}
            </div>
            <span className="text-sm text-[var(--brand-muted)]">
              4.9/5 with 300+ reviews
            </span>
          </motion.div>

          {/* Huge serif H1 */}
          <motion.h1
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,3.75rem)] font-medium leading-[1.15] tracking-[-0.01em] text-[var(--brand-text)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Modern Pilates studio
            <br />
            for <em className="italic">body & mind</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-[var(--brand-muted)] text-lg max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Feel strong, move freely, and restore balance
          </motion.p>

          {/* CTA button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-accent)] transition-colors"
            >
              Book a class <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── AUTO-SCROLLING IMAGE GALLERY: 3 rounded cards ── */}
      <section className="py-4 bg-white overflow-hidden">
        <div className="marquee-track flex gap-5 w-max px-6">
          {[
            ...galleryImages,
            ...galleryImages,
            ...galleryImages,
            ...galleryImages,
          ].map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[360px] h-[260px] rounded-3xl overflow-hidden relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${img.gradient}`}
              />
              <div className="absolute inset-0 bg-[var(--brand-primary)]/5" />
            </div>
          ))}
        </div>
      </section>

      {/* ── INSTRUCTORS: Meet your instructors ── */}
      <section
        id="instructors"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-medium">
              Meet your instructors
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((person, i) => (
              <motion.div
                key={person.name}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className={`aspect-[3/4] rounded-3xl bg-gradient-to-br ${person.image} mb-6 overflow-hidden`}
                >
                  <div className="w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--brand-text)]">
                  {person.name}
                </h3>
                <p className="text-sm text-[var(--brand-muted)] mt-1">
                  {person.role}
                </p>
                <p className="text-sm text-[var(--brand-primary)] mt-1">
                  {person.specialty}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLASS TYPES: Rectangular image cards ── */}
      <section
        id="classes"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-medium">
              Class types
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classTypes.map((cls, i) => (
              <motion.div
                key={cls.name}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div
                  className={`aspect-[16/10] bg-gradient-to-br ${cls.gradient} overflow-hidden`}
                >
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[var(--brand-text)] mb-1">
                    {cls.name}
                  </h3>
                  <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                    {cls.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLASS SCHEDULE: Grid/table layout ── */}
      <section id="schedule" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-medium">
              Classes Schedule
            </h2>
          </motion.div>

          <div className="space-y-1">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-4 px-6 py-3 text-xs font-medium uppercase tracking-wider text-[var(--brand-muted)]">
              <span>Day</span>
              <span>Time</span>
              <span>Class</span>
              <span>Instructor</span>
            </div>

            {Object.entries(grouped).map(([day, slots], dayIdx) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: dayIdx * 0.05 }}
              >
                {slots.map((slot, j) => (
                  <div
                    key={`${day}-${j}`}
                    className={`grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-[var(--brand-bg-alt)] transition-colors ${j === 0 ? "border-t border-t-gray-200" : ""}`}
                  >
                    <span className="text-sm font-medium text-[var(--brand-text)]">
                      {j === 0 ? day : ""}
                    </span>
                    <span className="text-sm font-[family-name:var(--font-mono)] text-[var(--brand-muted)]">
                      {slot.time}
                    </span>
                    <span className="text-sm text-[var(--brand-text)]">
                      {slot.class}
                    </span>
                    <span className="text-sm text-[var(--brand-muted)]">
                      {slot.instructor}
                    </span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING: 3 tiers with green accent ── */}
      <section
        id="pricing"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-medium">
              Pricing
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className={`rounded-3xl p-8 flex flex-col ${
                  tier.highlighted
                    ? "bg-[var(--brand-primary)] text-white ring-2 ring-[var(--brand-primary)] scale-[1.02]"
                    : "bg-white border border-gray-200"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3
                  className={`text-lg font-semibold mb-2 ${tier.highlighted ? "text-white" : "text-[var(--brand-text)]"}`}
                >
                  {tier.name}
                </h3>
                <div className="mb-1">
                  <span
                    className={`text-4xl font-[family-name:var(--font-display)] font-bold ${tier.highlighted ? "text-white" : "text-[var(--brand-text)]"}`}
                  >
                    {tier.price}
                  </span>
                </div>
                <p
                  className={`text-sm mb-6 ${tier.highlighted ? "text-white/70" : "text-[var(--brand-muted)]"}`}
                >
                  {tier.period}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm flex items-start gap-2 ${tier.highlighted ? "text-white/90" : "text-[var(--brand-muted)]"}`}
                    >
                      <span
                        className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${tier.highlighted ? "bg-white/60" : "bg-[var(--brand-primary)]"}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`block text-center py-3 rounded-full text-sm font-medium transition-colors ${
                    tier.highlighted
                      ? "bg-white text-[var(--brand-primary)] hover:bg-white/90"
                      : "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-accent)]"
                  }`}
                >
                  Get started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS: What our clients say ── */}
      <section id="reviews" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-medium">
              What our clients say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.author}
                className="bg-[var(--brand-bg-alt)] rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-[var(--brand-primary)] text-[var(--brand-primary)]"
                    />
                  ))}
                </div>
                <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-5">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4E7DC] to-[#A7C4B5]" />
                  <span className="text-sm font-medium text-[var(--brand-text)]">
                    {review.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO GALLERY ── */}
      <section
        id="studio"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-medium">
              Our studio
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {studioImages.map((img, i) => (
              <motion.div
                key={img.alt}
                className={`rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${img.gradient}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT + LOCATION ── */}
      <section id="location" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp}>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-medium mb-6">
                About us & location
              </h2>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-8">
                Body & Mind Pilates is a modern studio in Center City
                Philadelphia. We keep classes small so every client gets real
                attention from instructors who know their name and their body.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: MapPin,
                    text: `${businessContact.address}, ${businessContact.city}, ${businessContact.state} ${businessContact.zip}`,
                  },
                  { icon: Phone, text: businessContact.phone },
                  { icon: Mail, text: businessContact.email },
                  { icon: Clock, text: businessContact.hours },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--brand-muted)]"
                  >
                    <item.icon className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--brand-accent)] transition-colors"
              >
                <MapPin className="w-4 h-4" /> Get Directions
              </a>
            </motion.div>

            <motion.div
              className="rounded-3xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square bg-[var(--brand-bg-alt)] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4E7DC]/40 to-[#A7C4B5]/30" />
                <div className="relative text-center p-8">
                  <MapPin className="w-10 h-10 text-[var(--brand-primary)] mx-auto mb-4" />
                  <p className="font-semibold text-lg mb-1">Center City</p>
                  <p className="text-[var(--brand-muted)] text-sm">
                    {businessContact.address}
                  </p>
                  <p className="text-[var(--brand-muted)] text-sm">
                    {businessContact.city}, {businessContact.state}{" "}
                    {businessContact.zip}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-medium">
              FAQ
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-[var(--brand-text)]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--brand-muted)] transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-12 bg-[var(--brand-text)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-[var(--brand-accent)]" />
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                Body & Mind Pilates
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Modern pilates studio in Center City Philadelphia.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm">Contact</h4>
            <div className="space-y-3 text-white/50 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {businessContact.address},{" "}
                {businessContact.city}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {businessContact.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {businessContact.email}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm">
              Quick Links
            </h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/50 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs text-center">
            &copy; 2026 Body & Mind Pilates. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(215) 555-0312" />
    </>
  );
}
