"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { TeamMember } from "./types";

interface TeamGridProps {
  heading?: string;
  subheading?: string;
  members: TeamMember[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

export function TeamGrid({
  heading = "Meet Our Team",
  subheading,
  members: rawMembers,
}: TeamGridProps) {
  // Safety net: only show members with real photos
  const members = rawMembers.filter((m) => m.image);
  if (members.length === 0) return null;
  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--brand-text)]">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-5 text-lg md:text-xl text-[var(--brand-muted)] max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </motion.div>
        <motion.div
          {...staggerContainer}
          className={`grid gap-10 ${members.length <= 2 ? "md:grid-cols-2 max-w-2xl mx-auto" : members.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}
        >
          {members.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerItem}
              className="text-center group"
            >
              {member.image ? (
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-sm ring-1 ring-black/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-2xl bg-[var(--brand-primary)]/[0.07] mb-6 flex items-center justify-center">
                  <span className="font-display text-6xl text-[var(--brand-primary)]/20">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="font-display text-xl font-semibold text-[var(--brand-text)]">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--brand-muted)] mt-1">
                {member.role}
              </p>
              {member.credentials && member.credentials.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                  {member.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="px-2.5 py-1 bg-[var(--brand-primary)]/[0.07] text-[var(--brand-primary)] text-xs font-medium rounded-full"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              )}
              {member.bio && (
                <p className="mt-4 text-sm text-[var(--brand-muted)] leading-relaxed">
                  {member.bio}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
