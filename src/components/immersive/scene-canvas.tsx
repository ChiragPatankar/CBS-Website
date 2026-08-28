"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BackgroundParticles } from "./particles";
import { Globe } from "./globe";
import { MarketplaceField } from "./marketplace-nodes";
import { CameraRig } from "./camera-rig";

/**
 * One held hero composition: a dotted globe with marketplace nodes and trade
 * routes, rotating slowly. Scroll eases the camera and tilts the globe; it no
 * longer morphs the scene.
 *
 * `AICore` was removed from this scene deliberately. It was scroll-scrubbed from
 * 0.001 up to full scale and back down, and it occupied the same origin as the
 * globe — so mid-page the two intersected and z-fought. The component file is
 * kept for reuse on a technology/AI page where it can stand on its own.
 */
export function SceneCanvas({
  reduced,
  getProgress,
  /** Defaults to a full-bleed backdrop; pass e.g. "absolute inset-0" to contain it. */
  className = "fixed inset-0 -z-10",
}: {
  reduced: boolean;
  getProgress?: () => number;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        /* Capped lower than before: above ~1.5 the point clouds cost more than
           they gain visually, and DPR switching itself caused visible shifts. */
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.2, 8.6], fov: 42 }}
      >
        <color attach="background" args={["#0a0908"]} />
        <fog attach="fog" args={["#0a0908", 16, 42]} />
        <ambientLight intensity={0.55} />
        <pointLight position={[6, 6, 8]} intensity={4} decay={0} color="#f0562d" />
        <pointLight position={[-8, -4, 4]} intensity={2.6} decay={0} color="#e8b06a" />

        <Suspense fallback={null}>
          <BackgroundParticles reduced={reduced} />
          <Globe reduced={reduced} getProgress={getProgress} />
          <MarketplaceField reduced={reduced} getProgress={getProgress} />
        </Suspense>

        <CameraRig reduced={reduced} getProgress={getProgress} />

        {!reduced && (
          <EffectComposer>
            {/* Threshold raised from 0.28 to 0.62 and intensity cut. At the old
                setting thousands of size-attenuated points sat right on the
                threshold and crossed it sub-pixel every frame, which is what
                read as flickering. Now only genuinely bright emitters bloom. */}
            <Bloom
              mipmapBlur
              intensity={0.5}
              luminanceThreshold={0.62}
              luminanceSmoothing={0.25}
            />
            <Vignette offset={0.3} darkness={0.8} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
