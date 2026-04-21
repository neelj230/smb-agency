"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ZoomOutRevealProps {
  children: React.ReactNode;
  className?: string;
  startScale?: number;
  endScale?: number;
}

export function ZoomOutReveal({
  children,
  className = "",
  startScale = 1.4,
  endScale = 1,
}: ZoomOutRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [startScale, endScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ scale, opacity }}>{children}</motion.div>
    </div>
  );
}
