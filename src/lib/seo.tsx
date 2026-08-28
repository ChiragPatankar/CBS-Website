import type { Metadata } from "next";
import { site } from "@/config/site";

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
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title, description },
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
      "Profit-first ecommerce growth partner scaling consumer brands across marketplaces and DTC.",
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
