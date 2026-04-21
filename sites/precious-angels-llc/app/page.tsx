// REFERENCE: KIDS SUMMER CAMP — SunTrail Framer template reproduction
// Warm playful design, ALL-CAPS headings, decorative SVG circles/triangles, gallery collage, counselor cards, event details, news
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";

// ─── DECORATIVE SVG COMPONENTS ─────────────────────────────────────────────


// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const activities = [
  {
    name: "FULL-DAY CHILDCARE",
    description:
      "Weekday care from 5:30 AM to 4:30 PM for working parents who need an early drop-off and a consistent daily routine.",
    photo: "/photos/photo-1.webp",
  },
  {
    name: "LEARNING THROUGH PLAY",
    description:
      "Daily activities shaped by Kim's childhood development education — structured learning woven into creative play, not worksheets.",
    photo: "/photos/photo-2.webp",
  },
  {
    name: "BACKYARD PLAYGROUND",
    description:
      "Wooden towers, slides, swings, a playhouse, and ride-on cars in a fully fenced backyard built for active outdoor hours.",
    photo: "/photos/photo-3.webp",
  },
  {
    name: "OPEN-DOOR POLICY",
    description:
      "Walk in anytime without knocking. Full room surveillance and honest daily updates mean parents always know how the day is going.",
    photo: "/photos/photo-4.webp",
  },
];

const counselors = [
  {
    name: "Kim",
    role: "Owner & Lead Caregiver",
    photo: "/photos/photo-5.webp",
  },
  {
    name: "Open Door",
    role: "Walk in Anytime",
    photo: "/photos/photo-6.webp",
  },
  {
    name: "Daily Rhythm",
    role: "Structured Routines",
    photo: "/photos/photo-7.webp",
  },
  {
    name: "Family First",
    role: "Dietary & Schedule Flex",
    photo: "/photos/photo-1.webp",
  },
];

const events = [
  {
    date: "MON–FRI",
    name: "FULL-DAY CHILDCARE",
    time: "5:30 AM – 4:30 PM",
    description:
      "Consistent weekday care with early drop-off available. Kids follow a structured daily routine that weaves learning into play.",
  },
  {
    date: "DAILY",
    name: "DEVELOPMENTAL LEARNING PROGRAM",
    time: "Morning & Afternoon",
    description:
      "Age-appropriate learning activities led by Kim, whose childhood development education shapes every part of the daily curriculum.",
  },
  {
    date: "DAILY",
    name: "OUTDOOR PLAY TIME",
    time: "Scheduled Throughout Day",
    description:
      "Children enjoy the fully equipped backyard playground with wooden towers, slides, swings, a playhouse, and ride-on toy cars.",
  },
  {
    date: "ONGOING",
    name: "PARENT CHECK-INS & OPEN DOOR",
    time: "Anytime",
    description:
      "Parents are welcome to walk in without knocking at any time. Full room surveillance gives families added peace of mind every day.",
  },
];

const galleryItems = [
  { photo: "/photos/photo-1.webp", label: "Facility sign" },
  { photo: "/photos/photo-2.webp", label: "Wooden playground" },
  { photo: "/photos/photo-3.webp", label: "Ride-on toy cars" },
  { photo: "/photos/photo-4.webp", label: "Tube slide" },
  { photo: "/photos/photo-5.webp", label: "Backyard play area" },
  { photo: "/photos/photo-6.webp", label: "Playhouse" },
  { photo: "/photos/photo-7.webp", label: "Daily activities" },
];

