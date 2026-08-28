import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * Root-level 404. This renders inside the root layout only (not the marketing
 * layout), so it carries its own navigation back into the site rather than
 * relying on the site header.
 */
export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center py-24">
      {/* Clips the 720px-wide centred blob below, which would otherwise force
          horizontal scroll on any viewport narrower than it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      <Container className="text-center">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mx-auto mt-5 max-w-2xl text-h1 font-semibold">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-body-lg text-muted">
          The link may be out of date, or the page may have moved. Here are the
          places most people are looking for.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
