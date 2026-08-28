"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer past hydration so the toggle can read the resolved theme
    // without mismatching server-rendered markup.
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.03] text-ink transition-colors hover:border-ink/25 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/25"
    >
      <Sun
        aria-hidden="true"
        className="absolute h-[18px] w-[18px] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90"
        style={{ opacity: mounted && !isDark ? 1 : mounted ? 0 : 1 }}
      />
      <Moon
        aria-hidden="true"
        className="absolute h-[18px] w-[18px] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0"
        style={{ opacity: mounted && isDark ? 1 : mounted ? 0 : 0 }}
      />
    </button>
  );
}