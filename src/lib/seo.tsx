import type { Metadata } from "next";
import { site } from "@/config/site";

/** The site-wide social preview rendered by `app/opengraph-image.tsx`. */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "CrossBorder: ecommerce growth and cross-border selling",
};

/**
 * Builds page metadata with a canonical URL derived from the route.
 *
 * Centralised so no page can ship without a canonical, and so the OG block
 * cannot drift from the title/description the page actually renders — the two
 * were duplicated by hand before this existed.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description: string;
  /** Route path with a leading slash. */
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    // Declaring `openGraph` here replaces the root segment's block, file-based
    // image included, so the shared preview has to be named explicitly.
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

/** Organisation / LocalBusiness graph for the site root. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    slogan: site.tagline,
    description:
      "Profit-first ecommerce growth partner scaling consumer brands across marketplaces and DTC, with importer of record, tax registration, compliance and logistics services for cross-border sellers.",
    logo: `${site.url}/logos/brand/crossborder.webp`,
    image: `${site.url}/opengraph-image`,
    knowsAbout: [
      "Marketplace management",
      "Performance marketing",
      "Shopify development",
      "Importer of record",
      "VAT and sales tax registration",
      "Product compliance",
      "International logistics",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kandivali West, Mumbai",
      postalCode: "400067",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: "Worldwide",
  };
}

/** Site-level entity. Pairs with the organisation graph on the homepage. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: site.legalName,
    url: site.url,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  };
}

/**
 * A catalogue of services with no individual pages yet — one `Service` per
 * item, grouped under a named `OfferCatalog`, all pointing at one URL.
 */
export function offerCatalogJsonLd(c: {
  name: string;
  path: string;
  groups: { name: string; items: string[]; areaServed?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: c.name,
    url: `${site.url}${c.path}`,
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
    itemListElement: c.groups.map((g) => ({
      "@type": "OfferCatalog",
      name: g.name,
      itemListElement: g.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
          ...(g.areaServed ? { areaServed: g.areaServed } : {}),
        },
      })),
    })),
  };
}

export function serviceJsonLd(s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: `${site.url}${s.path}`,
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
    areaServed: "Worldwide",
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: `${site.url}${it.href}`,
    })),
  };
}

/** Renders a JSON-LD script tag. Content is our own static data, not user input. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
