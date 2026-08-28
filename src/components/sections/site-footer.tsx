import Link from "next/link";
import { Linkedin, Instagram, Twitter, Mail, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Logo } from "@/components/primitives/logo";
import { footerNav, site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-surface-1/40">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Logo height={30} />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              A profit-first, AI-accelerated ecommerce growth partner for ambitious consumer brands.
            </p>

            <form className="mt-6 flex max-w-sm items-center gap-2" aria-label="Newsletter signup">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@brand.com"
                className="h-11 flex-1 rounded-md border border-border bg-surface-2 px-3 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-brand"
              />
              <button
                type="submit"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-md aurora-gradient text-white transition-transform hover:-translate-y-px"
                aria-label="Subscribe"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>

          {/* Link columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-mono text-eyebrow uppercase text-faint">{heading}</h3>
              {/* Gap moved into the targets rather than between them: the links
                  were 19px tall with a 12px gap, so a 24px target circle
                  overlapped its neighbour (WCAG 2.5.8). Padding absorbs most of
                  the old gap, so the visual rhythm is near-identical while each
                  tap area roughly doubles. */}
              <ul className="mt-3 space-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex py-1.5 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <span className="link-underline pb-0.5">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-faint" /> {site.location}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-fg"
            >
              <Mail className="size-4 text-faint" /> {site.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            {(
              [
                { Icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
                { Icon: Instagram, href: site.social.instagram, label: "Instagram" },
                { Icon: Twitter, href: site.social.twitter, label: "X (Twitter)" },
              ] as const
            )
              .filter((s) => s.href)
              .map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-brand/50 hover:text-fg"
                  aria-label={`${site.name} on ${label}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <p className="font-display text-sm font-medium text-gradient">{site.tagline}</p>
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
