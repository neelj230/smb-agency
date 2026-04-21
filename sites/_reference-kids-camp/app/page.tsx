// REFERENCE: KIDS SUMMER CAMP — SunTrail Framer template reproduction
// Warm playful design, ALL-CAPS headings, decorative SVG circles/triangles, gallery collage, counselor cards, event details, news
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";

// ─── DECORATIVE SVG COMPONENTS ─────────────────────────────────────────────

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

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "EVENTS", href: "#events" },
  { label: "ACTIVITIES", href: "#activities" },
  { label: "GALLERY", href: "#gallery" },
  { label: "NEWS", href: "#news" },
];

const activities = [
  {
    name: "SPORTS",
    description:
      "Soccer, archery, capture the flag, and friendly camp competitions that build teamwork and confidence.",
    image: "from-emerald-300 to-green-500",
  },
  {
    name: "GAMES",
    description:
      "Classic camp games, treasure hunts, relay races, and evening fun that keep campers laughing all day.",
    image: "from-amber-300 to-orange-500",
  },
  {
    name: "SWIMMING",
    description:
      "Supervised pool and lake time with certified lifeguards. Water games and swimming lessons included.",
    image: "from-sky-300 to-blue-500",
  },
  {
    name: "ARTS & CRAFTS",
    description:
      "Painting, pottery, tie-dye, and creative projects kids proudly take home at the end of each session.",
    image: "from-rose-300 to-pink-500",
  },
];

const counselors = [
  {
    name: "Maya Johnson",
    role: "Head Counselor",
    image: "from-amber-200 to-orange-300",
  },
  {
    name: "Carlos Rivera",
    role: "Activities Director",
    image: "from-sky-200 to-blue-300",
  },
  {
    name: "Priya Patel",
    role: "Arts Lead",
    image: "from-emerald-200 to-green-300",
  },
  {
    name: "Jake Thompson",
    role: "Nature Guide",
    image: "from-violet-200 to-purple-300",
  },
];

const events = [
  {
    date: "JUN 16",
    name: "FIRST DAY OF SUMMER CAMP",
    time: "8:00 AM – 4:30 PM",
    description:
      "Session 1 kicks off with the opening ceremony, cabin assignments, and the first campfire night.",
  },
  {
    date: "JUL 4",
    name: "INDEPENDENCE DAY CELEBRATION",
    time: "6:00 PM – 10:00 PM",
    description:
      "Fireworks viewing, BBQ cookout, red-white-blue relay races, and s'mores under the stars.",
  },
  {
    date: "JUL 18",
    name: "CAMP TALENT SHOW",
    time: "7:00 PM – 9:00 PM",
    description:
      "Campers showcase singing, comedy, dance, and magic tricks for families and fellow campers.",
  },
  {
    date: "AUG 15",
    name: "CLOSING CEREMONY",
    time: "2:00 PM – 5:00 PM",
    description:
      "Awards, slide show of summer memories, farewell songs, and see-you-next-year hugs.",
  },
];

const galleryItems = [
  { bg: "from-amber-200 to-orange-300", label: "Lake swimming" },
  { bg: "from-green-200 to-emerald-400", label: "Forest hike" },
  { bg: "from-sky-200 to-blue-400", label: "Arts & crafts" },
  { bg: "from-yellow-200 to-amber-400", label: "Campfire night" },
  { bg: "from-rose-200 to-pink-400", label: "Sports day" },
  { bg: "from-violet-200 to-purple-400", label: "Nature study" },
  { bg: "from-teal-200 to-cyan-400", label: "Canoe race" },
  { bg: "from-orange-200 to-red-400", label: "Talent show" },
];

