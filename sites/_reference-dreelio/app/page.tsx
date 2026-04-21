// REFERENCE: DREELIO — SOURCE: https://dreelio.framer.website/
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Clock,
  FileText,
  DollarSign,
  BarChart3,
  PieChart,
  Zap,
  Globe,
  MessageSquare,
  Languages,
  Layers,
  Star,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const logoNames = [
  "Thrive",
  "Amsterdam",
  "SAVANNAH",
  "Milano",
  "Luminous",
  "Apex",
  "Horizon",
  "Vertex",
];

const features = [
  {
    icon: Zap,
    title: "Personalize every detail",
    description:
      "From branding and layout to colors and menus, so it feels like an extension of your brand.",
  },
  {
    icon: Globe,
    title: "Seamless integrations",
    description:
      "Plug into the tools you love. Sync your data and make your systems work smarter together.",
  },
  {
    icon: MessageSquare,
    title: "Collaborate in realtime",
    description:
      "Keep every conversation in sync with comments, messages, and project chats.",
  },
  {
    icon: Languages,
    title: "Speaks your language",
    description:
      "Set your language, currency, time, and date preferences for a seamless local experience.",
  },
  {
    icon: Layers,
    title: "View things your way",
    description:
      "Toggle between Kanban, cards, list, table, timeline, and calendar views.",
  },
];

const projectTags = [
  { icon: FolderKanban, label: "Tasks" },
  { icon: Clock, label: "Time tracking" },
  { icon: FileText, label: "Timesheets" },
  { icon: BarChart3, label: "Reports" },
];

const financeTags = [
  { icon: FileText, label: "Invoicing" },
  { icon: DollarSign, label: "Budgets" },
  { icon: PieChart, label: "Forecasting" },
  { icon: Zap, label: "Integrations" },
];

