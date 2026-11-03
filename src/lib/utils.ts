/**
 * Tiny class-name joiner — dependency-free replacement for clsx + tailwind-merge.
 * We keep the API explicit so it can be swapped if the needs grow.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export const SITE = {
  name: "ImaginarsClub Services",
  shortName: "ImaginarsClub",
  url: "https://www.imaginarsclubservices.com",
  email: "imaginarsclubservices@gmail.com",
  phone: "+91 86553 65607",
  phoneHref: "tel:+918655365607",
  address: "3 Vikrant Residency, Near Station Road, Kanjurmarg East, Mumbai 400042",
  linkedin: "https://in.linkedin.com/company/imaginarsclubservices",
  founded: 2024,
} as const;