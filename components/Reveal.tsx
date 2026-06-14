import type { ReactNode } from "react";

/**
 * Reveal — a static layout wrapper.
 *
 * Per the motion contract, the only animated moments on the page are the hero
 * readout, the scanline draws, the severity stamps, and the proof count-ups.
 * Section content does NOT animate in, so this is a plain pass-through. The
 * `delay` prop is accepted (so call sites stay unchanged) but intentionally
 * ignored — there's nothing to delay.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  /** Accepted for API compatibility; no longer drives any animation. */
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
