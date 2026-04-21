"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const display = useTransform(
    rounded,
    (v) => `${prefix}${v.toLocaleString()}${suffix}`,
  );

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration, ease: "easeOut" });
    }
  }, [isInView, count, target, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
