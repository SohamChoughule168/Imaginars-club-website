"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

/**
 * Animated number with mono numerals. Counts up once when scrolled into view.
 */
export default function Stat({ value, suffix = "", label, className }: StatProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)}>
      <div className="font-mono text-3xl font-medium tracking-tight sm:text-4xl">
        {inView ? (
          <CountUp end={value} duration={1.6} useEasing separator="," />
        ) : (
          "0"
        )}
        {suffix && <span className="text-accent">{suffix}</span>}
      </div>
      <div className="text-xs font-medium uppercase tracking-[0.14em] opacity-50 sm:text-[13px]">
        {label}
      </div>
    </div>
  );
}