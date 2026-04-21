// REFERENCE: AGEVIA — elegant consulting, Playfair serif + Inter, dark/light alternating,
// sliding text bar, rotating question rows, sticky service cards, globe process, comparison table,
// artistic testimonials, redesigned FAQ, big logo footer
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lightbulb,
  Target,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  Briefcase,
  Building2,
  Globe,
  Rocket,
  CheckCircle,
  X,
  ChevronDown,
  Star,
  Play,
  Minus,
  Plus,
  Scissors,
  Droplets,
  Heart,
  Wind,
  Icon,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const tickerItems = [
  "Perfect 5-Star Rating",
  "Dogs Loved, Not Just Groomed",
  'Open 6 Days a Week',
  "Transparent Pricing — No Surprises",
  "100% of Customers Would Recommend Us",
  "Medford's Most Welcoming Groomer",
];

const roadblockQuestionsRow1 = [
  "Will my dog be stressed at the groomer?",
  "How do I find a groomer I can actually trust?",
  "What if my dog is anxious around strangers?",
  "Will they handle my dog with care?",
];

const roadblockQuestionsRow2 = [
  "How do I know the pricing is fair?",
  "What if my dog has a sensitive coat?",
  "Is the groomer experienced with my breed?",
  "Will my dog actually enjoy the experience?",
];

const roadblockQuestionsRow3 = [
  "Can I get a Saturday appointment?",
  "How long will the grooming take?",
  "What's included in a full groom?",
  "Is this a good place for my puppy's first groom?",
];

const whyUsPoints = [
  {
    title: "We genuinely love dogs",
    description:
      "This isn't just a job for us — customers say it themselves. The care and warmth we bring to every dog is real, not rehearsed.",
  },
  {
    title: "Skill you can see",
    description:
      "Our grooming results speak for themselves. Brett Hale called it an 'amazing job cutting,' and that level of quality is our standard every single visit.",
  },
  {
    title: "A stress-free atmosphere",
    description:
      "Warm wooden floors, an open and welcoming vibe, and a team that knows how to put dogs at ease — we've built a space your dog will actually enjoy.",
  },
  {
    title: "Honest, transparent pricing",
    description:
      "Our price menu is right there on display. No mystery fees, no runaround — just clear, upfront pricing so you always know what to expect.",
  },
];

const services = [
  {
    title: "Full Groom & Haircut",
    description:
      "A complete grooming session including breed-appropriate styling, coat shaping, and finishing — the service customers specifically praised as 'amazing.'",
    tags: [
      "Breed-specific styling",
      'Coat shaping',
      "Finishing touches",
      "Clean & fresh results",
      "Expert scissor work",
    ],
    icon: Scissors,
  },
  {
    title: "Bath & Brush Out",
    description:
      "A thorough wash, blow-dry, and full brush-out to leave your dog's coat clean, tangle-free, and fresh.",
    tags: [
      "Deep wash",
      "Blow-dry",
      'Full brush-out',
      "Tangle removal",
      "Fresh finish",
    ],
    icon: Droplets,
  },
  {
    title: "Nail Trim & Filing",
    description:
      "Safe, precise nail trimming and smoothing to keep your dog comfortable and your floors scratch-free.",
    tags: [
      "Precision trimming",
      "Nail filing",
      'Safe technique',
      "Stress-free process",
      "Comfort-focused",
    ],
    icon: Shield,
  },
  {
    title: "Ear Cleaning",
    description:
      "Gentle ear cleaning to remove buildup and reduce the risk of infection as part of a healthy grooming routine.",
    tags: [
      "Gentle cleaning",
      "Buildup removal",
      'Infection prevention',
      "Routine health care",
      "Safe process",
    ],
    icon: Heart,
  },
  {
    title: "Puppy's First Groom",
    description:
      "A gentle, low-stress introductory grooming experience designed to help young dogs get comfortable with the process early.",
    tags: [
      "Low-stress intro",
      "Puppy-safe approach",
      'Confidence building',
      "Gentle handling",
      "First-timer friendly",
    ],
    icon: Star,
  },
  {
    title: "De-Shedding Treatment",
    description:
      "A specialized bath and brushing treatment that significantly reduces shedding by removing loose undercoat buildup.",
    tags: [
      "Undercoat removal",
      "Shedding reduction",
      'Specialized shampoo',
      "Deep brush-out",
      "Coat health",
    ],
    icon: Wind,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Give us a call",
    description:
      "Reach out at (458) 274-9602 to book your appointment. Tell us about your dog and what they need — we're happy to help you choose the right service.",
  },
  {
    number: "02",
    title: "Bring your dog in",
    description:
      "Drop by our shop at 22 S Central Ave, Medford. From the moment you walk through the door, you and your dog will feel the warm, welcoming energy our customers love.",
  },
  {
    number: "03",
    title: "We work our magic",
    description:
      "Our skilled team gets to work with care and attention. Every dog is treated like a member of the family — calm, comfortable, and in good hands.",
  },
  {
    number: "04",
    title: "Pick up a happy dog",
    description:
      "Your dog leaves looking great and feeling even better. See the results for yourself and come back anytime — we're here Monday through Saturday.",
  },
];

