"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * App-wide motion provider.
 *
 *  - Runs Lenis smooth scrolling, but ONLY when the user permits motion.
 *  - Intercepts in-page anchor clicks (#offers, #book, …) and routes them
 *    through lenis.scrollTo so jump-links share the same weighty easing.
 *  - LazyMotion (domMax) loads framer features once and lets every component
 *    use the lighter `m.*` primitives; `strict` forbids the heavy `motion.*`.
 *  - MotionConfig reducedMotion="user" collapses transform animations to
 *    nothing when prefers-reduced-motion is set.
 *
 * Reduced motion: Lenis never instantiates (native scroll + CSS
 * scroll-padding handle anchor jumps), and motion components render static.
 */

// Clear the sticky ~4rem nav when scrolling to an anchor.
const NAV_OFFSET = -72;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      // expo-out — quick to respond, settles with weight (not floaty drift)
      easing: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
