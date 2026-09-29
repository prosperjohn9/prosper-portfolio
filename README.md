# Prosper Osaigbovo, portfolio

The source of my personal site. I am a full stack software engineer and the founder of
[The Trader's Hindsight](https://tradershindsight.com). Most of my recent code is private, so
the site is built around evidence: each claim it makes carries a note saying where the proof
is and when it was checked.

Status: in progress. So far: the home page; a case study of The Trader's Hindsight at
`/work/traders-hindsight`, with a working demo of its core idea; and four notes at
`/notes/<slug>`, first posted on LinkedIn.

## Stack

- [Next.js 16](https://nextjs.org) (App Router), every page statically prerendered
- React 19 and TypeScript in strict mode
- Tailwind CSS 4, with colour and type tokens in `src/app/globals.css`
- Archivo variable font, self-hosted through `next/font`, using its width axis for hierarchy
- Vitest for unit tests, Playwright for end-to-end tests, axe for accessibility

## Architecture

```
src/
  app/          routes only: the home page, /work/[slug] and /notes/[slug], plus the share
                images, icons, sitemap and robots.txt
  sections/     the parts of a page (Hero, SelectedWork, HowIWork, ...), each reading its
                content; sections/case-study/ renders any project's page
  components/   reusable UI: layout/, receipts/, figures/, hindsight-demo/ and ui/;
                share-card/ draws the link-preview images
  content/      the words and data on the site, typed by domain/; one file (or folder)
                per project in content/projects/
  domain/       pure TypeScript: rich text, receipt numbering, formatting, the Hindsight
                replay; no React
  lib/          infrastructure: the head scripts, security headers, search metadata
  styles/       component styles that need more than utility classes
scripts/        the repository counter behind the published figures
e2e/            Playwright tests, including accessibility checks
docs/decisions/ architecture decision records
```

Dependencies point one way: `app` composes `sections`, which use `components` and
`content`, which use `domain`. Content is plain, typed data, so changing a sentence never
touches a component.

## Adding a project

A project is one content file in `src/content/projects/`, typed by `Project` in
`src/domain/project.ts`, plus its screenshots in `src/assets/`. Adding it to the list in
`src/content/projects/index.ts` puts it in Selected work on the home page.

Give it a `caseStudy` and it also gets its own page at `/work/<slug>`, built at compile time. A
case study is a lede, a few facts and a list of sections. Each section is a list of typed
blocks: text, features, rules, figures, steps, a ledger, buttons, or a demo panel. Text blocks
that follow each other share the reading column with their receipts in the margin; the rest
take the full width. Slugs without a case study return 404. The page also gets its own share
image and a place in the sitemap. The Trader's Hindsight, in
`src/content/projects/traders-hindsight/`, is the worked example.

## Adding a note

A note is one file in `src/content/notes/`, typed by `Note` in `src/domain/note.ts`: a title,
the date it was first posted, a link to the original, and its paragraphs. Adding it to the list
in `src/content/notes/index.ts` gives it a page at `/notes/<slug>`, with its own share image and
a place in the sitemap.

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
only replays and ranks. `src/content/projects/traders-hindsight/traders-hindsight.test.ts` checks that the example month
tells the story the page promises. The panel is a small client component inside a static page.
Its first render is complete HTML, so without JavaScript it still shows the costs and every trade.

## Quality gates

| Command                | What it checks                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `npm run format:check` | Prettier formatting, with Tailwind classes sorted                                            |
| `npm run typecheck`    | TypeScript, including generated route types                                                  |
| `npm run lint`         | ESLint with the Next.js, React and TypeScript rules                                          |
| `npm test`             | Unit tests                                                                                   |
| `npm run build`        | Production build                                                                             |
| `npm run test:e2e`     | Pages, interactions, security headers, search metadata and WCAG 2.2 AA, on desktop and phone |
| `npm run check`        | All of the above, in that order                                                              |

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
are not licensed for reuse. The Archivo font files in `src/assets/fonts/` are under the SIL Open
Font License.
