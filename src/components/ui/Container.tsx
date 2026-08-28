import { cn } from "@/lib/utils";

export default function Container({
  className,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className
      )}
      {...props}
    />
  );
}