const newsItems = [
  {
    date: "MAR 15, 2026",
    title: "REGISTRATION NOW OPEN FOR SUMMER 2026",
    excerpt:
      "Spots are filling fast — secure your child's adventure before sessions sell out.",
  },
  {
    date: "FEB 28, 2026",
    title: "NEW ROCK CLIMBING WALL INSTALLED",
    excerpt:
      "A 30-foot climbing wall joins our outdoor facilities this summer, with routes for all skill levels.",
  },
  {
    date: "JAN 10, 2026",
    title: "CAMP SUNTRAIL WINS BEST CAMP AWARD",
    excerpt:
      "Named top summer camp in the region by Philadelphia Family Magazine for the third consecutive year.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function SunTrailPage() {
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
            <span className="font-[family-name:var(--font-display)] text-[9px] font-extrabold text-white uppercase leading-tight text-center tracking-wider">
              SUN
              <br />
              TRAIL
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
              Register Now
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
            <motion.h1
              className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,7vw,4.5rem)] font-extrabold text-[var(--brand-text)] leading-[1.08] tracking-[-0.01em] uppercase"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to Our
              <br />
              Summer Camp!
            </motion.h1>

            <motion.p
              className="mt-6 text-[var(--brand-muted)] text-lg leading-relaxed max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Two weeks of swimming, hiking, campfires, and friendships that
              last a lifetime. Ages 6 to 14.
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
                Register Now <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#events"
                className="inline-flex items-center gap-3 border-2 border-[var(--brand-text)] text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[var(--brand-text)] hover:text-white transition"
              >
                View Events
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
              Upcoming Events
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4.5vw,2.4rem)] font-extrabold leading-tight text-white uppercase tracking-wide">
              Don&apos;t Miss the First Day
              <br />
              of Summer Camp!
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
              The Mission Behind
              <br />
              Every Summer
            </h2>
            <p className="mt-8 text-[var(--brand-muted)] text-base leading-relaxed max-w-2xl mx-auto">
              SunTrail was founded on a simple belief: every child deserves a
              summer spent outdoors, making friends, and discovering what
              they&apos;re capable of. Our 40-acre property in Chester County
              provides the perfect backdrop for adventure — from forest trails
              and a freshwater lake to art studios and sports fields.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { stat: "12+", label: "Years Running" },
              { stat: "500+", label: "Happy Campers" },
              { stat: "40", label: "Acres of Nature" },
              { stat: "4.9", label: "Parent Rating" },
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
              Explore Our Activities
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
                <div
                  className={`aspect-[16/9] bg-gradient-to-br ${activity.image} relative overflow-hidden`}
                >
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
              We believe that summer camp is more than activities and games.
              It&apos;s where children learn resilience, develop independence,
              and form bonds that last far beyond the final campfire.
            </p>
            <p className="mt-4 text-[var(--brand-muted)] text-base leading-relaxed">
              Every counselor, every program, and every tradition at SunTrail is
              designed to help kids grow — not just as campers, but as people.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="aspect-[4/3] bg-gradient-to-br from-amber-100 via-orange-200 to-yellow-300 rounded-2xl relative overflow-hidden"
          >
            {/* Decorative overlay elements */}
            <TriangleOutline
              className="absolute top-6 right-6"
              size={40}
              color="rgba(255,255,255,0.6)"
            />
            <CircleOutline
              className="absolute bottom-8 left-8"
              size={50}
              color="rgba(255,255,255,0.5)"
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
              Meet Our Leadership
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
                <div
                  className={`aspect-[3/4] bg-gradient-to-br ${person.image} relative overflow-hidden`}
                >
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
              Memories
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-tight uppercase tracking-wide max-w-2xl mx-auto">
              Gallery of Smiles, Sun, and Summer Camp Adventures
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="gallery-collage">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-gradient-to-br ${item.bg} overflow-hidden relative group`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section
        id="news"
        className="py-24 lg:py-32 px-6 lg:px-16 bg-[var(--brand-bg-alt)] relative"
      >
        <TriangleOutline
          className="absolute top-20 left-12 hidden lg:block"
          size={45}
          color="#C4A84D"
        />
        <CircleOutline
          className="absolute bottom-16 right-16 hidden lg:block"
          size={70}
          color="#8B9E6B"
        />

        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-primary)] text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Updates
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,2.9rem)] font-extrabold leading-tight uppercase tracking-wide">
              Our Latest News
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((item, i) => (
              <motion.div
                key={item.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-100 to-sky-200 relative" />
                <div className="p-6">
                  <span className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.15em]">
                    {item.date}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-wide mt-2 group-hover:text-[var(--brand-primary)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm mt-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[var(--brand-primary)] text-sm font-bold uppercase tracking-wider mt-4 hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
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
            <p className="text-white/80 text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Don&apos;t Miss Out
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight uppercase tracking-wide text-white">
              Reserve Their Spot
            </h2>
            <p className="mt-6 text-white/80 max-w-md mx-auto leading-relaxed">
              Sessions fill up fast. Register today and give your child a summer
              they&apos;ll never forget.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+12155550199"
                className="inline-flex items-center gap-3 bg-white text-[var(--brand-text)] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-100 transition shadow-lg"
              >
                <Phone className="w-4 h-4" /> Call to Register
              </a>
              <a
                href="mailto:hello@suntrailcamp.com"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-[var(--brand-text)] transition"
              >
                <Mail className="w-4 h-4" /> Email Us
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
                <span className="font-[family-name:var(--font-display)] text-[8px] font-extrabold text-white uppercase leading-tight text-center tracking-wider">
                  SUN
                  <br />
                  TRAIL
                </span>
              </div>
              <span className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white uppercase tracking-wider">
                SunTrail
              </span>
            </div>
            <p className="mt-2 text-white/50 text-sm leading-relaxed">
              Building confidence, friendships, and memories in the great
              outdoors since 2014.
            </p>
            <div className="mt-6 space-y-2 text-white/50 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 142 Pine Valley Road, Chester
                County, PA
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> (215) 555-0199
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> hello@suntrailcamp.com
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
              Camp Hours
            </h4>
            <div className="space-y-2 text-white/50 text-sm font-[family-name:var(--font-mono)]">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Drop-off: 8:00 AM
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Pick-up: 4:30 PM
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Jun – Aug, Mon – Fri
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-sm text-center">
            &copy; 2026 SunTrail Summer Camp. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
