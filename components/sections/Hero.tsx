"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { m, type Variants } from "framer-motion";
import { SeverityBadge } from "@/components/SeverityBadge";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/* useLayoutEffect warns during SSR; fall back to useEffect on the server so
   we can still set the intro state pre-paint on the client (no flash). */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Sev = "critical" | "warn" | "pass";

interface Metrics {
  weightKb: number | null;
  resources: number | null;
  ttiSec: number | null;
  /** null = navigator.connection unavailable (e.g. Safari) */
  connection: string | null;
  connectionLevel: Sev;
  viewport: string;
}

/* Reads genuine numbers off the visitor's own session. Everything here is real
   browser data — no fabricated figures. Missing APIs degrade to null. */
function collectMetrics(): Metrics {
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  const res = performance.getEntriesByType(
    "resource",
  ) as PerformanceResourceTiming[];

  // Transfer size: sum of every resource + the document itself. Cross-origin
  // assets without Timing-Allow-Origin report 0, so this is a floor, not a lie.
  let bytes = nav?.transferSize ?? 0;
  for (const r of res) bytes += r.transferSize || 0;
  const weightKb = bytes > 0 ? Math.round(bytes / 1024) : null;

  const resources = res.length + (nav ? 1 : 0);

  // domInteractive is a real navigation-timing milestone, relative to timeOrigin.
  const ttiSec =
    nav && nav.domInteractive > 0 ? nav.domInteractive / 1000 : null;

  // navigator.connection is non-standard and absent in Safari/Firefox.
  const conn = (
    navigator as Navigator & {
      connection?: { effectiveType?: string; downlink?: number };
    }
  ).connection;

  let connection: string | null = null;
  let connectionLevel: Sev = "warn";
  if (conn && (conn.effectiveType || conn.downlink != null)) {
    const et = conn.effectiveType ?? "?";
    const dl = conn.downlink != null ? `${conn.downlink}mbps` : "";
    connection = [et, dl].filter(Boolean).join(" / ");
    connectionLevel = /4g|5g/.test(et) ? "pass" : et === "3g" ? "warn" : "critical";
  }

  const dpr = Math.round((window.devicePixelRatio || 1) * 10) / 10;
  const viewport = `${window.innerWidth}×${window.innerHeight} @${dpr}x`;

  return { weightKb, resources, ttiSec, connection, connectionLevel, viewport };
}

const LEADER_WIDTH = 22;
function leader(label: string): string {
  const dots = ".".repeat(Math.max(3, LEADER_WIDTH - label.length));
  return `${label} ${dots}`;
}

type Line =
  | { kind: "head" | "foot"; text: string }
  | { kind: "data"; text: string; level: Sev; tag: string };

const DATA_LABELS = [
  "page weight",
  "resources",
  "time to interactive",
  "connection",
  "viewport",
  "marketing claims",
];

const HEAD_TEXT = "> SCANNING VISITOR SESSION...";
const FOOT_TEXT =
  "> SCAN COMPLETE — 1 finding: your own stack has never had this done to it.";

/* Turns measured metrics into the readout's lines + severity ratings. With no
   metrics (no-JS SSR), emits a structurally-complete "pending" readout so the
   panel still reads as a finished instrument. */
function buildLines(m: Metrics | null): Line[] {
  if (!m) {
    return [
      { kind: "head", text: HEAD_TEXT },
      ...DATA_LABELS.map(
        (l): Line => ({
          kind: "data",
          text: `> ${leader(l)} —`,
          level: "warn",
          tag: "PENDING",
        }),
      ),
      { kind: "foot", text: FOOT_TEXT },
    ];
  }

  const data: Line[] = [];

  // page weight
  if (m.weightKb != null) {
    const lvl: Sev = m.weightKb < 800 ? "pass" : m.weightKb < 2000 ? "warn" : "critical";
    data.push({
      kind: "data",
      text: `> ${leader("page weight")} ${m.weightKb}kb`,
      level: lvl,
      tag: lvl === "pass" ? "PASS" : lvl === "warn" ? "BLOAT" : "HEAVY",
    });
  } else {
    data.push({
      kind: "data",
      text: `> ${leader("page weight")} no data`,
      level: "warn",
      tag: "NO DATA",
    });
  }

  // resources loaded
  {
    const n = m.resources ?? 0;
    const lvl: Sev = n < 30 ? "pass" : n < 60 ? "warn" : "critical";
    data.push({
      kind: "data",
      text: `> ${leader("resources")} ${n} files`,
      level: lvl,
      tag: lvl === "pass" ? "PASS" : lvl === "warn" ? "BUSY" : "BLOAT",
    });
  }

  // time to interactive
  if (m.ttiSec != null) {
    const lvl: Sev = m.ttiSec < 1.5 ? "pass" : m.ttiSec < 3 ? "warn" : "critical";
    data.push({
      kind: "data",
      text: `> ${leader("time to interactive")} ${m.ttiSec.toFixed(1)}s`,
      level: lvl,
      tag: lvl === "pass" ? "SNAPPY" : lvl === "warn" ? "OK" : "SLOW",
    });
  } else {
    data.push({
      kind: "data",
      text: `> ${leader("time to interactive")} no data`,
      level: "warn",
      tag: "NO DATA",
    });
  }

  // connection — leans into the Safari gap
  if (m.connection) {
    data.push({
      kind: "data",
      text: `> ${leader("connection")} ${m.connection}`,
      level: m.connectionLevel,
      tag:
        m.connectionLevel === "pass"
          ? "PASS"
          : m.connectionLevel === "warn"
            ? "OK"
            : "SLOW",
    });
  } else {
    data.push({
      kind: "data",
      text: `> ${leader("connection")} [REDACTED BY SAFARI]`,
      level: "warn",
      tag: "REDACTED",
    });
  }

  // viewport
  data.push({
    kind: "data",
    text: `> ${leader("viewport")} ${m.viewport}`,
    level: "pass",
    tag: "NOTED",
  });

  // the joke line — accurate: this page makes zero marketing claims
  data.push({
    kind: "data",
    text: `> ${leader("marketing claims")} 0 detected`,
    level: "pass",
    tag: "HONEST",
  });

  return [
    { kind: "head", text: HEAD_TEXT },
    ...data,
    { kind: "foot", text: FOOT_TEXT },
  ];
}

