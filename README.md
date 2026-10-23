# Panda 0x01

A premium, experimental personal portfolio — oversized typography, a strict
monochrome identity, cinematic GSAP scroll choreography and Lenis smooth
scrolling. Built as a real React + TypeScript application, not a static mockup.

The hero is a direct response to the reference composition: enormous `Panda`
spanning almost the full width, `0x01` beneath it aligned to the right, and
micro metadata pinned to the corners, all in white on a near-black field.

---

## Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | React 18 + TypeScript                               |
| Build tool     | Vite 5                                              |
| Styling        | Tailwind CSS + hand-written CSS layers              |
| Animation      | GSAP + ScrollTrigger                                |
| Smooth scroll  | Lenis                                               |
| WebGL effect   | ogl — for the optional `<DitherVeil />` component (currently unmounted) |
| Icons          | lucide-react                                        |
| Deployment     | Vercel (see `vercel.json`)                          |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

---

## Design system

All tokens live in `src/styles/globals.css` and are exposed to Tailwind in
`tailwind.config.ts`:

| Token                    | Value      |
| ------------------------ | ---------- |
| Surface (`ink`)          | `#0D0D0D`  |
| Foreground (`paper`)     | `#F5F5F5`  |
| Secondary text (`muted`) | `#A0A0A0`  |
| Accent                   | `#FFFFFF`  |
| Border (`line`)          | `#333333`  |
| Decorative dim (`dim`)   | `#555555`  |

Typography: **Anton** (display), **Inter** (body), **IBM Plex Mono** (metadata),
with **Archivo Black** / **Barlow Condensed** as display fallbacks. Display type
uses `letter-spacing: -0.06em` and `line-height: 0.85`.

No gradients, no glassmorphism, no rounded SaaS cards, no decorative shadows.

---

## Configure your details

Everything user-specific is data, in **`src/data/siteConfig.ts`**:

```ts
export const siteConfig = {
  email: "drumilnikhare29@gmail.com",
  socials: [
    { platform: "GitHub", url: "https://github.com/Panda-0x01" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/drumilnikhare" },
  ],
};
```

While a value is `null`, the matching control renders as clearly
**non-interactive** (and labelled `LINK PENDING`) rather than as a fake link or
dead button. Fill the value in and it becomes a real, working link — no other
changes required.

Projects live in **`src/data/projects.ts`**. Each project renders a
**VISIT SITE ↗** button that links to its `link` — a real, user-supplied URL
(GitHub repos for Boing, Zeno and NeoNet). A project with a `null` link
degrades to a clearly non-interactive `LINK PENDING` button (currently Trinetra,
for which no public URL has been supplied yet).

Each panel instead shows a monochrome, animated **interface concept** tailored
to the project — a SOC console, an API-security dashboard, an assistant chat
window and a network TUI (`src/components/visuals/`). They are sized with
container-query units so they scale like a screenshot, are labelled `UI CONCEPT`,
and use only illustrative, non-real data (TEST-NET addresses, sample counters).
They are deliberately *not* screenshots and make no claims about the products.

---

## Architecture

```
src/
├── animations/
│   ├── heroAnimations.ts      # type fitting + hero intro (no scroll drain)
│   ├── scrollAnimations.ts    # declarative marker-based reveal kit
│   └── projectAnimations.ts   # pinned horizontal track, parallax, reveals
├── components/
│   ├── Loader.tsx  Navbar.tsx  Hero.tsx  About.tsx  Expertise.tsx
│   ├── Projects.tsx  ProjectCard.tsx  ProjectVisual.tsx
│   ├── visuals/  TrinetraUI  BoingUI  ZenoUI  NeonetUI  primitives
│   ├── Contact.tsx  Footer.tsx
│   ├── CustomCursor.tsx  ScrollProgress.tsx
│   └── DitherVeil/  DitherVeil.jsx  DitherVeil.css   (React Bits + ogl; not mounted)
├── data/  projects.ts  navigation.ts  siteConfig.ts
├── hooks/ useLenis.ts  useReducedMotion.ts  useScrollProgress.ts
├── lib/   boot.ts            # first-load gate shared by the loader + hero
└── styles/ globals.css  typography.css  animations.css  mockup.css
```

