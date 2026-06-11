"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Scanline — the section divider.
 *
 * A 1.5px horizontal ECG-style trace in severity-pass green that draws
 * itself left-to-right when scrolled into view, with a single pulse blip
 * at the R-peak mid-line.
 *
 * Reduced motion: the trace renders fully drawn and the blip sits static.
 */

// One flat baseline with a heartbeat spike centred at x≈536.
const TRACE =
  "M0 20 H505 l10 -3 l9 5 l12 -16 l12 28 l10 -14 l9 0 H1100";

const PEAK = { x: 536, y: 4 };

export function Scanline({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={`mx-auto w-full max-w-content ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1100 40"
        className="block w-full overflow-visible"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* faint full-width guide so the divider reads even before it draws */}
        <line
          x1={0}
          y1={20}
          x2={1100}
          y2={20}
          stroke="var(--border)"
          strokeWidth={1}
        />

        <motion.path
          d={TRACE}
          stroke="var(--severity-pass)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 4px rgba(61,220,151,0.45))" }}
          initial={reduced ? false : { pathLength: 0, opacity: 0.4 }}
          whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            pathLength: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.3 },
          }}
        />

        {/* pulse blip at the R-peak */}
        <motion.circle
          cx={PEAK.x}
          cy={PEAK.y}
          r={2.5}
          fill="var(--severity-pass)"
          style={{ filter: "drop-shadow(0 0 5px rgba(61,220,151,0.7))" }}
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: reduced ? 0 : 1.5, duration: 0.4 }}
        />
        {!reduced && (
          <motion.circle
            cx={PEAK.x}
            cy={PEAK.y}
            r={2.5}
            fill="none"
            stroke="var(--severity-pass)"
            strokeWidth={1}
            animate={{ r: [2.5, 9], opacity: [0.8, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.6,
            }}
          />
        )}
      </svg>
    </div>
  );
}
