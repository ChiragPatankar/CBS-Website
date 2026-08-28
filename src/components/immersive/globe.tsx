"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

/**
 * True rim glow.
 *
 * The previous version rendered this on `side: BackSide`, where geometry normals
 * point away from the camera across the whole far hemisphere — so
 * `max(dot(N, V), 0.0)` clamped to 0, `fresnel` evaluated to 1 everywhere, and
 * additive blending filled the entire disc with flat colour. Hence the muddy
 * disc rather than an atmosphere.
 *
 * On FrontSide with `abs(dot(N, V))`, the term peaks only at grazing angles: the
 * silhouette edge lights up and the centre stays transparent. The colour is
 * mixed vertically across the brand ramp (ember → copper → brass) so the rim
 * carries the "Ember & Ink" identity rather than one flat hue.
 */
const atmosphereFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  uniform vec3 uLow;
  uniform vec3 uMid;
  uniform vec3 uHigh;
  void main() {
    float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.0);
    float h = clamp(vNormal.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 tint = h < 0.5
      ? mix(uLow, uMid, h * 2.0)
      : mix(uMid, uHigh, (h - 0.5) * 2.0);
    gl_FragColor = vec4(tint * rim * 1.1, rim * 0.8);
  }
`;

/** Fibonacci-sphere point cloud — the "dotted earth" surface. */
function useSpherePoints(count: number, radius: number) {
  return useMemo(() => {
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      arr[i * 3] = Math.cos(theta) * r * radius;
      arr[i * 3 + 1] = y * radius;
      arr[i * 3 + 2] = Math.sin(theta) * r * radius;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count, radius]);
}

/**
 * The globe holds a single steady composition and simply rotates.
 *
 * It used to be scroll-scrubbed down to 0.001 scale between 42% and 90% of the
 * page and then sprung back. That collapse was the source of the visible
 * flicker — sub-pixel geometry with additive blending shimmers, and the
 * near-degenerate scale made normals unstable. Holding the composition also
 * reads as more deliberate than a shape that morphs while you read the headline.
 *
 * `getProgress` is a getter rather than a value so the caller owns the scroll
 * source (this used to read the global `scrollStore` directly, which made the
 * component unusable anywhere but the immersive homepage) while still being
 * readable per-frame. It drives only a slow tilt.
 */
export function Globe({
  reduced,
  getProgress,
}: {
  reduced: boolean;
  getProgress?: () => number;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const points = useSpherePoints(1600, 2.02);
  const uniforms = useMemo(
    () => ({
      uLow: { value: new THREE.Color("#f0562d") },
      uMid: { value: new THREE.Color("#d9773f") },
      uHigh: { value: new THREE.Color("#e8b06a") },
    }),
    []
  );

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    if (!reduced) {
      g.rotation.y += dt * 0.045;
      // Counter-rotation. Two bodies turning against each other read as a
      // system with mechanics; one spinning ball reads as a spinning ball.
      if (ring.current) ring.current.rotation.z -= dt * 0.075;
    }
    // A few degrees of tilt across the whole page — felt, not watched.
    const p = getProgress?.() ?? 0;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, p * 0.22, 3, dt);
  });

  return (
    <group ref={group}>
      {/* No depth-only occluder here. One was added so the marketplace labels
          could tell when they had rotated behind the globe, but the labels do
          that in JS instead (normal · camera in marketplace-nodes.tsx). All the
          occluder actually did was hide the trade-route arcs and the travelling
          packets, which spend most of their length inside the sphere — i.e. it
          concealed the most interesting thing in the scene. */}

      {/* Geodesic shell. Detail 6 meant 20 × 4⁶ ≈ 82,000 triangles for a
          wireframe, which read as noise and cost far more than it earned.
          Detail 2 is 320 triangles: a legible geodesic that can carry more
          opacity because it is no longer a solid mat of lines. */}
      <mesh>
        <icosahedronGeometry args={[2, 2]} />
        <meshBasicMaterial color="#f0562d" wireframe transparent opacity={0.22} />
      </mesh>

      {/* dotted surface — denser and brighter, so it reads as a landmass
          stipple rather than a faint dusting */}
      <points geometry={points}>
        <pointsMaterial
          size={0.026}
          color="#ffcdb4"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Orbital band. Sits outside the surface on a tilted axis so it crosses
          the silhouette, which is what sells the globe as dimensional rather
          than as a flat disc with a glow. */}
      <group ref={ring} rotation={[Math.PI * 0.46, 0, Math.PI * 0.1]}>
        <mesh>
          <torusGeometry args={[2.62, 0.005, 6, 160]} />
          <meshBasicMaterial color="#e8b06a" transparent opacity={0.4} />
        </mesh>
        <mesh scale={1.09}>
          <torusGeometry args={[2.62, 0.003, 6, 160]} />
          <meshBasicMaterial color="#d9773f" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* fresnel atmosphere — drawn last so it composites over the surface */}
      <mesh scale={1.06} renderOrder={2}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={uniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
