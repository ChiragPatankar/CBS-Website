import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { MarketplaceEcosystem } from "@/components/sections/marketplace-ecosystem";
import { TwoMotion } from "@/components/sections/two-motion";
import { AICapabilities } from "@/components/sections/ai-capabilities";
import { Industries } from "@/components/sections/industries";
import { CaseStudies } from "@/components/sections/case-studies";
import { StatsBand } from "@/components/sections/stats-band";
import { ClientWall } from "@/components/sections/client-wall";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "CrossBorder — Classic",
  description:
    "The classic SaaS-style homepage for CrossBorder. The immersive experience lives at the site root.",
  /**
   * This page duplicates the homepage's content and exists as the no-WebGL /
   * reduced-motion fallback (see the `Fallback` in src/app/page.tsx). Keeping it
   * out of the index stops it competing with `/` for the same keywords, while
   * `follow` lets crawlers still traverse its links.
   */
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function ClassicHomePage() {
  return (
    <>
      <Hero />
      <MarketplaceEcosystem />
      <TwoMotion />
      <AICapabilities />
      <Industries />
      <CaseStudies />
      <StatsBand />
      <ClientWall />
      <CTA />
    </>
  );
}
