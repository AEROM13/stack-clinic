import { Reveal } from "@/components/Reveal";
import { SeverityBadge } from "@/components/SeverityBadge";
import { OFFERS, type Offer } from "@/lib/offers";

function OfferCard({ offer, delay }: { offer: Offer; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="flex h-full flex-col rounded-xl border border-line bg-surface/70 p-6 transition-colors hover:border-line-strong sm:p-8">
        {/* header row */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className="font-mono text-sm text-dim">{offer.index}</span>
          <SeverityBadge level={offer.severity}>{offer.tag}</SeverityBadge>
        </div>

        <h3 className="text-2xl tracking-tight">{offer.name}</h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-accent">
          {offer.codename}
        </p>

        <p className="mt-4 text-balance text-[15px] leading-relaxed text-text">
          {offer.promise}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-dim">
          {offer.audience}
        </p>

        {/* price */}
        <div className="mt-6 flex items-baseline gap-2 border-y border-line py-4">
          <span className="font-mono text-3xl font-medium text-text">
            {offer.price}
          </span>
          <span className="font-mono text-xs text-dim">{offer.priceNote}</span>
        </div>

        {/* checklist */}
        <ul className="mt-6 space-y-2.5">
          {offer.checks.map((check) => (
            <li key={check} className="flex gap-3 text-sm leading-relaxed">
              <span
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-severity-pass"
                aria-hidden="true"
              />
              <span className="text-dim">{check}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 rounded-md border border-line bg-ground/40 p-4 text-sm leading-relaxed text-text">
          {offer.deliverable}
        </p>

        {/* options / guarantees */}
        <ul className="mt-5 space-y-2">
          {offer.options.map((opt) => (
            <li
              key={opt}
              className="font-mono text-[11px] leading-relaxed text-dim"
            >
              {"+ "}
              {opt}
            </li>
          ))}
        </ul>

        {/* CTA pinned to bottom */}
        <div className="mt-auto pt-7">
          <a
            href="#book"
            className="inline-flex w-full items-center justify-center rounded-md border border-accent/40 bg-accent/10 px-4 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-accent transition-colors hover:bg-accent hover:text-ground"
          >
            {offer.cta}
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="operations" className="section-y">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {"// operations"}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl tracking-tight sm:text-4xl">
            Three fixed-price ways to fix your stack.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-dim">
            Each one is scoped, priced, and time-boxed up front. No retainers
            required, no open-ended consulting. Pick the bleed you want stopped.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {OFFERS.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
