"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/* TODO: replace with the real figures (pasting tonight). */
const PROOF_REPLY_RATE = 4; // % — placeholder
const PROOF_COST_CUT = 85; // % — placeholder

/**
 * CountUp — a single mono number that counts from 0 to `to` over 600ms, once,
 * when scrolled into view. Renders the final value on the server / under
 * reduced motion (no animation), so the figure is always present.
 */
function CountUp({
  to,
  format,
}: {
  to: number;
  format: (v: number) => string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  // Default to the final value so SSR / no-JS / reduced-motion show the number.
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    if (!inView) {
      setValue(0);
      return;
    }
    const controls = animate(0, to, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [reduced, inView, to]);

  return <span ref={ref}>{format(value)}</span>;
}

function Stat({ unit, children }: { unit: string; children: ReactNode }) {
  return (
    <div className="md:text-right">
      <div className="font-mono text-4xl font-medium leading-none tracking-tight text-accent sm:text-5xl">
        {children}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
        {unit}
      </div>
    </div>
  );
}

function ResultRow({
  label,
  finding,
  stat,
}: {
  label: string;
  finding: string;
  stat: ReactNode;
}) {
  return (
    <div className="grid gap-4 border-t border-line py-7 md:grid-cols-[170px_1fr_auto] md:items-center md:gap-8 md:py-8">
      <div className="flex items-center gap-2.5">
        <span
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-severity-pass"
          style={{ boxShadow: "0 0 6px var(--severity-pass)" }}
          aria-hidden="true"
        />
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text">
          {label}
        </span>
      </div>
      <p className="max-w-xl text-[15px] leading-relaxed text-dim">{finding}</p>
      {stat}
    </div>
  );
}

export function Proof() {
  return (
    <section id="proof" className="section-y">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Specimen: my own SaaS
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl tracking-tight sm:text-4xl">
            I sell what I had to learn the hard way.
          </h2>
        </Reveal>

        <div className="mt-12 border-b border-line">
          <ResultRow
            label="Outbound"
            finding="My own cold email lands in primary inboxes. The email that probably brought you here is the demo."
            stat={
              <Stat unit="reply rate">
                <CountUp
                  to={PROOF_REPLY_RATE}
                  format={(v) => `${Math.round(v)}%`}
                />
              </Stat>
            }
          />
          <ResultRow
            label="Security"
            finding="Found and patched 9 unauthenticated API routes in my own production app."
            stat={
              <Stat unit="routes patched / 0 breaches">
                <CountUp to={9} format={(v) => String(Math.round(v))} />
              </Stat>
            }
          />
          <ResultRow
            label="Costs"
            finding="One caching pattern collapsed my Google API bill."
            stat={
              <Stat unit="google api bill">
                <CountUp
                  to={PROOF_COST_CUT}
                  format={(v) => `−${Math.round(v)}%`}
                />
              </Stat>
            }
          />
        </div>
      </div>
    </section>
  );
}
