// REFERENCE: LUXURY CAR RENTAL — dark immersive hero with video BG, red accent, product dashboard cards, scroll cursor, elegant bento benefits, tabbed process, FAQ accordion
"use client";

import type { NavLink } from "@/components/types";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Gauge,
  Cog,
  Fuel,
  Users,
  Shield,
  Clock,
  Star,
  Play,
  Check,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const fleet = [
  {
    brand: "Full Breed",
    model: "Groom",
    price: "Call for Pricing",
    tag: "Popular",
    hp: "Breed-Specific",
    trans: "By Appointment",
    seats: "All Sizes",
    img: "/photos/photo-2.webp",
  },
  {
    brand: "Senior Dog",
    model: "Grooming",
    price: "Call for Pricing",
    tag: null,
    hp: "Extra Gentle",
    trans: "By Appointment",
    seats: "All Ages",
    img: "/photos/photo-4.webp",
  },
  {
    brand: "Bath &",
    model: "Brush Out",
    price: "Call for Pricing",
    tag: null,
    hp: "Squeaky Clean",
    trans: "By Appointment",
    seats: "All Sizes",
    img: "/photos/photo-5.webp",
  },
  {
    brand: "Bandana &",
    model: "Finishing Touches",
    price: "Call for Pricing",
    tag: "Signature",
    hp: "Seasonal Styles",
    trans: "By Appointment",
    seats: "All Sizes",
    img: "/photos/photo-6.webp",
  },
  {
    brand: "Small Dog",
    model: "Specialization",
    price: "Call for Pricing",
    tag: null,
    hp: "Precision Care",
    trans: "By Appointment",
    seats: "Small Breeds",
    img: "/photos/photo-7.webp",
  },
  {
    brand: "Poodle &",
    model: "Doodle Styling",
    price: "Call for Pricing",
    tag: null,
    hp: "Expert Scissor Work",
    trans: "By Appointment",
    seats: "Curly Coats",
    img: "/photos/photo-8.webp",
  },
];

const benefits = [
  {
    title: "Dogs Who Actually Love Coming Here",
    desc: "Amanda's clients don't just leave looking great — they adore coming in. Multiple pet owners have noted their dogs 'absolutely love' Amanda and look forward to every visit.",
    icon: Gauge,
    accent: true,
    img: "/photos/photo-1.webp",
    cta: null,
  },
  {
    title: "Gentle Care for Every Dog",
    desc: "From anxious pups to senior dogs, Amanda's calm touch and patient approach put every animal at ease in a clean, light-filled salon designed for comfort.",
    icon: Shield,
    accent: false,
    img: "/photos/photo-9.webp",
    cta: null,
  },
  {
    title: "Services for Every Breed",
    desc: "Explore a full range of grooming services — from full breed grooms to bath & brush outs — tailored to your dog's unique needs.",
    icon: Users,
    accent: false,
    img: null,
    cta: "See Our Services",
  },
  {
    title: "A Groomer Who Truly Cares",
    desc: "Clients have trusted Amanda with their dogs for years — even across generations. That loyalty says everything about the love and dedication she brings to every groom.",
    icon: Star,
    accent: false,
    img: "/photos/photo-10.webp",
    cta: null,
  },
  {
    title: "Simple, Personal Booking",
    desc: "No big-box chaos. Just a quick call to reserve your dog's appointment with a groomer who will remember their name and personality every time.",
    icon: Clock,
    accent: false,
    img: null,
    cta: "How It Works",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Call to Book",
    desc: "Reach out by phone Monday–Friday, 9 AM–5 PM to schedule your dog's appointment at a time that works for you.",
  },
  {
    num: "02",
    title: "Drop Off Your Pup",
    desc: "Bring your dog to the salon at 1930 Table Rock Rd, Medford. Amanda greets every dog personally to help them feel right at home.",
  },
  {
    num: "03",
    title: "The Full Treatment",
    desc: "Your dog gets a thorough, breed-appropriate groom with all the care and finishing touches that have earned Amanda her five-star reputation.",
  },
  {
    num: "04",
    title: "Pick Up a Happy Pup",
    desc: "Come back to a beautifully groomed, great-smelling dog — often sporting a cute seasonal bandana. Ready to show off.",
  },
];

