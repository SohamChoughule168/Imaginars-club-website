"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useId } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

/**
 * Word-by-word lift reveal for display typography. Renders the full text
 * (accessible — aria-label + visible text) and only animates the wrapping.
 * Respects reduced motion through the global MotionConfig.
 */
export default function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.045,
}: TextRevealProps) {
  const id = useId();
  const words = children.split(" ");

  return (
    <Tag className={cn("flex flex-wrap", className)} aria-label={children}>
      {words.map((word, index) => (
        <span
          key={`${id}-${index}`}
          aria-hidden="true"
          className="mr-[0.26em] last:mr-0 overflow-hidden pt-[0.08em] -mt-[0.08em] pb-[0.06em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{
              duration: 0.75,
              ease: EASE,
              delay: delay + index * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}