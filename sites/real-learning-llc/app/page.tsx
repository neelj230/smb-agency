// REFERENCE: GARDENER/LANDSCAPING — green palette, hero bg image, service cards in green boxes, team about, image gallery, sliding testimonials, book a call CTA
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import {
  Leaf,
  TreePine,
  Flower2,
  Droplets,
  Scissors,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Calculator,
  BookOpen,
  Sun,
  Video,
  HeartHandshake,
  Baby,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Calculator,
    name: "Math Tutoring & Remediation",
    description:
      "Targeted one-on-one math instruction designed to close skill gaps quickly, with documented results in improved test scores even after short intensive sessions.",
  },
  {
    icon: BookOpen,
    name: "K–12 Academic Support",
    description:
      "Comprehensive subject tutoring for students from pre-kindergarten through high school, covering literature, science, social studies, and more.",
  },
  {
    icon: Sun,
    name: "Summer Enrichment Program",
    description:
      "Structured summer learning sessions that prevent academic slide and get students ahead before the new school year begins.",
  },
  {
    icon: Video,
    name: "Virtual Tutoring Sessions",
    description:
      "Flexible online tutoring for families who need remote learning support, with optional monthly in-person refresher classes for a blended approach.",
  },
  {
    icon: HeartHandshake,
    name: "Life Skills & Confidence Building",
    description:
      "Beyond academics, Mrs. Green integrates essential life skills and self-worth into every session, helping students grow into lifelong learners.",
  },
  {
    icon: Baby,
    name: "Early Childhood Education Support",
    description:
      "Pre-K and early elementary learning support that builds foundational literacy and numeracy skills in a safe, nurturing environment.",
  },
];

const galleryItems = [
  { label: "Classroom Environment", aspect: "aspect-[4/3]" },
  { label: "Learning Materials", aspect: "aspect-[3/4]" },
  { label: "Teaching Space", aspect: "aspect-[4/3]" },
  { label: "Educational Resources", aspect: "aspect-[3/4]" },
  { label: "Student Workspace", aspect: "aspect-[4/3]" },
  { label: "Real Learning LLC", aspect: "aspect-[4/3]" },
];

const reviews = [
  {
    text: "Mrs Green is a wonderful teacher. She works well with all kinds of students. She was able to catch-up my granddaughter in math in a few hours over the summer. When she returned to school her test scores in math were greatly improved.",
    author: "Paulette Ansari",
    role: "Grandmother",
  },
  {
    text: "I am a very busy uncle who has been taking care of my niece and nephew. I did not want them to fall behind but more so get ahead on their learning. Mrs. Green was exactly what our family needed.",
    author: "Majin SKooo",
    role: "Parent & Caregiver",
  },
  {
    text: "Searsy taught and assisted others with children from pre-k through high school. Over sixteen years she ran vacation bible school programs with double the number of children a standard classroom holds. She is truly extraordinary.",
    author: "Stacy Heath",
    role: "Community Member",
  },
  {
    text: "As I have observed from Mrs. Green's teaching career over 30+ years, she is dedicated and very committed to ensuring that all students are provided essential learning and life skills. AWESOME!",
    author: "Bobby Green",
    role: "Community Observer",
  },
  {
    text: "You could not ask for a better place for your children to further their skills in education. It is a very safe and loving place to be. She teaches in love, spirit and truth. I guarantee your child will get what he or she needs.",
    author: "MB Green",
    role: "Parent",
  },
];

const teamMembers = [
  { name: "Mrs. Searsy Green", role: "Founder & Lead Educator", initials: "SG" },
];