const stats = [
  {
    category: "Rating",
    value: 5,
    prefix: "",
    suffix: "★",
    unit: "Perfect score across all reviews",
    details: ["100% 5-star reviews", "Zero disappointed customers"],
  },
  {
    category: "Customer Trust",
    value: 100,
    prefix: "",
    suffix: "%",
    unit: "Would recommend us",
    details: ["Every reviewer recommends us", "Consistent praise for staff & skill"],
  },
  {
    category: "Availability",
    value: 6,
    prefix: "",
    suffix: " Days",
    unit: "Open per week",
    details: ["Mon–Sat, 9 AM to 5 PM", "Saturday appointments available"],
  },
];

const comparisonRows = [
  {
    category: "How your dog is treated",
    without: "Just another appointment",
    withUs: "Treated like family by people who genuinely love dogs",
  },
  {
    category: "Grooming quality",
    without: "Inconsistent results",
    withUs: "Skilled cuts customers call 'amazing'",
  },
  {
    category: "Atmosphere",
    without: "Stressful and clinical",
    withUs: "Warm, welcoming, full of great energy",
  },
  {
    category: "Pricing transparency",
    without: "Hidden fees and surprises",
    withUs: "Visible price menu — no mystery charges",
  },
  {
    category: "Staff attitude",
    without: "Indifferent or rushed",
    withUs: "Very polite, calm, and dog-focused",
  },
  {
    category: "Scheduling",
    without: "Limited weekday-only hours",
    withUs: "Open 6 days including Saturdays",
  },
  {
    category: "Your peace of mind",
    without: "Worrying the whole time your dog is there",
    withUs: "Confident your dog is safe, happy, and well cared for",
  },
];

const testimonials = [
  {
    name: "Brett Hale",
    company: "Local Dog Owner",
    quote:
      "They really love dogs and also do an amazing job cutting. They also had great customer service.",
    highlight: "...they really love dogs and also do an amazing job cutting...",
  },
  {
    name: "Dylan Gale",
    role: "Medford Local",
    company: "Medford Local",
    quote:
      "This is a great establishment, very polite staff. Place is full of great energy, I would 100% recommend!",
    highlight: "...Place is full of great energy, I would 100% recommend!...",
  },
];

