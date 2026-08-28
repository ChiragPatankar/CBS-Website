"use client";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { Sparkles } from "lucide-react";

export function ImmersiveNav() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* top scroll-progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left aurora-gradient"
      />

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="CrossBorder home">
            <span className="grid size-8 place-items-center rounded-lg aurora-gradient text-white">
              <Sparkles className="size-4" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              Cross<span className="text-white/50">Border</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2" aria-label="Primary">
            <Link
              href="/classic"
              className="rounded-md px-3 py-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              Classic view
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-9 items-center rounded-md border border-white/15 bg-white/5 px-4 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Book a call
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
