# StackClinic

One-page site for **StackClinic** — a solo-run, productised services studio that
audits and fixes SaaS products: cold email systems, security audits, and
infrastructure cost cuts.

Next.js 14 (App Router) · TypeScript · Tailwind · framer-motion · Lenis · `next/og`.
Static page + two on-demand edge routes for the link-preview image. Deploys to Vercel.

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

## Motion & accessibility

- `components/SmoothScroll.tsx` runs **Lenis** smooth scrolling and wraps the app
  in framer-motion `MotionConfig reducedMotion="user"`.
- `lib/useReducedMotion.ts` — SSR-safe `prefers-reduced-motion` hook. When the
  user asks for reduced motion, **Lenis never instantiates** and every animated
  component renders its static state.
- A **skip-to-content** link (`app/layout.tsx` + `.skip-link` in `globals.css`)
  is the first focusable element; `<main id="main">` is its target.
- The hero intro scan paints over the (server-rendered) headline; while it runs,
  the headline is marked **`inert`** so its CTA links never trap keyboard focus.
  Any click / key / scroll fast-forwards to the final state.
- Landmarks: `<header><nav>` · `<main>` · `<footer>`. Icon-only controls and
  decorative dots carry `aria-hidden` / `aria-label`. Amber-on-slate text clears
  WCAG AA at every size used (≈9.8:1 on ground, ≈8.8:1 on surface).

## Reusable components

- **`<Scanline />`** — 1.5px ECG-style SVG divider in severity-pass green that
  draws left-to-right on scroll-into-view, with a pulse blip at the R-peak.
- **`<SeverityBadge level="critical|warn|pass">`** — small-caps mono badge with a
  coloured dot indicator. Falls back to the level name; pass children to override.

## SEO & link preview

- **Metadata** (`app/layout.tsx`): title, description (covers all three offers +
  prices), OpenGraph, and Twitter `summary_large_image`.
- **JSON-LD** `ProfessionalService` with the three offers — prices/names read
  from `lib/offers.ts` so structured data can't drift from the page.
- **OG / Twitter image** is generated on demand at `/opengraph-image` and
  `/twitter-image` (edge runtime, `lib/og-image.tsx`) as a mini hero readout.
  Preview locally at <http://localhost:3000/opengraph-image>.

## Structure

```
app/                 layout (fonts, metadata, JSON-LD), globals.css, page.tsx
app/opengraph-image.tsx, app/twitter-image.tsx   edge OG image routes
components/           SmoothScroll, Reveal, Scanline, SeverityBadge
components/sections/  Nav, Hero, Offers, Proof, Process, Booking, Faq, Footer
lib/                  useReducedMotion, offers (copy source of truth), og-image
offers.md            original offer copy
```

---

## Launch checklist — constants to fill

All launch-blocking placeholders are plain top-of-file constants. Search the repo
for `REPLACE` and `placeholder` to find them; the full list:

| File | Constant | Current placeholder | Replace with |
| --- | --- | --- | --- |
| `components/sections/Offers.tsx` | `STRIPE_LINK_A` | `https://buy.stripe.com/REPLACE_COLD_EMAIL` | Stripe Payment Link — Cold Email Setup (£750) |
| `components/sections/Offers.tsx` | `STRIPE_LINK_B` | `https://buy.stripe.com/REPLACE_SECURITY_AUDIT` | Stripe Payment Link — SaaS Security Audit (£500) |
| `components/sections/Offers.tsx` | `STRIPE_LINK_C` | `https://buy.stripe.com/REPLACE_COST_AUDIT` | Stripe Payment Link — Infrastructure Cost Audit (£600) |
| `components/sections/Booking.tsx` | `CALENDLY_URL` | `https://calendly.com/REPLACE/15min` | Your live Calendly 15-min event URL |
| `components/sections/Footer.tsx` | `X_PROFILE_URL` | `https://x.com/REPLACE` | Your X profile URL (or delete the block) |
| `components/sections/Footer.tsx` | `CONTACT_EMAIL` | `hello@stackclinic.dev` | Confirm or change the contact address |
| `components/sections/Proof.tsx` | `PROOF_REPLY_RATE` | `42` (placeholder) | Real reply-rate % |
| `components/sections/Proof.tsx` | `PROOF_COST_CUT` | `68` (placeholder) | Real cost-cut % |
| `app/layout.tsx` | `SITE_URL` | `https://stackclinic.dev` | Production domain (drives `metadataBase`, canonical OG/Twitter image URLs, JSON-LD `url`) |

**Prices & offer copy** live once in `lib/offers.ts` (`OFFERS`). If you change a
price, update it there **and** in the card data in `components/sections/Offers.tsx`
**and** the `LINES` array in `lib/og-image.tsx` (the OG image).

---

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # must pass before deploy
```

---

## Commit

```bash
git add -A
git commit -m "Fill launch constants + final prep"
git push
```

If there's no GitHub repo yet:

```bash
gh repo create stackclinic --private --source=. --remote=origin --push
```

---

## Deploy to Vercel

Stock Next.js app, zero config. The two image routes run on the Edge runtime;
Vercel handles that automatically.

### Option A — Git integration (recommended)

1. Push to GitHub (above).
2. Go to <https://vercel.com/new>, **Import** the `stackclinic` repo.
3. Framework auto-detects **Next.js** — leave build/output at defaults. **Deploy**.
4. Pushes to your default branch ship to production; PRs get preview URLs.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel          # first run links the project + creates a preview deploy
vercel --prod   # promote to production
```

---

## Attach your custom domain

After the first production deploy, from the project directory:

```bash
vercel domains add stackclinic.dev
vercel domains add www.stackclinic.dev
```

Vercel prints the DNS records to set at your registrar. Typical values:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

> Use the exact records Vercel shows you — the apex IP can change. The cleanest
> setup is to point the domain's nameservers at Vercel (the CLI offers this),
> letting Vercel manage records + TLS end to end.

Verify and check status:

```bash
vercel domains inspect stackclinic.dev
```

DNS + automatic TLS (Let's Encrypt) usually resolve within minutes once records
propagate. Make sure `SITE_URL` in `app/layout.tsx` matches the live domain so
the OG/Twitter image and canonical URLs stay absolute; redeploy if you change it:

```bash
vercel --prod
```

### Dashboard alternative

Project → **Settings → Domains → Add** → enter `stackclinic.dev` → follow the
DNS instructions. Same outcome as the CLI.
