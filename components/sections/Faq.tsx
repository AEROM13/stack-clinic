import { Reveal } from "@/components/Reveal";

const FAQS: { q: string; a: string }[] = [
  {
    q: "Who actually does the work?",
    a: "Me. Solo. No juniors, no outsourcing.",
  },
  {
    q: "What if I’m not on Next.js/Supabase?",
    a: "Offer A is stack-agnostic; B and C are built for the modern JS/Supabase stack.",
  },
  {
    q: "How do payments work?",
    a: "Stripe, upfront, work starts within 24h.",
  },
  {
    q: "The refund deal on the cost audit?",
    a: "If identified savings over 12 months don’t exceed my fee: full refund.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section-y">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {"// faq"}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl tracking-tight sm:text-4xl">
            Questions, answered straight.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 border-t border-line">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center gap-3 rounded-sm py-5 outline-none focus-visible:ring-1 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-sm font-medium text-accent">
                    Q:
                  </span>
                  <span className="font-mono text-[15px] leading-snug text-text">
                    {q}
                  </span>
                  <span
                    className="ml-auto select-none font-mono text-lg leading-none text-dim transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="flex gap-3 pb-6 pr-8">
                  <span className="font-mono text-sm font-medium text-severity-pass">
                    A:
                  </span>
                  <p className="font-mono text-sm leading-relaxed text-dim">
                    {a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
