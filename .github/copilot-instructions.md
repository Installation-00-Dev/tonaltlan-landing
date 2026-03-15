# Tonaltlan Landing — Copilot Instructions

## Project Overview
Landing site for **Tonaltlan**, a mesoamerican-themed TTRPG. Built with Next.js 15 static export deployed to GitHub Pages at `tonaltlan.com`.

## Build & Dev Commands
```bash
pnpm dev          # dev server with Turbopack
pnpm build        # static export → out/
pnpm lint         # ESLint
```
**Always run `pnpm build` after any code change to validate TypeScript and the static export before committing.**

## Architecture
- **Next.js 15 static export** (`output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`)
- API routes and server actions are **not available** — all external I/O goes through webhooks (Google Apps Script)
- `NEXT_PUBLIC_*` env vars must be hardcoded as fallbacks; they are not available in GitHub Actions builds
- Deploy: push to `main` → `.github/workflows/pages.yml` builds and assembles `dist/` for GitHub Pages

## Key Directories
| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages |
| `components/compendio/` | Shared compendium UI components |
| `lib/data.ts` | All compendium content (`clases`, `especies`, `deidades`, etc.) |
| `lib/affinity-test.ts` | Affinity quiz questions, scoring logic, race results |
| `lib/affinity-submission.ts` | Webhook POST to Google Apps Script (saves to Google Sheets) |
| `hooks/useAffinityTest.ts` | React state machine for quiz flow |
| `public/images/` | Static images (species, classes, deities, gallery) |

## Design System
All using Tailwind CSS with CSS custom properties:

| Token | Value | Use |
|-------|-------|-----|
| `gold` | `#c5a059` | Primary accent — headings, highlights |
| `teal` | `#2dd4bf` | Secondary accent — labels, chips |
| `background` | `#07070a` | Page background |
| `muted` | `rgba(230,237,247,0.72)` | Body text |
| `glass-card` | utility class | Card container (glass morphism) |
| `glass-border` | `rgba(148,163,184,0.22)` | Card borders |

Fonts: `font-serif` → Cinzel (headings) · `font-sans` → Inter (body)

## Component Patterns

### Flip Card Grid (`DeitiesFlipGrid`)
Reusable flip-card layout used by `/deidades/`, `/clases/`. Props:
```tsx
<DeitiesFlipGrid
  items={data}           // CompendiumEntry[]
  title="..."
  subtitle="..."
  columns={2 | 3}        // default: 3
  largeImage             // bumps image area from 52% → 68% of card height
/>
```

### Inline Card Grid (Especies)
Used by `/especies/page.tsx` — static grid, image full with `object-contain p-3`, items with `coverImageSrc` sorted first.

### CompendiumListPage
Generic list+detail pattern (still used by bestiario/monturas stubs).

## Affinity Test
- Questions in `lib/affinity-test.ts` → each option gives points to one or more of the 7 races
- `RACE_BALANCE_WEIGHTS` multipliers correct for structural scoring bias (do not remove)
- `calculateResults()` sorts by weighted score for ranking but returns raw scores for display/saving
- 7 races: `Ton`, `Toh'kari`, `He'kari`, `Quinametzin`, `Lok'naa`, `Hualik`, `Irzak`

## Content Conventions
- Section titles in `lib/data.ts` are exactly `"Descripcion"` and `"Nota"` (no accent)
- `coverImageSrc` is optional — UI shows "Próximamente" placeholder when absent
- Images live in `public/images/` — use `sips` on macOS to optimize before adding large files
  ```bash
  sips -s format jpeg -Z 1920 input.png --out output.jpg
  ```

## Gotchas
- **Never use `object-cover` for compendium images** — content gets cropped. Use `object-contain p-2` or `object-contain p-3`
- The legacy `index.html` (original HTML landing) is preserved at `/proximamente/` in the deploy — do not delete it
- GitHub Actions does not inject `.env.local` — hardcode webhook URLs as fallback strings
