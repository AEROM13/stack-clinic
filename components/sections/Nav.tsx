export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full bg-severity-pass"
            style={{ boxShadow: "0 0 8px var(--severity-pass)" }}
            aria-hidden="true"
          />
          <span className="text-[15px] font-bold tracking-tight">
            Stack<span className="text-accent">Clinic</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <a
            href="#operations"
            className="font-mono text-xs uppercase tracking-[0.12em] text-dim transition-colors hover:text-text"
          >
            Operations
          </a>
          <a
            href="#process"
            className="font-mono text-xs uppercase tracking-[0.12em] text-dim transition-colors hover:text-text"
          >
            Process
          </a>
          <a
            href="#operator"
            className="font-mono text-xs uppercase tracking-[0.12em] text-dim transition-colors hover:text-text"
          >
            Operator
          </a>
        </div>

        <a
          href="#book"
          className="rounded-md border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent hover:text-ground"
        >
          Book a slot
        </a>
      </nav>
    </header>
  );
}
