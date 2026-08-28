"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives/container";
import { Logo } from "@/components/primitives/logo";
import { nav, site } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    // Hysteresis: condense past 28px, expand again below 8px. A single
    // threshold means a scroll position parked exactly on the boundary flips
    // the glass panel on and off on every wheel tick.
    let condensed = false;
    const onScroll = () => {
      const y = window.scrollY;
      const next = condensed ? y > 8 : y > 28;
      if (next !== condensed) {
        condensed = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div
        className={cn(
          // See `.header-transition` in globals.css — it deliberately omits
          // backdrop-filter, which `transition-all` was previously including.
          "header-transition",
          scrolled
            ? "glass border-b border-border/70 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]"
            : "border-b border-transparent bg-transparent shadow-none"
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="CrossBorder home">
              <Logo height={30} priority />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                  aria-expanded={megaOpen}
                  onClick={() => setMegaOpen((v) => !v)}
                >
                  Solutions
                  <ChevronDown className={cn("size-4 transition-transform", megaOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {megaOpen && <MegaMenu onNavigate={() => setMegaOpen(false)} />}
                </AnimatePresence>
              </div>
              {nav.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <span className="link-underline pb-0.5">{l.label}</span>
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Button asChild variant="ghost" size="sm">
                <Link href="/ai-audit">{site.cta.secondary}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/contact">{site.cta.primary}</Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="grid size-11 place-items-center rounded-md text-fg lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass border-b border-border lg:hidden"
          >
            <Container className="py-4">
              <div className="flex flex-col gap-1">
                {nav.pillars.map((p) => (
                  <div key={p.title} className="py-2">
                    <p className="px-2 font-mono text-eyebrow uppercase text-faint">{p.title}</p>
                    <div className="mt-1 grid grid-cols-2 gap-1">
                      {p.items.map((it) => (
                        <Link
                          key={it.href}
                          href={it.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-md px-2 py-2 text-sm text-muted hover:bg-surface-2 hover:text-fg"
                        >
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-2 flex flex-col gap-2">
                  {nav.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-2 py-2 text-sm text-fg hover:bg-surface-2"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <Button asChild variant="secondary">
                    <Link href="/ai-audit">{site.cta.secondary}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/contact">{site.cta.primary}</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: EASE.out }}
      className="absolute left-1/2 top-full w-[720px] max-w-[92vw] -translate-x-1/2 pt-3"
    >
      <div className="glass overflow-hidden rounded-2xl p-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-1">
          {nav.pillars.map((p) => (
            <div key={p.title} className="rounded-xl p-3">
              <p className="px-2 font-mono text-eyebrow uppercase text-faint">{p.title}</p>
              <div className="mt-2 flex flex-col">
                {p.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={onNavigate}
                    className="group/mi rounded-lg px-2 py-2 transition-colors hover:bg-surface-2"
                  >
                    <span className="block text-sm font-medium text-fg">{it.label}</span>
                    <span className="block text-xs text-faint">{it.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Two exits from the menu: browse the whole portfolio, or let the audit
            choose. The hub had no entry point anywhere in the nav before this. */}
        <div className="mt-1 grid gap-2 sm:grid-cols-2">
          <Link
            href="/solutions"
            onClick={onNavigate}
            className="flex items-center justify-between rounded-xl border border-border bg-surface-1 px-4 py-3 transition-colors hover:border-brand/50"
          >
            <span className="text-sm text-muted">
              <span className="text-fg">See all solutions</span> — the full portfolio
            </span>
            <span aria-hidden className="text-brand">
              &rarr;
            </span>
          </Link>
          <Link
            href="/ai-audit"
            onClick={onNavigate}
            className="flex items-center justify-between rounded-xl border border-border bg-surface-1 px-4 py-3 transition-colors hover:border-brand/50"
          >
            <span className="text-sm text-muted">
              Not sure? <span className="text-fg">Take the 2-minute audit</span>
            </span>
            <span className="ember-gradient rounded-md px-2 py-1 text-xs font-medium text-white">
              New
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
