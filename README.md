# Prosper Osaigbovo, portfolio

The source of my personal site. I am a full stack software engineer and the founder of
[The Trader's Hindsight](https://tradershindsight.com). Most of my recent code is private, so
the site is built around evidence: each claim it makes carries a note saying where the proof
is and when it was checked.

Status: in progress. Two pages so far: the home page, and a case study of The Trader's
Hindsight at `/work/traders-hindsight` with a working demo of its core idea.

## Stack

- [Next.js 16](https://nextjs.org) (App Router), every page statically prerendered
- React 19 and TypeScript in strict mode
- Tailwind CSS 4, with colour and type tokens in `src/app/globals.css`
- Archivo variable font, self-hosted through `next/font`, using its width axis for hierarchy
- Vitest for unit tests, Playwright for end-to-end tests, axe for accessibility

## Architecture

```
src/
  app/          routes only: thin pages that compose sections
  sections/     the parts of a page (Hero, Evidence, Ledger, ...), each reading its content;
                the case study's are in sections/case-study/
  components/   reusable UI: layout/, receipts/, figures/, hindsight-demo/ and ui/
  content/      the words and data on the site, typed by domain/
  domain/       pure TypeScript: rich text, receipt numbering, formatting, the Hindsight
                rules; no React
  lib/          infrastructure: the head scripts, security headers
  styles/       component styles that need more than utility classes
scripts/        the repository counter behind the published figures
e2e/            Playwright tests, including accessibility checks
docs/decisions/ architecture decision records
```

Dependencies point one way: `app` composes `sections`, which use `components` and
`content`, which use `domain`. Content is plain, typed data, so changing a sentence never
touches a component.

## Receipts

Each claim on the site is highlighted and numbered, and its note says where the proof is.
Numbers come from where a receipt is first cited on the page (`src/domain/receipts.ts`), so
they always read in order and cannot drift from the text. Each page numbers its own. On phones
the notes open under their paragraph, and a number cited again further down jumps up to its
note; without JavaScript the notes are simply always shown.

The figures about The Trader's Hindsight come from `src/content/stats.json`, written by a
script that reads the private repository at a given commit and keeps only the numbers:

```bash
npm run stats:count -- --repo <path-to-the-product-repo> --rev <commit>
```

## The Hindsight demo

The case study shows the product's idea on 15 made-up trades: take a habit out and the month is
replayed without it, then the habits are ranked by what they cost. Each example trade comes
labelled with its habits, so the site holds none of the product's rules; `src/domain/hindsight.ts`
only replays and ranks. `src/content/case-study/case-study.test.ts` checks that the example month
tells the story the page promises. The panel is a small client component inside a static page.
Its first render is complete HTML, so without JavaScript it still shows the costs and every trade.

## Quality gates

| Command                | What it checks                                                              |
| ---------------------- | --------------------------------------------------------------------------- |
| `npm run format:check` | Prettier formatting, with Tailwind classes sorted                           |
| `npm run typecheck`    | TypeScript, including generated route types                                 |
| `npm run lint`         | ESLint with the Next.js, React and TypeScript rules                         |
| `npm test`             | Unit tests                                                                  |
| `npm run build`        | Production build                                                            |
| `npm run test:e2e`     | Pages, interactions, security headers and WCAG 2.2 AA, on desktop and phone |
| `npm run check`        | All of the above, in that order                                             |

CI runs the same gates on every push and pull request, and audits dependencies.

## Security

The site is static: no server code, forms, cookies or third-party scripts. It sends a
same-origin Content Security Policy, HSTS and the usual hardening headers.
[Decision 0001](docs/decisions/0001-content-security-policy.md) explains why the policy allows
inline scripts instead of using per-request nonces.

## Run it locally

Requires Node.js 22 (see `.nvmrc`) and Google Chrome for the end-to-end tests.

```bash
npm ci
npm run dev      # http://localhost:3000
npm run check    # every quality gate
```

## Licence

The code is available to read. The written content, photographs and screenshots are mine and
are not licensed for reuse.
