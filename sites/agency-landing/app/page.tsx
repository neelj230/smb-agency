'use client'

import { useState, useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
  AnimatePresence,
} from 'framer-motion'
import {
  Palette,
  FileText,
  Smartphone,
  Zap,
  Puzzle,
  Clock,
  Menu,
  X,
  ArrowRight,
  Check,
  Minus,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-80px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

/* ─────────────────────────────────────────────
   COUNTER COMPONENT
   ───────────────────────────────────────────── */

function Counter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [displayVal, setDisplayVal] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: 'easeOut',
      })
      const unsubscribe = rounded.on('change', (v) => setDisplayVal(v))
      return () => {
        controls.stop()
        unsubscribe()
      }
    }
  }, [isInView, count, target, rounded])

  return (
    <span ref={ref} className="font-[family-name:var(--font-fragment-mono)]">
      {prefix}
      {displayVal}
      {suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────
   SELF-WRITING TEXT COMPONENT
   ───────────────────────────────────────────── */

function SelfWritingText({
  text,
  speed = 30,
  delay = 800,
}: {
  text: string
  speed?: number
  delay?: number
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !started) {
      const timeout = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timeout)
    }
  }, [isInView, started, delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)

    return () => clearTimeout(timeout)
  }, [started, displayed, text, speed])

  return (
    <span ref={ref}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7 }}
        className="inline-block w-[3px] h-[1em] bg-[var(--brand-primary)] ml-1 align-baseline"
      />
    </span>
  )
}

