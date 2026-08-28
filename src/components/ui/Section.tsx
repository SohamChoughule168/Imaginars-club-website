import { cn } from "@/lib/utils";
import Container from "./Container";

export default function Section({
  id,
  className,
  containerClassName,
  container = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  container?: "narrow" | "default" | "wide";
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn("relative", className)} {...props}>
      <Container size={container} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}