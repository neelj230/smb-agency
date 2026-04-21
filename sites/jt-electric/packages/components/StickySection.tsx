"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StickySectionProps {
  index: number;
  children: React.ReactNode;
  className?: string;
  scaleOnScroll?: boolean;
}

export function StickySection({
  index,
  children,
  className = "",
  scaleOnScroll = true,
}: StickySectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, scaleOnScroll ? 0.95 : 1],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.6]);

  return (
    <div ref={ref} className="sticky top-0" style={{ zIndex: index }}>
      <motion.div
        style={{ scale, opacity }}
        className={`min-h-screen ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
