import { describe, expect, it } from "vitest";
import { pageMetadata, serializeJsonLd, siteUrl } from "@/lib/seo";

describe("siteUrl", () => {
  it("uses the production domain Vercel provides", () => {
    expect(siteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "example.com" }).href).toBe(
      "https://example.com/",
    );
  });

  it("falls back to the local server anywhere else", () => {
    expect(siteUrl({}).href).toBe("http://localhost:3000/");
  });
});

describe("pageMetadata", () => {
  const page = { path: "/notes/a-note", title: "A note", description: "What it says." };

  it("makes the page its own canonical address", () => {
    const metadata = pageMetadata(page, "Site");
    expect(metadata.alternates?.canonical).toBe("/notes/a-note");
    expect(metadata.openGraph).toMatchObject({ url: "/notes/a-note", siteName: "Site" });
  });

  it("shares a page as a website unless it has a publication date", () => {
    expect(pageMetadata(page, "Site").openGraph).toMatchObject({ type: "website" });
    expect(pageMetadata({ ...page, published: "2026-08-30" }, "Site").openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-08-30",
    });
  });
});

describe("serializeJsonLd", () => {
  it("cannot close its script tag early", () => {
    const json = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual({ name: "</script><script>alert(1)</script>" });
  });
});
