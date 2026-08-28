"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  slow?: boolean;
  separator?: string;
}

/**
 * CSS-driven infinite marquee for a capabilities strip.
 * Duplicates content for a seamless loop; purely decorative, aria-hidden.
 */
export default function Marquee({
  items,
  className,
  slow = false,
  separator = "✦",
}: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max items-center",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {row.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-10 pr-10"
          >
            <span className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.22em] opacity-60">
              {item}
            </span>
            <span className="text-xs text-accent/70">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Reactive `prefers-reduced-motion` flag (SSR-safe via useSyncExternalStore). */
const reduceMotionSubscribe = (onChange: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getReduceMotionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    reduceMotionSubscribe,
    getReduceMotionSnapshot,
    () => false
  );
}