const testimonials = [
  {
    text: "Amanda is the best! She does an amazing job with how well she grooms my little Scottie. Most importantly, my little guy absolutely adores her and always has such a great time when he visits.",
    author: "joelg1969",
    role: "Happy Pet Parent",
    car: "Full Breed Groom",
    img: "/photos/photo-2.webp",
  },
  {
    text: "Amanda is so amazing at what she does! She has been grooming for my grandma for years now, and we've always been more than happy with not just how good the groom is, but how well she treats the dogs! Now that she's dealing with Abbie in old age, we can really see how much Amanda cares.",
    author: "Averie Aho",
    role: "Longtime Client",
    car: "Senior Dog Grooming",
    img: "/photos/photo-4.webp",
  },
  {
    text: "Thanks for being so patient with our Bella Boo. You alway's make her look soooooo beautiful and she always smells soooo good ♡ your amazing at what you do, it shows you love what you do!! Thank you!!!",
    author: "renee craig",
    role: "Devoted Pet Mom",
    car: "Bath & Brush Out",
    img: "/photos/photo-5.webp",
  },
  {
    text: "Wonderful groomer 🐶❤️",
    author: "Ellie",
    role: "Happy Client",
    car: "Full Breed Groom",
    img: "/photos/photo-6.webp",
  },
];

const faqs = [
  {
    q: "Will my dog actually enjoy being groomed here?",
    a: "That's one of the things Amanda is most known for. Multiple clients have specifically noted that their dogs adore Amanda and look forward to their visits — including one customer whose dog 'always has such a great time.' The calm salon environment and Amanda's gentle approach make a real difference for anxious or hesitant dogs.",
  },
  {
    q: "Do you have experience grooming senior or older dogs?",
    a: "Absolutely. Amanda has a well-established reputation for caring for aging dogs with the extra patience and gentleness they need. One longtime client specifically highlighted how Amanda's love for animals really shows when working with her elderly dog Abbie.",
  },
  {
    q: "How do I book an appointment?",
    a: "Amanda's MVP Grooming is a personal, appointment-based studio. The best way to book is to call directly at (541) 613-5714 during business hours, Monday through Friday, 9:00 AM to 5:00 PM.",
  },
  {
    q: "What makes Amanda's different from a big-box grooming chain?",
    a: "Amanda runs a small, relationship-first grooming studio — not a high-volume shop. She knows her clients by name (and their dogs by personality), and that personal continuity means your pet is never just a number. Clients have stayed with her for years because of this level of care.",
  },
  {
    q: "Are you open on weekends?",
    a: "Amanda's MVP Grooming is currently open Monday through Friday, 9:00 AM to 5:00 PM. The studio is closed on Saturdays and Sundays. It's recommended to book ahead as appointment slots fill quickly.",
  },
  {
    q: "What kinds of dogs do you groom?",
    a: "Amanda works with a wide range of breeds and sizes — from small dogs like Scottish Terriers to Standard Poodles and larger breeds. Her salon photos show experience with everything from curly-coated dogs to short-haired breeds, seniors, and energetic young pups.",
  },
];

const stats = [
  { value: "5★", label: "Perfect Rating Across All Reviews" },
  { value: "8+", label: "Verified Happy Customer Reviews" },
  { value: "5 Days", label: "Available Every Weekday" },
  { value: "100%", label: "Of Reviewers Would Recommend Amanda" },
];

