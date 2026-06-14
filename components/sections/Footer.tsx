/* Replace with the live X profile before launch. */
const X_PROFILE_URL = "https://x.com/saasshipper";
const CONTACT_EMAIL = "hello@leadsnipe.co.uk";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-y pt-0">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        {/* Final readout line — mirrors the hero scan, signing the report off. */}
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
              report.log
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              eof
            </span>
          </div>
          <p className="px-5 py-5 font-mono text-[12px] leading-relaxed text-dim sm:text-sm">
            <span className="text-severity-pass">{"> "}</span>
            END OF REPORT —{" "}
            <span className="font-medium text-text">STACKCLINIC</span>{" // "}run
            by a solo founder. replies come from the person doing the work.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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

          <div className="flex items-center gap-6 font-mono text-xs">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="ring-focus link-underline text-dim transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={X_PROFILE_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="StackClinic on X (opens in a new tab)"
              className="ring-focus link-underline text-dim transition-colors hover:text-accent"
            >
              X <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
          © {year} StackClinic · solo-run · built to be fixed
        </p>
      </div>
    </footer>
  );
}