/* ─────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight"
        >
          NJ<span className="text-[var(--brand-primary)]">.</span>Digital
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-medium px-5 py-2.5 rounded-full bg-[var(--brand-primary)] text-[#0a0a0a] hover:brightness-110 transition-all"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[var(--brand-text)]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium px-5 py-3 rounded-full bg-[var(--brand-primary)] text-[#0a0a0a] text-center hover:brightness-110 transition-all mt-2"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ─────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient blobs — more visible */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(191,225,95,0.12) 0%, rgba(191,225,95,0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(191,225,95,0.08) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-xs font-[family-name:var(--font-fragment-mono)] text-[var(--brand-muted)] tracking-wider uppercase">
            Web Design Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
        >
          Websites that
          <br />
          <span className="text-[var(--brand-primary)]">win customers.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-lg md:text-xl text-[var(--brand-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          <SelfWritingText
            text="Beautiful, bespoke sites for small businesses — built in days, not months."
            speed={28}
            delay={1200}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#work"
            className="group px-8 py-3.5 rounded-full bg-[var(--brand-primary)] text-[#0a0a0a] font-semibold text-sm hover:brightness-110 transition-all flex items-center gap-2"
          >
            See Our Work
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold text-sm hover:bg-[var(--brand-primary)]/10 transition-all"
          >
            Get Started
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="flex items-center justify-center gap-3 text-xs font-[family-name:var(--font-fragment-mono)] text-[var(--brand-muted)]/60"
        >
          <span>Next.js</span>
          <span className="text-[var(--brand-primary)]/40">&#x2022;</span>
          <span>Tailwind</span>
          <span className="text-[var(--brand-primary)]/40">&#x2022;</span>
          <span>Framer Motion</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-1.5 rounded-full bg-[var(--brand-primary)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   WORK / PORTFOLIO SECTION
   ───────────────────────────────────────────── */

const projects = [
  {
    name: "Marco's Plumbing",
    industry: 'Plumbing & Heating',
    color: '#1d65d1',
    status: 'live' as const,
  },
  {
    name: 'Rosario\'s Trattoria',
    industry: 'Italian Restaurant',
    color: '#c9463d',
    status: 'coming' as const,
  },
  {
    name: 'Bright Smile Dental',
    industry: 'Dental Practice',
    color: '#2bbaa0',
    status: 'coming' as const,
  },
  {
    name: 'Apex Auto Repair',
    industry: 'Auto Repair',
    color: '#e8a838',
    status: 'coming' as const,
  },
]

function WorkSection() {
  return (
    <section id="work" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-[var(--brand-primary)] tracking-wider uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Built Different<span className="text-[var(--brand-primary)]">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[var(--brand-bg-alt)] border border-white/5 hover:border-[var(--brand-primary)]/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(191,225,95,0.08)]">
                {/* Device mockup frame */}
                <div className="p-6 pb-0">
                  <div className="rounded-t-lg overflow-hidden border border-white/10 bg-[#1a1a1a]">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-5 rounded-full bg-white/5 max-w-[200px]" />
                      </div>
                    </div>
                    {/* Screen content — simulated site preview */}
                    <div
                      className="aspect-[16/10] relative overflow-hidden"
                      style={{ backgroundColor: project.color + '08' }}
                    >
                      {project.status === 'live' ? (
                        <div className="absolute inset-0 p-4">
                          {/* Simulated hero section */}
                          <div className="h-full flex flex-col justify-between">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-6 h-6 rounded-md" style={{ backgroundColor: project.color + '30' }} />
                              <div className="h-2 w-20 rounded-full" style={{ backgroundColor: project.color + '20' }} />
                              <div className="ml-auto flex gap-2">
                                <div className="h-2 w-8 rounded-full bg-white/5" />
                                <div className="h-2 w-8 rounded-full bg-white/5" />
                                <div className="h-2 w-8 rounded-full bg-white/5" />
                              </div>
                            </div>
                            <div className="flex-1 flex items-center">
                              <div>
                                <div className="h-3 w-40 rounded-full mb-2" style={{ backgroundColor: project.color + '25' }} />
                                <div className="h-2 w-56 rounded-full mb-1 bg-white/5" />
                                <div className="h-2 w-44 rounded-full mb-3 bg-white/5" />
                                <div className="h-6 w-24 rounded-full" style={{ backgroundColor: project.color + '30' }} />
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="h-10 flex-1 rounded-lg bg-white/3" />
                              <div className="h-10 flex-1 rounded-lg bg-white/3" />
                              <div className="h-10 flex-1 rounded-lg bg-white/3" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: project.color + '15' }}>
                              <div className="w-4 h-4 rounded-md" style={{ backgroundColor: project.color + '40' }} />
                            </div>
                            <div className="text-[10px] font-[family-name:var(--font-fragment-mono)] text-[var(--brand-muted)]/40 uppercase tracking-widest">
                              Coming Soon
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project info */}
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-1">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--brand-muted)]">
                      {project.industry}
                    </p>
                  </div>
                  {project.status === 'live' && (
                    <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-fragment-mono)] text-[var(--brand-primary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] animate-pulse" />
                      Live
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SERVICES SECTION
   ───────────────────────────────────────────── */

const services = [
  {
    icon: Palette,
    title: 'Bespoke Design',
    description:
      'Not templates. Every site designed from our library of 185+ elements from award-winning sites.',
  },
  {
    icon: FileText,
    title: 'Real Content',
    description:
      'Copy written from your actual reviews, your real story, your real strengths. Never generic filler.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description:
      'Flawless on every device. From 375px phones to 4K displays.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Lighthouse 90+ across the board. Your customers won\'t wait.',
  },
  {
    icon: Puzzle,
    title: 'All Integrations',
    description:
      'Contact forms, click-to-call, maps, reviews, analytics — all included from day one.',
  },
  {
    icon: Clock,
    title: 'Days, Not Months',
    description:
      'From concept to live website in days. Not the weeks or months agencies charge for.',
  },
]

function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 px-6 bg-[var(--brand-bg-alt)]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-[var(--brand-primary)] tracking-wider uppercase mb-4 block">
            Services
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            What You Get<span className="text-[var(--brand-primary)]">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-7 rounded-2xl bg-[var(--brand-bg)] border border-white/5 hover:border-[var(--brand-primary)]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(191,225,95,0.1)]"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                <service.icon
                  size={20}
                  className="text-[var(--brand-primary)]"
                />
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PROCESS SECTION
   ───────────────────────────────────────────── */

const processSteps = [
  {
    num: '01',
    title: 'We Find You',
    description:
      'We identify businesses that deserve a better online presence.',
  },
  {
    num: '02',
    title: 'We Research',
    description:
      'Deep dive into your reviews, photos, story, and brand. Every detail matters.',
  },
  {
    num: '03',
    title: 'We Build',
    description:
      'Our system generates a bespoke site using your real data. No stock photos. No lorem ipsum.',
  },
  {
    num: '04',
    title: 'You Go Live',
    description:
      'Review it, request changes, and launch. Deployed on world-class infrastructure.',
  },
]

function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-[var(--brand-primary)] tracking-wider uppercase mb-4 block">
            Process
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            How It Works<span className="text-[var(--brand-primary)]">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/20 to-transparent" />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <div className="font-[family-name:var(--font-fragment-mono)] text-5xl md:text-6xl font-bold text-[var(--brand-primary)]/15 mb-4 leading-none">
                {step.num}
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   COMPARISON SECTION
   ───────────────────────────────────────────── */

const oldWay = [
  'Generic templates',
  'Stock photos everywhere',
  'Lorem ipsum text',
  'Weeks of back-and-forth',
  'DIY maintenance headaches',
  '$3,000 - $5,000 agency fees',
]

const ourWay = [
  'Bespoke design from 185+ elements',
  'Your real photos and brand',
  'Copy from your actual reviews',
  'Ready in days',
  'We handle everything',
  'Fraction of the cost',
]

function ComparisonSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--brand-bg-alt)]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-[var(--brand-primary)] tracking-wider uppercase mb-4 block">
            The Difference
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Why Us<span className="text-[var(--brand-primary)]">.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Old Way */}
          <div className="rounded-2xl bg-[var(--brand-bg)] border border-white/5 p-8">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--brand-muted)]/60 mb-6">
              The Old Way
            </h3>
            <div className="space-y-4">
              {oldWay.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Minus size={16} className="text-red-500/60 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[var(--brand-muted)]/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Our Way */}
          <div className="rounded-2xl bg-[var(--brand-bg)] border border-[var(--brand-primary)]/20 p-8 shadow-[0_0_30px_rgba(191,225,95,0.05)]">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--brand-primary)] mb-6">
              Our Way
            </h3>
            <div className="space-y-4">
              {ourWay.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check
                    size={16}
                    className="text-[var(--brand-primary)] mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-[var(--brand-text)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   STATS SECTION
   ───────────────────────────────────────────── */

const stats = [
  { value: 185, suffix: '+', label: 'Design Elements' },
  { value: 55, suffix: '+', label: 'Sites Analyzed' },
  { value: 90, suffix: '+', label: 'Lighthouse Scores' },
  { value: 3, suffix: '', label: 'Day Avg. Delivery' },
]

function StatsSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--brand-bg-alt)] relative overflow-hidden">
      {/* Subtle dot pattern bg */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--brand-primary)] mb-3">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-[family-name:var(--font-space-grotesk)] text-[var(--brand-muted)] tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   TESTIMONIALS SECTION
   ───────────────────────────────────────────── */

