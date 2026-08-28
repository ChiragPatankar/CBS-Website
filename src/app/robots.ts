import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Note there is deliberately no `disallow` for `/classic`: it carries a
 * `noindex` meta tag instead. Blocking it here would stop crawlers reaching
 * the page at all, and a page a crawler cannot fetch is a page whose `noindex`
 * it never sees.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
