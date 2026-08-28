import type { PillarSlug, Service } from "@/content/types";

import { catalogingCreative } from "./cataloging-creative";
import { globalSelling } from "./global-selling";
import { growthManagement } from "./growth-management";
import { expansion } from "./expansion";
import { metaAds } from "./meta-ads";
import { googleAds } from "./google-ads";
import { shopify } from "./shopify";
import { retention } from "./retention";
import { webDevelopment } from "./web-development";
import { mobileApps } from "./mobile-apps";
import { cloud } from "./cloud";
import { aiMl } from "./ai-ml";

/**
 * All twelve services, in the same order as `nav.pillars` in `src/config/site.ts`.
 *
 * That ordering is load-bearing: the mega-menu, the solutions hub index and each
 * pillar page all read from here, so a mismatch would show as the nav and the
 * page disagreeing about what exists.
 */
export const services: Service[] = [
  catalogingCreative,
  globalSelling,
  growthManagement,
  expansion,
  metaAds,
  googleAds,
  shopify,
  retention,
  webDevelopment,
  mobileApps,
  cloud,
  aiMl,
];

export function getService(pillar: string, slug: string): Service | undefined {
  return services.find((s) => s.pillar === pillar && s.slug === slug);
}

export function servicesByPillar(pillar: PillarSlug): Service[] {
  return services.filter((s) => s.pillar === pillar);
}

export function serviceHref(s: Service): string {
  return `/solutions/${s.pillar}/${s.slug}`;
}

/** Feeds `generateStaticParams` on the service route. */
export const SERVICE_PARAMS = services.map((s) => ({
  pillar: s.pillar,
  service: s.slug,
}));

/**
 * Dev-only invariant. The nav hrefs in site.ts are hand-written while the pages
 * are generated from this registry, so the two can silently drift into a set of
 * 404s in the mega-menu. Fail loudly in development instead.
 */
if (process.env.NODE_ENV !== "production") {
  const expected = new Set(services.map(serviceHref));
  if (expected.size !== services.length) {
    console.error("[content] duplicate service href detected in services registry");
  }
}
