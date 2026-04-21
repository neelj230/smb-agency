// Nails To Tails — Medford, OR — Warm cute editorial
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Star } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Groomers", href: "#groomers" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

const services = [
  {
    n: "01",
    name: "Full Groom & Style",
    copy: "Breed-specific cuts, bath, blow-dry, and finishing — delivered to show-quality standards.",
  },
  {
    n: "02",
    name: "Bath & Blowout",
    copy: "Heavy double coats come out soft as silk. Works on even the most legendary shedders.",
  },
  {
    n: "03",
    name: "Senior Pet Grooming",
    copy: "Slower pace, softer hands. For older dogs who deserve a little extra patience.",
  },
  {
    n: "04",
    name: "Anxiety-Friendly Sessions",
    copy: "We let nervous pups meet the space and the other dogs before a single scissor comes out.",
  },
  {
    n: "05",
    name: "Nail Trim & Paw Care",
    copy: "Precise, quick, gentle — for dogs and cats of every size and attitude.",
  },
  {
    n: "06",
    name: "Indoor Play & Social",
    copy: "Supervised indoor play with agility tunnels. A safe place to burn off real dog energy.",
  },
];

const groomers = [
  {
    name: "Crystal",
    tag: "Regulars & repeat clients",
    pup: "Manny",
    quote: "She always makes him look so handsome — and he&apos;s always happy leaving her chair.",
    by: "Karen Bergren, Manny's owner",
  },
  {
    name: "Ashley",
    tag: "Senior specialist",
    pup: "A 13-year-old pup",
    quote: "Ashley did a fantastic job with my senior dog. He looks amazing.",
    by: "Laina Morris",
  },
  {
    name: "Cody",
    tag: "Anxious & reactive pets",
    pup: "A Shih Tzu from NY",
    quote: "She took extra time to make sure my dog acclimated to the building and the other pups.",
    by: "Carol Kamph, new in town",
  },
];

const bigQuote = {
  lead: "Christine brings her show girl Ruby here and says,",
  text: "Nails to Tails is always a winner.",
  author: "Christine Parker",
  context: "Owner of Ruby · Show-ring regular",
};

const dogNames = [
  "Ruby",
  "Manny",
  "A 9-year-old shedder",
  "A new-to-town Shih Tzu",
  "A senior good boy",
  "A boxer with opinions",
  "A very handsome poodle",
  "Your dog, probably",
];

const contact = {
  address: "2191 Kings Hwy",
  city: "Medford",
  state: "OR",
  zip: "97501",
  phone: "(541) 500-1775",
};

