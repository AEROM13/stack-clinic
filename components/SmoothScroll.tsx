"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * App-wide motion provider.
 *
 *  - Runs Lenis smooth scrolling, but ONLY when the user permits motion.
 *  - Wraps the tree in framer-motion's MotionConfig with reducedMotion="user",
 *    so every motion component automatically collapses transform/opacity
 *    animation when prefers-reduced-motion is set.
 *
 * When reduced motion is on: Lenis never instantiates (native scroll), and
 * components that read usePrefersReducedMotion render their static state.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
