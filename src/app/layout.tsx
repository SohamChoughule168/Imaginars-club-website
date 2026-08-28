import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.imaginarsclubservices.com";
const SITE_NAME = "ImaginarsClub Services";
const SITE_DESCRIPTION =
  "A senior-led digital studio in Mumbai building websites, mobile apps and AI-driven products — and growing them with search, ads and content that measurably perform.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Digital studio for ambitious businesses`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "digital studio Mumbai",
    "web development Mumbai",
    "mobile app development",
    "AI solutions",
    "digital marketing agency",
    "Meta ads management",
    "brand management",
    "website design Mumbai",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Digital studio for ambitious businesses`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Digital studio for ambitious businesses`,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: "imaginarsclubservices@gmail.com",
      telephone: "+91 93728 09022",
      foundingDate: "2024",
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        streetAddress: "3, Vikrant Residency, Near Station Road, Kanjur Marg East",
        addressLocality: "Mumbai",
        postalCode: "400042",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 19.1418, longitude: 72.9365 },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      sameAs: ["https://in.linkedin.com/company/imaginarsclubservices"],
      areaServed: { "@type": "City", name: "Mumbai" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="selection:bg-[#2563EB]/90 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionConfig reducedMotion="user">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#0B1120] focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-white dark:focus:text-[#0B1120]"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}