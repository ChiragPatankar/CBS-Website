import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/**
 * Gives `next dev` access to the Cloudflare bindings declared in
 * wrangler.jsonc, so local development matches the deployed Worker. No-op in a
 * production build.
 */
void initOpenNextCloudflareForDev();

/**
 * Old `/work-with-us/<slug>` service URLs → new `/solutions/<pillar>/<service>`.
 * From the URL migration map in docs/01-information-architecture.md.
 */
const SERVICE_REDIRECTS: Record<string, string> = {
  "cataloging-creative": "/solutions/marketplace/cataloging-creative",
  "global-selling": "/solutions/marketplace/global-selling",
  "growth-management": "/solutions/marketplace/growth-management",
  "marketplace-expansion": "/solutions/marketplace/expansion",
  "meta-ads": "/solutions/growth/meta-ads",
  "google-ads": "/solutions/growth/google-ads",
  "shopify-design": "/solutions/growth/shopify",
  "retention-marketing": "/solutions/growth/retention",
};

const nextConfig: NextConfig = {
  /**
   * Lets a production build run without fighting a dev server for `.next`.
   * Both processes write to the same directory by default, which corrupts the
   * build mid-flight ("Cannot find module './627.js'"). Set NEXT_DIST_DIR to
   * verify a build while `npm run dev` is running.
   */
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  reactStrictMode: true,
  /**
   * Cloudflare Workers has no `/_next/image` optimizer. The adapter documents
   * two ways to get one: bind Cloudflare Images, or supply a custom loader that
   * rewrites to /cdn-cgi/image. Both are declined here.
   *
   * next/image is used in exactly one place — the logo in the header and footer.
   * Optimizing a single 21 kB static asset does not justify a billed
   * transformation per unique size (5,000/month free, then $0.50/1,000) plus a
   * whole class of request-time failure. The asset is instead pre-sized to 576×90
   * at build time (see components/primitives/logo.tsx) and served directly from
   * the ASSETS binding.
   *
   * Revisit if this site ever serves user- or CMS-supplied imagery.
   */
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    // The old footer shipped doubled paths (`/work-with-us/work-with-us/<slug>`,
    // defect C4 in docs/00) so those URLs are live in the wild and indexed.
    // Both forms are mapped.
    const services = Object.entries(SERVICE_REDIRECTS).flatMap(
      ([slug, destination]) => [
        { source: `/work-with-us/${slug}`, destination, permanent: true },
        { source: `/work-with-us/work-with-us/${slug}`, destination, permanent: true },
      ]
    );

    return [
      ...services,
      { source: "/work-with-us", destination: "/solutions", permanent: true },
      // Catch-all must stay last so the specific mappings above win.
      { source: "/work-with-us/:path*", destination: "/solutions", permanent: true },
      { source: "/hire", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
