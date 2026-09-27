export interface HttpHeader {
  key: string;
  value: string;
}

interface Environment {
  /** `next dev` needs eval for fast refresh and a websocket for hot reload. */
  isDev: boolean;
}

/**
 * Content Security Policy for a fully static site.
 *
 * script-src allows 'unsafe-inline' on purpose: statically rendered Next.js
 * pages carry inline bootstrap scripts, and the only way to forbid them is a
 * per-request nonce, which would force every page to render on a server. The
 * site has no user input, forms, cookies or third-party scripts, so there is
 * nothing to inject; everything else is locked to this origin.
 * See docs/decisions/0001-content-security-policy.md.
 */
export function contentSecurityPolicy({ isDev }: Environment): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...(isDev ? ["ws:"] : [])],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'none'"],
    "frame-ancestors": ["'none'"],
  };

  return Object.entries(directives)
    .map(([name, sources]) => `${name} ${sources.join(" ")}`)
    .join("; ");
}

export function securityHeaders(env: Environment): HttpHeader[] {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(env) },
    // Two years, the value browsers' preload lists expect; HTTPS is enforced by the host.
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
    },
  ];
}
