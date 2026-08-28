"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { servicesData } from "@/data/services";

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "Understanding your business, goals, and requirements",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "Creating a customized roadmap for success",
  },
  {
    step: "03",
    title: "Execution",
    desc: "Building and implementing your solution",
  },
  {
    step: "04",
    title: "Optimization",
    desc: "Continuous improvement and support",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full overflow-x-clip bg-[#F8FAFC] font-sans text-ink transition-colors duration-500 dark:bg-[#0B1120] dark:text-white">
      {/* Hero */}
      <section className="px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
              Services
            </span>
          </Reveal>
          <TextReveal
            as="h1"
            className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
          >
            A full-stack digital partner for your brand.
          </TextReveal>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-2xl text-[15px] leading-relaxed opacity-65 sm:text-base">
              From the first concept to the last conversion — design,
              engineering, AI and growth under one roof. Fourteen services, one
              accountable team.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" endIcon={<ArrowRight className="h-4 w-4" />}>
                Start a project
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg">
                See the work
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Catalog */}
      <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {servicesData.map((service, i) => (
              <li key={service.slug}>
                <Reveal delay={Math.min(i * 0.03, 0.2)}>
                  <a
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col gap-5 rounded-3xl border border-ink/10 bg-surface p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(11,17,32,0.05),0_24px_48px_-12px_rgba(11,17,32,0.18)] dark:border-white/10 dark:bg-ink-raised dark:shadow-none sm:p-9"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-ink/10 bg-ink/[0.03] text-ink transition-colors duration-300 group-hover:border-accent/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                        >
                          <service.icon className="h-5 w-5" strokeWidth={1.5} />
                        </span>
                      </div>
                      <ArrowUpRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-40" />
                    </div>

                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {service.title}
                    </h2>
                    <p className="text-sm leading-relaxed opacity-60">
                      {service.desc}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {service.features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-ink/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] opacity-55 dark:border-white/10"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </a>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
{/* Process */}
      <section className="bg-[#0B1120] py-24 text-white sm:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-[#7AA5F5]">
              <span aria-hidden="true" className="h-px w-8 bg-[#7AA5F5]/40" />
              Our process
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
              A proven methodology that delivers.
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <li key={step.step}>
                <Reveal delay={i * 0.08}>
                  <div className="border-t border-white/15 pt-6">
                    <span className="serif-accent text-4xl text-white/30">{step.step}</span>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{step.desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-24 text-center sm:px-8 sm:py-32 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <TextReveal
              as="h2"
              className="justify-center text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl"
            >
              Not sure where to start? Let&apos;s map it together.
            </TextReveal>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed opacity-65 sm:text-base">
              Tell us about your goals and we&apos;ll recommend the right combination
              of services — with no obligation.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" endIcon={<ArrowRight className="h-4 w-4" />}>
                Book a free consultation
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                Learn about the studio
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}