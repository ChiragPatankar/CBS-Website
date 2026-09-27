import type { Metadata } from "next";
import { MotionProvider } from "@/components/providers/motion-provider";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { FloatingAssistant } from "@/components/sections/floating-assistant";
import { ChannelStackHero } from "@/components/sections/channel-stack-hero";
import { TwoMotion } from "@/components/sections/two-motion";
import { GlobalReach } from "@/components/sections/global-reach";
import { AICapabilities } from "@/components/sections/ai-capabilities";
import { Industries } from "@/components/sections/industries";
import { CaseStudies } from "@/components/sections/case-studies";
import { StatsBand } from "@/components/sections/stats-band";
import { ClientWall } from "@/components/sections/client-wall";
import { CTA } from "@/components/sections/cta";

/**
 * Homepage.
 *
 * Previously a standalone full-screen WebGL experience: a `fixed inset-0` canvas
 * behind a 620vh scroll track with its own nav and no footer. Three consequences
 * drove the rewrite — the scene needed WebGL just to show the headline, the page
 * linked to none of the site's other routes (zero internal links, an SEO
 * defect), and the scroll-scrubbed 3D was the source of the flicker.
 *
 * Now it is an ordinary document: a CSS-3D hero that costs no WebGL, the shared
 * header and footer, and the globe demoted to one contained section that
 * lazy-mounts only where it is worth the bytes.
 */
/**
 * Title and description come from the root layout; this adds the canonical the
 * homepage was missing (every other route gets one from `pageMetadata`).
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "CrossBorder",
    locale: "en_IN",
    title: "CrossBorder: Ecommerce Growth & Cross-Border Selling",
    description:
      "Profit-first growth across marketplaces and DTC, plus import, tax and compliance in every market you sell into. 100+ brands scaled.",
  },
};

export default function Home() {
  return (
    <MotionProvider>
      {/* Organisation graph lives on the homepage only — repeating it per route
          gives crawlers duplicate entities for the same business. */}
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <SiteHeader />
      <main id="main">
        <ChannelStackHero />
        <TwoMotion />
        <GlobalReach />
        <AICapabilities />
        <Industries />
        <CaseStudies />
        <StatsBand />
        <ClientWall />
        <CTA />
      </main>
      <SiteFooter />
      <FloatingAssistant />
    </MotionProvider>
  );
}
