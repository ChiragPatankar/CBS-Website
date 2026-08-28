"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { Container, Section } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { RevealGroup } from "@/components/primitives/reveal-group";
import { marketplaces } from "@/content/home";

/**
 * The WebGL scene is code-split and never server-rendered: three + R3F + drei +
 * postprocessing is the single heaviest dependency in the app, and no visitor
 * should pay for it before the hero has painted.
 */
const SceneCanvas = dynamic(
  () => import("@/components/immersive/scene-canvas").then((m) => m.SceneCanvas),
  {
    ssr: false,
    // Without this the frame sits visibly empty while the chunk arrives — and
    // three + R3F + drei is a large chunk, so on a slow connection that is
    // seconds of blank bordered box. A faint pulsing sphere holds the space.
    loading: () => (
      <div className="absolute inset-0 grid place-items-center">
        <div
          aria-hidden
          className="size-56 animate-pulse rounded-full border border-border-strong/50"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--color-brand) 12%, transparent) 0%, transparent 70%)",
          }}
        />
        <span className="sr-only">Loading the global reach visualisation</span>
      </div>
    ),
  }
);

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * "We operate everywhere" as one contained moment.
 *
 * The globe used to be a `fixed inset-0` backdrop behind a 620vh scroll track
 * that drove the whole homepage. It is now a single bounded section: it earns
 * its place once, rather than following the reader down the page, and it can
 * silently fall back to the marketplace list when WebGL is unavailable — which
 * is why the homepage no longer needs a separate no-WebGL route.
 */
export function GlobalReach() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mount, setMount] = React.useState(false);

  React.useEffect(() => {
    // Skip the scene entirely on reduced-motion or without WebGL — a rotating
    // point-cloud globe is not worth its cost on a phone.
    if (reduce || !hasWebGL()) return;

    // The width test has to be a live media query, not a one-off read of
    // innerWidth: read once at mount, a page opened in a narrow window and then
    // maximised would never attach the observer, and the section would sit there
    // as an empty box forever.
    const wideEnough = window.matchMedia("(min-width: 1024px)");
    let io: IntersectionObserver | null = null;

    const attach = () => {
      if (!wideEnough.matches || io) return;
      const el = ref.current;
      if (!el) return;
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setMount(true);
            io?.disconnect();
            io = null;
          }
        },
        { rootMargin: "300px" }
      );
      io.observe(el);
    };

    attach();
    wideEnough.addEventListener("change", attach);
    return () => {
      wideEnough.removeEventListener("change", attach);
      io?.disconnect();
    };
  }, [reduce]);

  return (
    <Section id="reach" className="border-t border-border/60">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>One control plane</Eyebrow>
            <h2 className="mt-4 font-display text-h1 font-extrabold tracking-[-0.025em]">
              Every channel your brand sells on, run from one place
            </h2>
            <p className="mt-4 text-body-lg text-muted">
              15+ marketplaces across 8 countries — catalog, advertising and
              analytics operated together, so spend follows margin instead of
              chasing whichever channel shouted loudest.
            </p>
          </Reveal>
        </div>

        {/* Reserved height, so mounting the canvas can never shift layout. */}
        <div
          ref={ref}
          className="relative mt-14 h-[420px] overflow-hidden rounded-[28px] border border-border bg-surface-1/50 sm:h-[520px]"
        >
          {mount && (
            <SceneCanvas reduced={false} className="absolute inset-0" />
          )}
          {/* Feathers the canvas edge into the section instead of ending on a hard line. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 50%, transparent 42%, var(--color-bg) 92%)",
            }}
          />
        </div>

        <RevealGroup className="mt-8 flex flex-wrap justify-center gap-2">
          {marketplaces.map((m) => (
            <span
              key={m}
              className="rounded-full border border-border bg-surface-1 px-3.5 py-1.5 font-mono text-xs text-muted"
            >
              {m}
            </span>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
