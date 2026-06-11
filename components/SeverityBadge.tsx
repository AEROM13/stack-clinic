import type { ReactNode } from "react";

type Level = "critical" | "warn" | "pass";

const TOKENS: Record<Level, { color: string; defaultLabel: string }> = {
  critical: { color: "var(--severity-critical)", defaultLabel: "Critical" },
  warn: { color: "var(--severity-warn)", defaultLabel: "Warning" },
  pass: { color: "var(--severity-pass)", defaultLabel: "Pass" },
};

/**
 * SeverityBadge — small-caps mono badge with a coloured dot indicator.
 * Used for offer status, finding severities, and data labels across the page.
 *
 * The label text falls back to the level name; pass children to override
 * (e.g. <SeverityBadge level="warn">5-day build</SeverityBadge>).
 */
export function SeverityBadge({
  level,
  children,
  className = "",
}: {
  level: Level;
  children?: ReactNode;
  className?: string;
}) {
  const { color, defaultLabel } = TOKENS[level];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-text ${className}`}
    >
      <span
        className="inline-block h-2 w-2 shrink-0 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}`,
        }}
        aria-hidden="true"
      />
      {children ?? defaultLabel}
    </span>
  );
}