const reviews = [
  {
    text: "By far the best agency tool I have ever used. Clean, fast, and beautifully built.",
    author: "Martha P.",
    role: "VP Marketing, Acme",
  },
  {
    text: "From client onboarding to getting paid, this just works. Our design team runs entirely on it.",
    author: "Leah D.",
    role: "Design Ops Lead",
  },
  {
    text: "We used to duct-tape tools together. Now our contracts, time tracking, and payments live in one system.",
    author: "Sergio W.",
    role: "Agency Owner",
  },
  {
    text: "Managing projects used to mean spreadsheets and missed invoices. This keeps our workflows tight.",
    author: "Jane J.",
    role: "Project Manager",
  },
  {
    text: "Everything a small team needs to stay professional and organized. Switched from three tools to just this.",
    author: "Amos C.",
    role: "Art Director",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "For solo use with light needs.",
    features: [
      "Unlimited projects",
      "Unlimited clients",
      "Time tracking",
      "CRM",
      "iOS & Android app",
    ],
    cta: "Try free",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$87",
    period: "/mo",
    description: "For pro use with advanced needs.",
    features: [
      "Everything in Basic",
      "Invoices & payments",
      "Expense tracking",
      "Income tracking",
      "Scheduling",
    ],
    cta: "Get started",
    highlighted: true,
    badge: "Save 20%",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams with complex needs.",
    features: [
      "Everything in Premium",
      "Custom data import",
      "Advanced onboarding",
      "HubSpot integration",
      "Timesheets",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const blogPosts = [
  {
    title: "How to start a 100k creative agency in 2025",
    tag: "Must Read",
    featured: true,
  },
  { title: "Top 10 digital agency software", tag: "Tools", featured: false },
  {
    title: "A complete guide to project success",
    tag: "Insight",
    featured: false,
  },
  { title: "What Are Billable Hours", tag: "Management", featured: false },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// ─── DASHBOARD MOCKUP COMPONENT ─────────────────────────────────────────────

function DashboardMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white rounded-2xl dashboard-shadow overflow-hidden ${className}`}
    >
      {/* Sidebar + Main */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-[#FAFAFA] border-r border-gray-100 p-4 hidden md:block">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-[var(--brand-primary)] rounded-lg" />
            <span className="text-sm font-semibold">Dreelio</span>
          </div>
          <div className="space-y-1">
            {["Home", "Clients", "Projects", "Time tracking"].map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${i === 0 ? "bg-white shadow-sm font-medium" : "text-gray-500"}`}
              >
                <div className="w-3.5 h-3.5 rounded bg-gray-200" />
                {item}
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider px-3 mb-2">
                Tools
              </p>
              {["Invoices", "Contracts", "Balance", "Accounting"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500"
                  >
                    <div className="w-3.5 h-3.5 rounded bg-gray-200" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold">Hello, Leonardo</p>
              <p className="text-xs text-gray-400">What are you working on?</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 h-7 bg-gray-100 rounded-lg" />
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-5 h-5 rounded bg-gray-100" />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total projects",
                value: "455",
                change: "+18.4%",
                up: true,
              },
              {
                label: "Active projects",
                value: "55",
                change: "-8.8%",
                up: false,
              },
              {
                label: "Completed projects",
                value: "400",
                change: "+12.8%",
                up: true,
              },
              {
                label: "Total hours worked",
                value: "600hrs",
                change: "-1.2%",
                up: false,
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#FAFAFA] rounded-xl p-3">
                <p className="text-[10px] text-gray-400 mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-lg font-bold">{stat.value}</span>
                  <span
                    className={`text-[10px] ${stat.up ? "text-green-500" : "text-red-400"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-[#FAFAFA] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium">Earning over time</p>
                <div className="flex gap-2">
                  <div className="w-12 h-5 bg-gray-200 rounded" />
                  <div className="w-5 h-5 bg-gray-200 rounded" />
                </div>
              </div>
              {/* Fake chart bars */}
              <div className="flex items-end gap-2 h-24">
                {[40, 55, 35, 60, 50, 70, 45, 65, 55, 75, 50, 60].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-200/60 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ),
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Send an invoice",
                "Draft a proposal",
                "Create a contract",
                "Add a form",
              ].map((action) => (
                <div
                  key={action}
                  className="bg-[#FAFAFA] rounded-xl p-3 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-6 h-6 rounded-lg bg-gray-200 mb-2" />
                  <span className="text-[9px] text-gray-500">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE MOCKUP ───────────────────────────────────────────────────────────

function MobileMockup() {
  return (
    <div className="w-[240px] md:w-[280px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-gray-800 mx-auto">
      {/* Status bar */}
      <div className="bg-gray-800 px-4 py-1 flex items-center justify-between">
        <span className="text-white text-[9px]">9:41</span>
        <div className="flex gap-1">
          <div className="w-3 h-2 bg-white/50 rounded-sm" />
          <div className="w-3 h-2 bg-white/50 rounded-sm" />
          <div className="w-4 h-2 bg-white rounded-sm" />
        </div>
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-blue-400" />
            <div>
              <p className="text-[10px] font-semibold">Hello, Leonardo</p>
              <p className="text-[8px] text-gray-400">Dashboard</p>
            </div>
          </div>
          <div className="w-5 h-5 bg-gray-100 rounded-full" />
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: "Projects", value: "455" },
            { label: "Active", value: "55" },
          ].map((s) => (
            <div key={s.label} className="bg-[#F5F5F5] rounded-xl p-2">
              <p className="text-[8px] text-gray-400">{s.label}</p>
              <p className="text-sm font-bold">{s.value}</p>
            </div>
          ))}
        </div>
        {/* Mini chart */}
        <div className="bg-[#F5F5F5] rounded-xl p-3 mb-3">
          <p className="text-[9px] font-medium mb-2">Earnings</p>
          <div className="flex items-end gap-1 h-12">
            {[30, 45, 25, 50, 40, 60, 35].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-200 rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2">
          {["Invoice", "Track", "Reports"].map((a) => (
            <div key={a} className="bg-[#F5F5F5] rounded-lg p-2 text-center">
              <div className="w-4 h-4 bg-gray-300 rounded mx-auto mb-1" />
              <span className="text-[7px] text-gray-500">{a}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom bar */}
      <div className="bg-white border-t border-gray-100 px-6 py-2 flex items-center justify-around">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-5 h-5 rounded bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function DreelioPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const dashboardY = useTransform(heroProgress, [0, 1], [100, -200]);
  const dashboardScale = useTransform(heroProgress, [0, 0.5], [0.85, 1]);
  const dashboardRotateX = useTransform(heroProgress, [0, 0.4], [12, 0]);

  const deviceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: deviceProgress } = useScroll({
    target: deviceRef,
    offset: ["start end", "end start"],
  });
  const deviceScale = useTransform(deviceProgress, [0, 0.4, 0.6], [1.3, 1, 1]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--brand-primary)] rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-lg font-bold">
              Dreelio
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Try Dreelio free
          </a>
        </div>
      </nav>

      {/* ── HERO with SKY GRADIENT ── */}
      <section
        ref={heroRef}
        className="relative min-h-[140vh] sky-gradient overflow-hidden pt-20"
      >
        {/* Cloud overlay */}
        <div className="absolute inset-0 cloud-layer pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-20 md:pt-32 text-center">
          <motion.h1
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.1] tracking-[-0.02em] italic text-[var(--brand-text)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Run your freelance <br className="hidden md:block" />
            business like a pro
          </motion.h1>

          <motion.p
            className="mt-6 text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            All-in-one platform for managing clients, projects, and payments
            without the chaos.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Try Dreelio free <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 border border-gray-300 bg-white/60 backdrop-blur-sm text-[var(--brand-text)] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white transition"
            >
              See features <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* 3D Dashboard that moves towards you on scroll */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 mt-16"
          style={{
            y: dashboardY,
            scale: dashboardScale,
            rotateX: dashboardRotateX,
            perspective: 1200,
          }}
        >
          <div style={{ transformStyle: "preserve-3d" }}>
            <DashboardMockup className="h-[340px] md:h-[420px]" />
          </div>
        </motion.div>
      </section>

      {/* ── TRUSTED BY / LOGO TICKER ── */}
      <section className="py-12 bg-[var(--brand-bg)] overflow-hidden">
        <motion.p
          className="text-center text-sm text-gray-400 mb-8"
          {...fadeUp}
        >
          Trusted by 7,000+ top startups, freelancers and studios
        </motion.p>
        <div className="relative">
          <div className="logo-marquee flex gap-16 w-max items-center">
            {[...logoNames, ...logoNames].map((name, i) => (
              <span
                key={i}
                className="text-xl font-semibold text-gray-300 whitespace-nowrap tracking-wide"
                style={{ fontFamily: i % 2 === 0 ? "serif" : "sans-serif" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEAMLESS ACROSS DEVICES — ZOOM OUT REVEAL ── */}
      <section
        ref={deviceRef}
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className="text-sm text-gray-400 uppercase tracking-widest mb-3"
            {...fadeUp}
          >
            Seamless across devices
          </motion.p>
          <motion.h2
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight"
            {...fadeUp}
          >
            Work from anywhere,
            <br />
            <span className="text-gray-400">stay in sync</span>
          </motion.h2>

          <motion.div
            className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
            style={{ scale: deviceScale }}
          >
            {/* Mobile */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <MobileMockup />
              <div className="mt-4 flex gap-2 justify-center">
                <span className="px-4 py-1.5 bg-white rounded-full text-xs font-medium shadow-sm">
                  Mobile App
                </span>
              </div>
            </motion.div>

            {/* Web */}
            <motion.div
              className="w-full max-w-2xl"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <DashboardMockup className="h-[280px] md:h-[360px]" />
              <div className="mt-4 flex gap-2 justify-center">
                <span className="px-4 py-1.5 bg-white rounded-full text-xs font-medium shadow-sm">
                  Web App
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECT MANAGEMENT ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <motion.div
            className="card-gradient-blue rounded-3xl p-8 md:p-12 flex items-center justify-center min-h-[320px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Project Alpha</p>
                  <p className="text-xs text-gray-400">3 tasks remaining</p>
                </div>
              </div>
              <div className="space-y-2">
                {["Design mockups", "Review feedback", "Final delivery"].map(
                  (task, i) => (
                    <div
                      key={task}
                      className="flex items-center gap-3 p-2 rounded-lg bg-gray-50"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${i === 0 ? "bg-blue-500 border-blue-500" : "border-gray-300"} flex items-center justify-center`}
                      >
                        {i === 0 && (
                          <Check className="w-2.5 h-2.5 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${i === 0 ? "line-through text-gray-400" : "text-gray-700"}`}
                      >
                        {task}
                      </span>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-blue-600">67%</span>
                </div>
                <div className="h-1.5 bg-blue-100 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: "67%" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div {...fadeUp}>
            <p className="text-sm text-blue-500 font-medium uppercase tracking-widest mb-3">
              project management
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight mb-5">
              Keep every project moving forward
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Plan, assign, and deliver your work — all in one place. With smart
              task tracking, deadlines, and real-time progress, you stay
              organized and clients stay confident.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Try Dreelio free <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              {projectTags.map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
                >
                  <tag.icon className="w-3.5 h-3.5" />
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINANCIAL MANAGEMENT ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <p className="text-sm text-orange-500 font-medium uppercase tracking-widest mb-3">
              financial management
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight mb-5">
              Track income, get paid, stress less
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Create branded invoices, log expenses, and keep tabs on your
              earnings. Whether you bill hourly or per project, everything is
              automated and tax-friendly.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Try Dreelio free <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              {financeTags.map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-medium text-gray-600"
                >
                  <tag.icon className="w-3.5 h-3.5" />
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Image placeholder */}
          <motion.div
            className="card-gradient-peach rounded-3xl p-8 md:p-12 flex items-center justify-center min-h-[320px] order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Revenue Overview</p>
                  <p className="text-xs text-gray-400">This month</p>
                </div>
              </div>
              <div className="text-2xl font-bold mb-4">$24,580</div>
              <div className="space-y-3">
                {[
                  {
                    label: "Invoiced",
                    amount: "$18,200",
                    color: "bg-green-100 text-green-600",
                  },
                  {
                    label: "Pending",
                    amount: "$4,380",
                    color: "bg-yellow-100 text-yellow-600",
                  },
                  {
                    label: "Overdue",
                    amount: "$2,000",
                    color: "bg-red-100 text-red-600",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.color}`}
                    >
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="features" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3">
              features
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight">
              Built for freelancers,
              <br />
              <span className="text-gray-400">powered by simplicity</span>
            </h2>
          </motion.div>

          {/* Bento-style grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Large featured card */}
            <motion.div
              className="lg:col-span-2 card-gradient-lavender rounded-2xl p-8 md:p-10"
              {...stagger}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-2">{features[0].title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">
                {features[0].description}
              </p>
              <div className="bg-white rounded-xl shadow-sm p-4 max-w-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="text-xs font-medium">
                    Customize your workspace
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["#A8C4E0", "#E8DDD0", "#D4E4D4"].map((color) => (
                    <div
                      key={color}
                      className="h-8 rounded-lg"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Integration card */}
            <motion.div
              className="card-gradient-mint rounded-2xl p-8"
              {...stagger}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold mb-2">{features[1].title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {features[1].description}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto"
                  >
                    <div className="w-5 h-5 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Remaining features */}
            {features.slice(2).map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-[#FAFAFA] rounded-2xl p-8 hover:shadow-md transition-shadow"
                {...stagger}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-base font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — HORIZONTAL MARQUEE ── */}
      <section
        id="benefits"
        className="py-24 lg:py-32 bg-[var(--brand-bg)] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-12">
          <motion.div {...fadeUp} className="text-center">
            <motion.blockquote className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.5rem)] font-bold italic leading-snug max-w-3xl mx-auto mb-6">
              &ldquo;Dreelio is by far the best agency tool I have ever
              used&rdquo;
            </motion.blockquote>
            <p className="text-sm font-semibold">Martha Punla</p>
            <p className="text-xs text-gray-400">VP Marketing, Acme</p>
          </motion.div>
        </div>

        {/* Scrolling review cards */}
        <div className="testimonial-marquee flex gap-5 w-max">
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-purple-300" />
                <div>
                  <p className="text-xs font-semibold">{review.author}</p>
                  <p className="text-[10px] text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3">
              pricing
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-bold leading-tight">
              Simple plans
              <br />
              <span className="text-gray-400">for serious work</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl p-7 ${plan.highlighted ? "bg-[var(--brand-primary)] text-white ring-2 ring-[var(--brand-primary)] scale-[1.02]" : "bg-[#FAFAFA]"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p
                    className={`text-sm font-medium ${plan.highlighted ? "text-white/80" : "text-gray-500"}`}
                  >
                    Dreelio {plan.name}
                  </p>
                  {plan.badge && (
                    <span className="text-[10px] font-semibold bg-green-400 text-green-900 px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span
                      className={`text-sm ${plan.highlighted ? "text-white/60" : "text-gray-400"}`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs mb-6 ${plan.highlighted ? "text-white/60" : "text-gray-400"}`}
                >
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check
                        className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-green-400" : "text-green-500"}`}
                      />
                      <span
                        className={`text-xs ${plan.highlighted ? "text-white/80" : "text-gray-600"}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-full text-sm font-medium transition ${
                    plan.highlighted
                      ? "bg-white text-[var(--brand-primary)] hover:bg-gray-100"
                      : "bg-[var(--brand-primary)] text-white hover:bg-gray-800"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section
        id="blog"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3">
              blog
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-bold leading-tight">
              Ideas to level-up your freelance game
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.title}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${i === 0 ? "md:col-span-2 lg:col-span-2 md:row-span-2" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div
                  className={`${i === 0 ? "h-48 md:h-64" : "h-32"} bg-gradient-to-br ${
                    i === 0
                      ? "from-blue-100 to-purple-100"
                      : i === 1
                        ? "from-orange-100 to-yellow-100"
                        : i === 2
                          ? "from-blue-50 to-cyan-100"
                          : "from-green-100 to-emerald-100"
                  }`}
                />
                <div className="p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {post.tag}
                  </span>
                  <h3
                    className={`font-semibold mt-1 leading-snug ${i === 0 ? "text-base" : "text-sm"}`}
                  >
                    {post.title}
                  </h3>
                  {i === 0 && (
                    <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                      Learn how to kickstart your journey into agency ownership
                      with our comprehensive guide.
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3">
              Community
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-bold">
              Stay in the loop
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                platform: "X / Twitter",
                followers: "15.2K followers",
                description:
                  "Stay updated on new features and discover how others are using Dreelio.",
                cta: "Follow us",
                color: "from-gray-900 to-gray-800",
              },
              {
                platform: "YouTube",
                followers: "32k subscribers",
                description:
                  "Tips, tutorials, and in-depth feature guides to enhance your workflow.",
                cta: "Subscribe",
                color: "from-red-600 to-red-500",
              },
            ].map((social, i) => (
              <motion.div
                key={social.platform}
                className="bg-[#FAFAFA] rounded-2xl p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">
                      {social.platform.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{social.followers}</p>
                    <p className="text-sm font-semibold">{social.platform}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {social.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-gray-800 transition"
                >
                  {social.cta} <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        className="py-24 lg:py-32 px-6 lg:px-12 sky-gradient"
      >
        <div className="absolute inset-0 cloud-layer pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight"
            {...fadeUp}
          >
            Ready to get started
          </motion.h2>
          <motion.p className="mt-4 text-gray-500 max-w-md mx-auto" {...fadeUp}>
            Download Dreelio for free. No credit card required.
          </motion.p>
          <motion.div className="mt-8" {...fadeUp}>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Try Dreelio free <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-12 bg-[var(--brand-bg)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[var(--brand-primary)] rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold">
                Dreelio
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Your favourite business management software. Built for early
              startup founders.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Pages</h4>
            <div className="space-y-2">
              {["Home", "Features", "Pricing", "Blog"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Information</h4>
            <div className="space-y-2">
              {["Contact", "Privacy", "Terms of use"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-xs text-center">
            &copy; 2026 Dreelio. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
