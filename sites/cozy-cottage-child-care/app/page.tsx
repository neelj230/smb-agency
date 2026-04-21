// Cozy Cottage Child Care — Salem, OR — Home-Based Daycare
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink, FAQItem } from "@/components/types";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Heart,
  CheckCircle,
  Phone,
  Star,
  ArrowRight,
  PhoneCall,
  ClipboardCheck,
  Headphones,
  MapPin,
  Clock,
  Baby,
  BookOpen,
  Calendar,
  Palette,
  Sun,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    name: "Full-Day Infant & Toddler Care",
    description: "Nurturing daily care for babies and toddlers in a home-like setting, with attentive staff who treat each child with family-level love and consistency.",
    icon: Baby,
  },
  {
    name: "Structured Preschool Program",
    description: "A daily early learning curriculum covering alphabet, counting, and foundational milestones through songs, play, and guided activities.",
    icon: BookOpen,
  },
  {
    name: "Before & After School Care",
    description: "Reliable school-day support including morning breakfast, drop-off at school, afternoon pickup, and a snack before parents finish their workday.",
    icon: Clock,
  },
  {
    name: "Flexible Schedule Accommodations",
    description: "Custom care scheduling that adapts to early 6 AM starts, later pickups, and last-minute changes so working parents never get left without coverage.",
    icon: Calendar,
  },
  {
    name: "Arts, Crafts & Play-Based Learning",
    description: "Daily creative and hands-on activities — from arts and crafts to educational game mats and outdoor play — that build skills while keeping kids genuinely happy.",
    icon: Palette,
  },
  {
    name: "Summer Program with Outdoor Play",
    description: "A summer care option featuring a large backyard where kids can run, explore, and enjoy active play in a safe, supervised outdoor environment.",
    icon: Sun,
  },
];

const reviews = [
  {
    text: "My son attends Cozy Cottage and we love it. Carol has a ton of experience and her staff truly care about my son. As a first time mom — and new to Salem — finding daycare was hard, but right from the start Carol made me feel comfortable and welcomed.",
    author: "Jenna Perske",
    role: "First-time mom, new to Salem",
  },
  {
    text: "My daughter has been going to Cozy Cottage for over 8 years. We have always had a great experience. They are very professional and welcoming into their home. There are no worries about having someone that is unreliable.",
    author: "Sara M",
    role: "8+ year Cozy Cottage family",
  },
  {
    text: "My daughter has been going to Cozy Cottage since she was 14 months old. She will be 2 in May and she can count to 13 and sing her ABCs. I know a lot of her learning comes from being here.",
    author: "Tommy Smith",
    role: "Toddler parent",
  },
  {
    text: "Great daycare and preschool. We feel very comfortable leaving our two children there. They learn so much — even manners — do arts and crafts, and seem to have a great time. It's definitely more than just a daycare.",
    author: "Kristofer Rash",
    role: "Parent of two",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What ages does Cozy Cottage Child Care accept?",
    answer:
      "Cozy Cottage welcomes children from infancy through school age, including toddlers as young as 14 months and children old enough to be dropped off and picked up from school.",
  },
  {
    question: "How flexible are the hours for working parents with unusual schedules?",
    answer:
      "Very flexible. Cozy Cottage opens at 6:00 AM Monday through Friday and stays open until 6:00 PM. Carol accommodates early start times, later pickups, and last-minute schedule changes without issue.",
  },
  {
    question: "Is this just babysitting, or is there real learning happening?",
    answer:
      "It's genuinely more than daycare. Children go home counting, singing their ABCs, speaking in full sentences, and learning manners — all described by real parents. A structured preschool-style program runs daily alongside arts, crafts, and play-based activities.",
  },
  {
    question: "Can I visit or check in on my child during the day?",
    answer:
      "Yes — Carol actively welcomes parent involvement. One mother mentions coming in on her lunch break to nurse her baby, which Carol accommodated warmly. The environment is open and welcoming, not closed off.",
  },
  {
    question: "What does a typical day look like for a school-age child?",
    answer:
      "For school-age kids, Cozy Cottage provides breakfast in the morning, a drop-off at school, afternoon pickup after school ends, and a snack before parents are done with work — a full wraparound care solution.",
  },
  {
    question: "How long do families typically stay with Cozy Cottage?",
    answer:
      "Many families stay for years. One reviewer's daughter attended for over eight years. This kind of long-term loyalty speaks to the consistency and reliability that Carol and her staff provide.",
  },
];

