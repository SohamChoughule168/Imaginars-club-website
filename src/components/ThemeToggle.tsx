"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#0B1120]/10 dark:border-white/10 bg-white/50 dark:bg-[#0B1120]/50 backdrop-blur-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 text-[#0B1120] dark:text-transparent transition-all dark:scale-0 scale-100 absolute rotate-0 dark:-rotate-90" />
      <Moon className="h-4 w-4 text-transparent dark:text-[#F8FAFC] transition-all scale-0 dark:scale-100 absolute rotate-90 dark:rotate-0" />
    </button>
  )
}
