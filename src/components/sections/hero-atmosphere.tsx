"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Layered atmosphere behind the hero.
 *
 * Everything here animates `transform` or `opacity` only, so each layer is
 * promoted once and then composited by the GPU — no per-frame paint, no layout.
 * Deliberately *not* used: large `filter: blur()`, which is the single most
 * expensive raster operation on a mobile GPU. Every soft edge below is a
 * radial gradient, which costs essentially nothing.
 *
 * Mouse parallax writes CSS custom properties from a rAF-throttled listener
 * rather than React state, so moving the pointer never triggers a render.
 */
export function HeroAtmosphere() {
  const root = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;
    // Parallax is a fine-pointer enhancement: touch devices have no hover
    // position to track, and scroll-linked transforms stutter under momentum.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--mx", tx.toFixed(3));
        el.style.setProperty("--my", ty.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <div
      ref={root}
      aria-hidden
      className="atmosphere pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
    >
      {/* Aurora field — three drifting warm masses at different rates, so the
          light never resolves into a recognisable loop. */}
      <div className="atm-aurora atm-aurora-a" />
      <div className="atm-aurora atm-aurora-b" />
      <div className="atm-aurora atm-aurora-c" />

      {/* Slow light rays raking across the upper third. */}
      <div className="atm-rays" />

      {/* Grid that drifts upward, masked so it dissolves before the edges. */}
      <div className="atm-grid" />

      {/* Drifting motes. Twelve, not two hundred: past a couple of dozen the
          effect stops reading as depth and starts costing frames. */}
      <div className="atm-motes">
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="atm-mote"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              ["--d" as string]: `${m.dur}s`,
              ["--delay" as string]: `${m.delay}s`,
              ["--s" as string]: m.size,
            }}
          />
        ))}
      </div>

      {/* Film grain. One static SVG turbulence tile — rendered once, never
          re-rasterised, so it costs nothing per frame. */}
      <div className="atm-noise" />

      {/* Vignette, drawn last so it sits over every light source. */}
      <div className="atm-vignette" />
    </div>
  );
}

/** Fixed values, not Math.random(): random positions differ between the server
 *  and client render and produce a hydration mismatch. */
const MOTES = [
  { x: 8, y: 22, dur: 19, delay: 0, size: 1.5 },
  { x: 17, y: 71, dur: 24, delay: -6, size: 1 },
  { x: 26, y: 40, dur: 16, delay: -11, size: 2 },
  { x: 34, y: 86, dur: 27, delay: -3, size: 1 },
  { x: 45, y: 15, dur: 21, delay: -14, size: 1.5 },
  { x: 53, y: 62, dur: 18, delay: -8, size: 1 },
  { x: 62, y: 33, dur: 25, delay: -18, size: 2 },
  { x: 71, y: 78, dur: 20, delay: -2, size: 1.5 },
  { x: 79, y: 48, dur: 23, delay: -13, size: 1 },
  { x: 86, y: 19, dur: 17, delay: -9, size: 1.5 },
  { x: 92, y: 66, dur: 26, delay: -5, size: 1 },
  { x: 97, y: 37, dur: 22, delay: -16, size: 1.5 },
];
