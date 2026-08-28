import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { AuditWidget } from "@/components/sections/audit-widget";
import { auditCopy } from "@/content/audit";
import { pageMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI growth audit — find your starting point",
  description:
    "Five questions and a deterministic scoring rule tell you which growth motion you are in and which pillar to start with. No email required to see the result.",
  path: "/ai-audit",
});

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "AI growth audit", href: "/ai-audit" },
];

export default function AiAuditPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(CRUMBS)} />

      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(100% 70% at 50% 0%, color-mix(in oklab, #f0562d 18%, transparent) 0%, transparent 62%)",
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>

        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Eyebrow>{auditCopy.eyebrow}</Eyebrow>
              <h1 className="mt-5 font-display text-h1 font-extrabold leading-[1.04] tracking-[-0.03em]">
                {auditCopy.h1}
              </h1>
              <p className="mt-6 text-body-lg text-muted">{auditCopy.sub}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <AuditWidget />
    </>
  );
}
