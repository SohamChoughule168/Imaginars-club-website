"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import Stat from "@/components/ui/Stat";
import { services, stats, processSteps, testimonials } from "@/data/siteData";
import { SITE } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4";

const MARQUEE_ITEMS = [
  "Websites",
  "Mobile Apps",
  "AI Automation",
  "Search & SEO",
  "Meta Ads",
  "Video Content",
  "Brand Identity",
];

/** Map homepage service ids to catalog slugs (see /services). */
const SERVICE_SLUGS: Record<string, string> = {
  "web-dev": "web-development",
  mobile: "mobile-app-development",
  ai: "ai-driven-website-solutions",
  marketing: "digital-marketing",
  video: "video-editing",
  brand: "brand-management",
  thumbnail: "thumbnail-generation",
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div className="w-full overflow-x-clip bg-[#F8FAFC] transition-colors duration-500 dark:bg-[#0B1120]">
      {/* ================================ HERO ================================ */}
      <section
        ref={heroRef}
        className="relative flex h-[100svh] w-full flex-col overflow-hidden"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <video
            src={HERO_VIDEO}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-black/25 to-black/50 dark:from-[#0B1120]" />
          <div className="noise-overlay absolute inset-0 opacity-[0.05]" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mt-auto w-full px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-white/90 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Senior-led studio · Mumbai
                </span>
              </motion.div>

              <TextReveal
                as="h1"
                delay={0.05}
                className="mt-8 text-5xl font-semibold leading-[1.0] tracking-[-0.03em] text-white sm:text-6xl lg:text-8xl"
              >
                We build digital experiences that win.
              </TextReveal>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
                className="mt-8 max-w-2xl text-base font-light leading-relaxed text-white/85 sm:text-xl"
              >
                Websites, mobile apps and AI-driven products — grown with
                search, ads and content that measurably perform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <MagneticButton
                  href="/contact"
                  className="bg-white px-8 py-3.5 text-[15px] font-medium text-[#0B1120] shadow-[0_1px_2px_rgba(11,17,32,0.2),0_10px_24px_-8px_rgba(0,0,0,0.5)] hover:bg-white/90"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton
                  href="/portfolio"
                  className="border border-white/25 bg-white/5 px-8 py-3.5 text-[15px] font-medium text-white backdrop-blur-md hover:border-white/50 hover:bg-white/10"
                >
                  See our work
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-2 text-white/60 sm:flex lg:right-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>

        {/* Hero meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-6 left-6 z-10 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 md:block lg:left-10"
        >
          Est. 2024 — Mumbai, India
        </motion.div>
{/* ========================= CAPABILITIES MARQUEE ======================== */}
      <div className="relative z-10 border-y border-ink/10 bg-[#F8FAFC] py-5 transition-colors duration-500 dark:border-white/10 dark:bg-[#0B1120]">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      {/* ============================== MANIFESTO ============================== */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                  The studio
                  <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
                </span>
              </Reveal>
              <TextReveal
                as="h2"
                className="mt-7 text-3xl font-semibold leading-[1.06] tracking-[-0.03em] text-balance sm:text-4xl lg:text-[3.4rem]"
              >
                We are a senior-led studio that builds digital products worth
                your customer&apos;s time.
              </TextReveal>
            </div>

            <div className="flex flex-col justify-end lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="max-w-md text-[15px] leading-relaxed opacity-65 sm:text-base">
                  ImaginarsClub is a project-based studio in Mumbai. Senior
                  people plan, design and ship your website, app or AI product —
                  then grow it with search, ads and content that measurably
                  perform. One accountable team, end to end.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-12 bg-accent/50" aria-hidden="true" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] opacity-50">
                    Est. 2024 · Mumbai, India
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Stats */}
          <Reveal delay={0.15} className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-ink/10 pt-12 dark:border-white/10 sm:mt-28 lg:grid-cols-4">
            {stats.map((stat) => (
              <Stat
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </Reveal>
        </div>
      </section>
      </section>
{/* =============================== SERVICES =============================== */}
      <section id="services" className="border-t border-ink/10 py-24 transition-colors duration-500 sm:py-32 dark:border-white/10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
                What we do
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
                One team, every discipline you need
                <span className="serif-accent text-accent"> to grow.</span>
              </h2>
            </div>
            <Button href="/services" variant="secondary" endIcon={<ArrowUpRight className="h-4 w-4" />}>
              View all services
            </Button>
          </div>

          <ol className="divide-y divide-ink/10 dark:divide-white/10">
            {services.map((service, i) => (
              <li key={service.id}>
                <Reveal delay={Math.min(i * 0.04, 0.2)}>
                  <a
                    href={`/services/${SERVICE_SLUGS[service.id] ?? "services"}`}
                    className="group grid grid-cols-1 gap-3 py-8 transition-all duration-300 sm:grid-cols-12 sm:items-baseline sm:gap-6 hover:bg-ink/[0.015] dark:hover:bg-white/[0.02] sm:px-3"
                  >
                    <span className="font-mono text-sm text-accent sm:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight sm:col-span-4 sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-60 sm:col-span-5">
                      {service.shortDesc}
                    </p>
                    <span className="hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent transition-transform duration-300 group-hover:translate-x-1 sm:col-span-2 sm:flex">
                      View
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
{/* ================================ PROCESS =============================== */}
      <section className="bg-[#0B1120] py-24 text-white sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-[#7AA5F5]">
              <span aria-hidden="true" className="h-px w-8 bg-[#7AA5F5]/40" />
              How we work
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
              A process built for momentum.
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
            {processSteps.map((step, i) => (
              <li key={step.step}>
                <Reveal delay={i * 0.1}>
                  <div className="border-t border-white/15 pt-6">
                    <span className="font-mono text-sm text-white/40">
                      {step.step}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================== TESTIMONIALS ============================ */}
      <section id="testimonials" className="py-24 sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
              Client results
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
              Numbers our clients brag about.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col gap-6 rounded-3xl border border-ink/10 bg-surface p-8 shadow-[0_1px_2px_rgba(11,17,32,0.04),0_8px_24px_-8px_rgba(11,17,32,0.12)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-ink-raised dark:shadow-none">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1" aria-hidden="true">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
                      {t.result}
                    </span>
                  </div>
                  <blockquote className="flex-1 leading-relaxed text-[15px] opacity-80">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-4 border-t border-ink/10 pt-5 dark:border-white/10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-nexum-gradient text-sm font-semibold text-white">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-[13px] opacity-50">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
{/* ================================= CTA ================================= */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white p-10 text-center shadow-[0_2px_4px_rgba(11,17,32,0.05),0_24px_48px_-12px_rgba(11,17,32,0.18)] sm:p-16 dark:border-white/10 dark:bg-ink-raised dark:shadow-none lg:p-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full bg-accent/10 blur-[100px] dark:bg-accent/20"
            />
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03]" />

            <div className="relative z-10">
              <TextReveal
                as="h2"
                className="justify-center text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl"
              >
                Ready to become the brand everyone talks about?
              </TextReveal>
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed opacity-65 sm:text-base">
                Tell us where you want to be in 12 months. We&apos;ll engineer the
                shortest path there.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href="/contact"
                  size="lg"
                  endIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Get started today
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Explore services
                </Button>
              </div>

              <div className="mx-auto mt-12 flex max-w-lg flex-col items-center justify-center gap-3 border-t border-ink/10 pt-8 sm:flex-row sm:gap-8 dark:border-white/10">
                <a
                  href={SITE.phoneHref}
                  className="font-mono text-xs uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100"
                >
                  {SITE.phone}
                </a>
                <span aria-hidden="true" className="hidden h-3 w-px bg-ink/20 sm:block dark:bg-white/20" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-mono text-xs uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}