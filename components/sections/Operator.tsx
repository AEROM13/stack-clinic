import { Reveal } from "@/components/Reveal";
import { SeverityBadge } from "@/components/SeverityBadge";

const PROOF = [
  {
    level: "critical" as const,
    stat: "9",
    label: "unauthenticated API routes",
    body: "found quietly exposed in production on my own SaaS. I fixed them, built the checklist, and now run that audit on other founders’ products.",
  },
  {
    level: "warn" as const,
    stat: "−90%",
    label: "Google API spend",
    body: "cut on my own product with a single caching pattern. Most stacks leak money from the exact same places.",
  },
  {
    level: "pass" as const,
    stat: "1",
    label: "young domain → your inbox",
    body: "the cold-email machine I sell is the one behind my own acquisition. The email that reached you was the product working.",
  },
];

export function Operator() {
  return (
    <section id="operator" className="section-y">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {"// operator"}
              </p>
              <h2 className="mt-3 text-balance text-3xl tracking-tight sm:text-4xl">
                Run by one person. Tested on one product first — mine.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-dim">
                StackClinic isn’t an agency with a junior pool. Every operation
                here is something I built to fix my own SaaS, then turned into a
                fixed-price product once it worked. You get the operator, not an
                account manager.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-dim">
                Next.js · Supabase · Vercel · Stripe · deliverability
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {PROOF.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08}>
                <div className="flex items-start gap-5 rounded-xl border border-line bg-surface/70 p-6">
                  <span className="font-mono text-3xl font-medium text-text">
                    {p.stat}
                  </span>
                  <div>
                    <div className="mb-2">
                      <SeverityBadge level={p.level}>{p.label}</SeverityBadge>
                    </div>
                    <p className="text-sm leading-relaxed text-dim">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
