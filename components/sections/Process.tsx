import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Intake",
    body: "A short call and read-only access. I learn the stack, the stakes, and what “fixed” means for you. Same week.",
  },
  {
    n: "02",
    title: "Diagnose",
    body: "I run the operation against your product — routes, policies, bills, or deliverability — and capture every finding with evidence.",
  },
  {
    n: "03",
    title: "Severity report",
    body: "Findings ranked Critical → Low, each with reproduction steps and a code-level fix. Walked through on a 30-minute call.",
  },
  {
    n: "04",
    title: "Fix shipped",
    body: "On fix engagements I implement the changes and hand back a before/after. You get a working system, not a slide deck.",
  },
];

export function Process() {
  return (
    <section id="process" className="section-y">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {"// process"}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl tracking-tight sm:text-4xl">
            How an engagement runs.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.07} className="h-full">
              <div className="flex h-full flex-col bg-surface/70 p-6">
                <span className="font-mono text-2xl font-medium text-accent">
                  {step.n}
                </span>
                <h3 className="mt-4 text-lg tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
