# Tarianaoxin — Web UI

Marketing site and e-shop front end for **Tarianaoxin / تاریانا اکسین**, a
producer and distributor of disposable tableware.

This is a **UI-only** build. There is no backend: the catalogue is static data,
the cart lives in `localStorage`, and the contact/newsletter forms simulate a
submission locally.

## Stack

| Concern     | Choice                                        |
| ----------- | --------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack)            |
| Language    | TypeScript                                    |
| Styling     | Tailwind CSS v4 + a custom design system layer|
| Icons       | `react-icons` (Heroicons 2, Font Awesome)     |
| Fonts       | Outfit (Latin), Vazirmatn (فارسی), Cairo (عربي)|

## Running it

> **Important:** this machine has `NODE_ENV=production` exported globally, which
> makes `npm install` skip devDependencies and makes `next build` fail while
> prerendering the internal error pages. Use the commands below verbatim.

```bash
# install (forces devDependencies in)
NODE_ENV=development npm install --include=dev

# develop
npm run dev            # http://localhost:3000 → redirects to /fa by default

# production build + serve
NODE_ENV=production npx next build
NODE_ENV=production npx next start
```

## Languages

**Farsi is the site's default language.** Three locales, each with its own URL
prefix and text direction:

| Locale | Path  | Direction | Display face | Role                |
| ------ | ----- | --------- | ------------ | ------------------- |
| `fa`   | `/fa` | RTL       | Vazirmatn    | **default/fallback**|
| `en`   | `/en` | LTR       | Outfit       |                     |
| `ar`   | `/ar` | RTL       | Cairo        |                     |

`src/proxy.ts` negotiates `Accept-Language` and redirects any unprefixed path to
the best match — a browser asking for English gets `/en`, Arabic gets `/ar`, and
**anything else, including an unrecognised language or no header at all, lands
on `/fa`**. The 404 page and the error boundary are Farsi too.

To send *every* visitor to Farsi regardless of their browser, delete the
`negotiate()` call in `src/proxy.ts` and use `defaultLocale` directly.

`src/app/[locale]/layout.tsx` is the app's root layout, so `dir`, `lang` and
`data-locale` are on `<html>` in the server-rendered markup rather than being
patched after hydration. That matters: both Tailwind's `rtl:`/`ltr:` variants and
the site's own direction-aware CSS compile down to `[dir=…]` selectors, so a
shared, locale-agnostic shell would leak RTL rules onto the English pages.

Numbers are localised too — `useI18n().num()` and `.price()` render Persian and
Arabic-Indic digits. Anything that must stay Latin (SKUs, phone numbers, ISO
codes) carries the `.num` class or an explicit `dir="ltr"`.

Adding a language means: add it to `src/i18n/config.ts`, drop a dictionary in
`src/i18n/dictionaries/`, and add its strings to `src/lib/catalog.ts`. The
`Dictionary` type is derived from the English file, so TypeScript reports any
key a translation is missing.

## Layout of the source

```
src/
  app/
    globals.css           design tokens, utilities, keyframes
    fonts.ts              the three display faces as CSS variables
    not-found.tsx         404 (outside the locale tree, Farsi)
    global-error.tsx      last-resort error boundary (Farsi)
    [locale]/
      layout.tsx          ROOT layout: <html dir/lang>, providers, chrome
      page.tsx            home
      about/ products/ shop/ shop/[slug]/ cart/ contact/
  components/
    brand/                logo lockups + vector product illustrations
    layout/               header, footer, page hero, language switcher
    ui/                   button, section primitives, scroll reveal
    home/ about/ products/ contact/
    shop/                 cart store, drawer, product card, shop & PDP views
  i18n/                   locale config, dictionaries, provider
  lib/catalog.ts          categories + SKUs, localised
  proxy.ts                locale negotiation and redirect
```

## Design system

The palette is taken straight from the corporate wordmark: a deep industrial
navy resolving into a process teal.

| Token   | Role                                     |
| ------- | ---------------------------------------- |
| `ink`   | navy — surfaces, headings, dark sections |
| `aqua`  | teal — accents, links, active states     |
| `mist`  | cool neutrals — body copy, borders       |
| `sand`  | one warm accent — discounts, ratings     |
| `leaf`  | eco line only                            |

Custom utilities live in `globals.css` rather than being repeated inline:
`brand-gradient`, `text-brand-gradient`, `mesh-dark` / `mesh-light`,
`grid-lines`, `grain-layer`, `glass`, `ring-gradient`, plus motion helpers
(`reveal`, `lift`, `sheen`, `link-underline`, `marquee-track`, `flip-rtl`).
All of them are direction-aware, and everything is suppressed under
`prefers-reduced-motion`.

Product imagery is drawn, not photographed — `components/brand/ProductArt.tsx`
renders an SVG per product family, so the shop stays visually consistent and the
page weight stays near zero.

## Wiring a backend later

The seams are already in place:

- `src/lib/catalog.ts` — replace the arrays with fetched data; the types stay.
- `src/components/shop/CartProvider.tsx` — swap `localStorage` for a cart API.
- `src/components/contact/ContactView.tsx` — the `submit` handler is the only
  thing that needs to POST.
- `CartView` / `CartDrawer` — the checkout button is the handoff point.