const testimonials = [
  {
    text: "They built our site in 3 days. Three days! It looks better than anything we could've gotten from an agency charging ten times more.",
    author: 'Pilot Client',
    role: 'Restaurant Owner, Philadelphia',
  },
  {
    text: "I didn't even know this was possible. They used our actual Google reviews as testimonials, our real photos — it actually feels like us.",
    author: 'Pilot Client',
    role: 'Contractor, South Jersey',
  },
  {
    text: 'The site is fast, it looks incredible on mobile, and we started getting calls from it the first week.',
    author: 'Pilot Client',
    role: 'Dental Practice, Main Line',
  },
]

function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-[var(--brand-primary)] tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Don&apos;t take our word for it<span className="text-[var(--brand-primary)]">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-[var(--brand-bg-alt)] border border-white/5 relative"
            >
              <div className="text-4xl text-[var(--brand-primary)]/20 font-serif absolute top-4 left-6">&ldquo;</div>
              <p className="text-sm text-[var(--brand-muted)] leading-relaxed mb-6 mt-4">
                {t.text}
              </p>
              <div className="border-t border-white/5 pt-4">
                <p className="text-sm font-semibold text-[var(--brand-text)]">{t.author}</p>
                <p className="text-xs text-[var(--brand-muted)]/60">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   ABOUT SECTION
   ───────────────────────────────────────────── */

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[var(--brand-bg-alt)]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp} className="mb-12">
          <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-[var(--brand-primary)] tracking-wider uppercase mb-4 block">
            About
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Built by Neel<span className="text-[var(--brand-primary)]">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/10 flex items-center justify-center mx-auto md:mx-0"
            style={{ maxWidth: 260 }}
          >
            <span className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold text-[var(--brand-primary)]/40">
              NJ
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="text-base md:text-lg text-[var(--brand-muted)] leading-relaxed mb-6">
              I&#39;m a student at the University of Pennsylvania with a passion
              for making small businesses look as good online as the Fortune 500.
              I believe the local plumber, the family restaurant, the
              neighborhood dentist — they all deserve a website that looks like a
              million bucks.
            </p>
            <p className="text-base md:text-lg text-[var(--brand-muted)] leading-relaxed mb-8">
              So I built a system that studies the best designs on the internet
              and curates unique combinations for each business. Every site is
              bespoke. Every word is real. Every pixel is intentional.
            </p>
            <blockquote className="border-l-2 border-[var(--brand-primary)] pl-6">
              <p className="font-[family-name:var(--font-space-grotesk)] text-xl md:text-2xl font-medium leading-snug text-[var(--brand-text)]">
                &ldquo;Every small business deserves a website that looks like a
                million bucks.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   CONTACT / CTA SECTION
   ───────────────────────────────────────────── */

