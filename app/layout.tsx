import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://stackclinic.dev"),
  title: "StackClinic — diagnose & fix your SaaS",
  description:
    "A solo-run productised studio that audits and fixes SaaS products: cold email systems, security audits, and infrastructure cost cuts. Severity-ranked findings, fixes shipped — not just reports.",
  openGraph: {
    title: "StackClinic — diagnose & fix your SaaS",
    description:
      "Cold email systems, security audits, and infrastructure cost cuts for indie SaaS. Fixed-price, fast, fixes shipped.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-ground text-text antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
