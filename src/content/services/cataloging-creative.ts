/**
 * Cataloging & Creative Optimizations — marketplace pillar.
 * Source copy: content/work-with-us_cataloging-creative.md (benefit bodies, steps,
 * FAQ answers and the problem statement authored here; the scrape captured only headings).
 */
import type { Service } from "@/content/types";

export const catalogingCreative: Service = {
  slug: "cataloging-creative",
  pillar: "marketplace",
  name: "Cataloging & Creative Optimizations",
  navLabel: "Cataloging & Creative",
  eyebrow: "Cataloging & Creative Optimizations",
  h1: "Turn your product listings into sales machines",
  problem:
    "Most catalogs are built to clear an upload template, not to answer a shopper's question. The traffic arrives, the listing says too little, and the order goes to the competitor with sharper images and a clearer title.",
  overview:
    "Professional cataloging paired with high-converting creative assets, so your products hold attention in a crowded marketplace results page. We treat the listing as the storefront it actually is: data, imagery and copy working as one unit.",
  overviewPoints: [
    "Attribute-complete data across every marketplace template",
    "Photography, graphics and A+ modules produced to platform spec",
    "Keyword research wired into titles, bullets and backend fields",
  ],
  platforms: ["Amazon", "Flipkart", "Walmart", "Myntra", "eBay"],
  benefits: [
    {
      title: "Product data optimization",
      body: "We rebuild titles, bullets, attributes and backend fields against each marketplace's own taxonomy so your products surface in the right filters and browse nodes. Complete data also stops the suppressions and variation breaks that quietly remove SKUs from search.",
      icon: "database",
    },
    {
      title: "Professional photography and graphics",
      body: "Studio, detail and lifestyle shots are shot to platform specification, then cropped and captioned for the way each grid actually renders. Infographic overlays carry the two or three claims that decide the click, rather than repeating the title.",
      icon: "palette",
    },
    {
      title: "SEO-optimized content",
      body: "Keyword research starts from real marketplace search terms, not guesswork, and maps high-volume phrases to the fields that rank. Copy is written for the shopper first, so ranking gains show up as conversion rather than empty impressions.",
      icon: "search",
    },
  ],
  steps: [
    {
      title: "Catalog audit",
      body: "We pull your full SKU export, score every listing on data completeness, image count, content strength and conversion rate, then rank the gaps by revenue at stake.",
    },
    {
      title: "Keyword and competitor mapping",
      body: "Search-term data and the top-ranked competitors in your category define the keyword set and the claims your creative has to beat.",
    },
    {
      title: "Asset production",
      body: "Photography, graphics and A+ modules are produced in batches against a shot list you approve, with brand guidelines applied consistently across every SKU.",
    },
    {
      title: "Publish and validate",
      body: "Listings go live through flat files or the platform APIs, and we verify indexation, image rendering and variation structure after publish rather than assuming it worked.",
    },
    {
      title: "Measure and iterate",
      body: "Conversion rate, sessions and click share are tracked per listing, and the weakest performers go back into the queue for a second pass.",
    },
  ],
  deliverables: [
    {
      title: "Professional product photography",
      body: "High-quality images that show the product from every angle, including lifestyle and detail shots. Delivered in marketplace-compliant sizes and ratios.",
      icon: "palette",
    },
    {
      title: "A+ content creation",
      body: "Enhanced brand content that tells the product story with modules built for scrolling on a phone. Each module carries one idea and one reason to buy.",
      icon: "sparkles",
    },
    {
      title: "SEO optimization",
      body: "Keyword research and implementation across titles, bullets, descriptions and backend search terms. Rankings are re-checked after indexation, not just at publish.",
      icon: "search",
    },
    {
      title: "Performance analytics",
      body: "Listing-level tracking of sessions, conversion rate and click share so you can see which changes moved revenue. Reported per SKU, not just per account.",
      icon: "bar-chart",
    },
    {
      title: "Brand consistency",
      body: "One creative system applied across every listing, marketplace and variation. Templates and asset libraries stay with you for future launches.",
      icon: "badge-check",
    },
    {
      title: "Launch support",
      body: "New products go live with complete data, full imagery and ranked keywords from day one. We stay on the account through the first weeks to fix what the platform flags.",
      icon: "rocket",
    },
  ],
  faqs: [
    {
      q: "What is included in the creative package?",
      a: "A shot list agreed with you up front, then product photography, infographic and lifestyle graphics, A+ or enhanced brand content modules, and any variation or size-chart assets the category needs. You receive the source files and a reusable template set, so the work is yours to extend.",
    },
    {
      q: "How long does the cataloging process take?",
      a: "It depends on SKU count and how much source material already exists. We scope your catalog in the first week and give you a dated batch schedule before production starts, so you know which SKUs go live in which wave rather than waiting on one large delivery.",
    },
    {
      q: "Do you handle product photography?",
      a: "Yes. We shoot studio, detail and lifestyle imagery to each marketplace's technical specification. Where you already have usable assets, we retouch and re-crop them instead of reshooting, and we tell you clearly which SKUs genuinely need new photography.",
    },
    {
      q: "Can you work with our existing catalog rather than rebuilding it?",
      a: "That is the usual starting point. The audit separates listings that need a full rebuild from those that need a title fix or two more images, and we sequence the work by revenue impact so the highest-value SKUs improve first.",
    },
  ],
  icon: "palette",
  seo: {
    title: "Marketplace Cataloging & Creative Optimization",
    description:
      "Listing content, photography, A+ modules and keyword work that turn marketplace traffic into orders. Built for brands selling across 15+ marketplaces.",
  },
  status: "published",
};
