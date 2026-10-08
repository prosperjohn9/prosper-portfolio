import { describe, expect, it } from "vitest";
import type { Degree } from "@/domain/degree";
import { isIndexable, pageMetadata, profilePageJsonLd, serializeJsonLd, siteUrl } from "@/lib/seo";

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

describe("isIndexable", () => {
  it("keeps a vercel.app address out of search results", () => {
    expect(isIndexable(new URL("https://prosper-portfolio-flame.vercel.app"))).toBe(false);
  });

  it("lets search engines index the site at its own domain", () => {
    expect(isIndexable(new URL("https://example.com"))).toBe(true);
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

describe("profilePageJsonLd", () => {
  const degree = (award: string, school: string, completed: string): Degree => ({
    award,
    level: "Bachelor's degree",
    field: "Engineering",
    school,
    completed,
  });
  const page = profilePageJsonLd({
    name: "Ada Example",
    alternateName: "Ada",
    jobTitle: "Engineer",
    url: "https://example.com/",
    image: "https://example.com/ada.jpg",
    country: "Nigeria",
    sameAs: ["https://github.com/ada"],
    degrees: [degree("M.Sc.", "Uni A", "2026-02"), degree("B.Sc.", "Uni A", "2024-07")],
  }) as { "@type": string; mainEntity: Record<string, unknown> };

  it("is a profile page about one person", () => {
    expect(page["@type"]).toBe("ProfilePage");
    expect(page.mainEntity).toMatchObject({ "@type": "Person", name: "Ada Example" });
  });

  it("says where the person lives", () => {
    expect(page.mainEntity.homeLocation).toEqual({ "@type": "Country", name: "Nigeria" });
  });

  it("names each degree with its school and the month it was completed", () => {
    expect(page.mainEntity.hasCredential).toContainEqual({
      "@type": "EducationalOccupationalCredential",
      name: "M.Sc. Engineering",
      credentialCategory: "degree",
      educationalLevel: "Bachelor's degree",
      dateCreated: "2026-02",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "Uni A" },
    });
  });

  it("lists each school once", () => {
    expect(page.mainEntity.alumniOf).toEqual([{ "@type": "CollegeOrUniversity", name: "Uni A" }]);
  });
});

describe("serializeJsonLd", () => {
  it("cannot close its script tag early", () => {
    const json = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(json).not.toContain("<");
    expect(JSON.parse(json)).toEqual({ name: "</script><script>alert(1)</script>" });
  });
});
