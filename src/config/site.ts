/**
 * Global site configuration — navigation, pillars, footer, contact.
 * Single source consumed by header + footer (mirrors docs/01-information-architecture.md).
 */

export type NavPillar = {
  title: string;
  blurb: string;
  items: { label: string; href: string; desc: string }[];
};

export const site = {
  name: "CrossBorder",
  legalName: "CrossBorder Business Solution",
  /** Canonical origin, no trailing slash. Mirrors `metadataBase` in app/layout.tsx. */
  url: "https://cbbusinesssolution.com",
  tagline: "Simplifying Business. Amplifying Success.",
  email: "support@cbbusinesssolution.com",
  location: "Kandivali-West, Mumbai 400067, India",
  cta: { primary: "Book a growth call", secondary: "Get your AI audit" },
  /**
   * Outbound profile links. Empty strings render nothing rather than a dead
   * `href="#"` — a link that goes nowhere is worse than no link.
   * TODO: awaiting the real URLs and the WhatsApp number from the client.
   */
  social: {
    linkedin: "",
    instagram: "",
    twitter: "",
    /** Digits only, country code first — e.g. "919876543210". */
    whatsapp: "",
  },
} as const;

export const nav = {
  links: [
    { label: "Cross-Border Services", href: "/cross-border-services" },
    { label: "Work", href: "/work" },
    { label: "Approach", href: "/approach" },
    { label: "About", href: "/about" },
  ],
  pillars: [
    {
      title: "Marketplace Solutions",
      blurb: "Win on every marketplace.",
      items: [
        { label: "Cataloging & Creative", href: "/solutions/marketplace/cataloging-creative", desc: "Listings that convert" },
        { label: "Global Selling", href: "/solutions/marketplace/global-selling", desc: "Cross-border, compliant" },
        { label: "Growth & Management", href: "/solutions/marketplace/growth-management", desc: "Profitable scale" },
        { label: "New Marketplace Expansion", href: "/solutions/marketplace/expansion", desc: "New channels, fast" },
      ],
    },
    {
      title: "Digital Commerce Growth",
      blurb: "Full-funnel performance.",
      items: [
        { label: "Meta Ads", href: "/solutions/growth/meta-ads", desc: "Performance & branding" },
        { label: "Google Ads", href: "/solutions/growth/google-ads", desc: "Demand capture" },
        { label: "Shopify Design & Build", href: "/solutions/growth/shopify", desc: "Conversion-optimized" },
        { label: "Retention", href: "/solutions/growth/retention", desc: "Email, SMS & WhatsApp" },
      ],
    },
    {
      title: "Technology & AI",
      blurb: "A durable, intelligent edge.",
      items: [
        { label: "Custom Web Development", href: "/solutions/technology/web-development", desc: "Headless commerce" },
        { label: "Mobile App Development", href: "/solutions/technology/mobile-apps", desc: "Native & cross-platform" },
        { label: "Cloud Infrastructure", href: "/solutions/technology/cloud", desc: "Scalable & reliable" },
        { label: "AI & Machine Learning", href: "/solutions/technology/ai-ml", desc: "Forecasting & automation" },
      ],
    },
  ] satisfies NavPillar[],
} as const;

export const footerNav = {
  Solutions: [
    { label: "Marketplace Growth", href: "/solutions/marketplace" },
    { label: "Digital Commerce", href: "/solutions/growth" },
    { label: "Technology & AI", href: "/solutions/technology" },
    { label: "Cross-Border Services", href: "/cross-border-services" },
    { label: "AI Growth Audit", href: "/ai-audit" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Approach", href: "/approach" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;