const weekInPhotos = [
  { day: "Mon", label: "Morning drop-off, 5:30 AM", photo: "/photos/photo-1.webp" },
  { day: "Tue", label: "Wooden tower + yellow slide", photo: "/photos/photo-2.webp" },
  { day: "Wed", label: "Playhouse with picnic bench", photo: "/photos/photo-3.webp" },
  { day: "Thu", label: "Climbing up, sliding down", photo: "/photos/photo-4.webp" },
  { day: "Fri", label: "Swings, sandbox, and free play", photo: "/photos/photo-5.webp" },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

function TriangleOutline({
  className = "",
  color = "#8B9E6B",
  size = 60,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 60 52"
      fill="none"
    >
      <polygon
        points="30,2 58,50 2,50"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
function CircleOutline({
  className = "",
  color = "#C4A84D",
  size = 80,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
    >
      <circle
        cx="40"
        cy="40"
        r="37"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}
function SmallDot({
  className = "",
  color = "#D4A843",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <circle cx="6" cy="6" r="5" fill={color} opacity="0.4" />
    </svg>
  );
}

export default function BusinessPage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-3 flex items-center justify-between">
          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--brand-text)] text-xs font-bold uppercase tracking-[0.15em] hover:text-[var(--brand-primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center circular badge logo */}
          <a
            href="#"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--brand-accent)] shadow-md -mb-4 z-10"
          >
            <span className="font-[family-name:var(--font-display)] text-[9px] font-extrabold text-[var(--brand-text)] uppercase leading-tight text-center tracking-wider">
              PA
              <br />
              LLC
            </span>
          </a>

          {/* Right nav links + CTA */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--brand-text)] text-xs font-bold uppercase tracking-[0.15em] hover:text-[var(--brand-primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#register"
              className="bg-[var(--brand-accent)] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[var(--brand-text)]"
            aria-label="Menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden bg-[var(--brand-bg-alt)]">
        {/* Decorative shapes - scattered circles and triangles */}
        <CircleOutline
          className="absolute top-32 left-[6%] hidden lg:block"
          size={120}
          color="#C4A84D"
        />
        <CircleOutline
          className="absolute top-48 right-[8%] hidden lg:block"
          size={90}
          color="#8B9E6B"
        />
        <TriangleOutline
          className="absolute top-[55%] left-[3%] hidden lg:block"
          size={70}
          color="#C4A84D"
        />
        <TriangleOutline
          className="absolute top-[30%] right-[5%] rotate-12 hidden lg:block"
          size={55}
          color="#8B9E6B"
        />
        <CircleOutline
          className="absolute bottom-24 left-[20%] hidden lg:block"
          size={60}
          color="#D4A843"
        />
        <TriangleOutline
          className="absolute bottom-32 right-[15%] -rotate-6 hidden lg:block"
          size={45}
          color="#A3B07A"
        />
        <SmallDot className="absolute top-40 left-[25%] hidden lg:block" />
        <SmallDot
          className="absolute top-[60%] right-[22%] hidden lg:block"
          color="#8B9E6B"
        />
        <SmallDot className="absolute bottom-40 left-[40%] hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-40 pb-24 min-h-screen flex items-center">
          <div className="text-center mx-auto max-w-4xl">
            <motion.p
              className="text-[var(--brand-primary)] text-xs font-bold uppercase tracking-[0.3em] mb-6"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1 }}
            >
              Merriman Rd &middot; Medford, OR
            </motion.p>
            <motion.h1
              className="font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,6.5rem)] text-[var(--brand-text)] leading-[0.95] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Yay,
              <br />
              <span className="italic text-[var(--brand-accent)]">daycare.</span>
            </motion.h1>

            <motion.p
              className="mt-8 text-[var(--brand-muted)] text-lg leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              An in-home daycare where Kim treats every kid like family — and where kids cheer from the backseat when they pull into the driveway.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="#register"
                className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-amber-600 transition shadow-lg shadow-amber-500/20"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#events"
                className="inline-flex items-center gap-3 border-2 border-[var(--brand-text)] text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[var(--brand-text)] hover:text-white transition"
              >
                View Programs
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── EVENT ANNOUNCEMENT ── */}
      <section
        id="events"
        className="py-24 lg:py-32 px-6 lg:px-16 bg-[var(--brand-primary)] relative overflow-hidden"
      >
        <TriangleOutline
          className="absolute top-16 right-16 hidden lg:block"
          size={50}
          color="rgba(255,255,255,0.3)"
        />
        <CircleOutline
          className="absolute bottom-16 left-12 hidden lg:block"
          size={70}
          color="rgba(255,255,255,0.2)"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Upcoming Programs
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4.5vw,2.4rem)] font-extrabold leading-tight text-white uppercase tracking-wide">
              Daily Programs at
              <br />
              Precious Angels LLC
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {events.map((event, i) => (
              <motion.div
                key={event.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/15 hover:bg-white/15 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[var(--brand-accent)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {event.date}
                  </span>
                  <span className="text-white/50 text-xs font-[family-name:var(--font-mono)]">
                    {event.time}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-white text-lg font-bold uppercase tracking-wide">
                  {event.name}
                </h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / MISSION ── */}
      <section
        id="about"
        className="py-24 lg:py-32 px-6 lg:px-16 bg-white relative"
      >
        <CircleOutline
          className="absolute top-12 right-16 hidden lg:block"
          size={100}
          color="#C4A84D"
        />
        <TriangleOutline
          className="absolute bottom-16 left-12 hidden lg:block"
          size={60}
          color="#8B9E6B"
        />
        <SmallDot className="absolute top-32 left-[30%] hidden lg:block" />

        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-[var(--brand-accent)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              About Us
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,2.9rem)] font-extrabold leading-tight uppercase tracking-wide">
              The Heart Behind
              <br />
              Every Child
            </h2>
            <p className="mt-8 text-[var(--brand-muted)] text-base leading-relaxed max-w-2xl mx-auto">
              Kim built Precious Angels LLC around a simple belief: a childcare
              provider should feel like an extension of your own family. With full
              surveillance, an open-door policy, and a structured daily schedule
              that weaves learning into play, parents never have to wonder
              what&apos;s happening with their child.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { stat: "4.3★", label: "Average Rating" },
              { stat: "11+", label: "Family Reviews" },
              { stat: "5+", label: "Years Trusted" },
              { stat: "5", label: "Days Per Week" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-3xl font-extrabold text-[var(--brand-primary)]">
                  {item.stat}
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1 uppercase tracking-wider font-semibold">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section
        id="activities"
        className="py-24 lg:py-32 px-6 lg:px-16 bg-[var(--brand-bg-alt)] relative"
      >
        <TriangleOutline
          className="absolute top-16 left-8 hidden lg:block"
          size={55}
          color="#C4A84D"
        />
        <CircleOutline
          className="absolute bottom-20 right-12 hidden lg:block"
          size={80}
          color="#8B9E6B"
        />
        <SmallDot className="absolute top-40 right-[25%] hidden lg:block" />

        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              What We Do
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,2.5rem)] font-extrabold leading-tight uppercase tracking-wide">
              Explore Our Programs
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={activity.photo}
                    alt={activity.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="p-7">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold uppercase tracking-wide">
                    {activity.name}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm mt-3 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEEPER MISSION ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-16 bg-white relative overflow-hidden">
        <CircleOutline
          className="absolute -top-10 -left-10 hidden lg:block"
          size={140}
          color="#C4A84D"
        />
        <TriangleOutline
          className="absolute bottom-12 right-20 hidden lg:block"
          size={65}
          color="#8B9E6B"
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-primary)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Values
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,2.9rem)] font-extrabold leading-tight uppercase tracking-wide">
              Our Mission
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] text-base leading-relaxed">
              We believe that great childcare goes beyond supervision. It&apos;s
              where children learn, play, and grow in a warm, structured
              environment with a caregiver who treats them like family.
            </p>
            <p className="mt-4 text-[var(--brand-muted)] text-base leading-relaxed">
              Kim&apos;s education in childhood development shapes everything at
              Precious Angels — from the daily learning schedule to the way she
              communicates with each parent about their child&apos;s milestones.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="aspect-[4/3] rounded-2xl relative overflow-hidden"
          >
            <img
              src="/photos/photo-2.webp"
              alt="Precious Angels daily care"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Decorative overlay elements */}
            <TriangleOutline
              className="absolute top-6 right-6"
              size={40}
              color="rgba(255,255,255,0.8)"
            />
            <CircleOutline
              className="absolute bottom-8 left-8"
              size={50}
              color="rgba(255,255,255,0.7)"
            />
          </motion.div>
        </div>
      </section>

      {/* ── LEADERSHIP / COUNSELORS ── */}
      <section
        id="team"
        className="py-24 lg:py-32 px-6 lg:px-16 bg-[var(--brand-bg-alt)] relative"
      >
        <TriangleOutline
          className="absolute top-16 right-16 hidden lg:block"
          size={50}
          color="#C4A84D"
        />
        <SmallDot
          className="absolute bottom-24 left-[20%] hidden lg:block"
          color="#8B9E6B"
        />

        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-primary)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Our Team
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,2.9rem)] font-extrabold leading-tight uppercase tracking-wide">
              Meet Our Caregivers
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {counselors.map((person, i) => (
              <motion.div
                key={person.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-base uppercase tracking-wide">
                    {person.name}
                  </h3>
                  <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.15em] mt-1">
                    {person.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY COLLAGE ── */}
      <section
        id="gallery"
        className="py-24 lg:py-32 px-6 lg:px-16 bg-white relative"
      >
        <CircleOutline
          className="absolute top-12 left-8 hidden lg:block"
          size={90}
          color="#C4A84D"
        />
        <TriangleOutline
          className="absolute bottom-16 right-16 hidden lg:block"
          size={55}
          color="#8B9E6B"
        />

        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Moments
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-tight uppercase tracking-wide max-w-2xl mx-auto">
              Gallery of Smiles, Play, and Precious Everyday Moments
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="gallery-collage">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden relative group"
              >
                <img
                  src={item.photo}
                  alt={item.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── REGISTER CTA ── */}
      <section
        id="register"
        className="py-24 lg:py-32 px-6 lg:px-16 bg-[var(--brand-accent)] relative overflow-hidden"
      >
        <CircleOutline
          className="absolute -top-8 -right-8 hidden lg:block"
          size={140}
          color="rgba(255,255,255,0.3)"
        />
        <TriangleOutline
          className="absolute bottom-8 left-16 hidden lg:block"
          size={60}
          color="rgba(255,255,255,0.25)"
        />
        <SmallDot
          className="absolute top-20 left-[30%] hidden lg:block"
          color="rgba(255,255,255,0.4)"
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-text)]/80 text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Don&apos;t Miss Out
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight uppercase tracking-wide text-[var(--brand-text)]">
              Reserve Their Spot
            </h2>
            <p className="mt-6 text-[var(--brand-text)]/80 max-w-md mx-auto leading-relaxed">
              Spots fill up fast. Call today and give your child the safe,
              loving care they deserve at Precious Angels.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15418908696"
                className="inline-flex items-center gap-3 bg-white text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition shadow-lg"
              >
                <Phone className="w-4 h-4" /> Call (541) 890-8696
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-16 bg-[var(--brand-text)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            {/* Circular badge in footer */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--brand-accent)] flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-[9px] font-extrabold text-[var(--brand-text)] uppercase leading-tight text-center tracking-wider">
                  PA
                  <br />
                  LLC
                </span>
              </div>
              <span className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white uppercase tracking-wider">
                Precious Angels LLC
              </span>
            </div>
            <p className="mt-2 text-white/50 text-sm leading-relaxed">
              In-home daycare in Medford, OR where kids are treated
              like family, every single day.
            </p>
            <div className="mt-6 space-y-2 text-white/50 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 3070 Merriman Rd, Medford, OR 97501
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> (541) 890-8696
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-6">
              Explore
            </h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/50 text-sm hover:text-white transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.15em] text-sm mb-6">
              Daycare Hours
            </h4>
            <div className="space-y-2 text-white/50 text-sm font-[family-name:var(--font-mono)]">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Drop-off: 5:30 AM
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Pick-up: 4:30 PM
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Year-Round, Mon – Fri
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-sm text-center">
            &copy; 2026 Precious Angels LLC — In-Home Daycare, Medford, OR. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