function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In production, this would post to the API route
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <span className="font-[family-name:var(--font-fragment-mono)] text-xs text-[var(--brand-primary)] tracking-wider uppercase mb-4 block">
            Get Started
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Ready for a website that actually{' '}
            <span className="text-[var(--brand-primary)]">wins customers</span>?
          </h2>
          <p className="text-[var(--brand-muted)] text-lg mb-12 max-w-xl mx-auto">
            Tell us about your business. We&#39;ll show you what&#39;s possible.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-[var(--brand-bg-alt)] border border-[var(--brand-primary)]/20"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)]/20 flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-[var(--brand-primary)]" />
            </div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold mb-2">
              Message Sent
            </h3>
            <p className="text-[var(--brand-muted)] text-sm">
              We&#39;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="text-left space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-[family-name:var(--font-fragment-mono)] text-[var(--brand-muted)] mb-2 tracking-wider uppercase">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--brand-bg-alt)] border border-white/10 text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)]/50 transition-colors placeholder:text-[var(--brand-muted)]/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-[family-name:var(--font-fragment-mono)] text-[var(--brand-muted)] mb-2 tracking-wider uppercase">
                  Business Name
                </label>
                <input
                  type="text"
                  name="business"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--brand-bg-alt)] border border-white/10 text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)]/50 transition-colors placeholder:text-[var(--brand-muted)]/40"
                  placeholder="Your business name"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-[family-name:var(--font-fragment-mono)] text-[var(--brand-muted)] mb-2 tracking-wider uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--brand-bg-alt)] border border-white/10 text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)]/50 transition-colors placeholder:text-[var(--brand-muted)]/40"
                placeholder="you@business.com"
              />
            </div>
            <div>
              <label className="block text-xs font-[family-name:var(--font-fragment-mono)] text-[var(--brand-muted)] mb-2 tracking-wider uppercase">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[var(--brand-bg-alt)] border border-white/10 text-[var(--brand-text)] text-sm focus:outline-none focus:border-[var(--brand-primary)]/50 transition-colors resize-none placeholder:text-[var(--brand-muted)]/40"
                placeholder="Tell us about your business..."
              />
            </div>
            <div className="text-center pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full bg-[var(--brand-primary)] text-[#0a0a0a] font-semibold text-sm hover:brightness-110 transition-all"
              >
                Get Started
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */

function FooterSection() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
            NJ<span className="text-[var(--brand-primary)]">.</span>Digital
          </span>
          <span className="text-xs text-[var(--brand-muted)]">
            &copy; 2026 All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-[var(--brand-muted)] hover:text-[var(--brand-primary)] transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            className="text-[var(--brand-muted)] hover:text-[var(--brand-primary)] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            className="text-[var(--brand-muted)] hover:text-[var(--brand-primary)] transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="#"
            className="text-[var(--brand-muted)] hover:text-[var(--brand-primary)] transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <div className="text-xs font-[family-name:var(--font-fragment-mono)] text-[var(--brand-muted)]/50">
          Built with Next.js, Tailwind CSS &amp; Framer Motion
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   PAGE COMPOSITION
   ───────────────────────────────────────────── */

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <ComparisonSection />
      <StatsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
