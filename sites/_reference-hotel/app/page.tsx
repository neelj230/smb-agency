// REFERENCE: BOUTIQUE HOTEL — full-screen dark hero, gold accents, elegant serif typography, sliding gallery images, immersive scroll experience inspired by mariven.framer.website
"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Waves,
  Sparkles,
  UtensilsCrossed,
  Wine,
  Dumbbell,
  Palmtree,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Plus,
  Minus,
  Calendar,
  Users,
  Anchor,
  Sun,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Rooms", href: "#rooms" },
  { label: "Experience", href: "#experience" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

const galleryItems = [
  {
    label: "Ocean Suite",
    gradient: "from-[#6B8F9E] to-[#2C4A5A]",
    aspect: "aspect-[3/4]",
  },
  {
    label: "Lobby Lounge",
    gradient: "from-[#D4C5A9] to-[#8B7355]",
    aspect: "aspect-[4/3]",
  },
  {
    label: "Pool Terrace",
    gradient: "from-[#4A7B8C] to-[#1C3D4A]",
    aspect: "aspect-[3/4]",
  },
  {
    label: "Restaurant",
    gradient: "from-[#8B7355] to-[#3A2A1C]",
    aspect: "aspect-[4/3]",
  },
  {
    label: "Garden Path",
    gradient: "from-[#7A9E6B] to-[#3A5A2C]",
    aspect: "aspect-[3/4]",
  },
  {
    label: "Spa Retreat",
    gradient: "from-[#C5B8A9] to-[#7A6B5A]",
    aspect: "aspect-[4/3]",
  },
];

const rooms = [
  {
    name: "Ocean View Suite",
    price: "$420",
    size: "65 m²",
    bed: "King Bed",
    desc: "Wake up to panoramic ocean views from your private terrace. Deep soaking tub, premium linens, and a sunset you will never forget.",
    gradient: "from-[#6B8F9E] to-[#2C4A5A]",
  },
  {
    name: "Garden Retreat",
    price: "$280",
    size: "45 m²",
    bed: "Queen Bed",
    desc: "Tucked among tropical gardens with a rain shower, handcrafted furnishings, and direct pool access.",
    gradient: "from-[#7A9E6B] to-[#3A5A2C]",
  },
  {
    name: "Coastal Room",
    price: "$180",
    size: "30 m²",
    bed: "Queen Bed",
    desc: "Elegant simplicity with everything you need — ocean breeze, soft linens, and the sound of waves.",
    gradient: "from-[#D4C5A9] to-[#8B7355]",
  },
];

const amenities = [
  {
    icon: Waves,
    name: "Infinity Pool",
    desc: "Ocean-facing heated pool stretching to the horizon",
  },
  {
    icon: Sparkles,
    name: "Spa & Wellness",
    desc: "Full-service treatments with ocean-view treatment rooms",
  },
  {
    icon: UtensilsCrossed,
    name: "Farm-to-Table",
    desc: "Seasonal ingredients from our garden, prepared daily",
  },
  {
    icon: Wine,
    name: "Sunset Bar",
    desc: "Craft cocktails as the sun dips below the water",
  },
  {
    icon: Dumbbell,
    name: "Fitness Center",
    desc: "State-of-the-art equipment with 24-hour access",
  },
  {
    icon: Anchor,
    name: "Water Sports",
    desc: "Kayaking, paddleboarding, and guided snorkeling",
  },
];

const events = [
  {
    name: "Beachfront Weddings",
    desc: "Exchange vows with the ocean as your backdrop. Our events team handles every detail.",
    gradient: "from-[#D4C5A9] to-[#8B7355]",
  },
  {
    name: "Corporate Retreats",
    desc: "Inspire your team with meeting spaces that open directly onto the sea.",
    gradient: "from-[#6B8F9E] to-[#2C4A5A]",
  },
  {
    name: "Private Dinners",
    desc: "Chef-curated menus served under the stars on our private terrace.",
    gradient: "from-[#7A9E6B] to-[#3A5A2C]",
  },
];

const faqs = [
  {
    q: "What is the check-in and check-out time?",
    a: "Check-in begins at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out are available upon request.",
  },
  {
    q: "Is the hotel suitable for families?",
    a: "Absolutely. We offer family suites, a kids pool, and a supervised activity program for children ages 4-12.",
  },
  {
    q: "Do you offer airport transfers?",
    a: "Yes, we provide complimentary airport transfers for all suite bookings. Standard rooms can add transfers for a small fee.",
  },
  {
    q: "What dining options are available?",
    a: "Our main restaurant serves breakfast, lunch, and dinner with farm-to-table cuisine. The Sunset Bar offers light bites and cocktails throughout the evening.",
  },
  {
    q: "Can I book spa treatments in advance?",
    a: "We recommend booking spa treatments at least 48 hours in advance, especially during peak season. Contact our concierge team.",
  },
];

const blogPosts = [
  {
    title: "A Guide to Coastal Foraging",
    category: "Experience",
    gradient: "from-[#6B8F9E] to-[#4A7B8C]",
  },
  {
    title: "Sunrise Yoga on the Beach",
    category: "Wellness",
    gradient: "from-[#D4C5A9] to-[#B8A88E]",
  },
  {
    title: "Behind the Menu: Chef Maria",
    category: "Dining",
    gradient: "from-[#8B7355] to-[#6B5A42]",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PARALLAX HERO ──────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1929] via-[#0F2942] to-[#1A3A5C]" />
        {/* Shimmer / light rays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(100,180,220,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(184,134,11,0.06),transparent_50%)]" />
        {/* Horizon line effect */}
        <div className="absolute bottom-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ opacity }}
      >
        <motion.p
          className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.4em] mb-8 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Coastal Hotel &amp; Resort
        </motion.p>
        <motion.h1
          className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,9vw,5.5rem)] text-white leading-[1.05] tracking-[-0.02em] max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your Home
          <br />
          By The Ocean
        </motion.h1>
        <motion.div
          className="gold-line mx-auto mt-10 mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
        <motion.p
          className="text-white/50 text-lg max-w-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Where timeless elegance meets the warmth of the sea.
        </motion.p>
        <motion.a
          href="#rooms"
          className="mt-12 inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-10 py-4 text-sm font-medium tracking-wide hover:brightness-110 transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          Book Your Stay <ArrowRight className="w-4 h-4" />
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/25 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── SLIDING GALLERY ROW ────────────────────────────────────────────────────

