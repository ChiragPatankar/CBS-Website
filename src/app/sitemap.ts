import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { pillars } from "@/content/pillars";
import { services, serviceHref } from "@/content/services";
import { caseStudies } from "@/content/work";
import { terms } from "@/content/legal/terms";

/**
 * Only indexable routes belong here. Listing a URL that carries `noindex` is a
 * contradiction crawlers report as an error, so three categories are filtered
 * out deliberately:
 *
 *  - `/classic`   — duplicates the homepage; exists as the no-WebGL fallback
 *  - draft case studies and unreviewed service pages
 *  - `/terms` while it is still awaiting legal review
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/solutions", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/approach", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/ai-audit", priority: 0.7, freq: "monthly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
  ];

  if (!terms.reviewRequired) {
    staticRoutes.push({ path: "/terms", priority: 0.2, freq: "yearly" });
  }

  const publishedStudies = caseStudies.filter((c) => !c.draft);
  if (publishedStudies.length) {
    staticRoutes.push({ path: "/work", priority: 0.8, freq: "monthly" });
  }

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...pillars.map((p) => ({
      url: `${site.url}/solutions/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...services
      .filter((s) => s.status === "published")
      .map((s) => ({
        url: `${site.url}${serviceHref(s)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ...publishedStudies.map((c) => ({
      url: `${site.url}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
