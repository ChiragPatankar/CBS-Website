// Client boundary is required, not incidental: `next/dynamic` with `ssr: false`
// is rejected inside a Server Component. Everything this file receives from the
// route (a `Service`, breadcrumbs, strings) is serialisable, which is exactly why
// content icons are stored as names rather than component references.
"use client";

import dynamic from "next/dynamic";
import {
  HeroDiagram,
  HeroFramed,
  HeroFullBleed,
  HeroOffsetSplit,
  HeroStacked,
} from "@/components/heroes/shells";
import type { Atmosphere } from "@/components/heroes/atmosphere";
import type { Service } from "@/content/types";

/**
 * Per-service hero dispatcher.
 *
 * This is a MAPPING, not a template. Each of the twelve services is assigned a
 * specific composition, a purpose-built visual and an atmosphere. Critically, no
 * two services inside the same pillar share a composition — so a visitor moving
 * between sibling pages sees a different design, not the same frame with new
 * words in it.
 *
 * | pillar     | stacked          | full-bleed     | framed           | offset-split |
 * |------------|------------------|----------------|------------------|--------------|
 * | marketplace| cataloging       | global-selling | growth-management| expansion    |
 * | growth     | retention        | —              | shopify          | meta-ads     |
 * | technology | —                | cloud          | mobile-apps      | ai-ml        |
 *
 * (google-ads and web-development take the diagram-led composition.)
 *
 * Every visual is `next/dynamic` with `ssr: false`: they are animated client
 * components with no SEO value, and the copy above them must paint first.
 */
const ProductTransformation = dynamic(
  () => import("./visuals/product-transformation").then((m) => m.ProductTransformation),
  { ssr: false, loading: () => <VisualSkeleton /> }
);
const WorldRoutes = dynamic(() => import("./visuals/world-routes").then((m) => m.WorldRoutes), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});
const CommandCenter = dynamic(() => import("./visuals/command-center").then((m) => m.CommandCenter), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});
const JourneyPath = dynamic(() => import("./visuals/journey-path").then((m) => m.JourneyPath), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});
const CampaignFlow = dynamic(() => import("./visuals/campaign-flow").then((m) => m.CampaignFlow), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});
const SearchIntent = dynamic(() => import("./visuals/search-intent").then((m) => m.SearchIntent), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});
const StorefrontFrame = dynamic(
  () => import("./visuals/storefront-frame").then((m) => m.StorefrontFrame),
  { ssr: false, loading: () => <VisualSkeleton /> }
);
const CustomerLifecycle = dynamic(
  () => import("./visuals/customer-lifecycle").then((m) => m.CustomerLifecycle),
  { ssr: false, loading: () => <VisualSkeleton /> }
);
const ArchitectureStack = dynamic(
  () => import("./visuals/architecture-stack").then((m) => m.ArchitectureStack),
  { ssr: false, loading: () => <VisualSkeleton /> }
);
const DeviceShowcase = dynamic(
  () => import("./visuals/device-showcase").then((m) => m.DeviceShowcase),
  { ssr: false, loading: () => <VisualSkeleton /> }
);
const CloudTopology = dynamic(() => import("./visuals/cloud-topology").then((m) => m.CloudTopology), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});
const AIProcessing = dynamic(() => import("./visuals/ai-processing").then((m) => m.AIProcessing), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});

/** Reserves the visual's space so mounting it cannot shift the hero. */
function VisualSkeleton() {
  return <div aria-hidden className="h-[300px] w-full sm:h-[360px]" />;
}

type Recipe = {
  shell: "stacked" | "fullbleed" | "framed" | "offset" | "diagram";
  visual: React.ReactNode;
  atmosphere: Atmosphere;
  frameLabel?: string;
  notes?: { label: string; value: string }[];
};

function recipeFor(s: Service): Recipe {
  switch (s.slug) {
    /* ── Marketplace: four different compositions ── */
    case "cataloging-creative":
      return { shell: "stacked", visual: <ProductTransformation />, atmosphere: "amber" };
    case "global-selling":
      return { shell: "fullbleed", visual: <WorldRoutes />, atmosphere: "amber" };
    case "growth-management":
      return {
        shell: "framed",
        visual: <CommandCenter />,
        atmosphere: "amber",
        frameLabel: "Representative operating view — not live client data",
      };
    case "expansion":
      return { shell: "offset", visual: <JourneyPath />, atmosphere: "amber" };

    /* ── Digital commerce growth ── */
    case "meta-ads":
      return { shell: "offset", visual: <CampaignFlow />, atmosphere: "ember" };
    case "google-ads":
      return {
        shell: "diagram",
        visual: <SearchIntent />,
        atmosphere: "ember",
        notes: [
          { label: "Intent", value: "We buy demand that already exists rather than manufacturing it." },
          { label: "Structure", value: "Campaigns segmented by margin, not by convenience." },
          { label: "Measurement", value: "Conversion value reported against contribution, not revenue." },
        ],
      };
    case "shopify":
      return {
        shell: "framed",
        visual: <StorefrontFrame />,
        atmosphere: "ember",
        frameLabel: "Storefront architecture — illustrative composition",
      };
    case "retention":
      return { shell: "stacked", visual: <CustomerLifecycle />, atmosphere: "ember" };

    /* ── Technology & AI: cooler, more technical ── */
    case "web-development":
      return {
        shell: "diagram",
        visual: <ArchitectureStack />,
        atmosphere: "cool",
        notes: [
          { label: "Frontend", value: "Rendered fast by default, measured against Core Web Vitals." },
          { label: "Integration", value: "Commerce, catalogue and order systems talk to one another." },
          { label: "Operations", value: "Deploys are boring and reversible." },
        ],
      };
    case "mobile-apps":
      return {
        shell: "framed",
        visual: <DeviceShowcase />,
        atmosphere: "cool",
        frameLabel: "Interface concepts — illustrative screens",
      };
    case "cloud":
      return { shell: "fullbleed", visual: <CloudTopology />, atmosphere: "cool" };
    case "ai-ml":
      // The violet accent appears here only — the one place a cool intelligence
      // note is allowed against the warm brand.
      return { shell: "offset", visual: <AIProcessing />, atmosphere: "violet" };

    default:
      return { shell: "offset", visual: <ProductTransformation />, atmosphere: "amber" };
  }
}

export function ServiceHero({
  service,
  breadcrumbs,
  pillarName,
  pillarHref,
}: {
  service: Service;
  breadcrumbs: { label: string; href: string }[];
  pillarName?: string;
  pillarHref?: string;
}) {
  const r = recipeFor(service);

  const common = {
    eyebrow: service.eyebrow,
    // Deliberately the promise, not the service name — the H1 should say what
    // the reader gets, and it is short enough not to wrap five times.
    title: service.h1,
    sub: service.problem,
    breadcrumbs,
    primary: { label: "Book a growth call", href: "/contact" },
    secondary: pillarHref && pillarName ? { label: `All ${pillarName}`, href: pillarHref } : undefined,
    atmosphere: r.atmosphere,
  };

  switch (r.shell) {
    case "stacked":
      return <HeroStacked {...common} visual={r.visual} />;
    case "fullbleed":
      return <HeroFullBleed {...common} visual={r.visual} />;
    case "framed":
      return <HeroFramed {...common} visual={r.visual} frameLabel={r.frameLabel} />;
    case "diagram":
      return <HeroDiagram {...common} visual={r.visual} notes={r.notes} />;
    case "offset":
    default:
      return <HeroOffsetSplit {...common} visual={r.visual} />;
  }
}
