# PipsStore — Frontend

A free forex trading education platform for complete beginners. Education only —
no signals, no profit promises. Visual direction: **Notebook / Trading Journal** —
warm cream ledger paper, terracotta ink, and custom SVG line drawings that sketch
themselves in on scroll. **No photography anywhere** — every visual is a Phosphor
icon, an animated line-art SVG, a typographic/data element, or a CSS texture.

## Stack

- **React 19** + **Vite 6**
- **React Router 7** (`BrowserRouter`)
- **Tailwind CSS v4** via `@tailwindcss/vite` — theme tokens + the `card-journal`,
  `stamp`, `paper-ruled`, `paper-grid` utilities live in a CSS `@theme` / `@utility`
  block in `src/index.css` (no `tailwind.config.js`)
- **GSAP 3** + ScrollTrigger — one-time hero timeline reveal, a generic
  scroll-triggered stagger reveal for card grids, and `strokeDashoffset`
  draw-in animation for all line-art (`once: true`, no loops/parallax)
- **Iconify** (`@iconify/react`) with the Phosphor set (`ph:*`)
- **react-select** — every dropdown on the site (contact form experience field,
  the two calculator currency-pair pickers), styled to the warm palette via
  `src/lib/selectStyles.js`
- **Axios** for the contact API call
- `@/` path alias → `src/` (configured in `vite.config.js` and `jsconfig.json`)

> Run `npm install` after pulling this change — `react-select` was added.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env` (a placeholder `.env` is already checked in):

```
VITE_API_BASE_URL=https://api.pipsstore.com
```

The contact form POSTs to `${VITE_API_BASE_URL}/api/v1/contact`. The backend
already exists elsewhere — no server code lives here.

## Project structure

```
src/
  components/
    layout/     Navbar, Footer, Logo, Layout shell
    common/     SectionHeading, PageHero, DrawnChart, IconBadge, DisclaimerBanner,
                ClosingCTA, ContactForm, ToastProvider, Badge, Callout,
                Accordion, IconTile, RevealGroup, LegalPage
    cards/      LearningPathCard, CourseCard, GlossaryCard, MarketNewsCard,
                CurrencyCard, PatternCard, IndicatorCard, BreakdownCard,
                ToolPreviewCard, RoadmapStep
  pages/        Home, Academy, Markets, Analysis, Tools, About, ThankYou,
                PrivacyPolicy, TermsAndConditions
  data/         Static placeholder content (courses, glossary, markets, …) +
                chartArt.js (all line-art path/shape definitions)
  hooks/        useAdTracking, useGsap (useHeroReveal / useStaggerReveal)
  lib/          http (axios), tracking (gclid/keyword/location), gtag (conversion),
                selectStyles (react-select theming)
```

`src/data/images.js` and `src/components/common/AnnotatedImage.jsx` are now empty
stubs left from the old photo-based build — safe to delete.

## Key behaviours

- **DrawnChart** (`components/common/DrawnChart.jsx`) — a reusable line-art SVG.
  Pass a `viewBox` + an `elements` array (polyline / path / candle / hline / band
  / arrow / note descriptors from `data/chartArt.js`); on scroll into view the
  strokes draw themselves in and annotation marks fade in after. Powers the hero,
  the Analysis dashboard, and every candlestick / indicator / chart-pattern card.
- **Notebook styling** — `card-journal` (paper fill, soft shadow, inked left-edge
  binding line, slightly uneven corners) for content cards; `stamp` (rotated,
  rough-edged) for functional badges; `paper-ruled` / `paper-grid` textures on a
  few section backgrounds only. Numbers everywhere use the JetBrains Mono
  (`font-mono`) voice against the Inter body text.
- **Ad tracking** — `gclid`, `keyword`, `loc_physical` query params are captured
  into `sessionStorage` on app mount, forwarded by the contact form, and cleared
  after a successful submit.
- **Contact form** — react-select experience dropdown, client-side required-field
  validation, honeypot field, toast on error, redirect to `/thank-you` with
  `state.fromContactForm` on success (`response.data.code === "OK"`).
- **/thank-you** — gated: shows the confirmation only when reached via router
  state, otherwise auto-redirects home after 4s. Fires a Google Ads conversion
  event once (guarded by a `useRef`).
- **SEO** — meta/OG/Twitter tags, JSON-LD `WebSite` + `Organization`, and
  gtag.js are wired in `index.html` with placeholder IDs (`G-XXXXXXX`,
  `AW-XXXXXXX`).

All content is realistic placeholder data in `src/data/*.js`.
