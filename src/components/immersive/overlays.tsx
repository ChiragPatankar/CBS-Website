"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

function SceneLayer({
  start,
  end,
  children,
  className,
}: {
  start: number;
  end: number;
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const fade = 0.05;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - fade), start, end, Math.min(1, end + fade)],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [Math.max(0, start - fade), Math.min(1, end + fade)], [40, -40]);

  return (
    <motion.div
      style={{ opacity }}
      className={cn(
        "pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-6",
        className
      )}
    >
      <motion.div style={{ y }} className="relative w-full max-w-3xl text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(5,6,10,0.78) 0%, rgba(5,6,10,0.5) 42%, transparent 72%)",
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-white/60 backdrop-blur">
      <span className="aurora-gradient size-1.5 rounded-full" />
      {children}
    </span>
  );
}

export function Overlays() {
  const { scrollYProgress } = useScroll();
  const revenue = useTransform(scrollYProgress, [0.72, 0.88], [10, 24]);
  const revenueText = useTransform(revenue, (v) => `₹${v.toFixed(1)} Cr`);
  const roas = useTransform(scrollYProgress, [0.72, 0.88], [1.9, 4.8]);
  const roasText = useTransform(roas, (v) => `${v.toFixed(1)}×`);

  return (
    <>
      {/* Scene 1 — Borderless Commerce */}
      <SceneLayer start={0} end={0.16}>
        <Eyebrow>Borderless Commerce</Eyebrow>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[1.02] tracking-tight">
          Commerce without
          <br />
          <span className="text-gradient">borders.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
          We scale consumer brands across every marketplace on earth — a profit-first,
          AI-driven growth engine connecting your products to the world.
        </p>
        <ScrollHint />
      </SceneLayer>

      {/* Scene 2 — Marketplace Universe */}
      <SceneLayer start={0.24} end={0.4}>
        <Eyebrow>Marketplace Universe</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-tight">
          Every channel, one <span className="text-gradient">orbit</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          Amazon, Flipkart, Walmart, Shopify, eBay and more — operated from a single command
          center, with revenue flowing between every node.
        </p>
      </SceneLayer>

      {/* Scene 3 — AI Growth Engine */}
      <SceneLayer start={0.48} end={0.66}>
        <Eyebrow>AI Growth Engine</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-tight">
          An intelligence at the <span className="text-gradient">core</span>
        </h2>
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-black/50 p-5 text-left font-mono text-sm text-white/70 backdrop-blur-md">
          <div className="text-white/90">&gt; Increase Amazon sales</div>
          <div className="mt-2 text-white/40">Thinking…</div>
          <ul className="mt-2 space-y-1.5">
            {["Inventory optimized", "Ad spend re-allocated", "Competitors analyzed"].map((l) => (
              <li key={l} className="flex items-center gap-2 text-profit">
                <Check className="size-4" /> {l}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-white/50">Revenue forecast</span>
            <span className="font-semibold text-profit">+18%</span>
          </div>
        </div>
      </SceneLayer>

      {/* Scene 4 — Success Story (scroll story) */}
      <SceneLayer start={0.72} end={0.88}>
        <Eyebrow>Success Story</Eyebrow>
        <p className="mt-6 text-sm text-white/50">A wellness brand, in nine months</p>
        <div className="mt-4 font-display text-[clamp(3rem,9vw,7rem)] font-semibold leading-none tracking-tight">
          <motion.span className="text-gradient tabular">{revenueText}</motion.span>
        </div>
        <div className="mt-6 flex items-center justify-center gap-8 text-white/70">
          <div>
            <motion.div className="font-display text-3xl font-semibold text-white tabular">
              {roasText}
            </motion.div>
            <div className="mt-1 text-xs text-white/50">Blended ROAS</div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <div className="font-display text-3xl font-semibold text-white">−37%</div>
            <div className="mt-1 text-xs text-white/50">Customer CAC</div>
          </div>
        </div>
      </SceneLayer>

      {/* Scene 5 — Cinematic CTA */}
      <SceneLayer start={0.94} end={1}>
        <Eyebrow>Your move</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-tight">
          Ready to cross
          <br />
          <span className="text-gradient">every border?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">
          Book a growth call, or get an AI-generated audit of where your brand should expand next.
        </p>
        <div className="pointer-events-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-md aurora-gradient px-6 text-[0.95rem] font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Book a growth call <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/ai-audit"
            className="inline-flex h-12 items-center rounded-md border border-white/15 bg-white/5 px-6 text-[0.95rem] font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Get your AI audit
          </Link>
        </div>
      </SceneLayer>
    </>
  );
}

function ScrollHint() {
  return (
    <div className="pointer-events-none mt-14 flex flex-col items-center gap-2 text-white/40">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em]">Scroll to explore</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-5" />
      </motion.span>
    </div>
  );
}