// Typing cadence. ~3 chars / 18ms keeps the scan around ~1.7s; the headline
// cascade overlaps after, landing the whole sequence comfortably under 3s.
const TICK_MS = 18;
const STEP_CHARS = 3;

type Phase = "scan" | "headline";

export function Hero() {
  const reduced = usePrefersReducedMotion();

  // SSR / no-JS / reduced-motion default: final state, fully visible.
  const [intro, setIntro] = useState(false);
  const [phase, setPhase] = useState<Phase>("headline");
  const [typed, setTyped] = useState(0);
  const [instant, setInstant] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const lines = useMemo(() => buildLines(metrics), [metrics]);
  const totalChars = useMemo(
    () => lines.reduce((sum, l) => sum + l.text.length, 0),
    [lines],
  );

  const skipRef = useRef(false);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Replay the scan from scratch with freshly-measured numbers.
  const rerun = useCallback(() => {
    if (reduced) return;
    skipRef.current = false;
    setInstant(false);
    setMetrics(collectMetrics());
    setTyped(0);
    setIntro(true);
    setPhase("scan");
  }, [reduced]);

  // Decide intro-vs-static before first paint so there's no flash of the
  // final state on capable browsers. Measures the session either way.
  useIsoLayoutEffect(() => {
    setMetrics(collectMetrics());

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Real data, rendered instantly, no animation.
      setPhase("headline");
      setIntro(false);
      return;
    }

    setIntro(true);
    setPhase("scan");
    setTyped(0);
  }, []);

  // Drive the typewriter while scanning.
  useEffect(() => {
    if (!intro || phase !== "scan" || !metrics) return;

    let cur = 0;
    let handoff: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      cur += STEP_CHARS;
      if (cur >= totalChars) {
        setTyped(totalChars);
        clearInterval(id);
        // Tiny beat, then the panel docks and the headline cascades in.
        handoff = setTimeout(() => setPhase("headline"), 140);
      } else {
        setTyped(cur);
      }
    }, TICK_MS);

    return () => {
      clearInterval(id);
      if (handoff) clearTimeout(handoff);
    };
  }, [intro, phase, metrics, totalChars]);

  // Never hold the visitor hostage: any click / scroll / keypress fast-forwards
  // straight to the final state.
  useEffect(() => {
    if (!intro || phase !== "scan") return;

    const skip = () => {
      if (skipRef.current) return;
      skipRef.current = true;
      setInstant(true);
      setTyped(Number.MAX_SAFE_INTEGER);
      setPhase("headline");
    };

    const passive = { passive: true } as AddEventListenerOptions;
    window.addEventListener("pointerdown", skip, passive);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, passive);
    window.addEventListener("touchmove", skip, passive);

    return () => {
      window.removeEventListener("pointerdown", skip, passive);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip, passive);
      window.removeEventListener("touchmove", skip, passive);
    };
  }, [intro, phase]);

  const scanning = intro && phase === "scan";
  const showHeadline = !intro || phase === "headline";
  // When not running the intro, reveal the entire readout immediately.
  const typedNow = intro ? typed : Number.MAX_SAFE_INTEGER;
  // The docked panel can be re-run once a scan is possible and finished.
  const canRerun = !reduced && !scanning;

  // The headline is server-rendered (for SEO) and stays mounted while the intro
  // scan paints over it at opacity-0. `inert` keeps its CTA links out of the tab
  // order and the accessibility tree until the scan docks — so a keyboard user
  // never lands focus on an invisible button. It clears the moment scanning ends
  // (and never applies under reduced motion / no-JS, where scanning is false).
  useEffect(() => {
    const el = headlineRef.current;
    if (el) el.inert = scanning;
  }, [scanning]);

  const containerV: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: instant ? 0 : 0.08,
        delayChildren: instant ? 0 : 0.12,
      },
    },
  };
  const itemV: Variants = {
    hidden: { opacity: 0, y: 16, transition: { duration: 0 } },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: instant ? 0.001 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-content px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-32">
        <div
          className={
            scanning
              ? "grid min-h-[440px] grid-cols-1 place-items-center"
              : "grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14"
          }
        >
          {/* ── Headline (server-rendered for SEO; animation only orchestrates
                what is already in the DOM) ── */}
          <m.div
            ref={headlineRef}
            className={
              scanning
                ? "pointer-events-none absolute inset-x-0 opacity-0"
                : "relative"
            }
            variants={containerV}
            initial={intro ? "hidden" : false}
            animate={showHeadline ? "show" : "hidden"}
          >
            <m.p
              variants={itemV}
              className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim"
            >
              For B2B SaaS founders &amp; agencies
            </m.p>

            <m.h1
              variants={itemV}
              className="text-balance text-4xl tracking-tight sm:text-5xl md:text-[3.5rem]"
            >
              Your stack has problems it hasn&rsquo;t told you about.
            </m.h1>

            <m.p
              variants={itemV}
              className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-dim"
            >
              I find them and fix them. Cold outbound built, security holes
              patched, infrastructure bills cut &mdash; fixed prices, fixed
              timelines, by a solo founder who runs this exact stack in
              production.
            </m.p>

            <m.div
              variants={itemV}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#book"
                className="press ring-focus inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-ground hover:opacity-90"
              >
                Book a 15-min call
              </a>
              <a
                href="#offers"
                className="press ring-focus inline-flex items-center justify-center rounded-md border border-line-strong px-5 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-text hover:border-accent hover:text-accent"
              >
                See the offers
              </a>
            </m.div>
          </m.div>

          {/* ── Instrument readout ── */}
          <m.div
            layout
            onClick={canRerun ? rerun : undefined}
            transition={{
              layout: {
                duration: instant ? 0.001 : 0.55,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className={
              "w-full rounded-xl border border-line bg-surface" +
              (scanning ? " max-w-2xl" : " lg:max-w-md lg:justify-self-end") +
              (canRerun ? " cursor-pointer" : "")
            }
          >
            <m.div layout="position" className="p-5 sm:p-6">
              {/* titlebar */}
              <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                  session_audit.log
                </span>
                {scanning ? (
                  <span className="flex items-center gap-2 font-mono text-[11px] text-dim">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-severity-pass"
                      style={{ boxShadow: "0 0 6px var(--severity-pass)" }}
                      aria-hidden="true"
                    />
                    live
                  </span>
                ) : canRerun ? (
                  <button
                    type="button"
                    onClick={rerun}
                    className="press ring-focus -mr-1 rounded font-mono text-[11px] uppercase tracking-[0.14em] text-dim hover:text-accent"
                  >
                    re-run scan ↻
                  </button>
                ) : (
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                    complete
                  </span>
                )}
              </div>

              {/* readout lines */}
              <div className="space-y-1.5 overflow-x-auto">
                {(() => {
                  let acc = 0;
                  return lines.map((line, i) => {
                    const start = acc;
                    const len = line.text.length;
                    acc += len;

                    const vis = Math.max(0, Math.min(typedNow - start, len));
                    const shown = line.text.slice(0, vis);
                    const complete = vis >= len;
                    const active = vis > 0 && vis < len;

                    const tone =
                      line.kind === "head"
                        ? "text-dim"
                        : line.kind === "foot"
                          ? "text-text"
                          : "text-text";

                    return (
                      <div
                        key={i}
                        className={
                          "flex min-h-[1.45em] items-center gap-2 font-mono text-[11px] leading-relaxed sm:text-xs " +
                          tone
                        }
                      >
                        <span className="whitespace-pre">{shown}</span>
                        {active && (
                          <span
                            className="inline-block h-[0.95em] w-[0.5em] bg-accent align-middle motion-safe:animate-pulse"
                            aria-hidden="true"
                          />
                        )}
                        {line.kind === "data" && complete && (
                          <SeverityBadge
                            level={line.level}
                            className="ml-1 shrink-0 px-2 py-0.5 text-[10px] tracking-[0.12em]"
                          >
                            {line.tag}
                          </SeverityBadge>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>

              {scanning && (
                <p className="mt-4 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  press anything to skip
                </p>
              )}
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
