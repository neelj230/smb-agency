"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { StickySection } from "@/components/StickySection";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ContactSection } from "@/components/ContactSection";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import type { NavLink, Photo, Review } from "@/components/types";
import { motion } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Visit", href: "#contact" },
];

const reviews: Review[] = [
  {
    text: "I've been coming for 5 years. Never a bad experience. The shop is clean, the staff is polite, and Will makes sure every customer is taken care of. Great location on South Street too.",
    author: "Gerald",
    rating: 5,
    source: "google",
  },
  {
    text: "One of the best atmospheres in Philly. Voshon and Will do a great job cutting hair but you also get the great vibes of barbershop talk. The clientele is diverse — all the barbers can fulfill your needs no matter what style.",
    author: "Lonnie Moore",
    rating: 5,
    source: "google",
  },
  {
    text: "Philly gets my stamp of approval for one of the best cuts in the country. Shon paid attention to the small details and delivered top-quality service. Whether you're local or visiting, this is the place.",
    author: "Cristian Sanchez",
    rating: 5,
    source: "google",
  },
  {
    text: "Bryon is a great barber with excellent technical precision and strong attention to detail. He listens and cuts with confidence. South Street Barbers has a diverse atmosphere that's refreshing and truly noteworthy.",
    author: "DeShawn Seymore",
    rating: 5,
    source: "google",
  },
  {
    text: "Always a wonderful, professional, friendly environment. Will is a master of the craft and runs a great shop full of highly skilled barbers. Best place in Philly for a cut.",
    author: "Zaire Durant-Young",
    rating: 5,
    source: "google",
  },
];

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-3.webp", alt: "Fresh cut", category: "work" },
  { src: "/photos/photo-4.webp", alt: "Precision fade", category: "work" },
  { src: "/photos/photo-5.webp", alt: "Clean lineup", category: "work" },
  { src: "/photos/photo-6.webp", alt: "Detail work", category: "work" },
  { src: "/photos/photo-7.webp", alt: "Styled finish", category: "work" },
  { src: "/photos/photo-8.webp", alt: "Classic cut", category: "work" },
];

