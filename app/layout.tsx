import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { OFFERS } from "@/lib/offers";

const SITE_URL = "https://stackclinic.dev";

const DESCRIPTION =
  "Fixed-price audits and fixes for indie SaaS, by a solo founder who runs this exact stack. Cold email setup live in 5 days (£750), a SaaS security audit (£500), and an infrastructure cost audit (£600) — severity-ranked findings, fixes shipped, not just reports.";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const TITLE = "StackClinic — your SaaS, audited and fixed. Fixed prices.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "StackClinic",
    type: "website",
    // og:image is supplied automatically from app/opengraph-image.tsx.
  },
  twitter: {
    // Render the instrument readout as a large card in the X preview.
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    // twitter:image is supplied automatically from app/twitter-image.tsx.
  },
};

/* JSON-LD: one ProfessionalService offering the three fixed-price operations.
   Prices and names derive from lib/offers.ts so structured data never drifts
   from the page copy. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "StackClinic",
  url: SITE_URL,
  description: DESCRIPTION,
  priceRange: "£500–£750",
  areaServed: { "@type": "Place", name: "Worldwide" },
  serviceType: OFFERS.map((o) => o.name),
  makesOffer: OFFERS.map((o) => ({
    "@type": "Offer",
    name: o.name,
    description: o.promise,
    priceCurrency: "GBP",
    price: o.price.replace(/[^0-9]/g, ""),
    category: "Service",
    itemOffered: {
      "@type": "Service",
      name: o.name,
      description: o.promise,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-ground text-text antialiased">
        {/* First focusable element on the page: jump past the nav + hero
            intro straight to the content. Visible only on keyboard focus. */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
