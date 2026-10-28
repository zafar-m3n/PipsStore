---
name: PipsStore
description: Free, beginner-first forex education. A near-black learning product with a calm serif voice and one leaf-green light.
colors:
  ground: "#0a0a0b"
  surface-1: "#111113"
  surface-2: "#18181b"
  surface-3: "#222226"
  ink: "#d4d4d9"
  ink-soft: "#a6a6ae"
  ink-muted: "#8a8a93"
  field: "#6e6e77"
  line: "rgb(255 255 255 / 0.08)"
  line-strong: "rgb(255 255 255 / 0.14)"
  brand: "#3fe05a"
  brand-hover: "#6ae87f"
  brand-press: "#2fc248"
  brand-deep: "#1a4725"
  on-brand: "#07140a"
  bull: "#6ea8ea"
  bear: "#e8916c"
  success: "#5fcfc0"
  warning: "#e3b65c"
  error: "#ec8585"
  info: "#8cbfe0"
typography:
  display:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(3rem, 1.6rem + 5.6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.7rem + 3.6vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "clamp(2rem, 1.5rem + 1.8vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  micro:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  full: "9999px"
spacing:
  gutter: "clamp(1rem, 3vw, 2rem)"
  section: "clamp(4.5rem, 4vw + 3rem, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
  button-primary-active:
    backgroundColor: "{colors.brand-press}"
  chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 16px"
    height: "44px"
  chip-active:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  tab:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "48px"
  tab-active:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  field:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: "48px"
  card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.lg}"
    padding: "20px"
  card-raised:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.lg}"
  glass-panel:
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  nav-bar:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    height: "56px"
---

# Design System: PipsStore

## Overview

**Creative North Star: "The Mentor's Console"**

PipsStore reads like a well-made product console with a person behind it. The ground is a true near-black, stepped into a few grey surfaces with hairline borders. On top of it, a large Instrument Serif speaks in short, calm sentences, the way a patient mentor would. Everything that explains the market is shown as product-grade UI: a pip-value readout, a risk-per-trade card, a session clock, a glossary entry. Each one carries a real fact, labelled "Example" where it is a worked example.

One leaf-green light marks what to do next. It appears on the primary action, links, focus rings and active states, and nowhere else. Light enters the system from above: an Aurora glow in the Home hero, a soft green wash at the top of interior headers and lit sections, and Light Rays falling onto the footer's closing statement. Below that light, the page stays dark and quiet so text keeps its contrast.

The system rejects the category default: stock photos of traders, rising-arrow charts, cash and trophy imagery, and the boxy hero-plus-form block. It also retires its own previous look: teal bands, chamfered corners, green-tinted neutrals and Hanken Grotesk.

