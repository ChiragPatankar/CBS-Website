"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Key = { p: number; pos: [number, number, number] };

/**
 * A single slow push-in with a gentle lateral drift, rather than a cut-driven
 * tour. The previous path reversed direction three times (z: 8.6 → 10.4 → 6.4 →
 * 7.4 → 8.0 → 9.4), so scrolling steadily produced a camera that lurched
 * forward and back. Distances now move in one direction and the drift is small
 * enough to be felt rather than watched.
 */
const KEYS: Key[] = [
  { p: 0.0, pos: [0, 0.25, 8.9] },
  { p: 0.35, pos: [1.1, 0.55, 8.1] },
  { p: 0.7, pos: [-0.9, 0.15, 7.4] },
  { p: 1.0, pos: [0, 0, 6.9] },
];

const tmp = new THREE.Vector3();

/** Smoothstep — removes the velocity kink at each keyframe boundary. */
function ease(t: number) {
  return t * t * (3 - 2 * t);
}

function samplePosition(p: number, out: THREE.Vector3) {
  if (p <= KEYS[0].p) return out.set(...KEYS[0].pos);
  if (p >= KEYS[KEYS.length - 1].p) return out.set(...KEYS[KEYS.length - 1].pos);
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = ease((p - a.p) / (b.p - a.p));
      return out.set(
        THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
        THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
        THREE.MathUtils.lerp(a.pos[2], b.pos[2], t)
      );
    }
  }
  return out;
}

export function CameraRig({
  reduced,
  getProgress,
}: {
  reduced: boolean;
  getProgress?: () => number;
}) {
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, dt) => {
    samplePosition(getProgress?.() ?? 0, tmp);
    // Pointer parallax, halved. At the old ±0.5 the scene swam under small mouse
    // movements, which compounded the sense of instability.
    tmp.x += state.pointer.x * 0.22;
    tmp.y += state.pointer.y * 0.15;

    const lambda = 3.2;
    if (reduced) {
      state.camera.position.copy(tmp);
    } else {
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, tmp.x, lambda, dt);
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, tmp.y, lambda, dt);
      state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, tmp.z, lambda, dt);
    }
    state.camera.lookAt(target.current);
  });

  return null;
}
