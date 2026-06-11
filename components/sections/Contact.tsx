import { Reveal } from "@/components/Reveal";

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="book" className="section-y">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <div className="rounded-2xl border border-line bg-surface/70 p-8 text-center sm:p-14">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {"// book a slot"}
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl tracking-tight sm:text-4xl">
              Tell me what’s bleeding. I’ll tell you which operation stops it.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-dim">
              Two client slots open this month. One short reply gets you a
              fixed price and a start date — no discovery-call gauntlet.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:hello@stackclinic.dev?subject=StackClinic%20—%20book%20a%20slot"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-ground transition-opacity hover:opacity-90"
              >
                hello@stackclinic.dev
              </a>
              <a
                href="#operations"
                className="inline-flex items-center justify-center rounded-md border border-line-strong px-6 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-text transition-colors hover:border-accent hover:text-accent"
              >
                Re-read the operations
              </a>
            </div>
          </div>
        </Reveal>

        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-block h-2 w-2 rounded-full bg-severity-pass"
              style={{ boxShadow: "0 0 8px var(--severity-pass)" }}
              aria-hidden="true"
            />
            <span className="text-sm font-bold tracking-tight">
              Stack<span className="text-accent">Clinic</span>
            </span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
            © {year} StackClinic · solo-run · built to be fixed
          </p>
        </footer>
      </div>
    </section>
  );
}
