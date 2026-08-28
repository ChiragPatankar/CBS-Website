import type { Metadata } from "next";
import { LegalLayout } from "@/components/composites/legal-layout";
import { terms } from "@/content/legal/terms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: terms.seo.title,
  description: terms.seo.description,
  path: "/terms",
  // Kept out of the index while it is still an unreviewed draft.
  noindex: terms.reviewRequired,
});

export default function TermsPage() {
  return <LegalLayout doc={terms} />;
}
