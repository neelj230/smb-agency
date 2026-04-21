"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  Target,
  ArrowRight,
  Check,
  Menu,
  X,
  ChevronDown,
  ClipboardCheck,
  Eye,
  Brain,
  Shield,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Benefits", href: "#benefits" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Home", href: "/" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--brand-bg)]/90 backdrop-blur-xl border-b border-[var(--brand-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold text-sm">
            V
          </div>
          <span className="font-semibold text-white tracking-tight">
            Veradic AI
          </span>
          <span className="text-xs font-medium ml-1 text-white/50">
            for Teachers
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://veradicai.com"
            className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
              scrolled
                ? "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-dark)]"
                : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
            }`}
          >
            Get Started
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          {open ? (
            <X className={`w-5 h-5 ${scrolled ? "" : "text-white"}`} />
          ) : (
            <Menu className={`w-5 h-5 ${scrolled ? "" : "text-white"}`} />
          )}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--brand-surface)] border-b border-[var(--brand-border)] px-6 py-4 space-y-3"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm py-2 text-white/60"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://veradicai.com"
            className="block text-sm font-semibold text-center px-5 py-2.5 rounded-full bg-[var(--brand-primary)] text-white"
          >
            Get Started
          </a>
        </motion.div>
      )}
    </nav>
  );
}

/* ─── Dashboard Mockup ─── */
function DashboardMockup() {
  return (
    <div className="mockup-frame p-6 w-full max-w-[480px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-[#0F0D1B]">Class Overview</p>
          <p className="text-[11px] text-[var(--brand-muted)]">
            Period 3 — Algebra II
          </p>
        </div>
        <div className="mono-text text-[10px] px-2.5 py-1 rounded-full bg-[var(--brand-success)]/10 text-[var(--brand-success)] font-medium">
          28 students
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          {
            label: "Avg. Score",
            value: "78%",
            trend: "+5%",
            color: "text-[var(--brand-success)]",
          },
          {
            label: "Completion",
            value: "92%",
            trend: "+3%",
            color: "text-[var(--brand-success)]",
          },
          {
            label: "Struggling",
            value: "4",
            trend: "",
            color: "text-amber-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[var(--brand-bg-alt)] rounded-xl p-3"
          >
            <p className="text-[10px] text-[var(--brand-muted)] mb-1">
              {stat.label}
            </p>
            <p className="font-[family-name:var(--font-display)] font-bold text-lg text-[#0F0D1B]">
              {stat.value}
              {stat.trend && (
                <span
                  className={`text-[10px] not-italic font-normal ml-1 ${stat.color}`}
                >
                  {stat.trend}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-[#0F0D1B] mb-3">
          Common Mistakes
        </p>
        <div className="space-y-2">
          {[
            { topic: "Factoring trinomials", pct: 65, color: "bg-amber-400" },
            { topic: "Quadratic formula", pct: 45, color: "bg-red-400" },
            {
              topic: "Completing the square",
              pct: 72,
              color: "bg-[var(--brand-primary)]",
            },
          ].map((item) => (
            <div key={item.topic}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-[var(--brand-text-secondary)]">
                  {item.topic}
                </span>
                <span className="mono-text text-[10px] text-[var(--brand-muted)]">
                  {item.pct}% correct
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--brand-bg-alt)]">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-[var(--brand-border)]">
        <p className="text-xs font-semibold text-[#0F0D1B] mb-2">
          Needs Attention
        </p>
        <div className="flex gap-2">
          {["JM", "AK", "SR", "LP"].map((initials) => (
            <div
              key={initials}
              className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold flex items-center justify-center"
            >
              {initials}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[var(--brand-border)] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-base font-medium text-[#0F0D1B] pr-8">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--brand-muted)] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-[var(--brand-text-secondary)] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ─── */
export default function TeachersPage() {
  const benefits = [
    {
      icon: Eye,
      title: "See Solution Paths",
      desc: "View exactly how each student approached a problem — where they went right and where they diverged.",
      color: "bg-[var(--brand-primary)]/15 text-[var(--brand-primary-light)]",
    },
    {
      icon: Target,
      title: "Identify Weak Spots",
      desc: "Dashboard highlights the topics your class struggles with most, so you know what to re-teach.",
      color: "bg-cyan-500/15 text-cyan-400",
    },
    {
      icon: ClipboardCheck,
      title: "Assign Practice",
      desc: "Send targeted quizzes to individual students or the whole class. AI adapts difficulty per student.",
      color: "bg-[var(--brand-success)]/15 text-[var(--brand-success-light)]",
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      desc: "Week-over-week progress tracking per student and per topic. Export reports for parent conferences.",
      color: "bg-amber-500/15 text-amber-400",
    },
    {
      icon: Shield,
      title: "Academic Integrity",
      desc: "Veradic shows work process, not just answers. You can see if a student actually learned or just copied.",
      color: "bg-rose-500/15 text-rose-400",
    },
    {
      icon: Brain,
      title: "Pedagogy-First AI",
      desc: "Our AI is tuned to teach, not just solve. It asks students guiding questions before revealing steps.",
      color: "bg-indigo-500/15 text-indigo-400",
    },
  ];

  const faqs = [
    {
      q: "Is Veradic free for teachers?",
      a: "Yes. Teacher accounts are completely free. You get a dashboard, class management, and progress tracking at no cost. Students use the free tier for solving; premium features like unlimited quizzes are optional.",
    },
    {
      q: "Can students cheat with this?",
      a: "Veradic is designed to teach process, not hand out answers. Teachers can see the full solution path each student took. If a student just screenshots an answer without working through steps, you'll know.",
    },
    {
      q: "How do I set up my class?",
      a: "Create a teacher account, generate a class code, and share it with students. They join with one click. You'll see their activity within minutes.",
    },
    {
      q: "Does it align with curriculum standards?",
      a: "Our problem library covers Common Core, AP, and IB standards for math and science. You can also create custom problem sets aligned to your specific curriculum.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex items-center pt-16 overflow-hidden hero-gradient">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div {...fadeUp}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium mb-6 backdrop-blur-sm">
                  <Users className="w-3.5 h-3.5" />
                  For Educators
                </div>
              </motion.div>

              <motion.h1
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                className="font-[family-name:var(--font-display)] font-bold text-5xl md:text-6xl tracking-tight leading-[1.05] text-white"
              >
                See how your students actually think.
              </motion.h1>

              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                className="mt-6 text-lg text-white/70 max-w-lg leading-relaxed"
              >
                Veradic shows you every student&apos;s solution path — not just
                their answers. Spot misconceptions early. Teach smarter.
              </motion.p>

              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="https://veradicai.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0F0D1B] font-semibold text-sm hover:bg-gray-100 transition-all"
                >
                  Create Teacher Account <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.4 }}
                className="mt-8 flex items-center gap-6 text-sm text-white/50"
              >
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[var(--brand-success-light)]" />{" "}
                  Free for teachers
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[var(--brand-success-light)]" />{" "}
                  Set up in 2 minutes
                </span>
              </motion.div>
            </div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div className="float-slow">
                <DashboardMockup />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits Grid ── */}
      <section
        id="benefits"
        className="py-28 lg:py-36 px-6 bg-[var(--brand-bg)] text-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary-light)]">
              Why Teachers Love It
            </span>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight mt-4 text-white">
              Tools that actually help you teach.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[var(--brand-surface)] rounded-2xl p-7 border border-white/[0.06] hover:border-white/[0.12] transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center mb-4`}
                >
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--brand-muted)] leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard Showcase ── */}
      <section id="dashboard" className="py-28 lg:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                Dashboard
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-bold text-3xl md:text-4xl tracking-tight mt-4">
                Your class at a glance.
              </h2>
              <p className="mt-4 text-[var(--brand-text-secondary)] leading-relaxed">
                See average scores, completion rates, and which students need
                help — all in one place. No more guessing who&apos;s falling
                behind.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Real-time progress tracking per student",
                  "Common mistake analysis across the class",
                  "Export reports for admin and parents",
                  "Flag students who need intervention",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[var(--brand-text-secondary)]"
                  >
                    <Check className="w-4 h-4 text-[var(--brand-success)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="flex justify-center"
            >
              <DashboardMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        className="py-28 lg:py-36 px-6 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
              Getting Started
            </span>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight mt-4">
              Set up in minutes.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Create Account",
                desc: "Sign up with your school email. Verify your educator status in one step.",
              },
              {
                num: "02",
                title: "Share Class Code",
                desc: "Generate a class code and share it. Students join with one tap — no email required.",
              },
              {
                num: "03",
                title: "Watch Insights Flow",
                desc: "As students solve problems, your dashboard fills with actionable data about their understanding.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[var(--brand-surface)] rounded-3xl p-8 border border-[var(--brand-border)]"
              >
                <span className="mono-text text-2xl font-bold text-[var(--brand-primary)]">
                  {step.num}
                </span>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mt-3">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--brand-text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 lg:py-36 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
              FAQ
            </span>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight mt-4">
              Teacher questions
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="bg-[var(--brand-surface)] rounded-3xl border border-[var(--brand-border)] px-8"
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 lg:py-36 px-6 hero-gradient text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight">
              Teach with clarity.
            </h2>
            <p className="mt-6 text-lg text-white/60 max-w-md mx-auto">
              Join educators who use Veradic to understand how their students
              learn.
            </p>
            <div className="mt-10">
              <a
                href="https://veradicai.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0F0D1B] font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Create Free Teacher Account <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 bg-[var(--brand-bg)] text-[var(--brand-muted)] border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-display)] font-bold text-lg text-white">
            veradic
          </span>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Veradic AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
