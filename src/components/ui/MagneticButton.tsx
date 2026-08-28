"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "./Marquee";

const finePointerSubscribe = (onChange: () => void) => {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getFinePointerSnapshot = () => window.matchMedia("(pointer: fine)").matches;

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  /** Maximum travel distance in px from the centre. */
  strength?: number;
  /** Radius (px) within which the button reacts to the cursor. */
  radius?: number;
}

/**
 * Cursor-magnetic CTA. Desktop (fine pointer) enhancements only; disabled for
 * touch users and under reduced motion so behaviour stays predictable.
 */
export default function MagneticButton({
  children,
  className,
  href,
  strength = 0.35,
  radius = 120,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = usePrefersReducedMotion();
  const finePointer = useSyncExternalStore(
    finePointerSubscribe,
    getFinePointerSnapshot,
    () => false
  );
  const enabled = finePointer && !reduce;

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      setOffset(dist < radius ? { x: dx * strength, y: dy * strength } : { x: 0, y: 0 });
    };

    const handleLeave = () => setOffset({ x: 0, y: 0 });

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, strength, radius]);

  const active = offset.x !== 0 || offset.y !== 0;

  return (
    <div
      ref={ref}
      className="inline-block"
      style={{
        transform: active ? `translate(${offset.x}px, ${offset.y}px)` : undefined,
        transition: active
          ? "transform 0.12s linear"
          : "transform 0.5s cubic-bezier(0.25,1,0.5,1)",
      }}
    >
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center justify-center rounded-full font-medium transition-colors duration-300",
          className
        )}
      >
        {children}
      </Link>
    </div>
  );
}