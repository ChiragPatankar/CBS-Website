"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { marketplaces } from "@/content/home";

const RADIUS = 2.7;

/**
 * Every marketplace is labelled.
 *
 * This was capped at 5, then hard-culled to front-facing only, which usually
 * left one or two names on screen — so the section claimed "every channel" and
 * showed almost none. Labels are now depth-faded rather than switched off, so
 * the front of the globe stays legible, the back recedes instead of vanishing,
 * and every name comes round as it rotates.
 */
const LABELLED_COUNT = marketplaces.length;

type NodeDef = {
  name: string;
  pos: THREE.Vector3;
  curve: THREE.QuadraticBezierCurve3;
  points: THREE.Vector3[];
  offset: number;
  labelled: boolean;
};

export function MarketplaceField({
  reduced,
  getProgress,
}: {
  reduced: boolean;
  getProgress?: () => number;
}) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo<NodeDef[]>(() => {
    const golden = Math.PI * (Math.sqrt(5) - 1);
    const center = new THREE.Vector3(0, 0, 0);
    return marketplaces.map((name, i) => {
      const y = 1 - (i / (marketplaces.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const pos = new THREE.Vector3(
        Math.cos(theta) * r * RADIUS,
        y * RADIUS,
        Math.sin(theta) * r * RADIUS
      );
      // control point bulges outward for a curved trade route
      const control = pos.clone().multiplyScalar(0.55).add(pos.clone().normalize().multiplyScalar(1.1));
      const curve = new THREE.QuadraticBezierCurve3(pos.clone(), control, center);
      return {
        name,
        pos,
        curve,
        points: curve.getPoints(50),
        offset: i / marketplaces.length,
        labelled: i < LABELLED_COUNT,
      };
    });
  }, []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    if (!reduced) g.rotation.y += dt * 0.038;
    // Previously this group was scrubbed from 1.3 down to 0.08 scale across the
    // page. Because drei's <Html> labels render at a fixed screen size, they did
    // not shrink with it — all eight converged, full-size, on the middle of the
    // viewport and landed on top of the headline. The field now holds its scale
    // and scroll only eases it very slightly toward the camera.
    const target = 1 + (getProgress?.() ?? 0) * 0.06;
    g.scale.setScalar(reduced ? target : THREE.MathUtils.damp(g.scale.x, target, 3, dt));
  });

  return (
    <group ref={group}>
      {nodes.map((n) => (
        <Arc key={n.name} node={n} reduced={reduced} />
      ))}
    </group>
  );
}

function Arc({ node, reduced }: { node: NodeDef; reduced: boolean }) {
  const packet = useRef<THREE.Mesh>(null);
  const nodeGroup = useRef<THREE.Group>(null);
  const dot = useRef<THREE.Mesh>(null);
  const label = useRef<HTMLSpanElement>(null);

  // Reused across frames — allocating vectors inside useFrame churns the GC.
  const vecs = useMemo(
    () => ({
      world: new THREE.Vector3(),
      toCam: new THREE.Vector3(),
      normal: new THREE.Vector3(),
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (packet.current && !reduced) {
      const p = (t * 0.16 + node.offset) % 1;
      node.curve.getPointAt(p, packet.current.position);
    }

    const ng = nodeGroup.current;
    if (!ng) return;

    // drei's <Html> is real DOM layered over the canvas, so it gets no depth
    // test for free. Compare the node's outward normal against the direction to
    // the camera: -1 is dead centre facing us, +1 is directly behind the globe.
    vecs.world.setFromMatrixPosition(ng.matrixWorld);
    vecs.toCam.copy(vecs.world).sub(state.camera.position).normalize();
    vecs.normal.copy(vecs.world).normalize();
    const facing = vecs.normal.dot(vecs.toCam);

    // Fade across the terminator rather than switching at it. Front half stays
    // fully legible; the back fades to a ghost so you can see it come round.
    if (label.current) {
      label.current.style.opacity = String(
        THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(facing, 0.15, -0.35, 0.08, 1), 0.08, 1)
      );
    }

    // Node breathes, offset per node so the field shimmers rather than blinks.
    if (dot.current && !reduced) {
      dot.current.scale.setScalar(1 + Math.sin(t * 1.6 + node.offset * 8) * 0.16);
    }
  });

  return (
    <group>
      {/* node */}
      <group ref={nodeGroup} position={node.pos}>
        <mesh ref={dot}>
          <icosahedronGeometry args={[0.075, 2]} />
          <meshStandardMaterial
            color="#ffe0cf"
            emissive="#f0562d"
            /* Was 2.2 with toneMapped off, which pushed these well past the
               bloom threshold and made them shimmer frame to frame. */
            emissiveIntensity={1.4}
          />
        </mesh>
        {/* Soft halo so each node reads as a lit port rather than a plastic bead. */}
        <mesh scale={2.6}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial
            color="#f0562d"
            transparent
            opacity={0.13}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {node.labelled && (
          <Html
            center
            position={[0, 0.26, 0]}
            /* Must stay below the headline layer (z-10 in overlays.tsx) —
               the old [20, 0] range is why labels painted over the H1. */
            zIndexRange={[5, 0]}
            style={{ pointerEvents: "none" }}
          >
            {/* No backdrop-blur: that would be one backdrop-filter element per
                marketplace compositing over a live WebGL canvas every frame.
                A solid tint costs nothing and is more legible over the arcs. */}
            <span
              ref={label}
              style={{ opacity: 0 }}
              className="whitespace-nowrap rounded-md border border-brand/25 bg-[#140d0a]/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#ffd9c2]"
            >
              {node.name}
            </span>
          </Html>
        )}
      </group>

      {/* Trade route. Brighter now that it is actually visible — the occluder
          sphere used to swallow the whole inner run of every arc. */}
      <Line points={node.points} color="#d9773f" lineWidth={1} transparent opacity={0.34} />

      {/* travelling revenue packet, with a faint trailing glow */}
      <mesh ref={packet}>
        <sphereGeometry args={[0.038, 12, 12]} />
        <meshBasicMaterial color="#ffd9b0" toneMapped={false} />
        <mesh scale={3}>
          <sphereGeometry args={[0.038, 12, 12]} />
          <meshBasicMaterial
            color="#e8b06a"
            transparent
            opacity={0.18}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </mesh>
    </group>
  );
}