**Key Characteristics:**
- Near-black neutral ground (#0a0a0b) with three stepped surfaces and white hairlines at 8% and 14%.
- A single hue, leaf green, used on well under a tenth of any screen.
- Instrument Serif at one weight (400) for every display size, with italic as the only emphasis.
- Geist for reading and UI, Geist Mono for every number that matters.
- Product-style UI cards in place of photography. Only five photo slots exist, all honest placeholders until real photos land.
- Light from the top edge only, from WebGL effects that have static CSS fallbacks.
- Rich motion with one authored moment (the hero) plus quiet scroll reveals. Under reduced motion, nothing moves.

## Colors

A neutral near-black palette with one leaf-green light and two market colours that are never green.

### Primary
- **Leaf Signal** (brand): the only hue. Used on the primary pill button, text links, the focus outline, active chips and tabs, icon accents in card title bars, and the italic emphasis in serif headlines ("*risk first.*"). Hover lifts to **Fresh Leaf** (brand-hover), and press settles to **Pressed Leaf** (brand-press).
- **Forest Shadow** (brand-deep): the deep green used as `::selection`, inside the Aurora and Orb colour stops, and in the right-hand glow of interior headers. It is never a text colour.
- **Night Leaf** (on-brand): the near-black green for text that sits on Leaf Signal.

### Secondary
- **Rising Blue** (bull) and **Falling Amber** (bear): the market pair for candles and price direction in drawn charts and UI cards. They deliberately aren't green and red, so the brand green never reads as "profit". Analysis explains the mapping next to its pattern library.

### Tertiary
- **Calm Teal** (success), **Honey** (warning), **Soft Coral** (error) and **Haze Blue** (info): semantic states for toasts, form feedback and callouts. Success is teal so it never competes with the brand green.

### Neutral
- **Ink Black** (ground): the page background, and the colour under every effect.
- **Graphite 1, 2 and 3** (surface-1, surface-2, surface-3): card, raised card and field surfaces, then hover fills for chips and tabs.
- **Paper Ink** (ink): headings and primary text.
- **Soft Ink** (ink-soft): body copy and card text.
- **Quiet Ink** (ink-muted): metadata, column heads, footnotes and tags. It stays at or above 4.5:1 on every surface.
- **Field Grey** (field): input borders, at 3:1 or more against their surface.
- **Hairline** and **Hairline Strong** (line, line-strong): the borders, dividers and title-bar rules. The strong variant is for hover and glass.

### Named Rules
**The One Light Rule.** Leaf green is the only hue in the interface, and it marks action or state: never a large fill, never a background band, never a chart colour.

**The Not-Profit Rule.** Market direction is blue and amber, never green and red. Green means "do this next", not "this went up".

**The AA Everywhere Rule.** Body and small text clear 4.5:1 and large text and UI borders clear 3:1 on every surface, including glass and every pixel of a background effect. The brightest effect pixel behind text stays at relative luminance 0.06 or below.

## Typography

**Display Font:** Instrument Serif (with ui-serif, Georgia)
**Body Font:** Geist (with ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular)

**Character:** A soft, literary serif carries the voice, a precise grotesk carries the work, and a mono carries the numbers. The contrast between them is the personality: a mentor's sentence above an instrument's readout.

### Hierarchy
- **Display** (400, fluid 48 to 96px, line-height 0.95): the Home h1 only. Each line rises out of a mask on load.
- **Headline** (400, fluid 44 to 76px, line-height 1): interior page h1s in the compact glow header, and the ThankYou h1.
- **Title** (400, fluid 32 to 48px, line-height 1.05): section h2s, chapter titles, bento tile headings and the footer statement.
- **Figure** (Geist Mono 500, fluid 28 to 40px, tabular numerals): result values in UI cards ("$10.00", "0.05 lots") and the hero fact counts.
- **Lead** (Geist 600, 19px, line-height 1.5): card h3s and section intros.
- **Body** (Geist 400, 17px, line-height 1.6): reading text, capped at 44 to 60ch.
- **Label** (Geist 500, 14px): card title bars, nav links, form labels and footer column heads.
- **Micro** (Geist 400, 12px): tags such as "Example" or a level, and mono data in small tables.

### Named Rules
**The Single Weight Rule.** Title, Headline and Display always render in Instrument Serif at 400. A global rule enforces this. Emphasis is italic, usually coloured Leaf Signal, and never bold.

**The Mono Numbers Rule.** Any number a beginner should compare (pip values, lot sizes, risk amounts, prices, times) is set in Geist Mono with tabular figures.

## Layout

- The page sits in a 76rem container with a fluid gutter (16 to 32px).
- Sections are separated by the section rhythm (72 to 120px of vertical padding). Lit sections add a top hairline and a green wash from above.
- Layout varies by page:
  - **Home, Tools and Markets** use a 12-column bento of tiles of varied span. Tiles pair a heading and short copy with one product-style UI card or a live embed.
  - **Academy, Analysis and About** use editorial chapters: a sticky serif title column (4 of 12, pinned at 7rem from the top on large screens) beside scrolling content (8 of 12).
  - **Interior pages** open with a compact glow header: headline, one line of subtitle and the `glow-top` light.
- The Home hero is a 6/12 statement beside a 5/12 glass form, above the fold on desktop. Two UI cards float off the form's corners with parallax at 1280px and up.
- On mobile everything stacks to one column, the navbar collapses to a glass sheet, and floating hero cards are hidden.
- Breakpoints are Tailwind's defaults (640, 768, 1024, 1280px). Below 768px the step rail and pinning are off.

## Elevation & Depth

Depth comes from tonal layering and light, not from shadows. Surfaces step up from ground to surface-1, then surface-2, then surface-3. Each raised card has a 1px hairline border and a faint lit top edge (an inset white line at 4 to 6%). On fine pointers, a soft radial light follows the cursor across a hovered card. Only floating, detached layers get a real drop shadow.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 24px 48px -16px rgb(0 0 0 / 0.75)`): the scrolled navbar pill, the mobile menu sheet and toasts. Nothing that sits in the page flow uses it.
- **Lit edge** (`box-shadow: inset 0 1px 0 0 rgb(255 255 255 / 0.04)`; 0.05 on raised cards, 0.06 on glass): the top-edge highlight that makes a dark card read as a surface.

### Named Rules
**The Border-Or-Shadow Rule.** A surface in the page flow gets a hairline border for elevation, never a border plus a drop shadow.

**The Light From Above Rule.** Glows, rays and washes always enter from the top edge of their section, and the text beneath them must still pass AA.

## Shapes

- Corners are soft and consistent:
  - 8px for small inner chips and tags in tables
  - 12px for fields and inner media
  - 16px for cards and tiles
  - 20px for the glass panel
  - full pills for every button, chip, tab, social icon button and the navbar
- Borders are 1px hairlines. UI cards divide their title bar from their content with one hairline rule.
- There are no angled, chamfered or clipped corners anywhere.

## Components

### Buttons
Confident and quiet: one green pill, used once or twice per view.
- **Shape:** full pill (9999px), at least 48px tall.
- **Primary:** Leaf Signal fill, Night Leaf text, Geist 600 body size, 24px side padding, often with a trailing arrow icon.
- **Hover / Focus:** fill lifts to Fresh Leaf over 150ms. Focus shows a 2px Leaf Signal outline offset 3px.
- **Active:** scales to 0.97 with the brand-press fill. Whole-card links scale only to 0.99.
- **Secondary:** links read as Leaf Signal text with an arrow. There is no ghost or outline button variant.

### Chips and tabs
- **Style:** pills on Graphite 2 with a hairline border and Paper Ink text. Chips are 44px, tabs 48px.
- **State:** hover moves to Graphite 3 with the strong hairline. Selected fills Leaf Signal with Night Leaf text. Chips use `aria-pressed`; tabs use `role="tab"` with arrow-key navigation.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Graphite 1 (`card`) or Graphite 2 (`card-raised`).
- **Shadow Strategy:** hairline border plus lit top edge, plus the cursor spotlight on hover (see Elevation & Depth).
- **Border:** Hairline, rising to Hairline Strong on hover.
- **Internal Padding:** 20px for UI cards, 24 to 28px for tiles.
- Cards are never nested. A UI card placed inside a tile drops its own surface (`bare`).

### Inputs / Fields
- **Style:** Graphite 2 fill, 1px Field Grey border, 12px radius, 48px tall, with Quiet Ink placeholder text.
- **Focus:** the border turns Leaf Signal with a 1px Leaf Signal ring.
- **Error:** Soft Coral message text under the field. Selects (react-select) mirror the same tokens.

### Navigation
- A fixed glass pill (56px, `glass-bar`) floats 12px from the top. Past 24px of scroll it narrows to 64rem and gains the Float shadow.
- Links are Geist label size in Soft Ink, with a Graphite pill behind the active route. The "Start free" primary pill sits on the right.
- On mobile, a round menu button opens a glass sheet with links set in the serif Title size, each with an arrow.

### Product UI card (signature)
This is the system's main imagery: a small app-widget panel that teaches one real fact.
- A divided title bar: brand-coloured icon, Label-size name, an optional "Example" or level tag on a pill.
- Then the content: mono rows for inputs, a hairline, and a Figure-size result.
- Variants include the pip result, risk per trade, candle anatomy, glossary term, learning path, support and resistance, calendar event, live session clock and support contact.

### Glass panel (signature)
- Used for the one primary panel over a lit background: the Home hero form, and the navbar sheet.
- Graphite 1 at 62% opacity, a 20px backdrop blur, a Hairline Strong border, a 20px radius and the lit top edge.

## Do's and Don'ts

### Do:
- **Do** keep Leaf Signal for action and state only: one primary pill per view, plus links, focus and the active state.
- **Do** set every display size in Instrument Serif at 400, and emphasise with italic.
- **Do** show market concepts as product UI cards that carry real facts, labelled "Example" when worked.
- **Do** render background effects through EffectLayer with their `fx-*` fallback, colours read from tokens, and mouse interaction off.
- **Do** use a hairline border for elevation, and keep the Float shadow for detached layers.
- **Do** verify AA on glass and over effects, measuring the brightest pixel behind text.

### Don't:
- **Don't** use green or red for price direction. Bull is blue and bear is amber.
- **Don't** bring back chamfered corners, teal bands, green-tinted neutrals or Hanken Grotesk.
- **Don't** use stock trader photos, rising-arrow charts, cash, trophies or any imagery that implies profit.
- **Don't** add bold weights, gradient text or eyebrow labels above serif headings.
- **Don't** nest a card inside a card. Pass `bare` instead.
- **Don't** fill large areas with Leaf Signal or Forest Shadow.
