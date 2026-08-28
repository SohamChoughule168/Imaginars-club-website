"use client";

import { useEffect, useRef } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  /** Only start playback when within this margin of the viewport. */
  rootMargin?: string;
  label?: string;
}

/**
 * Video that attaches its source only when it approaches the viewport.
 * Saves bandwidth and keeps the page light — vital for multi-video pages.
 * Autoplay is muted by default; playback pauses when scrolled far away.
 */
export default function LazyVideo({
  src,
  className,
  rootMargin = "300px",
  label,
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {
            /* autoplay may be blocked; acceptable for ambient media */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, rootMargin]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}