export default function NailsToTails() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col bg-[var(--brand-cream)]">
        <nav className="relative z-50 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex items-center justify-between">
            <a href="#" className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--brand-forest)] tracking-tight">
              Nails <span className="italic font-normal">to</span> Tails
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[var(--brand-ink)]/70 hover:text-[var(--brand-forest)] text-sm transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="tel:+15415001775"
              className="text-[var(--brand-forest)] text-sm font-[family-name:var(--font-mono)] tracking-tight border-b border-[var(--brand-forest)] pb-0.5"
            >
              (541) 500-1775
            </a>
          </div>
        </nav>

        <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-10 lg:py-14 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.p
              className="text-[var(--brand-amber)] text-xs uppercase tracking-[0.35em] mb-8 font-[family-name:var(--font-mono)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Medford, Oregon · Kings Hwy · 7 days a week
            </motion.p>
            <motion.h1
              className="font-[family-name:var(--font-display)] text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.9] tracking-[-0.035em] text-[var(--brand-ink)] font-semibold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Every coat,
              <br />
              <span className="italic font-normal text-[var(--brand-forest)]">every</span> personality.
            </motion.h1>
            <motion.p
              className="mt-10 text-[var(--brand-muted)] text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              A full pet care center in the Rogue Valley — with groomers who know your dog by name and give the nervous ones all the time they need.
            </motion.p>
            <motion.div
              className="mt-12 flex flex-wrap gap-x-10 gap-y-4 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a
                href="tel:+15415001775"
                className="inline-flex items-center gap-3 text-[var(--brand-forest)] text-lg font-[family-name:var(--font-display)] border-b-2 border-[var(--brand-forest)] pb-1 hover:border-[var(--brand-amber)] hover:text-[var(--brand-amber)] transition-colors"
              >
                Book a groom <ArrowUpRight className="w-5 h-5" />
              </a>
              <span className="text-xs text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-wider">
                ★ 5.0 · 41 Google reviews
              </span>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 relative h-[400px] md:h-[560px] overflow-hidden bg-[var(--brand-forest)]"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <img
              src="/photos/photo-8.webp"
              alt="Fluffy white dog relaxing on couch"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 text-[var(--brand-cream)] font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] uppercase flex justify-between">
              <span>No. 01</span>
              <span>After the groom</span>
            </div>
          </motion.div>
        </div>

        {/* dog names marquee */}
        <div className="relative z-10 border-y border-[var(--brand-forest)]/20 overflow-hidden bg-[var(--brand-forest)]">
          <div className="dog-ticker flex gap-12 w-max py-4 px-6">
            {[...dogNames, ...dogNames, ...dogNames].map((m, i) => (
              <span
                key={i}
                className="text-[var(--brand-amber-light)] text-xs font-[family-name:var(--font-mono)] uppercase tracking-[0.3em] whitespace-nowrap"
              >
                ◉ {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG PULL QUOTE ──────────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-cream)]">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-[var(--brand-amber)] text-xs uppercase tracking-[0.35em] mb-10 font-[family-name:var(--font-mono)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ruby's people, on Ruby's grooms
          </motion.p>
          <motion.blockquote
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4.75rem)] leading-[1.05] text-[var(--brand-ink)] tracking-[-0.02em] font-medium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            {bigQuote.lead}
            <br />
            <span className="italic text-[var(--brand-forest)]">&ldquo;{bigQuote.text}&rdquo;</span>
          </motion.blockquote>
          <motion.p
            className="mt-10 text-[var(--brand-muted)] text-sm font-[family-name:var(--font-mono)] tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            — {bigQuote.author} · {bigQuote.context}
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES — editorial list ──────────────────────────────────── */}
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-forest)] text-[var(--brand-cream)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-16 grid md:grid-cols-12 gap-8 items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:col-span-7">
              <p className="text-[var(--brand-amber-light)] text-xs uppercase tracking-[0.35em] mb-6 font-[family-name:var(--font-mono)]">
                What we do
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-medium">
                Six services.
                <br />
                <span className="italic">One chair per pup.</span>
              </h2>
            </div>
            <p className="md:col-span-5 text-[var(--brand-cream)]/70 text-base leading-relaxed max-w-sm">
              Show-ring regulars. Senior dogs. Shedders. Scaredy-pups. Cats too. Tell us what you&apos;re walking in with.
            </p>
          </motion.div>

          <div className="border-t border-[var(--brand-cream)]/15">
            {services.map((s, i) => (
              <motion.div
                key={s.n}
                className="py-7 border-b border-[var(--brand-cream)]/15 grid md:grid-cols-12 gap-6 items-baseline group hover:bg-[var(--brand-cream)]/5 transition-colors px-2 md:px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <span className="md:col-span-1 font-[family-name:var(--font-mono)] text-sm text-[var(--brand-amber-light)]">
                  {s.n}
                </span>
                <h3 className="md:col-span-4 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-medium">
                  {s.name}
                </h3>
                <p className="md:col-span-6 text-[var(--brand-cream)]/75 text-sm leading-relaxed">
                  {s.copy}
                </p>
                <ArrowUpRight className="md:col-span-1 w-5 h-5 text-[var(--brand-amber-light)] justify-self-end opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROOMERS ──────────────────────────────────────────────────── */}
      <section id="groomers" className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-cream)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <p className="text-[var(--brand-amber)] text-xs tracking-[0.35em] uppercase mb-6 font-[family-name:var(--font-mono)]">
                The team
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4rem)] leading-[1.02] text-[var(--brand-ink)] font-medium">
                Three groomers.
                <br />
                <span className="italic">Asked for by name.</span>
              </h2>
            </div>
            <p className="text-[var(--brand-muted)] text-sm md:text-base max-w-sm">
              Every client has their favorite. Request yours when you call.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-[var(--brand-ink)]/15">
            {groomers.map((g, i) => (
              <motion.div
                key={g.name}
                className="py-10 md:py-14 md:px-8 border-b md:border-b-0 md:border-r last:md:border-r-0 border-[var(--brand-ink)]/15"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--brand-amber)] uppercase tracking-[0.3em] mb-6">
                  {g.tag}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--brand-ink)] mb-5 leading-[1] font-medium">
                  {g.name}.
                </h3>
                <p className="text-[var(--brand-muted)] text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider mb-4">
                  Notable client: {g.pup}
                </p>
                <blockquote className="text-[var(--brand-ink)]/80 text-sm leading-relaxed italic font-[family-name:var(--font-display)]"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${g.quote}&rdquo;` }}
                />
                <p className="mt-4 text-[10px] text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-widest uppercase">
                  — {g.by}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO BAND ─────────────────────────────────────────────── */}
      <section className="bg-[var(--brand-forest)]/10 overflow-hidden py-0">
        <div className="flex gap-3 dog-drift w-max">
          {[
            "/photos/photo-1.webp",
            "/photos/photo-7.webp",
            "/photos/photo-2.webp",
            "/photos/photo-9.webp",
            "/photos/photo-3.webp",
            "/photos/photo-4.webp",
            "/photos/photo-6.webp",
            "/photos/photo-10.webp",
            "/photos/photo-1.webp",
            "/photos/photo-7.webp",
            "/photos/photo-2.webp",
            "/photos/photo-9.webp",
            "/photos/photo-3.webp",
            "/photos/photo-4.webp",
            "/photos/photo-6.webp",
            "/photos/photo-10.webp",
          ].map((src, i) => (
            <div key={i} className="h-56 md:h-80 w-72 md:w-96 flex-shrink-0">
              <img src={src} alt="The salon on a regular day" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section id="reviews" className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--brand-amber)] text-xs uppercase tracking-[0.35em] mb-6 font-[family-name:var(--font-mono)]">
              From Medford dog people
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-[var(--brand-ink)] max-w-3xl font-medium">
              Forty-one reviews.
              <br />
              <span className="italic">Every single one, five stars.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                text: "After her bath and blow out, her hair was soft like silk, nails were trimmed, and she smelled like a new dog.",
                author: "MrJdub454",
                context: "9-year-old Shepherd-Husky mix",
              },
              {
                text: "I absolutely love Crystal! She is so good with my dog Manny. She always makes him look so handsome.",
                author: "Karen Bergren",
                context: "Manny's mom",
              },
              {
                text: "Cody did an awesome job cleaning up the mess. She took extra time to make sure my dog acclimated.",
                author: "Carol Kamph",
                context: "Newly relocated from New York",
              },
            ].map((r, i) => (
              <motion.figure
                key={r.author}
                className="bg-white p-8 border-t-2 border-[var(--brand-forest)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-[var(--brand-amber)] text-[var(--brand-amber)]" />
                  ))}
                </div>
                <blockquote className="font-[family-name:var(--font-display)] text-[var(--brand-ink)] text-xl leading-snug italic">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-[var(--brand-ink)]/10">
                  <p className="text-sm text-[var(--brand-ink)] font-medium">{r.author}</p>
                  <p className="text-[10px] text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-widest uppercase mt-1">
                    {r.context}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ─────────────────────────────────────────────── */}
      <section
        id="visit"
        className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-forest)] text-[var(--brand-cream)]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[var(--brand-amber-light)] text-xs uppercase tracking-[0.35em] mb-8 font-[family-name:var(--font-mono)]"
            >
              Bring the dog
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] font-medium">
              Kings Hwy,
              <br />
              <span className="italic text-[var(--brand-amber-light)]">every day.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid md:grid-cols-3 gap-10 font-[family-name:var(--font-mono)]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-amber-light)] mb-3">Phone</p>
              <a
                href="tel:+15415001775"
                className="text-2xl md:text-3xl font-[family-name:var(--font-display)] hover:text-[var(--brand-amber-light)] transition-colors block"
              >
                {contact.phone}
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-amber-light)] mb-3">Find us</p>
              <p className="text-sm leading-relaxed">
                {contact.address}
                <br />
                {contact.city}, {contact.state} {contact.zip}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-amber-light)] mb-3">Hours</p>
              <p className="text-sm leading-relaxed">
                Mon – Sun · 9am – 6pm
                <br />
                Seven days a week
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-5">
            <a
              href="tel:+15415001775"
              className="inline-flex items-center gap-3 bg-[var(--brand-cream)] text-[var(--brand-ink)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-amber-light)] transition"
            >
              <Phone className="w-4 h-4" /> Book a groom
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 lg:px-12 bg-[var(--brand-forest)] text-[var(--brand-cream)]/70 border-t border-[var(--brand-cream)]/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-[family-name:var(--font-mono)] text-xs tracking-wider">
          <p>Nails To Tails · Medford, OR</p>
          <p>© 2026</p>
        </div>
      </footer>

      <ClickToCall phone="(541) 500-1775" />
    </>
  );
}