function SlidingRow({
  items,
  direction,
}: {
  items: typeof galleryItems;
  direction: "left" | "right";
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? ["8%", "-8%"] : ["-8%", "8%"],
  );

  return (
    <motion.div ref={ref} className="flex gap-5 py-3" style={{ x }}>
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          className={`relative flex-shrink-0 w-[320px] md:w-[400px] ${item.aspect} rounded-xl overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, x: direction === "left" ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} group-hover:scale-110 transition-transform duration-700`}
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-all duration-500" />
          <span className="absolute bottom-4 left-5 text-white/80 text-xs uppercase tracking-[0.2em] z-10 font-medium">
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── FAQ ITEM ───────────────────────────────────────────────────────────────

function FaqItem({ item, index }: { item: (typeof faqs)[0]; index: number }) {
  const ref = useRef(null);
  const isOpen = useRef(false);

  return (
    <motion.details
      ref={ref}
      className="group border-b border-[var(--brand-primary)]/10 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <summary className="flex items-center justify-between py-6 cursor-pointer list-none">
        <span className="font-[family-name:var(--font-display)] text-lg md:text-xl pr-8">
          {item.q}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--brand-primary)]/20 flex items-center justify-center group-open:bg-[var(--brand-primary)] group-open:border-[var(--brand-primary)] transition-all duration-300">
          <Plus className="w-4 h-4 group-open:hidden" />
          <Minus className="w-4 h-4 hidden group-open:block group-open:text-white" />
        </span>
      </summary>
      <div className="pb-6 pr-16">
        <p className="text-[var(--brand-muted)] leading-relaxed">{item.a}</p>
      </div>
    </motion.details>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function MarivenPage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-primary)]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-xl text-white tracking-wider">
            Mariven
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-[var(--brand-accent)] text-sm transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="border border-[var(--brand-accent)]/50 text-[var(--brand-accent)] px-6 py-2 text-xs uppercase tracking-widest hover:bg-[var(--brand-accent)] hover:text-white transition-all"
          >
            Reserve
          </a>
        </div>
      </nav>

      <HeroSection />

      {/* ── ABOUT: "Where Luxury Meets the Ocean Breeze" ── */}
      <section
        id="about"
        className="py-28 lg:py-40 px-8 lg:px-16 bg-[var(--brand-bg)]"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.35em] mb-8"
            {...fadeUp}
          >
            Welcome to Mariven
          </motion.p>
          <motion.h2
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,3.5rem)] leading-[1.15] mb-10"
            {...fadeUp}
          >
            Where Luxury Meets
            <br />
            the Ocean Breeze
          </motion.h2>
          <motion.div className="gold-line mx-auto mb-10" {...fadeUp} />
          <motion.p
            className="text-[var(--brand-muted)] text-lg leading-relaxed max-w-2xl mx-auto mb-6"
            {...fadeUp}
          >
            Nestled between ancient olive groves and the Mediterranean shore,
            Mariven is a place designed for slow mornings, long dinners, and the
            kind of quiet that recharges you.
          </motion.p>
          <motion.p
            className="text-[var(--brand-muted)] text-base leading-relaxed max-w-2xl mx-auto"
            {...fadeUp}
          >
            Every room faces the water. Every meal uses ingredients from our
            garden. We keep only 24 rooms so our staff knows your name, your
            drink, and when you like your coffee.
          </motion.p>
        </div>
      </section>

      {/* ── GALLERY: "Mariven Moments Captured" — images sliding opposite directions ── */}
      <section
        id="gallery"
        className="py-24 lg:py-32 bg-[var(--brand-bg-alt)] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.35em] mb-4">
              Spaces
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,3.5rem)] leading-tight">
              Mariven Moments Captured
            </h2>
            <div className="gold-line mx-auto mt-6" />
          </motion.div>
        </div>

        {/* Full-width sliding rows — this is the key Framer effect */}
        <div className="space-y-5">
          <SlidingRow items={galleryItems.slice(0, 3)} direction="left" />
          <SlidingRow
            items={[...galleryItems.slice(3), ...galleryItems.slice(0, 2)]}
            direction="right"
          />
        </div>
      </section>

      {/* ── ROOMS: "Stay Your Way" ── */}
      <section
        id="rooms"
        className="py-28 lg:py-36 px-8 lg:px-16 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.35em] mb-4">
              Accommodations
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,3.5rem)] leading-tight">
              Stay Your Way
            </h2>
            <div className="gold-line mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <motion.div
                key={room.name}
                className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${room.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/15 backdrop-blur-sm text-white text-xs uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {room.bed}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-white/70 text-xs uppercase tracking-widest">
                      {room.size}
                    </span>
                    <span className="text-[var(--brand-accent)] text-2xl font-[family-name:var(--font-display)]">
                      {room.price}
                      <span className="text-sm text-white/40">/night</span>
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-[family-name:var(--font-display)] text-xl mb-3">
                    {room.name}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed mb-5">
                    {room.desc}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-[var(--brand-accent)] text-sm font-medium hover:gap-3 transition-all"
                  >
                    View details <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE PARADISE: amenities ── */}
      <section
        id="experience"
        className="relative py-28 lg:py-40 px-8 lg:px-16 bg-[var(--brand-primary)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(100,180,220,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(184,134,11,0.04),transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.35em] mb-4">
              What Awaits
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,3.5rem)] text-white leading-tight">
              Experience Paradise
            </h2>
            <div className="gold-line mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {amenities.map((item, i) => (
              <motion.div
                key={item.name}
                className="group text-center p-10 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-[var(--brand-accent)]" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-white text-xl mb-2">
                  {item.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS: "Celebrate by the Sea" ── */}
      <section
        id="events"
        className="py-28 lg:py-36 px-8 lg:px-16 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.35em] mb-4">
              Events
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,3.5rem)] leading-tight">
              Celebrate by the Sea
            </h2>
            <div className="gold-line mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={event.name}
                className="group rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${event.gradient} relative overflow-hidden rounded-xl`}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-white text-2xl mb-2">
                        {event.name}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {event.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL: Large quote ── */}
      <section className="relative py-28 lg:py-40 px-8 lg:px-16 bg-[var(--brand-bg-alt)] overflow-hidden">
        <div className="absolute top-12 left-12 text-[var(--brand-accent)]/10 text-[200px] font-serif leading-none select-none">
          &ldquo;
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex justify-center gap-1.5 mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-5 h-5 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                />
              ))}
            </div>
            <blockquote className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] leading-[1.3] mb-10">
              Wonderful place to stay for our first trip to Mariven. The staff
              remembered our names, the views were breathtaking, and every
              detail felt intentional.
            </blockquote>
            <div className="gold-line mx-auto mb-8" />
            <p className="text-[var(--brand-text)] font-medium">Caroline M.</p>
            <p className="text-[var(--brand-muted)] text-sm mt-1">
              New York, NY
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BLOG: "Mariven Stories" ── */}
      <section className="py-28 lg:py-36 px-8 lg:px-16 bg-[var(--brand-bg)]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.35em] mb-4">
              Journal
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,3.5rem)] leading-tight">
              Mariven Stories
            </h2>
            <div className="gold-line mx-auto mt-6" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div
                  className={`aspect-[16/10] rounded-xl bg-gradient-to-br ${post.gradient} relative overflow-hidden mb-5`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-500" />
                </div>
                <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.2em] mb-2">
                  {post.category}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-xl group-hover:text-[var(--brand-accent)] transition-colors">
                  {post.title}
                </h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ: "Frequently Asked Questions" ── */}
      <section className="py-28 lg:py-36 px-8 lg:px-16 bg-[var(--brand-bg-alt)]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.35em] mb-4">
              FAQ
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,3.5rem)] leading-tight">
              Frequently Asked Questions
            </h2>
            <div className="gold-line mx-auto mt-6" />
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} item={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT: "Get In Touch" ── */}
      <section
        id="contact"
        className="relative py-32 lg:py-44 px-8 lg:px-16 bg-[var(--brand-primary)] overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(100,180,220,0.05),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            className="text-[var(--brand-accent)] text-xs uppercase tracking-[0.35em] mb-6"
            {...fadeUp}
          >
            Reservations
          </motion.p>
          <motion.h2
            className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.5rem)] text-white leading-[1.05]"
            {...fadeUp}
          >
            Get In Touch
          </motion.h2>
          <motion.div className="gold-line mx-auto mt-8 mb-10" {...fadeUp} />
          <motion.p
            className="text-white/45 text-lg max-w-md mx-auto mb-12"
            {...fadeUp}
          >
            Limited to 24 rooms. Our team is ready to craft your perfect coastal
            getaway.
          </motion.p>

          <motion.div
            className="grid sm:grid-cols-3 gap-6 mb-14 max-w-2xl mx-auto"
            {...fadeUp}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border border-[var(--brand-accent)]/30 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-5 h-5 text-[var(--brand-accent)]" />
              </div>
              <p className="text-white/70 text-sm">+1 (215) 555-0199</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border border-[var(--brand-accent)]/30 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-[var(--brand-accent)]" />
              </div>
              <p className="text-white/70 text-sm">stay@mariven.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border border-[var(--brand-accent)]/30 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5 text-[var(--brand-accent)]" />
              </div>
              <p className="text-white/70 text-sm">Coastal Road 12</p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeUp}
          >
            <a
              href="tel:+12155550199"
              className="inline-flex items-center justify-center gap-3 bg-[var(--brand-accent)] text-white px-10 py-4 text-sm font-medium tracking-wide hover:brightness-110 transition"
            >
              <Phone className="w-4 h-4" /> Call to Reserve
            </a>
            <a
              href="mailto:stay@mariven.com"
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-10 py-4 text-sm font-medium tracking-wide hover:bg-white/10 transition"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-8 lg:px-16 bg-[#0A1218] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-[family-name:var(--font-display)] text-xl text-white tracking-wider">
              Mariven
            </span>
            <p className="mt-4 text-white/35 text-sm leading-relaxed max-w-xs">
              A 24-room coastal hotel where the Mediterranean meets timeless
              hospitality.
            </p>
          </div>
          <div>
            <h4 className="text-white/70 text-xs uppercase tracking-widest mb-6">
              Quick Links
            </h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/35 text-sm hover:text-[var(--brand-accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/70 text-xs uppercase tracking-widest mb-6">
              Contact
            </h4>
            <div className="space-y-3 text-white/35 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--brand-accent)]" />{" "}
                Coastal Road 12, Mediterranean
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--brand-accent)]" /> +1
                (215) 555-0199
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--brand-accent)]" />{" "}
                stay@mariven.com
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/25 text-xs text-center tracking-wide">
            &copy; 2026 Mariven. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
