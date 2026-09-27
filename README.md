# Prosper Osaigbovo, portfolio

The source of my personal site. I am a full stack software engineer and the founder of
[The Trader's Hindsight](https://tradershindsight.com). Most of my recent code is private, so
the site is built around evidence: each claim it makes carries a note saying where the proof
is and when it was checked.

Status: in progress.

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
  components/   reusable UI, grouped by concern (layout/, ...)
  content/      the words and data on the site, typed by domain/
  domain/       pure TypeScript: types and logic, no React
  lib/          infrastructure: the theme script, security headers
e2e/            Playwright tests, including accessibility checks
docs/decisions/ architecture decision records
```

Dependencies point one way: `app` uses `components`, which use `domain`. Content is plain,
typed data, so changing a sentence never touches a component.

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
