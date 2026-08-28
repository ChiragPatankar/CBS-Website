import type { Metadata } from "next";
import { LegalLayout } from "@/components/composites/legal-layout";
import { privacy } from "@/content/legal/privacy";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: privacy.seo.title,
  description: privacy.seo.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalLayout doc={privacy} />;
}
