"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe reduced-motion hook. Returns `true` when the user has asked
 * the OS to minimise motion. Drives whether Lenis runs and whether
 * non-essential animation is allowed to play.
 */
export function usePrefersReducedMotion(): boolean {
  // Default to `true` (no motion) so first paint is calm; corrected on mount.
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
