"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "border-b border-ink/10 bg-[#F8FAFC]/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B1120]/85"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="ImaginarsClub Services — home"
          >
            <Image
              src="/logo.jpg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-md object-contain"
            />
            <span className="text-[17px] font-semibold tracking-tight text-ink dark:text-white">
              ImaginarsClub
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-accent"
                    : "text-ink/70 hover:text-ink dark:text-white/70 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link
              href="/contact"
              className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-nexum-gradient px-5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(11,17,32,0.1),0_8px_20px_-6px_rgba(11,17,32,0.45)] transition-all hover:brightness-110"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.03] text-ink dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            >
              <Menu
                className={cn(
                  "absolute h-5 w-5 transition-all duration-300",
                  menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute h-5 w-5 transition-all duration-300",
                  menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                )}
              />
            </button>
          </div>
        </nav>
      </header>
{/* Mobile navigation panel */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-[#F8FAFC]/97 backdrop-blur-2xl transition-opacity duration-400 md:hidden dark:bg-[#0B1120]/97",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="mt-24 flex flex-col gap-1 px-6">
          {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex items-center justify-between border-b border-ink/10 py-4 text-2xl font-semibold tracking-tight transition-all duration-500 dark:border-white/10",
                menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                isActive(link.href)
                  ? "text-accent"
                  : "text-ink dark:text-white"
              )}
              style={{ transitionDelay: menuOpen ? `${60 + i * 50}ms` : "0ms" }}
            >
              {link.label}
              <ArrowUpRight className="h-5 w-5 opacity-40" />
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "mt-8 inline-flex h-12 items-center justify-center rounded-full bg-nexum-gradient text-base font-medium text-white transition-all duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? "360ms" : "0ms" }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}