import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { SITE } from "@/lib/utils";

const EXPLORE = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const OFFERINGS = [
  "Web Development",
  "Mobile App Development",
  "AI Solutions & Automation",
  "Digital Marketing & Ads",
  "Video & Multimedia",
  "Brand Management",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-[#F8FAFC] dark:border-white/10 dark:bg-[#0B1120]">
      <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.jpg"
                alt="ImaginarsClub Services logo"
                width={32}
                height={32}
                className="h-7 w-7 rounded-md object-contain"
              />
              <span className="text-lg font-semibold tracking-tight">
                ImaginarsClub
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed opacity-60">
              A senior-led digital studio in Mumbai. We build websites, apps and
              AI products — and grow them with search, ads and content that
              perform.
            </p>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
              Follow us on LinkedIn
            </a>
          </div>

          {/* Explore */}
          <nav aria-label="Footer — explore" className="flex flex-col gap-3">
            <h2 className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.3em] opacity-40">
              Explore
            </h2>
            {EXPLORE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm opacity-70 transition-opacity hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Services */}
          <nav aria-label="Footer — services" className="flex flex-col gap-3">
            <h2 className="mb-1 font-mono text-[11px] font-medium uppercase tracking-[0.3em] opacity-40">
              What we do
            </h2>
            {OFFERINGS.map((service) => (
              <Link
                key={service}
                href="/services"
                className="w-fit text-sm opacity-70 transition-opacity hover:opacity-100"
              >
                {service}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] opacity-40">
              Contact
            </h2>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-3 text-sm opacity-70 transition-opacity hover:opacity-100"
            >
              <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-sm opacity-70 transition-opacity hover:opacity-100"
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
              {SITE.email}
            </a>
            <p className="flex items-start gap-3 text-sm leading-relaxed opacity-60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {SITE.address}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] opacity-40">
              Mon–Sat · 9:00–19:00 IST
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row dark:border-white/10">
          <p className="text-xs opacity-50">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-40">
            Made in Mumbai, India
          </p>
        </div>
      </div>
    </footer>
  );
}