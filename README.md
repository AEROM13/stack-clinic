# StackClinic

One-page site for **StackClinic** — a solo-run, productised services studio that
audits and fixes SaaS products: cold email systems, security audits, and
infrastructure cost cuts.

Next.js 14 (App Router) · TypeScript · Tailwind · framer-motion · Lenis. Static,
no database, deploys to Vercel.

## Design system (LOCKED)

The visual contract lives in two places and nothing should diverge from it:

- **`app/globals.css`** — CSS custom properties: the single source of truth for
  colour, spacing, and the reduced-motion rules.
- **`tailwind.config.ts`** — a thin, typed view over those variables so markup
  uses tokens (`bg-ground`, `text-dim`, `text-severity-critical`) not raw hex.

| Token | Value | Use |
| --- | --- | --- |
| `--ground` | `#0E1A24` | page background (never pure black) |
| `--surface` | `#142430` | cards / panels |
| `--text` | `#E8EEF2` | primary text |
| `--text-dim` | `#8FA3B0` | muted text |
| `--severity-critical` | `#FF4D4D` | critical severity |
| `--severity-warn` | `#FFB224` | warning severity · **primary accent** |
| `--severity-pass` | `#3DDC97` | pass severity · scanline trace |

- **Fonts** (`next/font/google`): IBM Plex Sans (400/600/700) for headings/body,
  IBM Plex Mono (400/500) for **all numerals, prices, labels, badges, timestamps
  and data readouts**. Headlines are 700, `tracking-tight`.
- **Spacing**: max content width `1100px` (`max-w-content`); section padding
  `8rem` desktop / `4rem` mobile (`.section-y`).
- **No gradients anywhere.** Flat tokens only.

## Motion

- `components/SmoothScroll.tsx` runs **Lenis** smooth scrolling and wraps the app
  in framer-motion `MotionConfig reducedMotion="user"`.
- `lib/useReducedMotion.ts` — SSR-safe `prefers-reduced-motion` hook. When the
  user asks for reduced motion, **Lenis never instantiates** and every animated
  component (`Reveal`, `Scanline`) renders its static state.

## Reusable components

- **`<Scanline />`** — 1.5px ECG-style SVG divider in severity-pass green that
  draws left-to-right on scroll-into-view, with a pulse blip at the R-peak.
- **`<SeverityBadge level="critical|warn|pass">`** — small-caps mono badge with a
  coloured dot indicator. Falls back to the level name; pass children to override.

## Structure

```
app/                 layout (fonts, metadata), globals.css, page.tsx
components/           SmoothScroll, Reveal, Scanline, SeverityBadge
components/sections/  Nav, Hero, Services, Process, Operator, Contact
lib/                  useReducedMotion, offers (copy source of truth)
offers.md            original offer copy
```

## Develop

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (fully static)
npm run lint
```

## Deploy

Zero-config on **Vercel** — import the repo, accept the Next.js defaults, ship.
