import type { Metadata } from "next";
import { Inter, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
/**
 * Display face. Archivo over the usual Space Grotesk / Geist choices: it is a
 * grotesque with real width and weight range, so oversized headings can be set
 * tight and heavy without turning geometric and soft.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cbbusinesssolution.com"),
  title: {
    default: "CrossBorder — AI-Driven Ecommerce Growth, Built on Profit-First Principles",
    template: "%s | CrossBorder",
  },
  description:
    "CrossBorder is a profit-first ecommerce growth partner. We scale consumer brands across marketplaces and DTC with AI-driven performance, creative, and retention — 100+ brands, 4.3× average ROAS, 15+ marketplaces.",
  keywords: [
    "ecommerce growth agency",
    "marketplace growth",
    "profit-first ecommerce",
    "Amazon growth agency",
    "AI ecommerce growth",
  ],
  openGraph: {
    type: "website",
    title: "CrossBorder — AI-Driven Ecommerce Growth",
    description:
      "Profit-first growth across marketplaces and DTC. 100+ brands scaled, 4.3× average ROAS.",
    siteName: "CrossBorder",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:rounded-md focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
