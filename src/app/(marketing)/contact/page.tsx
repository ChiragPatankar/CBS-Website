import type { Metadata } from "next";
import { ContactClient } from "./contact-client";
import { contact } from "@/content/contact";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: contact.seo.title,
  description: contact.seo.description,
  path: "/contact",
});

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

/**
 * Server shell. The interactive hero and the form share selection state, so the
 * whole interactive half lives in `contact-client.tsx` while this file keeps
 * ownership of `metadata` and the structured data.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />
      <ContactClient />
    </>
  );
}
