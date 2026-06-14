"use client";

import { m } from "framer-motion";
import { SeverityBadge } from "@/components/SeverityBadge";
import { Reveal } from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/* Stripe Checkout / Payment Links. Replace with the live links before launch. */
const STRIPE_LINK_A = "https://buy.stripe.com/14A6oGbCFgEz3lmcZBcAo00";
const STRIPE_LINK_B = "https://buy.stripe.com/5kQ7sK8qt8835tu2kXcAo01";
const STRIPE_LINK_C = "https://buy.stripe.com/3cI14mfSV4VRf443p1cAo02";

type Severity = "warn" | "critical";

const SEV_COLOR: Record<Severity, string> = {
  warn: "var(--severity-warn)",
  critical: "var(--severity-critical)",
};

interface Finding {
  id: string;
  findingLabel: string;
  severity: Severity;
  title: string;
  remediation: string;
  bullets: string[];
  proof: string;
  price: string;
  priceAmount: string;
  delivery: string;
  altPrice?: string;
  guarantee?: string;
  stripe: string;
}

/* Copy is lifted verbatim from offers.md — wording is not softened or rewritten;
   only typographic quotes/dashes are normalised to match the site. */
const FINDINGS: Finding[] = [
  {
    id: "FND-001",
    findingLabel: "Cold outbound missing",
    severity: "warn",
    title: "No outbound system",
    remediation: "Cold Email Setup (“Outbound-in-a-Box”)",
    bullets: [
      "2–3 secondary sending domains bought and configured (your main domain never touches cold email)",
      "6–9 mailboxes set up and warmed",
      "Full authentication — SPF, DKIM, DMARC — so inbox providers trust you",
      "500+ verified leads matched to your exact customer profile",
      "Handover video + 1-page SOP so you can run it yourself from day 6",
    ],
    proof:
      "Proof: this is the exact system behind my own SaaS’s acquisition. The email you received from me reached your primary inbox from a young domain — that’s the product working.",
    price: "£750 FIXED",
    priceAmount: "£750",
    delivery: "LIVE IN 5 WORKING DAYS",
    stripe: STRIPE_LINK_A,
  },
  {
    id: "FND-002",
    findingLabel: "Unaudited security",
    severity: "critical",
    title: "Unaudited attack surface",
    remediation: "SaaS Security Audit",
    bullets: [
      "Every API route for missing/broken auth",
      "Supabase Row Level Security policies (the #1 silent failure in indie SaaS)",
      "Exposed keys, env handling, and service-role leakage",
      "IDOR — can user A see user B’s data?",
      "Stripe webhook and payment flow security",
    ],
    proof:
      "I audited my own SaaS and found 9 unauthenticated API routes quietly exposed in production. I fixed them, built a checklist, and now I run that audit on other founders’ products.",
    price: "£500 FIXED",
    priceAmount: "£500",
    delivery: "REPORT IN 3 DAYS",
    stripe: STRIPE_LINK_B,
  },
  {
    id: "FND-003",
    findingLabel: "Infrastructure overspend",
    severity: "warn",
    title: "Bills scaling faster than revenue",
    remediation: "Infrastructure Cost Audit",
    bullets: [
      "External API spend (Google, OpenAI/Anthropic, enrichment APIs) — caching strategy that can take repeat-call costs to near zero",
      "Supabase: query patterns, indexes, egress, storage",
      "Vercel: function duration, cold starts, image and bandwidth optimisation",
      "Email/sending costs and third-party subscriptions you’re double-paying",
      "You get the changes implemented (not just recommended) plus a before/after cost report",
    ],
    proof:
      "I cut my own product’s Google API costs dramatically with a single caching pattern, and most stacks I look at have the same money leaking from the same places.",
    price: "£600 FIXED",
    priceAmount: "£600",
    delivery: "IMPLEMENTED, NOT ADVISED",
    altPrice: "or 30% of first-year savings — no upfront",
    guarantee:
      "If I don’t find savings worth more than my fee over 12 months, full refund.",
    stripe: STRIPE_LINK_C,
  },
];

function FindingCard({ finding, index }: { finding: Finding; index: number }) {
  const reduced = usePrefersReducedMotion();
  const color = SEV_COLOR[finding.severity];
  const isCritical = finding.severity === "critical";

  // The card is quiet at rest and does NOT animate in. The severity badge is
  // the only entrance motion: a single quick scale + settle, staggered 60ms
  // per card, once. Reduced motion / no-JS renders it stamped already.
  const badgeMotion = reduced
    ? {}
    : {
        initial: { scale: 1.35, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true, amount: 0.6 },
        transition: {
          delay: index * 0.06 + 0.12,
          type: "spring" as const,
          stiffness: 520,
          damping: 17,
          mass: 0.6,
        },
      };

  return (
    <article
      style={{ "--sev": color } as React.CSSProperties}
      className={
        "group relative flex h-full flex-col bg-surface p-6 transition-colors sm:p-7 " +
        (isCritical
          ? "rounded-xl border-2 border-severity-critical"
          : "rounded-xl border border-line hover:border-[color:var(--sev)]")
      }
    >
      {/* finding line-item header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="min-w-0">
          <span className="block font-mono text-sm text-text transition-all duration-300 group-hover:[text-shadow:0_0_10px_var(--sev)]">
            {finding.id}
          </span>
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
            {finding.findingLabel}
          </span>
        </span>
        <m.span {...badgeMotion} className="shrink-0">
          <SeverityBadge level={finding.severity}>
            {finding.severity === "critical" ? "CRITICAL" : "WARN"}
          </SeverityBadge>
        </m.span>
      </div>

      {/* finding title */}
      <h3 className="text-balance text-2xl font-bold leading-tight tracking-tight">
        {finding.title}
      </h3>

      {/* remediation */}
      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
        Remediation:{" "}
        <span className="text-accent">{finding.remediation}</span>
      </p>

      <ul className="mt-4 space-y-2.5">
        {finding.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-relaxed">
            <span
              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: "var(--sev)" }}
              aria-hidden="true"
            />
            <span className="text-dim">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* proof */}
      <p className="mt-5 text-sm italic leading-relaxed text-dim">
        {finding.proof}
      </p>

      {/* price block */}
      <div className="mt-6 border-t border-line pt-5">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-medium tracking-tight text-text">
            {finding.priceAmount}
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.12em] text-dim">
            fixed
          </span>
        </div>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {finding.delivery}
        </p>

        {finding.altPrice && (
          <p className="mt-2 font-mono text-xs text-dim">{finding.altPrice}</p>
        )}
        {finding.guarantee && (
          <p className="mt-2 font-mono text-[10px] leading-relaxed text-dim">
            {finding.guarantee}
          </p>
        )}
      </div>

      {/* CTAs pinned to bottom */}
      <div className="mt-auto pt-7">
        <a
          href={finding.stripe}
          className="press ring-focus inline-flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 font-mono text-sm font-medium uppercase tracking-[0.08em] text-ground hover:opacity-90"
        >
          Start remediation — {finding.priceAmount}
        </a>
        <a
          href="#book"
          className="ring-focus mx-auto mt-3 block w-fit font-mono text-xs text-dim transition-colors hover:text-text"
        >
          <span className="link-underline">or book a call first</span>
        </a>
      </div>
    </article>
  );
}

export function Offers() {
  return (
    <section id="offers" className="section-y">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Findings — 3 of 3
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl tracking-tight sm:text-4xl">
            Three things broken in most SaaS stacks. Fixed prices to fix them.
          </h2>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {FINDINGS.map((finding, i) => (
            <FindingCard key={finding.id} finding={finding} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
