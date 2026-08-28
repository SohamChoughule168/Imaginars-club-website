"use client";

import { LinkedInIcon } from "@/components/ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { SITE } from "@/lib/utils";
import { contactSchema, SERVICE_OPTIONS, type ContactInput } from "@/lib/validation";

const CONTACT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-ink/30 transition-colors focus:border-accent focus:outline-none dark:border-white/10 dark:bg-ink-raised dark:text-white dark:placeholder:text-white/30";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(
          data?.error ?? "Something went wrong. Please try again or email us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error — please try again or email us directly at " + SITE.email + "."
      );
    }
  };

  return (
    <div className="relative w-full overflow-x-clip bg-[#F8FAFC] font-sans text-ink transition-colors duration-500 dark:bg-[#0B1120] dark:text-white">
      {/* Fixed ambient video */}
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full">
        <video
          src={CONTACT_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/70 via-[#F8FAFC]/40 to-[#F8FAFC] dark:from-[#0B1120]/70 dark:via-[#0B1120]/40 dark:to-[#0B1120]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-10">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
                Contact
              </span>
            </Reveal>
            <TextReveal
              as="h1"
              className="mt-7 text-5xl font-semibold leading-[1.0] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
            >
              Let&apos;s build something worth talking about.
            </TextReveal>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-xl text-[15px] leading-relaxed opacity-70 sm:text-lg">
                Tell us where you want to be in 12 months. We respond within one
                business day with honest, senior-level advice — no pressure.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#contact-form" size="lg" endIcon={<ArrowRight className="h-4 w-4" />}>
                  Send a message
                </Button>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full border border-ink/15 px-8 text-[15px] font-medium transition-colors hover:border-ink/30 dark:border-white/15 dark:hover:border-white/30"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {SITE.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Form + info */}
        <section
          id="contact-form"
          className="border-t border-ink/10 bg-[#F8FAFC]/90 px-5 py-24 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0B1120]/90 sm:px-8 sm:py-32 lg:px-10"
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                  <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
                  Start the conversation
                </span>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  Send us a message
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6" noValidate>
                  {/* Honeypot */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("website")}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium opacity-80">
                        Full name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="name"
                        placeholder="Your name"
                        autoComplete="name"
                        className={inputBase}
                        aria-invalid={Boolean(errors.name)}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium opacity-80">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        autoComplete="email"
                        className={inputBase}
                        aria-invalid={Boolean(errors.email)}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium opacity-80">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 ..."
                        autoComplete="tel"
                        className={inputBase}
                        {...register("phone")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium opacity-80">
                        Company
                      </label>
                      <input
                        id="company"
                        placeholder="Company / brand"
                        autoComplete="organization"
                        className={inputBase}
                        {...register("company")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium opacity-80">
                      What do you need help with?
                    </label>
                    <select id="service" className={inputBase} {...register("service")}>
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
<div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium opacity-80">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="What are you trying to achieve?"
                      className={`${inputBase} resize-y`}
                      aria-invalid={Boolean(errors.message)}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {status === "success" && (
                    <div
                      className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300"
                      role="status"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-semibold">Message sent — thank you.</p>
                        <p className="mt-1 opacity-80">
                          We&apos;ll get back to you within one business day.
                        </p>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div
                      className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
                      role="alert"
                    >
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    startIcon={
                      status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : undefined
                    }
                  >
                    {status === "loading" ? "Sending…" : "Send message"}
                  </Button>
                </form>
              </Reveal>
            </div>
{/* Info column */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <Reveal>
                <div className="rounded-3xl border border-ink/10 bg-surface p-8 dark:border-white/10 dark:bg-ink-raised sm:p-10">
                  <h2 className="text-lg font-semibold tracking-tight">Reach us directly</h2>
                  <p className="mt-2 text-sm opacity-60">
                    Prefer email or a call? We typically respond within 24 hours.
                  </p>
                  <div className="mt-7 flex flex-col gap-5">
                    <a
                      href={SITE.phoneHref}
                      className="flex items-center gap-4 text-[15px] font-medium transition-opacity hover:opacity-70"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-ink/[0.03] text-accent dark:border-white/10 dark:bg-white/[0.04]">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {SITE.phone}
                    </a>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="flex items-center gap-4 text-[15px] font-medium transition-opacity hover:opacity-70"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-ink/[0.03] text-accent dark:border-white/10 dark:bg-white/[0.04]">
                        <Mail className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {SITE.email}
                    </a>
                    <div className="flex items-center gap-4 text-[15px]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-ink/[0.03] text-accent dark:border-white/10 dark:bg-white/[0.04]">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed opacity-75">
                        {SITE.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[15px]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-ink/[0.03] text-accent dark:border-white/10 dark:bg-white/[0.04]">
                        <Clock className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed opacity-75">
                        Mon–Sat · 9:00–19:00 IST
                      </span>
                    </div>
                    <a
                      href={SITE.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 text-[15px] font-medium transition-opacity hover:opacity-70"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-ink/[0.03] text-accent dark:border-white/10 dark:bg-white/[0.04]">
                        <LinkedInIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      ImaginarsClub on LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="rounded-3xl border border-ink/10 bg-surface p-8 dark:border-white/10 dark:bg-ink-raised sm:p-10">
                  <h2 className="text-lg font-semibold tracking-tight">What happens next?</h2>
                  <ol className="mt-6 space-y-5">
                    {[
                      "We reply within one business day with a free consultation slot.",
                      "A senior member of the team reviews your goals — not a sales script.",
                      "You get a clear, honest proposal with scope, timeline and pricing.",
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-medium text-accent">
                          {i + 1}
                        </span>
                        <p className="text-sm leading-relaxed opacity-75">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
