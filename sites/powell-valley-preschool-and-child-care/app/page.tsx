// Powell Valley Preschool and Child Care — nature-themed layout, hero, benefits cards, Meet Leah, 4-step process, environment section, pricing, testimonials, booking CTA
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Leaf,
  Heart,
  Wind,
  Sun,
  Brain,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Check,
  Sprout,
  TreePine,
} from "lucide-react";
import { useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const benefits = [
  {
    icon: Heart,
    title: "Truly Known",
    description:
      "Enrollment is kept intentionally small so every child is known by name, by personality, and by need — not just a face in the crowd.",
  },
  {
    icon: Wind,
    title: "School Readiness",
    description:
      "Children build the social confidence, communication skills, and routines they need to thrive when Kindergarten arrives.",
  },
  {
    icon: Sun,
    title: "Warm & Safe",
    description:
      "A home-based environment that feels nurturing and secure — a place where children genuinely want to be every morning.",
  },
  {
    icon: Brain,
    title: "Every Child Welcome",
    description:
      "Children with unique learning profiles and developmental differences receive individualized support and unconditional belonging.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Reach Out",
    description:
      "Call or message to check availability. Because spots are limited and fill quickly, we recommend getting in touch as early as possible.",
  },
  {
    number: "02",
    title: "Meet Leah",
    description:
      "Come for a visit so your child can see the space and you can share your family's needs, questions, and hopes for their experience.",
  },
  {
    number: "03",
    title: "Enrollment",
    description:
      "Once enrolled, your child joins a small, consistent group where routines begin and relationships with teacher Leah take root quickly.",
  },
  {
    number: "04",
    title: "Ongoing Partnership",
    description:
      "Regular communication, progress updates, and open collaboration keep you informed and supported every step of the way.",
  },
];

const sophiaCredentials = [
  "Small-enrollment philosophy",
  "Inclusive special needs support",
  "Autism spectrum experience",
  "Special education coordination",
  "Kindergarten readiness focus",
];

const pricingTiers = [
  {
    name: "Preschool Program",
    subtitle: "Ages 3–5",
    price: "Call",
    period: "for rates",
    features: [
      "Small-group preschool experience",
      "Social confidence building",
      "School readiness curriculum",
      "Intentionally limited enrollment",
    ],
    highlighted: false,
  },
  {
    name: "Full-Day Child Care",
    subtitle: "Most Popular",
    price: "Call",
    period: "for rates",
    features: [
      "Mon–Fri, 7:30 AM–4:30 PM",
      "Home-based, nurturing setting",
      "Consistent daily routines",
      "Close, attentive supervision",
      "Supports working parents",
    ],
    highlighted: true,
  },
  {
    name: "Inclusive Support",
    subtitle: "Special Needs",
    price: "Call",
    period: "for rates",
    features: [
      "Individualized attention plans",
      "Visual learning tools",
      "Special ed. teacher coordination",
      "Parent partnership meetings",
      "Kindergarten transition support",
    ],
    highlighted: false,
  },
];

const reviews = [
  {
    text: "I don't know how to get across how much we love teacher Leah. Our oldest son is on the autism spectrum and we were desperate to find a preschool where he would be truly welcomed. Leah didn't just accommodate his needs — she embraced them completely.",
    author: "Ali Savage",
    detail: "Parent of child on autism spectrum",
  },
  {
    text: "Leah kept enrollment small and it made all the difference. My daughter went from barely speaking to other kids to walking confidently into Kindergarten. The foundation she built here was everything.",
    author: "Local Parent",
    detail: "Powell Valley family",
  },
  {
    text: "The care and communication from Leah throughout our son's two-and-a-half years was unlike anything we expected. She coordinated with specialists, kept us informed, and reassured us every step of the way.",
    author: "Gresham Family",
    detail: "Long-term enrolled family",
  },
  {
    text: "This is not a place where children are managed. It's a place where children are genuinely loved. We are so grateful to have found Powell Valley Preschool.",
    author: "OR Parent",
    detail: "Former preschool family",
  },
];

const businessContact = {
  phone: "(503) 669-5487",
  email: "powellvalleypreschool@gmail.com",
  address: "4460 SE 10th Dr, Gresham, OR 97080",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerChildren = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { staggerChildren: 0.12 },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BusinessPage() {
  const magicRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: magicProgress } = useScroll({
    target: magicRef,
    offset: ["start end", "end start"],
  });
  const magicScale = useTransform(magicProgress, [0, 0.5], [1.15, 1]);
  const magicOpacity = useTransform(magicProgress, [0, 0.3], [0, 1]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-5 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-display)] text-2xl font-light text-white tracking-wide"
          >
            <Leaf className="w-5 h-5 inline-block mr-2 -mt-1 opacity-80" />
            Powell Valley
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#book"
            className="border border-white/30 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Book a Session
          </a>
        </div>
      </nav>

      {/* ── HERO: Full-screen, dramatic dark forest ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered forest background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a08] via-[#1a2e0d] to-[#0d1a08]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(45,80,22,0.4) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 30%, rgba(45,80,22,0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(30,60,15,0.3) 0%, transparent 50%)
            `,
          }}
        />
        {/* Tree silhouette overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='300' viewBox='0 0 200 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 20 L60 120 L80 120 L40 200 L70 200 L30 280 L90 280 L90 300 L110 300 L110 280 L170 280 L130 200 L160 200 L120 120 L140 120 Z' fill='%23ffffff'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 300px",
            backgroundPosition: "center bottom",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-8 max-w-5xl">
          <motion.p
            className="text-[var(--brand-accent)] text-sm uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Forest Therapy Philadelphia
          </motion.p>
          <motion.h1
            className="text-[clamp(3.5rem,9vw,5.625rem)] font-light text-white leading-[1.02] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Healing through
            <br />
            your body
          </motion.h1>
          <motion.p
            className="mt-8 text-white/50 text-lg leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Guided forest bathing in the Wissahickon Valley. Slow down, breathe
            deep, remember what stillness feels like.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a
              href="#book"
              className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-semibold hover:brightness-110 transition"
            >
              Book Your Session <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-white/50" />
          </div>
        </motion.div>
      </section>

      {/* ── YOUR FIRST SESSION ── */}
      <section
        id="about"
        className="py-28 lg:py-40 px-8 lg:px-16 bg-[var(--brand-bg)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-8">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-[0.25em] mb-4">
              The Practice
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,3.25rem)] font-light leading-[1.12]">
              Your First Session
            </h2>
          </motion.div>
          <motion.p
            {...fadeUp}
            className="text-center text-[var(--brand-muted)] max-w-2xl mx-auto leading-relaxed mb-20 text-lg"
          >
            Born from the Japanese practice of Shinrin-yoku, forest therapy is a
            guided sensory experience in nature. It is not a hike. There is no
            destination. The forest itself is the therapist.
          </motion.p>

          {/* Benefits cards */}
          <div className="mb-8">
            <motion.p
              {...fadeUp}
              className="text-center text-[var(--brand-muted)] text-xs uppercase tracking-[0.25em] mb-4"
            >
              What to Expect
            </motion.p>
            <motion.h3
              {...fadeUp}
              className="text-center text-[clamp(1.8rem,4vw,2.25rem)] font-light leading-[1.15] mb-14"
            >
              As a result, you&apos;ll experience
            </motion.h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="bg-[var(--brand-bg-alt)] rounded-2xl p-8 text-center border border-[var(--brand-accent)]/8 hover:border-[var(--brand-accent)]/25 transition-colors duration-500"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="w-14 h-14 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center mx-auto mb-5">
                  <benefit.icon className="w-6 h-6 text-[var(--brand-primary)]" />
                </div>
                <h4 className="text-lg font-semibold mb-3">{benefit.title}</h4>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET SOPHIA ── */}
      <section className="py-28 lg:py-40 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-[0.25em] mb-4">
              Your Guide
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,3.25rem)] font-light leading-[1.12]">
              Meet Sophia
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Photo placeholder */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-[#4a7a2e] to-[#2D5016] relative">
                {/* Decorative overlay simulating portrait */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <TreePine className="w-24 h-24 text-white/10" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white/90 text-sm font-medium">
                    Sophia Nakamura
                  </p>
                  <p className="text-white/50 text-xs mt-1">
                    Certified Forest Therapy Guide
                  </p>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-[var(--brand-accent)]/10 -z-10" />
            </motion.div>

            {/* Bio + Credentials */}
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-6 text-lg">
                Sophia trained in Kyoto under master forest therapy guides
                before bringing the practice to Philadelphia&apos;s Wissahickon
                Valley. Over 400 guided sessions later, her approach blends
                Japanese Shinrin-yoku with modern environmental psychology.
              </p>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-8">
                Each session is different because Sophia reads the forest and
                the group. She has a gift for slowing time and helping you
                notice what you&apos;ve been walking past your entire life.
              </p>

              <div className="space-y-3 mb-8">
                {sophiaCredentials.map((cred) => (
                  <div key={cred} className="flex items-center gap-3">
                    <Leaf className="w-4 h-4 text-[var(--brand-accent)] flex-shrink-0" />
                    <span className="text-sm font-medium">{cred}</span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-[var(--brand-accent)] pl-6 italic text-[var(--brand-muted)] leading-relaxed">
                &ldquo;The forest doesn&apos;t ask anything of you. It simply
                invites you to be present.&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FROM INTENTION TO HEALING — 4-step process ── */}
      <section
        id="process"
        className="py-28 lg:py-40 px-8 lg:px-16 bg-[var(--brand-bg)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-[0.25em] mb-4">
              The Journey
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,3.25rem)] font-light leading-[1.12]">
              From intention to healing
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[-2rem] h-px bg-[var(--brand-accent)]/20" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-[var(--brand-primary)] font-[family-name:var(--font-display)] text-lg font-light">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-[clamp(1.2rem,2.5vw,1.4rem)] font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE THE MAGIC HAPPENS — immersive forest section ── */}
      <section
        ref={magicRef}
        className="relative py-40 lg:py-56 px-8 lg:px-16 overflow-hidden"
      >
        {/* Parallax-ish forest background */}
        <motion.div className="absolute inset-0" style={{ scale: magicScale }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1505] via-[#1a2e0d] to-[#0d1a08]" />
          {/* Dappled light effect */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 20%, rgba(143,181,115,0.3) 0%, transparent 40%),
                radial-gradient(circle at 70% 60%, rgba(143,181,115,0.2) 0%, transparent 35%),
                radial-gradient(circle at 50% 90%, rgba(45,80,22,0.25) 0%, transparent 45%),
                radial-gradient(circle at 15% 70%, rgba(143,181,115,0.15) 0%, transparent 30%)
              `,
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          style={{ opacity: magicOpacity }}
        >
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.3em] mb-6">
              The Wissahickon
            </p>
            <h2 className="text-[clamp(2.5rem,6vw,3.25rem)] font-light text-white leading-[1.12] mb-8">
              Where the magic happens
            </h2>
            <p className="text-white/50 text-xl leading-relaxed max-w-2xl mx-auto mb-4 font-[family-name:var(--font-display)] italic">
              Deep in the nature of Philadelphia&apos;s Wissahickon Valley
            </p>
            <p className="text-white/40 max-w-xl mx-auto leading-relaxed">
              1,800 acres of old-growth forest, creek crossings, hidden moss
              gardens, and century-old hemlocks. This is not a city park. It is
              a cathedral of green where time moves differently.
            </p>
          </motion.div>

          {/* Nature feature cards */}
          <div className="grid sm:grid-cols-2 gap-4 mt-16">
            {[
              {
                title: "Morning Canopy",
                desc: "Sunlight through century-old tulip poplars",
              },
              {
                title: "Creek Crossing",
                desc: "Where water meets stone — our meditation spot",
              },
              {
                title: "Moss Garden",
                desc: "A hidden grove for grounding exercises",
              },
              {
                title: "Ancient Hemlocks",
                desc: "Three hundred years of seasons",
              },
            ].map((spot, i) => (
              <motion.div
                key={spot.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-left border border-white/10 hover:border-white/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <h4 className="text-white font-semibold text-sm mb-1">
                  {spot.title}
                </h4>
                <p className="text-white/40 text-xs">{spot.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PRICING — nature-themed with leaf icon for popular ── */}
      <section
        id="pricing"
        className="py-28 lg:py-40 px-8 lg:px-16 bg-[var(--brand-primary)]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.25em] mb-4">
              Investment
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,3.25rem)] font-light leading-[1.12] text-white">
              Find Your Path
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className={`relative rounded-3xl p-8 ${tier.highlighted ? "bg-white text-[var(--brand-text)] ring-2 ring-[var(--brand-accent)]" : "bg-white/10 text-white backdrop-blur-sm"}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                {/* Leaf sprout badge for most popular */}
                {tier.highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="relative flex items-center gap-1.5 bg-[var(--brand-accent)] text-[var(--brand-text)] text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full shadow-lg">
                      <Sprout className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.2em] mb-1">
                  {tier.subtitle}
                </p>
                <h3 className="text-xl font-semibold mb-4">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-light">{tier.price}</span>
                  <span
                    className={`text-sm ml-2 ${tier.highlighted ? "text-[var(--brand-muted)]" : "text-white/50"}`}
                  >
                    / {tier.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? "text-[var(--brand-primary)]" : "text-[var(--brand-accent)]"}`}
                      />
                      <span className={tier.highlighted ? "" : "text-white/80"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#book"
                  className={`block text-center py-3.5 rounded-full text-sm font-semibold transition ${tier.highlighted ? "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90" : "border border-white/30 text-white hover:bg-white/10"}`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id="reviews"
        className="py-28 lg:py-40 px-8 lg:px-16 bg-[var(--brand-bg)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-[0.25em] mb-4">
              Voices
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,3.25rem)] font-light leading-[1.12]">
              What They Felt
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.author}
                className="bg-[var(--brand-bg-alt)] rounded-2xl p-8 border border-[var(--brand-accent)]/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                    />
                  ))}
                </div>
                <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/15 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.author}</p>
                    <p className="text-xs text-[var(--brand-muted)]">
                      {review.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK YOUR SESSION CTA ── */}
      <section
        id="book"
        className="relative py-28 lg:py-40 px-8 lg:px-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a08] via-[#1a2e0d] to-[#0d1a08]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <Leaf className="w-8 h-8 text-[var(--brand-accent)] mx-auto mb-6" />
            <h2 className="text-[clamp(2.5rem,5.5vw,4rem)] font-light text-white leading-tight">
              Begin Your Healing
            </h2>
            <p className="mt-6 text-white/50 max-w-md mx-auto leading-relaxed">
              Step away from the noise. The forest is waiting.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${businessContact.phone}`}
                className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-semibold hover:brightness-110 transition"
              >
                <Phone className="w-4 h-4" /> {businessContact.phone}
              </a>
              <a
                href={`mailto:${businessContact.email}`}
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/40 text-xs">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Sessions daily at 8am & 4pm
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Small groups, max 8
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Wissahickon Valley Park
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-8 lg:px-16 bg-[var(--brand-text)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-[family-name:var(--font-display)] text-xl font-light text-white tracking-wide">
              <Leaf className="w-4 h-4 inline-block mr-2 -mt-0.5 text-[var(--brand-accent)]" />
              Foresta
            </span>
            <p className="mt-4 text-white/40 text-sm leading-relaxed">
              Certified forest therapy in the Wissahickon Valley, Philadelphia.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm">Explore</h4>
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
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm">Contact</h4>
            <div className="space-y-3 text-white/50 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {businessContact.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {businessContact.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {businessContact.email}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-sm text-center">
            &copy; 2026 Foresta Philadelphia. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(503) 669-5487" />
    </>
  );
}
