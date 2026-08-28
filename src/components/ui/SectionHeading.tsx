import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

/**
 * Editorial section header: mono eyebrow with rule, large tightened title,
 * optional lead paragraph. Titles may mix font-serif italic for emphasis.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
          {align === "center" && (
            <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
          )}
          {eyebrow}
          {align === "left" && (
            <span aria-hidden="true" className="h-px w-8 bg-accent/40" />
          )}
        </span>
      )}
      <Tag
        className={cn(
          "text-3xl font-semibold leading-[1.04] tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "max-w-2xl text-[15px] leading-relaxed opacity-65 sm:text-base"
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}