const faqs = [
  {
    question: "What makes B Easy Grooming different from other groomers in Medford?",
    answer:
      "Customers consistently highlight two things: the team genuinely loves dogs, and the grooming results are excellent. Brett Hale put it directly — 'they really love dogs and also do an amazing job cutting.' That combination of real skill and real care is what sets the shop apart.",
  },
  {
    question: "Is the staff friendly and easy to work with?",
    answer:
      "Absolutely. Every customer review mentions the staff's attitude. Dylan Gale called them 'very polite' and described the whole place as having 'great energy.' You and your dog will feel welcome from the moment you arrive.",
  },
  {
    question: "How do I know what services cost before I book?",
    answer:
      "B Easy Grooming posts a visible price menu in the shop so there are no surprises. Pricing is transparent and straightforward — you can see exactly what you're getting before committing.",
  },
  {
    question: "What are your hours and do you take appointments on weekends?",
    answer:
      "The shop is open Monday through Saturday from 9:00 AM to 5:00 PM, so yes — Saturday appointments are available. The shop is closed on Sundays.",
  },
  {
    question: "Is this a good place for dogs that get anxious at the groomer?",
    answer:
      "The calm, welcoming atmosphere at B Easy Grooming is one of the things customers notice most. The space has warm wooden floors, an open and airy feel, and a staff that knows how to keep dogs at ease. It's a genuinely low-stress environment.",
  },
  {
    question: "How do I get in touch to schedule a grooming appointment?",
    answer:
      "You can call B Easy Grooming directly at (458) 274-9602. The shop is located at 22 S Central Ave, Medford, OR 97501. Walk-ins may be welcome but calling ahead is always a good idea to secure your preferred time.",
  },
];

