"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import LazyVideo from "@/components/ui/LazyVideo";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const OVERLAY_PNG =
  "https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png";

// Case Studies intro slide, then the real client work.
const SLIDES = [
  {
    slug: "",
    label: "Case Studies",
    badge: "Real projects, real impact, real growth",
    line1: "World-Class Work",
    line2: "For Visionary Brands",
    subtext:
      "Explore our success stories and see how we've helped businesses transform their digital presence.",
    videoSrc:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
    isDark: false,
  },
  ...portfolioData.map((p) => ({
    slug: p.slug,
    label: p.client,
    badge: p.badge,
    line1: p.headingLine1,
    line2: p.headingLine2,
    subtext: p.subtext,
    videoSrc: p.videoSrc,
    isDark: p.isDark,
  })),
];

export default function PortfolioPage() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSwitch = useCallback((index: number) => {
    setActive((current) => {
      if (index === current) return current;
      setPrevious(current);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setPrevious(null), 900);
      return index;
    });
  }, []);

  const slide = SLIDES[active];
  const isDark = slide.isDark;
  const textColor = isDark ? "text-[#0B1120]" : "text-white";

  return (
    <div className="w-full bg-[#F8FAFC] transition-colors duration-500 dark:bg-[#0B1120]">
      {/* ================ FULL-SCREEN CASE VIDEO SWITCHER ================ */}
      <section className="relative h-[100svh] w-full select-none overflow-hidden bg-[#0B1120] font-sans">
        {/* Active video layer */}
        <LazyVideo
          key={active}
          src={slide.videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Fading-out previous layer for a smooth crossfade */}
        {previous !== null && (
          <LazyVideo
            src={SLIDES[previous].videoSrc}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[900ms]"
          />
        )}

        {/* Decorative PNG overlay */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <Image
            src={OVERLAY_PNG}
            alt=""
            fill
            sizes="100vw"
            className="animate-train-bob object-cover opacity-70"
            priority
          />
        </div>

        {/* Gradient for legibility */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/40" />

        {/* Content */}
        <div className="relative z-[2] flex h-full flex-col px-5 pb-6 pt-28 sm:px-8 sm:pb-8 sm:pt-32">
<div
            className={cn(
              "flex flex-grow flex-col items-center justify-center text-center transition-colors duration-700",
              textColor
            )}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md sm:text-[11px] sm:tracking-[0.24em]">
              {slide.badge}
            </div>

            <h1 className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl lg:text-[5rem]">
              {slide.line1}{" "}
              <span className="serif-accent text-white/80">{slide.line2}</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {slide.subtext}
            </p>

            {slide.slug && (
              <Link
                href={`/portfolio/${slide.slug}`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20"
              >
                Read the case study
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}
          </div>

          {/* Slide controls */}
          <div
            role="tablist"
            aria-label="Selected work"
            className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-1"
          >
            {SLIDES.map((s, idx) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={active === idx}
                aria-label={`Show ${s.label}`}
                onClick={() => handleSwitch(idx)}
                className={cn(
                  "rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors sm:px-4 sm:text-[11px]",
                  active === idx
                    ? "bg-white text-[#0B1120]"
                    : "text-white/60 hover:text-white"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WORK ARCHIVE ===================== */}
      <section className="border-t border-ink/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-10 dark:border-white/10">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal className="mb-16 max-w-2xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
              Work archive
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
              Selected projects, real outcomes.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed opacity-65">
              A comprehensive collection of our digital transformation projects
              across industries.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioData.map((project, idx) => (
              <Reveal key={project.slug} delay={Math.min(idx * 0.05, 0.2)}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block h-full overflow-hidden rounded-[1.75rem] border border-ink/10 bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(11,17,32,0.05),0_24px_48px_-12px_rgba(11,17,32,0.18)] dark:border-white/10 dark:bg-ink-raised dark:shadow-none"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <LazyVideo
                      src={project.videoSrc}
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex flex-col p-7">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                      {project.industry}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                      {project.headingLine1} {project.headingLine2}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed opacity-60">
                      {project.subtext}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                      View case study
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Results strip */}
          <Reveal className="mt-20">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-ink/10 pt-10 font-mono text-[11px] uppercase tracking-[0.22em] opacity-55 dark:border-white/10 sm:gap-x-12">
              <span>350% avg. ROI increase</span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-ink/20 sm:block dark:bg-white/20" />
              <span>150+ successful projects</span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-ink/20 sm:block dark:bg-white/20" />
              <span>98% client satisfaction</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
