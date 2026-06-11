import type { Config } from "tailwindcss";

/*
  Tailwind theme is a thin, typed view over the LOCKED CSS variables
  defined in app/globals.css. Components consume these tokens only —
  no raw hex values in markup.
*/
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "var(--ground)",
        surface: "var(--surface)",
        text: "var(--text)",
        dim: "var(--text-dim)",
        accent: "var(--accent)",
        severity: {
          critical: "var(--severity-critical)",
          warn: "var(--severity-warn)",
          pass: "var(--severity-pass)",
        },
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "var(--content-max)",
      },
      letterSpacing: {
        tight: "-0.02em",
        tighter: "-0.03em",
      },
      // Explicitly no gradient background images are added — the design
      // forbids gradients. Only flat tokens above.
    },
  },
  plugins: [],
};
export default config;