const businessContact = {
  name: "Amanda's MVP Grooming LLC",
  address: "1930 Table Rock Rd",
  city: "Medford",
  state: "OR",
  zip: "97501",
  phone: "(541) 613-5714",
  email: "",
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function RedCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
      style={{
        left: pos.x - 12,
        top: pos.y - 12,
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="w-6 h-6 rounded-full bg-[var(--brand-accent)] opacity-80" />
    </div>
  );
}
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-[var(--brand-border)]"
      {...stagger}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium text-white group-hover:text-[var(--brand-accent)] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--brand-muted)] transition-transform duration-300 ${open ? "rotate-180 text-[var(--brand-accent)]" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[var(--brand-muted)] leading-relaxed max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BusinessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const [activeStep, setActiveStep] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      <RedCursor />

      {/* ── HERO — full viewport, video background with bottom-aligned content ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden bg-black"
      >
        {/* Background video */}
        <div className="absolute inset-0">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/photos/photo-1.webp"
            alt="Amanda's MVP Grooming"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 film-grain" />
        </div>

        {/* ── NAVBAR ── */}
        <nav className="relative z-50 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
            <a
              href="#"
              className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-white"
            >
              Amanda&apos;s <span className="text-[var(--brand-accent)]">MVP</span> Grooming
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#fleet"
              className="group inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Browse Our Services{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </nav>

        {/* ── HERO CONTENT — bottom-aligned, split layout ── */}
        <motion.div
          className="relative z-10 flex-1 flex items-end px-6 lg:px-12 pb-16 lg:pb-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.h1
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white max-w-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Dogs Come Happy, Leave Beautiful
              <br />
              <span className="text-white/60">Grooming They'll Love</span>
            </motion.h1>

            <motion.div
              className="flex flex-col items-start md:items-end gap-4 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <p className="text-white/50 text-sm leading-relaxed md:text-right">
                Every groom starts with Amanda getting to know your dog.
                That&apos;s why pets don&apos;t just leave looking great &mdash;
                they actually love coming here.
              </p>
              <a
                href="#fleet"
                className="group inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/30 pb-1 hover:border-white transition-colors"
              >
                &mdash;&ensp;Browse Our Services{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS BAR — horizontal strip ── */}
      <section className="py-12 px-6 lg:px-12 bg-[var(--brand-bg)] border-y border-[var(--brand-border)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center stat-divider"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-[var(--brand-muted)] text-sm mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURED FLEET — product dashboard cards ── */}
      <section
        id="fleet"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <p className="text-red-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Featured Services
              </p>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
                Discover Our Services
              </h2>
            </div>
            <a
              href="#fleet"
              className="inline-flex items-center gap-2 text-[var(--brand-muted)] hover:text-white text-sm font-medium transition-colors group"
            >
              View All Services{" "}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map((car, i) => (
              <motion.div
                key={car.model}
                className="group relative bg-[var(--brand-bg-card)] rounded-2xl overflow-hidden border border-[var(--brand-border)] hover:border-[var(--brand-accent)]/30 transition-all duration-500 card-shimmer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Car image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${car.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg-card)] via-transparent to-transparent" />
                  {car.tag && (
                    <span className="absolute top-4 right-4 bg-[var(--brand-accent)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {car.tag}
                    </span>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--brand-accent)]/0 group-hover:bg-[var(--brand-accent)]/10 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Car info — dashboard style */}
                <div className="p-6">
                  <p className="text-[var(--brand-muted)] text-xs uppercase tracking-wider mb-1">
                    {car.brand}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {car.model}
                  </h3>

                  <div className="flex items-end justify-between mb-5">
                    <div>
                      <span className="text-2xl font-bold text-white">
                        {car.price}
                      </span>
                      <span className="text-[var(--brand-muted)] text-sm ml-1">

                      </span>
                    </div>
                  </div>

                  {/* Specs row */}
                  <div className="flex gap-4 pt-4 border-t border-[var(--brand-border)]">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                      <span className="text-xs text-[var(--brand-muted)]">
                        {car.hp}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Cog className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                      <span className="text-xs text-[var(--brand-muted)]">
                        {car.trans}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                      <span className="text-xs text-[var(--brand-muted)]">
                        {car.seats}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS — photo bento grid matching Framer original ── */}
      <section
        id="benefits"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <p className="text-red-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Redefining the way
              </p>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
                you experience grooming
              </h2>
            </div>
            <a
              href="#process"
              className="inline-flex items-center gap-2 text-[var(--brand-muted)] hover:text-white text-sm font-medium transition-colors group"
            >
              Learn More About Us{" "}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Bento grid — photo-rich modular layout */}
          <div className="grid md:grid-cols-12 gap-4">
            {/* Row 1: Large photo card spanning 7 cols + text card 5 cols */}
            <motion.div
              className="relative md:col-span-7 rounded-2xl overflow-hidden group min-h-[320px]"
              {...stagger}
              transition={{ duration: 0.6 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${benefits[0].img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-xs">
                  {benefits[0].title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm mt-auto">
                  {benefits[0].desc}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-5 grid grid-rows-2 gap-4"
              {...stagger}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Freedom of Choice — text card */}
              <div className="bg-[var(--brand-bg-card)] rounded-2xl p-7 border border-[var(--brand-border)] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {benefits[2].title}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                    {benefits[2].desc}
                  </p>
                </div>
                <a
                  href="#fleet"
                  className="inline-flex items-center gap-2 text-red-400 text-sm font-medium mt-4 group"
                >
                  {benefits[2].cta}{" "}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              {/* Stress-Free Service — photo card */}
              <div className="relative rounded-2xl overflow-hidden group min-h-[150px]">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${benefits[3].img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-7">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {benefits[3].title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {benefits[3].desc}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Row 2: Comfort photo card + Seamless Process text card + About values CTA */}
            <motion.div
              className="relative md:col-span-4 rounded-2xl overflow-hidden group min-h-[260px]"
              {...stagger}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${benefits[1].img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-7">
                <h3 className="text-lg font-bold text-white mb-1">
                  {benefits[1].title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {benefits[1].desc}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-4 bg-[var(--brand-bg-card)] rounded-2xl p-7 border border-[var(--brand-border)] flex flex-col justify-between"
              {...stagger}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {benefits[4].title}
                </h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {benefits[4].desc}
                </p>
              </div>
              <a
                href="#process"
                className="inline-flex items-center gap-2 text-red-400 text-sm font-medium mt-6 group"
              >
                {benefits[4].cta}{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              className="md:col-span-4 bg-[var(--brand-bg-card)] rounded-2xl p-7 border border-[var(--brand-border)] flex flex-col justify-end"
              {...stagger}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#process"
                className="group inline-flex items-center gap-2 text-white text-sm font-semibold hover:text-[var(--brand-accent)] transition-colors"
              >
                About Our Approach{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--brand-accent)]" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE — brand names scrolling ── */}
      <section className="py-10 bg-[var(--brand-bg)] border-y border-[var(--brand-border)] overflow-hidden">
        <div className="fleet-marquee flex gap-16 w-max items-center">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-16 items-center">
              {[
                "FULL BREED GROOM",
                "SENIOR DOG CARE",
                "BATH & BRUSH",
                "BANDANA FINISH",
                "SMALL DOG SPECIALIST",
                "POODLE STYLING",
                "DOODLE CUTS",
                "SCOTTIE TERRIERS",
              ].map((brand) => (
                <span
                  key={`${setIndex}-${brand}`}
                  className="text-white/10 text-2xl md:text-3xl font-bold tracking-[0.15em] whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS — interactive showcase with car images ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <motion.div
            {...fadeUp}
            className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-12"
          >
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight max-w-md">
              Grooms That Speak
              <br />
              for Themselves
            </h2>
            <div className="max-w-sm">
              <p className="text-[var(--brand-muted)] text-sm leading-relaxed mb-4">
                Our clients don&apos;t just get a grooming appointment &mdash; their
                dogs genuinely look forward to visiting. Here&apos;s what they say.
              </p>
              <a
                href="#fleet"
                className="group inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/30 pb-1 hover:border-white transition-colors"
              >
                &mdash;&ensp;Start Your Journey{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Testimonial selector dots */}
          <div className="flex gap-3 mb-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeTestimonial
                    ? "bg-[var(--brand-accent)] scale-125"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Active testimonial — quote + car image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-[500px]"
            >
              {/* Car image background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${testimonials[activeTestimonial].img})`,
                }}
              />
              {/* Gradient overlays for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Quote content — bottom left */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12 max-w-xl">
                <div className="text-[var(--brand-accent)] text-5xl font-bold leading-none mb-4">
                  &ldquo;&ldquo;
                </div>
                <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-6 font-light italic">
                  {testimonials[activeTestimonial].text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[var(--brand-accent)] rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonials[activeTestimonial].author}
                    </p>
                    <p className="text-xs text-white/50">
                      {testimonials[activeTestimonial].role} &middot;{" "}
                      {testimonials[activeTestimonial].car}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── PROCESS — tabbed interactive section ── */}
      <section
        id="process"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-red-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              How It Works
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
              Love of Grooming
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-md mx-auto">
              Your perfect groom is just a few simple steps away.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Tab buttons */}
            <div className="space-y-3">
              {processSteps.map((step, i) => (
                <motion.button
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                    activeStep === i
                      ? "bg-[var(--brand-bg-card)] border-[var(--brand-accent)]/30 red-glow"
                      : "bg-transparent border-[var(--brand-border)] hover:border-[var(--brand-accent)]/10"
                  }`}
                  {...stagger}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-sm font-bold transition-colors ${activeStep === i ? "text-red-400" : "text-[var(--brand-muted)]"}`}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className={`text-lg font-bold transition-colors ${activeStep === i ? "text-white" : "text-white/60"}`}
                      >
                        {step.title}
                      </h3>
                      <AnimatePresence mode="wait">
                        {activeStep === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-[var(--brand-muted)] text-sm leading-relaxed mt-2"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Visual side */}
            <motion.div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--brand-border)]"
              {...fadeUp}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `url(${
                    [
                      "/photos/photo-1.webp",
                      "/photos/photo-3.webp",
                      "/photos/photo-5.webp",
                      "/photos/photo-9.webp",
                    ][activeStep]
                  })`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold text-[var(--brand-accent)]">
                    {processSteps[activeStep].num}
                  </span>
                  <div>
                    <p className="text-white font-bold text-lg">
                      {processSteps[activeStep].title}
                    </p>
                    <p className="text-white/50 text-sm">
                      Step {activeStep + 1} of 4
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-red-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              FAQ
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Your Questions—Answered
            </h2>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <p className="text-[var(--brand-muted)] mb-4">
              Still have questions?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-accent)] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--brand-accent-light)] transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 lg:py-40 px-6 lg:px-12 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/photos/photo-1.webp)",
          }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 film-grain" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-[0.95] tracking-tight"
            {...fadeUp}
          >
            Ready to Book
            <br />
            Your Groom?
          </motion.h2>
          <motion.p
            className="mt-6 text-white/50 max-w-md mx-auto leading-relaxed"
            {...fadeUp}
          >
            Easy scheduling, expert grooming, and a happy pup awaits.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeUp}
          >
            <a
              href="#fleet"
              className="group inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[var(--brand-accent-light)] transition-all"
            >
              Browse Our Services{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+15416135714"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/5 transition-all backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" /> (541) 613-5714
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 lg:px-12 bg-[var(--brand-bg)] border-t border-[var(--brand-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                Amanda&apos;s <span className="text-[var(--brand-accent)]">MVP</span> Grooming
              </span>
              <p className="mt-5 text-[var(--brand-muted)] text-sm leading-relaxed max-w-sm">
                Where dogs come happy and leave beautiful. A relationship-first grooming studio in Medford, Oregon.
              </p>
              <div className="mt-6 flex gap-3">
                {["Facebook", "Instagram", "YouTube", "X"].map((social) => (
                  <span
                    key={social}
                    className="w-9 h-9 rounded-full bg-[var(--brand-bg-card)] border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-muted)] hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)]/30 transition-colors text-xs font-bold cursor-pointer"
                  >
                    {social[0]}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-[var(--brand-muted)] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <div className="space-y-3 text-[var(--brand-muted)] text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 text-[var(--brand-accent)]" />{" "}
                  {businessContact.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-[var(--brand-accent)]" />{" "}
                  {businessContact.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0 text-[var(--brand-accent)]" />{" "}
                  {businessContact.email}
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-[var(--brand-border)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--brand-muted)]/50 text-sm">
              &copy; 2026 Amanda&apos;s MVP Grooming LLC. All rights reserved.
            </p>
            <a
              href="#"
              className="text-[var(--brand-muted)]/50 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
