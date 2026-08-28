"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scroll-store";

function coreScale(p: number) {
  if (p < 0.45) return 0.001;
  if (p < 0.62) return THREE.MathUtils.lerp(0.001, 1, (p - 0.45) / 0.17);
  if (p < 0.9) return 1;
  return THREE.MathUtils.lerp(1, 0.001, (p - 0.9) / 0.1);
}

/** Glowing AI core with an orbiting particle shell — the "growth engine". */
export function AICore({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 600;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 1.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const target = coreScale(scrollStore.progress);
    const next = reduced ? target : THREE.MathUtils.damp(g.scale.x, target, 6, dt);
    g.scale.setScalar(Math.max(next, 0.0001));
    if (!reduced) {
      g.rotation.y += dt * 0.25;
      if (shell.current) shell.current.rotation.y -= dt * 0.4;
    }
  });

  return (
    <group ref={group} scale={0.001}>
      <mesh>
        <icosahedronGeometry args={[1.15, 6]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#3b2f8f"
          emissiveIntensity={0.7}
          roughness={0.15}
          metalness={0.9}
          distort={reduced ? 0 : 0.38}
          speed={2.2}
        />
      </mesh>
      <mesh scale={1.03}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.14} />
      </mesh>
      <points ref={shell} geometry={particles}>
        <pointsMaterial
          size={0.03}
          color="#22d3ee"
          transparent
          opacity={0.85}
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
