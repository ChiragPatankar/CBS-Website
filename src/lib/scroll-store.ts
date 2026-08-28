/**
 * Module-level scroll progress (0..1), written by the page's scroll/Lenis loop
 * and read inside the R3F render loop (useFrame) — deliberately outside React
 * state so scroll never triggers re-renders of the 3D scene.
 */
export const scrollStore = { progress: 0 };