const galleryPhotos = [
  { src: "/photos/photo-1.webp", alt: "Children playing with educational game mat on carpet" },
  { src: "/photos/photo-3.webp", alt: "Colorful outdoor playground with slide and tunnel" },
  { src: "/photos/photo-6.webp", alt: "Kids playing with game mat in the classroom" },
  { src: "/photos/photo-7.webp", alt: "Young girl with a friendly dog in the playroom" },
  { src: "/photos/photo-9.webp", alt: "Baby in a bouncer seat with colorful toys" },
  { src: "/photos/photo-10.webp", alt: "Carol holding a smiling baby" },
];

const featureCards = [
  {
    icon: PhoneCall,
    title: "Call us (503) 371-4841",
    description: "Reach Carol directly to ask questions or schedule a visit — we're here for your family.",
  },
  {
    icon: ClipboardCheck,
    title: "Personalized care plans",
    description: "We assess your child's needs and schedule to create a care arrangement that truly fits.",
  },
  {
    icon: Headphones,
    title: "Parent support",
    description: "From your first inquiry to years of enrollment, we're with you every step of the way.",
  },
];

const businessContact = {
  name: "Cozy Cottage Child Care",
  address: "882 20th St NE",
  city: "Salem",
  state: "OR",
  zip: "97301",
  phone: "(503) 371-4841",
  email: "",
  hours: {
    Monday: "6:00 AM - 6:00 PM",
    Tuesday: "6:00 AM - 6:00 PM",
    Wednesday: "6:00 AM - 6:00 PM",
    Thursday: "6:00 AM - 6:00 PM",
    Friday: "6:00 AM - 6:00 PM",
    Saturday: "Closed",
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

export default function BusinessPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("submitting");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setFormStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-accent)] flex items-center justify-center">
            <Heart className="w-4 h-4 text-[var(--brand-text)]" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-white text-lg font-semibold">
            Cozy Cottage
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
            href="tel:+15033714841"
            className="hidden md:flex items-center gap-2 text-white text-sm"
          >
            <Phone className="w-4 h-4" />
            (503) 371-4841
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
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--brand-accent)] font-semibold mb-6">
              Home-based childcare · Salem, OR
            </p>
            <h1 className="text-[clamp(3.5rem,7vw,6rem)] font-semibold text-white leading-[0.95] tracking-[-0.04em]">
              Little<br />humans,<br />big days.
            </h1>
            <p className="mt-8 text-[#CCCCCC] text-base max-w-md leading-[1.7]">
              Carol has looked after Salem kids for 8+ years. They leave counting to 13, singing the alphabet, and asking to come back tomorrow.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="bg-[var(--brand-accent)] text-[var(--brand-text)] px-7 py-4 rounded-[10px] font-medium text-sm hover:brightness-110 transition"
              >
                Schedule a Visit
              </a>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["photo-1", "photo-7", "photo-10"].map((name) => (
                    <div
                      key={name}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200"
                    >
                      <img
                        src={`/photos/${name}.webp`}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
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
                    From 13 ratings
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
                <img
                  src="/photos/photo-1.webp"
                  alt="Children playing with colorful educational game mat at Cozy Cottage"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE: Playful ticker of what's happening here ── */}
      <div className="bg-[var(--brand-accent)] py-5 overflow-hidden border-y border-black/5">
        <div className="cc-marquee-track flex gap-12 w-max whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex gap-12 items-center">
              {[
                "ABCs by 22 months",
                "Counting to 13",
                "Arts, crafts, and mud",
                "Open at 6 AM",
                "8 years of families",
                "Carol knows your kid",
                "Backyard summers",
                "Breakfast, books, naps",
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-12 text-[var(--brand-text)]">
                  <span className="text-sm font-medium tracking-wide">{item}</span>
                  <span className="opacity-40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

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
              <img
                src="/photos/photo-2.webp"
                alt="Cozy Cottage daycare classroom with cribs and educational posters"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <a
                  href="#reviews"
                  className="inline-flex items-center gap-2 text-white text-sm font-medium hover:underline"
                >
                  Read what parents say
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
              Child care built around your family
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              Cozy Cottage is a warm, home-based childcare where kids don&apos;t just get watched &mdash; they thrive. One parent&apos;s daughter was counting to 13 and talking in full sentences before turning two.
            </p>
            <div className="mt-8 space-y-5">
              {[
                "Structured preschool curriculum daily",
                "Flexible 6 AM start for working parents",
                "Families stay for years — one for 8+ years",
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
              From infant care to after-school programs, Cozy Cottage supports your child through every milestone.
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
              What parents are saying
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto text-sm leading-relaxed">
              Families trust Carol with their most precious gift. Here&apos;s what they have to say.
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
                <div className="w-10 h-10 rounded-full bg-[var(--brand-accent)]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[var(--brand-primary)]">
                    {review.author.charAt(0)}
                  </span>
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

      {/* ── GALLERY: Real photos from Cozy Cottage ── */}
      <section id="gallery" className="py-24 lg:py-32 px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em]">
              A peek inside
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-lg mx-auto text-sm leading-relaxed">
              Real rooms, real play, real kids — the spaces where Salem families spend their days.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {galleryPhotos.map((photo, i) => (
              <motion.div
                key={i}
                className="group cursor-pointer overflow-hidden rounded-[20px] aspect-[4/3] bg-slate-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
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
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Tell Carol about your family
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "submitting" || formStatus === "success"}
                className="w-full px-8 py-4 bg-[var(--brand-accent)] text-[var(--brand-text)] rounded-[10px] font-semibold text-sm hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formStatus === "submitting"
                  ? "Sending…"
                  : formStatus === "success"
                    ? "Sent — Carol will be in touch"
                    : "Send Message"}
              </button>
              {formStatus === "error" && (
                <p className="text-sm text-[var(--brand-accent)]">
                  Something went wrong. Please call (503) 371-4841 directly.
                </p>
              )}
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

      {/* ── CTA BAR: "Looking for quality child care?" ── */}
      <section className="bg-[var(--brand-primary)] py-8 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
            Looking for quality child care?
          </h3>
          <a
            href="tel:+15033714841"
            className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-[var(--brand-text)] px-8 py-4 rounded-[10px] font-semibold text-sm hover:brightness-110 transition"
          >
            <Phone className="w-5 h-5" />
            Call Us (503) 371-4841
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
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-xl font-bold">
                Cozy Cottage
              </span>
            </div>
            <p className="text-sm text-[var(--brand-muted)] leading-relaxed max-w-xs">
              Home-based childcare in Salem, OR. Where kids learn, laugh, and belong.
            </p>
            <a
              href="tel:+15033714841"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[var(--brand-primary)] hover:underline"
            >
              <Phone className="w-4 h-4" />
              (503) 371-4841
            </a>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-3 gap-2 self-start">
            {["photo-1", "photo-3", "photo-6", "photo-7", "photo-9", "photo-10"].map((name) => (
              <div
                key={name}
                className="w-20 h-20 rounded-lg overflow-hidden bg-slate-200"
              >
                <img
                  src={`/photos/${name}.webp`}
                  alt="Cozy Cottage"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold text-lg mb-3">Our Location</h4>
            <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
              882 20th St NE
              <br />
              Salem, OR 97301
            </p>
            <p className="text-sm text-[var(--brand-muted)] mt-2">
              Mon–Fri: 6:00 AM – 6:00 PM
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-3">Contact Carol</h4>
            <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
              (503) 371-4841
            </p>
            <a
              href="tel:+15033714841"
              className="text-sm text-[var(--brand-primary)] font-medium mt-3 inline-block hover:underline"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-[var(--brand-muted)]">
            &copy; {new Date().getFullYear()} Cozy Cottage Child Care
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

      <ClickToCall phone="(503) 371-4841" />
    </>
  );
}
