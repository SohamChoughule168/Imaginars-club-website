import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "invert" | "invert-ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Leading icon (lucide) rendered before children. */
  startIcon?: ReactNode;
  /** Trailing icon (lucide) rendered after children. */
  endIcon?: ReactNode;
}

interface ButtonLinkProps extends CommonProps {
  href: string;
}

interface ButtonNativeProps
  extends CommonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
  type?: "button" | "submit" | "reset";
}

const base =
  "group inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-nexum-gradient text-white shadow-[0_1px_2px_rgba(11,17,32,0.1),0_8px_20px_-6px_rgba(11,17,32,0.45)] hover:shadow-[0_2px_4px_rgba(11,17,32,0.12),0_14px_28px_-8px_rgba(11,17,32,0.5)] hover:brightness-110",
  secondary:
    "border border-ink/15 text-ink shadow-[0_1px_2px_rgba(11,17,32,0.04)] hover:border-ink/30 hover:bg-ink/[0.03] dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/[0.04]",
  ghost:
    "text-ink/70 hover:text-ink dark:text-white/70 dark:hover:text-white",
  invert: "bg-white text-[#0B1120] shadow-[0_1px_2px_rgba(11,17,32,0.2),0_10px_24px_-8px_rgba(0,0,0,0.5)] hover:bg-white/90",
  "invert-ghost":
    "border border-white/25 text-white backdrop-blur-md hover:border-white/50 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-5 text-[13px]",
  md: "h-11 px-7 text-sm",
  lg: "h-[52px] px-8 text-[15px]",
};

function Content({
  children,
  startIcon,
  endIcon,
}: {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}) {
  return (
    <>
      {startIcon}
      {children}
      {endIcon && (
        <span className="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5">
          {endIcon}
        </span>
      )}
    </>
  );
}

export default function Button(props: ButtonLinkProps | ButtonNativeProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    startIcon,
    endIcon,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        <Content startIcon={startIcon} endIcon={endIcon}>{children}</Content>
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonNativeProps;
  return (
    <button type={type} className={classes} {...rest}>
      <Content startIcon={startIcon} endIcon={endIcon}>{children}</Content>
    </button>
  );
}