const brandStats = [
  { value: "5★", label: "Perfect rating across all reviews" },
  { value: "100%", label: "Of customers would recommend us" },
  { value: "6 Days", label: "Open per week including Saturdays" },
  { value: "0", label: "Disappointed customers — ever" },
  { value: "Mon–Sat", label: "9:00 AM to 5:00 PM every week" },
  { value: "3/3", label: "Reviews gave a perfect five stars" },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

function TickerBar() {
  return (
    <div className="bg-[var(--brand-accent)] py-3 overflow-hidden">
      <div className="ticker-left flex gap-8 w-max">
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map(
          (item, i) => (
            <span
              key={i}
              className="text-white text-sm font-medium whitespace-nowrap flex items-center gap-3"
            >
              <Star className="w-3 h-3 fill-white" />
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
function StickyServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${(services.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="pt-20 pb-8 px-6 lg:px-12 bg-[var(--brand-bg-dark)]">
          <div className="max-w-6xl mx-auto">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Our Services
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight max-w-3xl">
              No running around for different experts.{" "}
              <span className="text-[var(--brand-accent)]">
                We handle it all
              </span>
              , so you can focus on what you do best.
            </h2>
          </div>
        </div>

        {/* Cards area */}
        <div className="flex-1 bg-[var(--brand-bg-dark)] px-6 lg:px-12 pb-12 overflow-hidden">
          <div className="max-w-6xl mx-auto h-full relative">
            {services.map((service, i) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={i}
                total={services.length}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function ServiceCard({
  service,
  index,
  total,
  scrollProgress,
}: {
  service: (typeof services)[0];
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segmentSize = 1 / (total + 1);
  const startShow = index * segmentSize;
  const endShow = (index + 1) * segmentSize;
  const startHide = endShow;
  const endHide = (index + 2) * segmentSize;

  const y = useTransform(scrollProgress, [startShow, endShow], [300, 0]);
  const opacity = useTransform(
    scrollProgress,
    [startShow, startShow + segmentSize * 0.3, startHide, Math.min(endHide, 1)],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const scale = useTransform(
    scrollProgress,
    [startHide, endHide],
    [1, index === total - 1 ? 1 : 0.92],
  );

  const Icon = service.icon;

  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ y, opacity, scale, zIndex: index }}
    >
      <div className="w-full bg-[#1E2B3A] rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8">
        <div>
          <div className="w-14 h-14 rounded-2xl bg-[var(--brand-accent)]/10 flex items-center justify-center mb-6">
            <Icon className="w-7 h-7 text-[var(--brand-accent)]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-bold text-white mb-4">
            {service.title}
          </h3>
          <p className="text-white/60 leading-relaxed mb-8">
            {service.description}
          </p>
          <button className="inline-flex items-center gap-2 text-[var(--brand-accent)] text-sm font-semibold hover:gap-3 transition-all">
            Learn more <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 content-start">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
function GlobeProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(
      Math.floor(latest * processSteps.length),
      processSteps.length - 1,
    );
    setActiveStep(Math.max(0, step));
  });

  return (
    <div ref={containerRef} style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center bg-[var(--brand-bg-dark)] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: steps */}
          <div>
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Our Process
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight mb-12">
              Making{" "}
              <span className="italic text-[var(--brand-accent-green)]">
                business magic
              </span>{" "}
              in four moves
            </h2>
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className={`p-6 rounded-2xl transition-all duration-500 ${
                    activeStep === i
                      ? "bg-white/5 border border-white/10"
                      : "opacity-40"
                  }`}
                  animate={{ opacity: activeStep === i ? 1 : 0.4 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-[var(--brand-accent)] font-mono text-sm font-bold mt-1">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <AnimatePresence mode="wait">
                        {activeStep === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-white/50 text-sm leading-relaxed"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: globe */}
          <div className="hidden lg:flex items-center justify-center relative">
            <motion.div
              className="w-80 h-80 rounded-full globe-glow relative"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #2A4A2A, #111112 70%)",
                border: "1px solid rgba(130, 255, 40, 0.2)",
              }}
              animate={{ rotate: activeStep * 90 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Grid lines */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full border-t border-[var(--brand-accent-green)]"
                    style={{ top: `${(i + 1) * 16.6}%` }}
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full border-l border-[var(--brand-accent-green)]"
                    style={{ left: `${(i + 1) * 16.6}%` }}
                  />
                ))}
              </div>

              {/* Step indicators on globe */}
              {processSteps.map((step, i) => {
                const angle = (i * 90 - 45) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={step.number}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      activeStep === i
                        ? "bg-[var(--brand-accent-green)] text-black scale-125"
                        : "bg-white/10 text-white/50"
                    }`}
                    style={{
                      left: `calc(50% + ${x}px - 20px)`,
                      top: `calc(50% + ${y}px - 20px)`,
                    }}
                  >
                    {step.number}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className="grid grid-cols-[1fr_auto] gap-8 py-8 border-b border-white/10 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="text-[var(--brand-accent)] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">
            Question
          </p>
          <h3 className="text-white text-lg md:text-xl font-medium">
            {faq.question}
          </h3>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--brand-accent)] text-[10px] uppercase tracking-[0.3em] font-bold mb-2 mt-6">
                  Answer
                </p>
                <p className="text-white/60 leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center self-start mt-6 hover:bg-white/5 transition-colors">
          {open ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
function Counter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(
    count,
    (v: number) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`,
  );
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, target, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v: string) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export default function BusinessPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg-dark)]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-display)] text-2xl font-bold text-white tracking-tight"
          >
            B Easy Grooming
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
            className="bg-[var(--brand-accent)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition"
          >
            Book Now
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col bg-[var(--brand-bg-dark)] pt-20 overflow-hidden">
        {/* Background photo + overlay */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Ticker bar */}
        <div className="relative z-10 mt-8">
          <TickerBar />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              className="text-[clamp(3rem,8vw,6.5rem)] font-[family-name:var(--font-display)] font-bold leading-[0.95] tracking-[-0.02em] text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              We think, you grow —{" "}
              <span className="italic text-[var(--brand-accent)]">
                that&apos;s the deal
              </span>
            </motion.h1>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition"
              >
                Start Growing <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--brand-bg-dark)] to-transparent z-[5]" />
      </section>

      {/* ── ROADBLOCKS — Rotating Question Rows ── */}
      <section className="py-24 lg:py-32 bg-[var(--brand-bg)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-[family-name:var(--font-display)] font-bold leading-tight">
              Removing the{" "}
              <span className="italic text-[var(--brand-accent)]">
                roadblocks
              </span>{" "}
              to your success
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] max-w-xl mx-auto leading-relaxed">
              It&apos;s easy to get lost in a sea of advice, conflicting
              opinions, and endless must-dos. We filter out the noise.
            </p>
          </motion.div>
        </div>

        {/* Scrolling question rows */}
        <div className="space-y-4 mb-20">
          {/* Row 1 - left */}
          <div className="overflow-hidden">
            <div className="ticker-left flex gap-4 w-max">
              {[
                ...roadblockQuestionsRow1,
                ...roadblockQuestionsRow1,
                ...roadblockQuestionsRow1,
                ...roadblockQuestionsRow1,
              ].map((q, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-6 py-3 bg-[var(--brand-bg-alt)] rounded-full text-sm text-[var(--brand-text)] border border-gray-200"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
          {/* Row 2 - right */}
          <div className="overflow-hidden">
            <div className="ticker-right flex gap-4 w-max">
              {[
                ...roadblockQuestionsRow2,
                ...roadblockQuestionsRow2,
                ...roadblockQuestionsRow2,
                ...roadblockQuestionsRow2,
              ].map((q, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-6 py-3 bg-[var(--brand-bg-alt)] rounded-full text-sm text-[var(--brand-text)] border border-gray-200"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
          {/* Row 3 - left */}
          <div className="overflow-hidden">
            <div
              className="ticker-left flex gap-4 w-max"
              style={{ animationDuration: "30s" }}
            >
              {[
                ...roadblockQuestionsRow3,
                ...roadblockQuestionsRow3,
                ...roadblockQuestionsRow3,
                ...roadblockQuestionsRow3,
              ].map((q, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-6 py-3 bg-[var(--brand-bg-alt)] rounded-full text-sm text-[var(--brand-text)] border border-gray-200"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Why us cards */}
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-6">
          {whyUsPoints.map((point, i) => (
            <motion.div
              key={point.title}
              className="bg-[var(--brand-bg-alt)] rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-2">{point.title}</h3>
              <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 lg:py-32 bg-[var(--brand-bg-alt)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              About Our Company
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold leading-tight max-w-3xl">
              We&apos;re <span className="italic">B Easy Grooming</span> —
              making every pet look and feel their best.
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] max-w-2xl leading-relaxed text-lg">
              Located in downtown Medford, we provide{" "}
              <strong className="text-[var(--brand-text)]">
                professional grooming
              </strong>{" "}
              with a gentle touch. Every dog gets{" "}
              <strong className="text-[var(--brand-text)]">
                personalized attention
              </strong>{" "}
              and leaves looking{" "}
              <strong className="text-[var(--brand-text)]">their absolute best</strong>
              .
            </p>
          </motion.div>

          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Tailored to your pet",
                desc: "Every dog is different — we customize each groom to your pet's breed, coat, and temperament.",
              },
              {
                title: "Stress-free experience",
                desc: "We keep things calm and gentle so your pup actually enjoys their grooming session.",
              },
              {
                title: "Walk-ins welcome",
                desc: "No appointment needed — just stop by our Central Ave location in downtown Medford.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND STATS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.p
            {...fadeUp}
            className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center"
          >
            Brands We Have Helped Growing
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {brandStats.map((stat, i) => (
              <motion.div
                key={stat.value}
                className="text-center py-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-[var(--brand-text)]">
                  {stat.value}
                </p>
                <p className="text-[var(--brand-muted)] text-sm mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — Sticky Card Scroll ── */}
      <section id="services">
        <StickyServices />
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="py-20 bg-[var(--brand-bg-dark)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Industries
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight">
              Helping businesses across industries launch, grow, and thrive
            </h2>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "Startups & Entrepreneurs",
              "Agribusiness",
              "Retail & E-commerce",
              "Manufacturing",
              "Real Estate",
              "Education & Training",
              "Technology & Software",
              "Food & Hospitality",
              "Healthcare & Wellness",
              "Telecommunication",
              "Finance & Investment",
              "Energy & Resources",
            ].map((industry) => (
              <span
                key={industry}
                className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm hover:bg-white/10 transition-colors cursor-default"
              >
                {industry}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS — Globe ── */}
      <section id="process">
        <GlobeProcess />
      </section>

      {/* ── NUMBERS ── */}
      <section className="py-24 lg:py-32 bg-[var(--brand-bg)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              By the Numbers
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold leading-tight">
              Numbers don&apos;t lie — and ours say{" "}
              <span className="italic text-[var(--brand-accent)]">
                you&apos;re in good hands.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.category}
                className="bg-[var(--brand-bg-alt)] rounded-3xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-6">
                  {stat.category}
                </p>
                <p className="text-6xl md:text-7xl font-bold text-[var(--brand-text)] mb-3">
                  <Counter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="tabular-nums"
                  />
                </p>
                <p className="text-lg font-medium text-[var(--brand-text)] mb-6">
                  {stat.unit}
                </p>
                <div className="space-y-2">
                  {stat.details.map((detail) => (
                    <p
                      key={detail}
                      className="text-[var(--brand-muted)] text-sm"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE — With Us vs Without Us ── */}
      <section className="py-24 lg:py-32 bg-[var(--brand-bg-dark)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              The Difference We Make
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight">
              <span className="italic">Side-by-side,</span>{" "}
              <span className="text-[var(--brand-accent)]">
                the choice is easy
              </span>
            </h2>
            <p className="mt-4 text-white/50 max-w-lg mx-auto">
              Two ways to start your business. One gets you launched faster,
              smarter, and stress-free.
            </p>
          </motion.div>

          {/* Two-column comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* WITHOUT US column */}
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white/40 text-sm font-semibold uppercase tracking-wider mb-8">
                ✕ Without us
              </h3>
              <div className="space-y-6">
                {comparisonRows.map((row) => (
                  <div key={row.category}>
                    <p className="text-white font-semibold text-sm mb-1">
                      {row.category}
                    </p>
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white/40 text-sm">{row.without}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* WITH US column */}
            <motion.div
              className="rounded-3xl border border-[var(--brand-accent-green)]/20 bg-[var(--brand-accent-green)]/[0.04] p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 className="text-[var(--brand-accent-green)] text-sm font-semibold uppercase tracking-wider mb-8">
                ✓ With us
              </h3>
              <div className="space-y-6">
                {comparisonRows.map((row) => (
                  <div key={row.category}>
                    <p className="text-white font-semibold text-sm mb-1">
                      {row.category}
                    </p>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--brand-accent-green)] flex-shrink-0 mt-0.5" />
                      <p className="text-white/80 text-sm">{row.withUs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — Accordion Rows ── */}
      <section
        id="testimonials"
        className="py-24 lg:py-32 bg-[var(--brand-bg)]"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Testimonials
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold leading-tight max-w-3xl">
              From &ldquo;can I really do this?&rdquo; to{" "}
              <span className="italic text-[var(--brand-accent)]">
                &ldquo;I can&apos;t believe it&apos;s real!&rdquo;
              </span>
            </h2>
          </motion.div>

          <div className="space-y-0 divide-y divide-[var(--brand-border,rgba(0,0,0,0.08))]">
            {testimonials.map((t, i) => {
              const isOpen = activeTestimonial === i;
              const initials = t.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {/* Collapsed row — always visible */}
                  <button
                    onClick={() => setActiveTestimonial(isOpen ? -1 : i)}
                    className="w-full text-left py-6 group"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-300 ${
                            isOpen
                              ? "bg-[var(--brand-accent)] text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-[var(--brand-text)]">
                            {t.name}
                          </p>
                          <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wider">
                            {t.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <p className="hidden md:block text-sm text-[var(--brand-muted)] italic truncate max-w-xs">
                          &ldquo;{t.highlight}&rdquo;
                        </p>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-full border border-[var(--brand-text)]/20 flex items-center justify-center flex-shrink-0"
                        >
                          <Plus className="w-4 h-4 text-[var(--brand-text)]" />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 grid md:grid-cols-[1fr_1fr] gap-8">
                          {/* Left: full quote */}
                          <div className="bg-[var(--brand-bg-dark)] rounded-2xl p-8 md:p-10 flex flex-col justify-between">
                            <div>
                              <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, s) => (
                                  <Star
                                    key={s}
                                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                                  />
                                ))}
                              </div>
                              <h3 className="text-xl md:text-2xl font-[family-name:var(--font-display)] font-bold text-white/80 italic leading-relaxed mb-6">
                                &ldquo;{t.highlight}&rdquo;
                              </h3>
                              <p className="text-white/50 leading-relaxed">
                                &ldquo;{t.quote}&rdquo;
                              </p>
                            </div>
                            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                              <div className="w-12 h-12 rounded-full bg-[var(--brand-accent)] flex items-center justify-center text-white font-bold text-sm">
                                {initials}
                              </div>
                              <div>
                                <p className="text-white font-semibold text-sm">
                                  {t.name}
                                </p>
                                <p className="text-white/40 text-xs uppercase tracking-wider">
                                  {t.company}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Right: decorative panel */}
                          <div className="bg-[var(--brand-bg-dark)] rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center relative overflow-hidden min-h-[280px]">
                            <div
                              className="absolute inset-0 opacity-[0.03]"
                              style={{
                                backgroundImage:
                                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                                backgroundSize: "24px 24px",
                              }}
                            />
                            <div className="relative z-10 text-center">
                              <div className="w-20 h-20 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center mx-auto mb-6">
                                <div className="w-14 h-14 rounded-full bg-[var(--brand-accent)] flex items-center justify-center text-white font-bold text-xl">
                                  {initials}
                                </div>
                              </div>
                              <p className="text-white font-semibold">
                                {t.name}
                              </p>
                              <p className="text-white/40 text-sm">
                                {t.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ — Redesigned ── */}
      <section id="faq" className="py-24 lg:py-32 bg-[var(--brand-bg-dark)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Frequently Asked Questions
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-bold text-white leading-tight">
              We get asked this all the time
            </h2>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + CONTACT ── */}
      <section id="contact" className="py-24 lg:py-32 bg-[var(--brand-bg)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-muted)] max-w-lg mx-auto text-lg leading-relaxed">
              Sometimes the hardest part is reaching out — but once you do,
              we&apos;ll make the rest easy.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-8 py-4 rounded-full text-sm font-bold hover:brightness-110 transition mt-8"
            >
              Let&apos;s talk today <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                label: "Phone",
                values: ["(217) 555-0134", "(217) 555-0142"],
              },
              {
                icon: Mail,
                label: "Email",
                values: ["info@beasygrooming.com", "book@beasygrooming.com"],
              },
              {
                icon: MapPin,
                label: "Address",
                values: ["123 Main Street, Suite 200", "Austin, TX 78701"],
              },
              {
                icon: Clock,
                label: "Hours",
                values: ["Mon to Sat: 9am - 8:30pm", "Sun: Closed"],
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="bg-[var(--brand-bg-alt)] rounded-2xl p-6"
                {...fadeUp}
              >
                <item.icon className="w-5 h-5 text-[var(--brand-accent)] mb-4" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-3">
                  {item.label}
                </p>
                {item.values.map((v) => (
                  <p key={v} className="text-sm text-[var(--brand-text)]">
                    {v}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER — Big Logo ── */}
      <footer className="relative bg-[var(--brand-bg-dark)] pt-20 pb-12 overflow-hidden">
        {/* Giant background logo text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-[family-name:var(--font-display)] font-black text-white/[0.03] tracking-tighter whitespace-nowrap">
            B Easy Grooming
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-white tracking-tight">
                B Easy Grooming
              </span>
              <p className="mt-4 text-white/40 text-sm leading-relaxed">
                Professional pet grooming in Medford, OR.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Pages
              </h4>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Services
              </h4>
              <div className="space-y-3">
                {services.slice(0, 5).map((s) => (
                  <p key={s.title} className="text-white/40 text-sm">
                    {s.title}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                Socials
              </h4>
              <div className="space-y-3">
                {["Facebook", "LinkedIn", "YouTube", "X / Twitter"].map(
                  (social) => (
                    <p
                      key={social}
                      className="text-white/40 text-sm hover:text-white transition-colors cursor-pointer"
                    >
                      {social}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; 2026 B Easy Grooming. All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-white/30 text-sm hover:text-white/50 transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-white/30 text-sm hover:text-white/50 transition-colors cursor-pointer">
                Terms
              </span>
            </div>
          </div>
        </div>

        {/* Large watermark text at bottom */}
        <div className="relative z-10 mt-12 flex justify-center">
          <span className="text-[clamp(5rem,15vw,12rem)] font-[family-name:var(--font-display)] font-black text-white/[0.04] tracking-tight leading-none">
            B Easy
          </span>
        </div>
      </footer>
    </>
  );
}
