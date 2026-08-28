"use client"

import React, { useState, useEffect, useRef } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Sparkles,
  ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import TextReveal from '@/components/ui/TextReveal'
import MagneticButton from '@/components/ui/MagneticButton'
import {
  services,
  stats,
  processSteps,
  testimonials,
} from '@/data/siteData'

/* ---------------------------------- utils --------------------------------- */

const easeOut = [0.16, 1, 0.3, 1] as const

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <span ref={ref} className="font-silkscreen text-4xl lg:text-5xl text-[#0B1120] dark:text-white tracking-tight">
      {inView ? <CountUp end={value} duration={2} useEasing separator="," /> : '0'}
      <span className="text-2xl text-blue-600 dark:text-blue-500">{suffix}</span>
    </span>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#0B1120]/60 dark:text-white/60">
      <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
      {children}
    </span>
  )
}

/* ---------------------------------- page ---------------------------------- */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500 overflow-x-clip">

      {/* ================================ 1. HERO ================================ */}
      <section ref={heroRef} className="relative h-[100svh] w-full flex flex-col overflow-hidden">
        {/* Background video with parallax zoom */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] dark:from-[#0B1120] via-black/25 to-black/50" />
          {/* film grain */}
          <div className="noise-overlay absolute inset-0 opacity-[0.06] pointer-events-none" />
        </motion.div>

        {/* Bottom anchored hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mt-auto px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12 lg:pb-28 w-full"
        >
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/90">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                Senior-led digital studio · Mumbai
              </span>
            </motion.div>

            <TextReveal
              as="h1"
              delay={200}
              className="text-5xl sm:text-6xl lg:text-8xl font-semibold leading-[1.02] tracking-tight text-white mb-6"
            >
              We build digital experiences that win.
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.7 }}
              className="text-lg sm:text-xl text-white/85 max-w-2xl mb-10 leading-relaxed font-light"
            >
              Websites, mobile apps and AI-driven products — grown with search,
              ads and content that measurably perform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.85 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <MagneticButton
                href="/contact"
                className="!px-9 !py-4 !text-sm !text-[#0B1120] !bg-white !border-white hover:!bg-gray-100 shadow-xl"
              >
                Start a project <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                href="/portfolio"
                variant="secondary"
                className="!bg-white/10 !backdrop-blur-md !border-white/20 hover:!bg-white/20"
              >
                See our work <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 right-6 lg:right-12 z-10 hidden sm:flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] [writing-mode:vertical-lr]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================== 2. STATISTICS ============================= */}
      <section className="py-20 sm:py-24 px-5 sm:px-8 lg:px-12 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex flex-col gap-2">
                  <StatNumber value={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-[#0B1120]/60 dark:text-white/50 font-medium">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =============================== 3. SERVICES ============================== */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <Eyebrow>What we do</Eyebrow>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0B1120] dark:text-white mb-4">
                Full-stack growth, under one roof.
              </h2>
              <p className="text-[#0B1120]/60 dark:text-white/60 leading-relaxed text-lg font-light">
                From first pixel to first customer — seven disciplines engineered
                to compound your growth.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 0.08}>
                <Link
                  href="/services"
                  className="group relative flex h-full flex-col items-start gap-6 p-8 rounded-3xl bg-white dark:bg-white/[0.02] shadow-xl dark:shadow-none border border-black/5 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-[#0B1120] dark:text-white group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500">
                    <service.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#0B1120] dark:text-white mb-3">{service.title}</h3>
                    <p className="text-[#0B1120]/60 dark:text-white/50 text-sm leading-relaxed">{service.shortDesc}</p>
                  </div>
                  <span className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-[#0B1120]/40 dark:text-white/40 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= 4. PROCESS ================================ */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-y border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <Eyebrow>How we work</Eyebrow>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0B1120] dark:text-white mb-4">
                A process built for momentum.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.12}>
                <div className="relative flex flex-col gap-5 pl-6 border-l border-black/10 dark:border-white/10">
                  <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  <div className="font-silkscreen text-4xl text-[#0B1120]/15 dark:text-white/15">{step.step}</div>
                  <h3 className="text-xl font-medium text-[#0B1120] dark:text-white">{step.title}</h3>
                  <p className="text-[#0B1120]/60 dark:text-white/50 leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 5. TESTIMONIALS ============================= */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Eyebrow>Client results</Eyebrow>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0B1120] dark:text-white mb-4">
                Numbers our clients brag about.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col gap-6 p-8 rounded-3xl bg-white dark:bg-white/[0.02] shadow-lg dark:shadow-none border border-black/5 dark:border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-blue-500 text-blue-500" />
                      ))}
                    </div>
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                      {t.result}
                    </span>
                  </div>
                  <blockquote className="text-[#0B1120]/70 dark:text-white/70 leading-relaxed text-lg italic font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 pt-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-nexum-gradient text-sm font-semibold text-white">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-[#0B1120] dark:text-white font-medium">{t.name}</div>
                      <div className="text-[#0B1120]/40 dark:text-white/40 text-sm font-medium">{t.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ 6. CTA ================================= */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-white dark:bg-transparent border border-black/10 dark:border-white/10 p-10 sm:p-20 text-center relative overflow-hidden shadow-2xl dark:shadow-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] pointer-events-none" />
            <div className="noise-overlay absolute inset-0 opacity-[0.04] pointer-events-none" />

            <div className="relative z-10">
              <TextReveal
                as="h2"
                className="justify-center text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0B1120] dark:text-white mb-6"
              >
                Ready to become the brand everyone talks about?
              </TextReveal>
              <p className="text-lg sm:text-xl text-[#0B1120]/60 dark:text-white/60 mb-10 max-w-2xl mx-auto font-light">
                Tell us where you want to be in 12 months. We'll engineer the
                shortest path there.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <MagneticButton
                  href="/contact"
                  className="!px-10 !py-5 !text-sm !text-white !bg-nexum-gradient hover:!opacity-90 shadow-xl"
                >
                  Get started today <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton
                  href="/services"
                  variant="secondary"
                  className="!text-[#0B1120] dark:!text-white !bg-black/5 dark:!bg-white/5 !border-black/10 dark:!border-white/10 hover:!bg-black/10 dark:hover:!bg-white/10"
                >
                  Explore services
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}