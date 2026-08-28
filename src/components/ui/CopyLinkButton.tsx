"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";

/** Copies the current page URL; shows a temporary "copied" confirmation. */
export default function CopyLinkButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Link copied" : "Copy link to this article"}
      className={
        className ??
        "w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white hover:border-blue-600 dark:hover:border-blue-500 transition-colors text-[#0B1120]/50 dark:text-white/50"
      }
    >
      {copied ? (
        <Check className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Link2 className="w-4 h-4" aria-hidden="true" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </button>
  );
}