const businessContact = {
  name: "South Street Barbers",
  address: "1316 South St",
  city: "Philadelphia",
  state: "PA",
  zip: "19147",
  phone: "(267) 273-1445",
  email: "",
  hours: {
    Monday: "Closed",
    Tuesday: "9 AM – 4 PM",
    Wednesday: "9 AM – 4:30 PM",
    Thursday: "9 AM – 6:30 PM",
    Friday: "9 AM – 6:30 PM",
    Saturday: "9 AM – 6:30 PM",
    Sunday: "9 AM – 5:30 PM",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slowFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1.2 },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────
// NARRATIVE FLOW: Visual portfolio — cinematic hero → marquee → stats → gallery (sticky) → reviews → about → contact
// VIBE: Warm, welcoming, neighborhood institution. Cream/forest green palette.
// Different from barbershop-denim: serif display font, warm earth tones, sticky gallery, no blurred reveal.

export default function SouthStreetBarbersPage() {
  return (
    <>
      <Navbar
        businessName="South Street Barbers"
        links={navLinks}
        ctaText="Book Now"
        ctaHref="http://southstreetbarbers1316.booksy.com/"
      />

      {/* ── HERO: Full-bleed parallax with cinematic text ── */}
      <section className="relative h-screen overflow-hidden">
        <ParallaxImage
          src="/photos/photo-3.webp"
          alt="Barber cutting hair at South Street Barbers"
          speed={0.15}
          overlay
          overlayOpacity={0.55}
          containerClassName="h-full"
        >
          <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs uppercase tracking-[0.4em] text-[#c75b3a] mb-6 font-mono"
            >
              1316 South St &middot; Philadelphia
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-[9rem] font-normal text-white tracking-tight leading-[0.85] italic"
            >
              South Street
              <br />
              Barbers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 text-sm text-white/50 tracking-widest uppercase"
            >
              Every cut, every style &middot; Since day one
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="mt-14 flex gap-4"
            >
              <a
                href="http://southstreetbarbers1316.booksy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[var(--brand-primary)] text-white text-sm font-semibold rounded-full hover:bg-[var(--brand-primary)]/85 transition-colors tracking-wide"
              >
                Book a Cut
              </a>
              <a
                href="tel:+12672731445"
                className="px-8 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors tracking-wide"
              >
                Call Us
              </a>
            </motion.div>
          </div>
        </ParallaxImage>
      </section>

      {/* ── MARQUEE: Services ticker ── */}
      <div className="bg-[var(--brand-accent)] py-1">
        <MarqueeTicker
          items={[
            "Fades",
            "Lineups",
            "Beard Trims",
            "Hot Towel Shaves",
            "Tapers",
            "Kids Cuts",
            "All Textures",
            "Walk-ins Welcome",
          ]}
          separator="✦"
          speed={30}
          className="text-white/70"
        />
      </div>

      {/* ── STATS: Big numbers — social proof hook ── */}
      <section className="py-24 lg:py-32 px-6 bg-[var(--brand-bg-alt)] dot-bg">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10"
          >
            {[
              { target: 419, suffix: "+", label: "Reviews" },
              { target: 4.6, suffix: "★", label: "Rating" },
              { target: 5, suffix: "+", label: "Barbers" },
              { target: 6, suffix: " Days", label: "Open Weekly" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-normal italic text-[var(--brand-primary)]">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </p>
                <p className="mt-3 text-sm text-[var(--brand-muted)] uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY: Sticky section cascade — work photos stack as you scroll ── */}
      <section id="gallery">
        <motion.div {...slowFade} className="py-20 px-6 text-center">
          <div className="brand-hr mx-auto mb-6" />
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal italic">
            The Work
          </h2>
          <p className="mt-4 text-[var(--brand-muted)] text-sm tracking-wide">
            Precision cuts for every texture and style
          </p>
        </motion.div>

        <div className="sticky-stack">
          {galleryPhotos.map((photo, i) => (
            <StickySection key={i} index={i + 1} scaleOnScroll>
              <div className="h-screen flex items-center justify-center px-4 md:px-16 bg-[var(--brand-bg)]">
                <div className="w-full max-w-5xl">
                  <div
                    className={`overflow-hidden rounded-sm ${
                      i % 2 === 0
                        ? "aspect-[16/10]"
                        : "aspect-[4/3] max-w-3xl mx-auto"
                    }`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover image-warm"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 text-xs text-[var(--brand-muted)] tracking-widest uppercase text-center font-mono">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </StickySection>
          ))}
        </div>
      </section>

      {/* ── INTERIOR: Full-width parallax break ── */}
      <section className="relative">
        <ParallaxImage
          src="/photos/photo-2.webp"
          alt="Inside South Street Barbers"
          speed={0.2}
          overlay
          overlayOpacity={0.4}
          containerClassName="h-[60vh] md:h-[70vh]"
        >
          <div className="flex items-center justify-center h-[60vh] md:h-[70vh] px-6">
            <motion.div {...fadeUp} className="text-center text-white max-w-2xl">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal italic leading-tight">
                Good vibes. Great cuts.
              </h2>
              <p className="mt-6 text-base text-white/60 max-w-md mx-auto">
                A diverse shop where every barber can handle every style. Walk in a stranger, leave a regular.
              </p>
            </motion.div>
          </div>
        </ParallaxImage>
      </section>

      {/* ── REVIEWS: Featured testimonials ── */}
      <section id="reviews" className="py-24 lg:py-32">
        <TestimonialCarousel
          heading="From the Chair"
          reviews={reviews}
          variant="featured"
        />
      </section>

      {/* ── ABOUT: Two-column with barber stripe accent ── */}
      <section id="about" className="py-28 lg:py-40 px-6 bg-[var(--brand-bg-alt)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <div className="brand-hr mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal italic leading-[1.1] mb-6">
              The neighborhood chair.
            </h2>
            <div className="barber-stripe pl-6">
              <p className="text-[var(--brand-muted)] leading-relaxed mb-4">
                Will opened South Street Barbers to build something more than a place to get a haircut. He greets every person who walks in, knows most by name, and runs a crew of barbers who take as much pride in conversation as they do in craft.
              </p>
              <p className="text-[var(--brand-muted)] leading-relaxed">
                The clientele is as diverse as the neighborhood. Walk-ins are always welcome, and the shop sits in the heart of South Street — grab a cheesesteak or run errands after your fade.
              </p>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="/photos/photo-9.webp"
                alt="Barbering in action"
                className="w-full h-full object-cover image-warm"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[var(--brand-primary)] text-white px-5 py-3 rounded-sm">
              <p className="font-mono text-xs tracking-wider">EST. SOUTH ST</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES: Minimal grid ── */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <div className="brand-hr mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal italic">
              Services
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Haircut", desc: "All textures and styles" },
              { name: "Fade", desc: "Skin, mid, high, drop" },
              { name: "Lineup", desc: "Sharp edges, clean shape" },
              { name: "Beard Trim", desc: "Sculpted and shaped" },
              { name: "Hot Towel Shave", desc: "Classic straight razor" },
              { name: "Kids Cut", desc: "Patient, friendly service" },
            ].map((service, i) => (
              <motion.div
                key={i}
                className="service-card text-center"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg italic mb-1">
                  {service.name}
                </h3>
                <p className="text-[var(--brand-muted)] text-sm">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOURS: Visual schedule ── */}
      <section className="py-20 px-6 dark-section">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="brand-hr mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal italic mb-12">
              Hours
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(businessContact.hours).map(([day, time]) => (
                <div key={day}>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-mono mb-1">
                    {day.slice(0, 3)}
                  </p>
                  <p className={`text-sm ${time === "Closed" ? "text-white/30" : "text-white/80"}`}>
                    {time}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a
                href="tel:+12672731445"
                className="text-[#c75b3a] font-mono text-sm tracking-wide hover:text-[#c75b3a]/80 transition-colors"
              >
                (267) 273-1445
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <ContactSection
          business={businessContact}
          heading="Find Us"
          showMap={true}
        />
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(267) 273-1445" />
    </>
  );
}