### How the animation wiring works

- `LenisProvider` (`hooks/useLenis.ts`) owns the Lenis instance, drives it from
  the GSAP ticker and calls `ScrollTrigger.update()` on every scroll frame so
  the two can never drift apart. It refreshes ScrollTrigger after fonts/load and
  destroys everything on unmount.
- Each section calls `initScrollAnimations(root, reducedMotion)` and marks up
  what it wants with data attributes (`data-anim="reveal"`, `data-mask-group` /
  `data-mask-line`, `data-anim="rule"`, `.reveal-word`). All tweens are created
  inside a `gsap.context()` scoped to that section, and the returned cleanup
  reverts them — StrictMode- and resize-safe.
- `Loader` shows a full-screen curtain with a live percentage until the fonts and
  the window `load` event settle (minimum on-screen time, scroll hard-locked via
  `html.is-booting`). When the curtain starts to lift it calls `markBooted()`
  (`lib/boot.ts`); the hero entrance is gated on `whenBooted()` so it animates
  into view instead of playing hidden behind the loader.
- The hero fits its two words to the real viewport using canvas text metrics
  (no layout thrashing): `Panda` targets 94% of the available width, `0x01`
  targets 52% and is right-aligned, and both shrink proportionally if the pair
  would not fit the available height.
- Selected Work pins the section on ≥1024px and translates the track
  horizontally by a distance measured from the real scroll width
  (`invalidateOnRefresh`), with reveals and parallax locked to the horizontal
  motion via `containerAnimation`.

---

## Responsive behaviour

| Breakpoint            | Behaviour                                                        |
| --------------------- | ---------------------------------------------------------------- |
| ≥ 1024px (desktop)    | Oversized type, asymmetric grid, horizontal project pin, custom cursor |
| 768–1023px (tablet)   | Fluid type, adjusted spacing, simplified reveals, vertical projects |
| < 768px (mobile)      | Stacked editorial layout, no custom cursor                       |

Navigation is the same on every screen size: a hamburger button opens a
full-window overlay menu with a staggered reveal, index numbers, active-section
accent, scroll-lock and focus management.

The page never scrolls horizontally (`overflow-x: clip` on `body` plus
runtime-fitted hero type and clamped marquee/footer type).

---

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`) and a visible skip link.
- Keyboard-operable navigation, visible `:focus-visible` outlines, Escape closes
  the menu, focus is moved into it on open.
- `prefers-reduced-motion` is fully respected: Lenis and every scroll-driven
  animation are disabled, content is shown at its final state, and Selected Work
  falls back to a reachable vertical stack (see `animations.css`).
- Project/expertise descriptions are real text in the DOM — never hidden from
  assistive tech behind a hover.
- The first-load loader is a labelled `role="progressbar"` and, under
  `prefers-reduced-motion`, disappears quickly with no slide instead of animating.
- All content renders and remains readable without JavaScript.

---

## Performance notes

- Only `transform`, `opacity`, `clip-path` and `stroke-dashoffset` are animated.
- The project interface mockups are sized with container-query units (`cqmin`),
  so they scale down like a screenshot without any JavaScript measurement.
- GPU-friendly `will-change` is applied only where a transform is actually live.
- Hero fitting uses canvas metrics rather than DOM measurement loops.
- `ScrollTrigger.refresh()` is called after layout settles; triggers are reverted
  on unmount and rebuilt by `gsap.matchMedia` on breakpoint changes.
- Vendor chunks are split (`gsap`, `react`) and immutable assets are served with
  long-lived cache headers via `vercel.json`.

---

## Deploy

The repo includes a `vercel.json` (Vite framework preset, SPA rewrites,
immutable asset caching) plus `public/robots.txt` and `public/sitemap.xml`.
Import the repository into Vercel and deploy — no extra configuration needed.
Update `siteConfig.url` and the `sitemap.xml`/`robots.txt` host if you use a
custom domain.
