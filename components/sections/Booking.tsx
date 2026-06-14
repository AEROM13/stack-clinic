"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

/* Replace with the live Calendly event link before launch. */
const CALENDLY_URL = "https://calendly.com/hello-leadsnipe/30min";

// Theme the inline embed to the surface/text/accent tokens and suppress
// Calendly's own GDPR banner (we keep nothing between visitor and booking).
const EMBED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=142430&text_color=e8eef2&primary_color=ffb224`;

const SCRIPT_ID = "calendly-widget-js";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

export function Booking() {
  const widgetRef = useRef<HTMLDivElement>(null);
  // Heavy third-party embed: don't fetch it until #book nears the viewport.
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el || load) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      // Start loading ~one viewport-and-a-half early so it's ready on arrival.
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  useEffect(() => {
    if (!load) return;

    const init = () =>
      (
        window as unknown as { Calendly?: { initInlineWidgets?: () => void } }
      ).Calendly?.initInlineWidgets?.();

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      init();
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, [load]);

  return (
    <section id="book" className="section-y">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {"// book a 15-min call"}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl tracking-tight sm:text-4xl">
            15 minutes. No pitch deck. I&rsquo;ll tell you straight if I can
            help.
          </h2>
        </Reveal>

        <div className="mt-9 overflow-hidden rounded-xl border border-line bg-surface">
          {/* instrument-style titlebar, mirroring the hero readout */}
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
              book_15min.cal
            </span>
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-severity-pass"
                style={{ boxShadow: "0 0 6px var(--severity-pass)" }}
                aria-hidden="true"
              />
              open
            </span>
          </div>

          {/* Calendly mounts here once in view; reserves height to avoid shift. */}
          <div
            ref={widgetRef}
            className="calendly-inline-widget"
            data-url={EMBED_URL}
            style={{ minWidth: 320, height: 680 }}
          />

          {/* Always-visible fallback — works with JS off or if the embed fails. */}
          <div className="border-t border-line px-5 py-3 text-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="ring-focus font-mono text-[11px] uppercase tracking-[0.12em] text-dim transition-colors hover:text-accent"
            >
              <span className="link-underline">
                calendar not loading? open the scheduler ↗
              </span>
            </a>
          </div>
        </div>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-dim">
          Prefer to skip the call? Every finding above has a fix-now button.{" "}
          <span className="text-text">Paid today = scheduled today.</span>
        </p>
      </div>
    </section>
  );
}
