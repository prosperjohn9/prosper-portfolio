# 1. Content Security Policy for a static site

Date: 2026-09-27
Status: accepted

## Context

Every page on this site is prerendered at build time and served from a CDN. There is no
server code, no form, no cookie, no user-generated content and no third-party script.

A strict Content Security Policy that forbids inline scripts needs a nonce that changes on
every request. Next.js can only add a nonce while it renders a page, so a nonce-based policy
turns every static page into a server-rendered one: slower first loads, no CDN caching and a
server to run for a site that does not need one. Statically rendered Next.js pages include
inline bootstrap scripts, and this site also runs one small inline script in `<head>` that
applies the visitor's theme before first paint.

## Decision

Serve a policy from `next.config.ts` (built by `src/lib/security-headers.ts`) that:

- allows scripts, styles, images, fonts and connections only from this origin;
- allows inline scripts and styles (`'unsafe-inline'`), and never `eval` in production;
- blocks plugins (`object-src 'none'`), framing (`frame-ancestors 'none'`), form posts
  (`form-action 'none'`) and injected `<base>` tags (`base-uri 'self'`).

It is sent with HSTS, `nosniff`, `X-Frame-Options: DENY`, a strict referrer policy,
`Cross-Origin-Opener-Policy: same-origin` and a permissions policy that switches off the
camera, microphone, location and other features the site never uses.

## Consequences

- Pages stay static and cached at the edge.
- `'unsafe-inline'` would matter if an attacker could get markup into a page. Here there is
  no input to inject through; content comes only from this repository.
- If the site ever renders user input, switch to a nonce-based policy (Next.js `proxy` plus
  dynamic rendering) before shipping that feature.
- Unit tests (`src/lib/security-headers.test.ts`) pin the directives, and an end-to-end test
  checks the served headers and that the page raises no policy violations.
