import { describe, expect, it } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "@/lib/security-headers";

const directive = (policy: string, name: string) =>
  policy
    .split("; ")
    .find((d) => d.startsWith(`${name} `))
    ?.slice(name.length + 1)
    .split(" ");

describe("contentSecurityPolicy", () => {
  const production = contentSecurityPolicy({ isDev: false });

  it("only loads resources from this origin by default", () => {
    expect(directive(production, "default-src")).toEqual(["'self'"]);
  });

  it("never allows eval in production", () => {
    expect(production).not.toContain("unsafe-eval");
  });

  it("blocks plugins, framing and form posts", () => {
    expect(directive(production, "object-src")).toEqual(["'none'"]);
    expect(directive(production, "frame-ancestors")).toEqual(["'none'"]);
    expect(directive(production, "form-action")).toEqual(["'none'"]);
  });

  it("stops injected <base> tags from rewriting links", () => {
    expect(directive(production, "base-uri")).toEqual(["'self'"]);
  });

  it("allows only what the dev server needs, only in development", () => {
    const dev = contentSecurityPolicy({ isDev: true });
    expect(directive(dev, "script-src")).toContain("'unsafe-eval'");
    expect(directive(dev, "connect-src")).toContain("ws:");
    expect(directive(production, "connect-src")).toEqual(["'self'"]);
  });
});

describe("securityHeaders", () => {
  const headers = new Map(securityHeaders({ isDev: false }).map((h) => [h.key, h.value]));

  it.each([
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Cross-Origin-Opener-Policy",
    "Permissions-Policy",
  ])("sets %s", (name) => {
    expect(headers.get(name)).toBeTruthy();
  });

  it("switches off device features the site never uses", () => {
    const policy = headers.get("Permissions-Policy") ?? "";
    for (const feature of ["camera", "microphone", "geolocation"]) {
      expect(policy).toContain(`${feature}=()`);
    }
  });
});
