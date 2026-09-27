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
    default: "CrossBorder: Ecommerce Growth & Cross-Border Selling",
    template: "%s | CrossBorder",
  },
  description:
    "Profit-first growth partner for consumer brands: marketplaces, ads and Shopify, plus IOR, tax and compliance in the US, EU, UK and Gulf. 100+ brands scaled.",
  keywords: [
    "ecommerce growth agency",
    "marketplace growth",
    "profit-first ecommerce",
    "Amazon growth agency",
    "AI ecommerce growth",
    "importer of record services",
    "cross-border ecommerce compliance",
  ],
  openGraph: {
    type: "website",
    title: "CrossBorder: Ecommerce Growth & Cross-Border Selling",
    description:
      "Profit-first growth across marketplaces and DTC, plus import, tax and compliance in every market you sell into. 100+ brands scaled.",
    siteName: "CrossBorder",
    locale: "en_IN",
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
