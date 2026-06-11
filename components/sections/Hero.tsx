import { Reveal } from "@/components/Reveal";
import { SeverityBadge } from "@/components/SeverityBadge";

const VITALS: { label: string; level: "critical" | "warn" | "pass"; reading: string }[] = [
  { label: "DELIVERABILITY", level: "pass", reading: "98% inbox" },
  { label: "AUTH ROUTES", level: "critical", reading: "9 exposed" },
  { label: "API SPEND", level: "warn", reading: "+34% / mo" },
  { label: "RLS POLICIES", level: "critical", reading: "missing" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-content px-5 pb-12 pt-20 sm:px-8 md:pb-20 md:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: pitch */}
          <div>
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-severity-pass"
                  style={{ boxShadow: "0 0 6px var(--severity-pass)" }}
                />
                Status: accepting 2 clients · June
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-balance text-4xl tracking-tight sm:text-5xl md:text-6xl">
                I diagnose what’s broken in your SaaS —{" "}
                <span className="text-accent">then I fix it.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-dim">
                A solo-run, productised studio for indie founders. Three
                fixed-price operations: cold email that lands, security holes
                closed, infrastructure bills cut. Severity-ranked findings —
                fixes shipped, not just slides.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#operations"
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-ground transition-opacity hover:opacity-90"
                >
                  See the three operations
                </a>
                <a
                  href="#book"
                  className="inline-flex items-center justify-center rounded-md border border-line-strong px-5 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-text transition-colors hover:border-accent hover:text-accent"
                >
                  Book an audit
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: vitals monitor */}
          <Reveal delay={0.2}>
            <div className="rounded-xl border border-line bg-surface/70 p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                  patient_vitals.log
                </span>
                <span className="font-mono text-[11px] text-dim">live</span>
              </div>

              <ul className="space-y-3">
                {VITALS.map((v) => (
                  <li
                    key={v.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="font-mono text-xs tracking-[0.1em] text-text">
                      {v.label}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-dim">
                        {v.reading}
                      </span>
                      <SeverityBadge level={v.level} />
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-dim">
                {"> "} typical first-look findings. yours are probably similar.
                that’s the point.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