const contact = {
  name: "Real Learning LLC",
  address: "5593 Edna Way",
  city: "Eugene",
  state: "OR",
  zip: "97402",
  phone: "(541) 636-4435",
  email: "",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BusinessPage() {
  return (
    <>
      {/* ── HERO: Full-bleed dark garden with nav embedded ── */}
      <section className="relative min-h-screen overflow-hidden flex flex-col">
        {/* Dark garden gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c] via-[#0f2340] to-black" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-40" />

        {/* Nav embedded in hero */}
        <nav className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
            <a
              href="#"
              className="font-[family-name:var(--font-display)] text-xl font-bold text-white flex items-center gap-2"
            >
              <Leaf className="w-5 h-5" /> Real Learning LLC
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="bg-white text-[#2E5E8E] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </nav>

        {/* Hero content — centered, dramatic */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-8 lg:px-16">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold text-white leading-[1.1] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Building futures, <br className="hidden sm:block" />
              one student at a time
            </motion.h1>

            <motion.p
              className="mt-8 text-white/50 text-lg max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Real Learning LLC in Eugene, OR — where Mrs. Green&apos;s 30+ years of teaching experience help every child build confidence and succeed.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-white text-[#2E5E8E] px-8 py-4 rounded-full text-sm font-bold hover:bg-white/90 transition"
              >
                <Calendar className="w-4 h-4" /> Book a Session
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="relative z-10 pb-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white/40 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── BOOK A CALL CTA BAR ── */}
      <section className="py-16 lg:py-20 px-8 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-[1.15] text-[var(--brand-text)]">
              Book a call with Mrs. Searsy
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-md mx-auto">
              Schedule a free consultation to discuss your child&apos;s learning goals with Mrs. Searsy Green.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a
                href="tel:+15416364435"
                className="inline-flex items-center gap-3 bg-[#2E5E8E] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#3A7AB5] transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Us Today
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 border-2 border-[#2E5E8E] text-[#2E5E8E] px-8 py-4 rounded-full text-sm font-bold hover:bg-[#2E5E8E] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" /> Send a Message
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT: Large statement text ── */}
      <section
        id="about"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.2em] font-semibold mb-6">
              About Us
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.15] text-[var(--brand-text)] font-bold">
              We believe every child can succeed with the right support and encouragement
            </h2>
            <p className="mt-8 text-[var(--brand-muted)] text-lg leading-relaxed max-w-3xl">
              With over 30 years in the classroom, Mrs. Searsy Green founded Real Learning LLC to give every Eugene student the personal attention they deserve. One grandmother watched her granddaughter&apos;s math scores climb dramatically after just a few summer sessions.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p className="text-4xl font-bold text-[#2E5E8E]">30+</p>
              <p className="text-[var(--brand-muted)] text-sm mt-1">
                Years Teaching
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2E5E8E]">5★</p>
              <p className="text-[var(--brand-muted)] text-sm mt-1">
                Average Rating
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2E5E8E]">16+</p>
              <p className="text-[var(--brand-muted)] text-sm mt-1">
                Years Community Programs
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#2E5E8E]">7</p>
              <p className="text-[var(--brand-muted)] text-sm mt-1">
                Five-Star Reviews
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AVAILABILITY BAR: Green banner ── */}
      <section className="bg-[#2E5E8E] py-6 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-white/70" />
          <p className="text-white text-sm md:text-base font-medium text-center">
            Our tutors are available Monday to Friday, flexible hours to fit your schedule
          </p>
        </div>
      </section>

      {/* ── SERVICES: Dark green cards with white text ── */}
      <section id="services" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              What We Do
            </p>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[1.1] font-bold">
              Our Services
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                className="bg-[#2E5E8E] rounded-2xl p-8 group hover:bg-[#3A7AB5] transition-colors duration-300 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY: Recent Works ── */}
      <section
        id="gallery"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Results
            </p>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[1.1] font-bold">
              Student Successes
            </h2>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className={`${item.aspect} bg-gradient-to-br from-[#4A8CC5] to-[#3A7AB5] group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
                  <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS: Green-themed sliding reviews ── */}
      <section id="reviews" className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 mb-12">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Testimonials
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] font-bold">
              Loved by families across Eugene
            </h2>
          </motion.div>
        </div>
        <div className="testimonial-marquee flex gap-6 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] bg-[#2E5E8E] rounded-2xl p-8 text-white"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white text-sm font-bold">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{review.author}</p>
                  <p className="text-xs text-white/50">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM: Meet the team ── */}
      <section
        id="team"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Our People
            </p>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.2rem)] leading-[1.1] font-bold">
              Meet the Team
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#4A8CC5] to-[#3A7AB5] flex items-center justify-center mb-5">
                  <span className="text-white text-3xl font-bold">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--brand-text)]">
                  {member.name}
                </h3>
                <p className="text-[var(--brand-muted)] text-sm mt-1">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA: Contact / Book a Session ── */}
      <section
        id="contact"
        className="py-24 lg:py-32 px-8 lg:px-16 bg-[#2E5E8E]"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <Leaf className="w-10 h-10 text-white/30 mx-auto mb-6" />
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight max-w-3xl mx-auto">
              Ready to help your child thrive?
            </h2>
            <p className="mt-6 text-white/50 max-w-md mx-auto">
              Schedule a free session and discover how Mrs. Green can help your child build confidence and succeed academically.
            </p>
          </motion.div>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeUp}
          >
            <a
              href="tel:+15416364435"
              className="inline-flex items-center gap-3 bg-white text-[#2E5E8E] px-8 py-4 rounded-full text-sm font-bold hover:bg-white/90 transition"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition"
            >
              <Mail className="w-4 h-4" /> Send a Message
            </a>
          </motion.div>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm"
            {...fadeUp}
          >
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Free consultation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> No commitment
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Same-week start
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-8 lg:px-16 bg-[#0a1a2e] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-white flex items-center gap-2">
              <Leaf className="w-5 h-5" /> Real Learning LLC
            </span>
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
              Tutoring for pre-K through high school in Eugene, OR. Math, reading, science, and life skills with Mrs. Searsy Green.
            </p>
            <div className="mt-6 space-y-2 text-white/50 text-sm font-[family-name:var(--font-mono)]">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {contact.address}, {contact.city}
                , {contact.state} {contact.zip}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {contact.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {contact.email}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
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
            <h4 className="text-white font-semibold mb-6">Get Started</h4>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Book a free session and see what Mrs. Searsy can do for your child.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-[#2E5E8E] px-6 py-3 rounded-full text-sm font-bold hover:bg-white/90 transition"
            >
              Book a Session <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-sm text-center">
            &copy; 2026 Real Learning LLC. All rights reserved.
          </p>
        </div>
      </footer>

      <ClickToCall phone="(541) 636-4435" />
    </>
  );
}
