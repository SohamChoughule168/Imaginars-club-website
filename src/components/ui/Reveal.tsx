"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/**
 * Purposeful scroll reveal. Respects user motion preferences via the
 * global <MotionConfig reducedMotion="user"> in the root layout.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}