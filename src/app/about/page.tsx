"use client";

import { ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";

const ABOUT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const VALUES = [
  {
    title: "Excellence",
    desc: "We maintain the highest standards in everything we do, from code to customer service.",
  },
  {
    title: "Agility",
    desc: "We adapt quickly to changing market needs and deliver solutions with speed.",
  },
  {
    title: "Ownership",
    desc: "Senior people stay accountable for outcomes — the project you start is the project you ship.",
  },
  {
    title: "Truth in numbers",
    desc: "We measure what matters: conversions, traffic, retention and ROI. If we can't track it, we don't claim it.",
  },
];

const TEAM = [
  { num: "8", label: "Leadership Team", desc: "Seasoned professionals with 15+ years of experience" },
  { num: "25", label: "Developers", desc: "Expert engineers across web, mobile and AI" },
  { num: "12", label: "Designers", desc: "Creative minds crafting distinctive experiences" },
  { num: "15", label: "Marketing Specialists", desc: "Data-driven strategists and content creators" },
];

const ACHIEVEMENTS = [
  { num: "200+", label: "Projects Completed" },
  { num: "150+", label: "Satisfied Clients" },
  { num: "98%", label: "Client Retention Rate" },
  { num: "24/7", label: "Dedicated Support" },
];

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-[#F8FAFC] font-sans text-ink transition-colors duration-500 dark:bg-[#0B1120] dark:text-white">
      {/* Fixed background video */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full">
        <video
          src={ABOUT_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/60 via-transparent to-[#F8FAFC] dark:from-[#0B1120]/60 dark:to-[#0B1120]" />
      </div>

      <div className="relative z-10 w-full">
        {/* Hero */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
              The story so far
              <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
            </span>
          </Reveal>
          <TextReveal
            as="h1"
            className="mt-8 max-w-6xl justify-center text-5xl font-semibold leading-[1.0] tracking-[-0.03em] sm:text-6xl lg:text-[5.5rem]"
          >
            Engineering masterpieces that transform the digital world.
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-base font-medium leading-relaxed opacity-70 sm:text-lg">
              We are a project-based studio in Mumbai, dedicated to empowering
              businesses through comprehensive digital transformation solutions.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="#story"
                size="lg"
                endIcon={<ArrowDown className="h-4 w-4" />}
              >
                Explore our story
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Work with us
              </Button>
            </div>
          </Reveal>
        </section>

        {/* Our Story */}
        <section id="story" className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-ink/10 bg-white/85 p-10 shadow-[0_2px_4px_rgba(11,17,32,0.05),0_24px_48px_-12px_rgba(11,17,32,0.18)] backdrop-blur-xl sm:p-16 dark:border-white/10 dark:bg-[#111A30]/85 dark:shadow-none">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h2 className="serif-accent text-4xl sm:text-5xl">Our Story</h2>
                  <span aria-hidden="true" className="mt-6 block h-px w-16 bg-accent/50" />
                </div>
                <div className="space-y-6 text-[15px] leading-relaxed opacity-75 sm:text-base lg:col-span-8">
                  <p>
                    Founded with a vision to democratize digital excellence,
                    ImaginarsClub Services has grown from a small startup into a
                    trusted partner for businesses seeking comprehensive digital
                    transformation.
                  </p>
                  <p>
                    Our journey began when our founders recognised a critical gap
                    in the market: businesses needed more than individual
                    services — they needed an integrated partner who could handle
                    their entire digital ecosystem with expertise and care.
                  </p>
                  <p>
                    Today we serve clients across industries, from innovative
                    startups to established enterprises, delivering solutions
                    that pair modern technology with strategic business
                    thinking.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Mission / Vision */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                label: "Mission",
                title: "Make ambitious brands impossible to ignore.",
                desc: "We build and grow digital products that earn attention, convert visitors, and compound into measurable business results.",
              },
              {
                label: "Vision",
                title: "Digital excellence for every ambitious business.",
                desc: "A world where great digital work is not reserved for big budgets — where strategy, design and engineering work as one accountable team.",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white/85 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-[#111A30]/85 sm:p-12">
                  <div>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                      {item.label}
                    </span>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-6 text-sm leading-relaxed opacity-65 sm:text-[15px]">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-12">
              <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
                What we stand for
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Principles that shape every delivery.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((val, i) => (
                <Reveal key={val.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col gap-4 rounded-3xl border border-ink/10 bg-white/80 p-8 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[#111A30]/80">
                    <span className="font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {val.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-60">{val.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Team & Achievements */}
        <section className="px-5 pb-28 sm:px-8 sm:pb-36 lg:px-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-[2.5rem] border border-ink/10 bg-white/85 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-[#111A30]/85 sm:p-14">
                <h3 className="serif-accent text-4xl">Our team</h3>
                <p className="mt-4 text-[15px] leading-relaxed opacity-65">
                  A diverse group of senior experts passionate about delivering
                  exceptional digital solutions.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {TEAM.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-mono text-4xl font-medium tracking-tight text-accent">
                        {stat.num}
                      </div>
                      <div className="mt-2 text-base font-semibold">{stat.label}</div>
                      <div className="mt-1 text-sm opacity-55">{stat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-[2.5rem] border border-ink/10 bg-white/85 p-10 backdrop-blur-xl dark:border-white/10 dark:bg-[#111A30]/85 sm:p-14">
                <h3 className="serif-accent text-4xl">Our achievements</h3>
                <p className="mt-4 text-[15px] leading-relaxed opacity-65">
                  Work delivered with the client&apos;s numbers in mind.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-8">
                  {ACHIEVEMENTS.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-start rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 dark:border-white/10 dark:bg-white/[0.03]"
                    >
                      <div className="font-mono text-4xl font-medium tracking-tight text-accent">
                        {stat.num}
                      </div>
                      <div className="mt-2 text-sm font-medium opacity-70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}
