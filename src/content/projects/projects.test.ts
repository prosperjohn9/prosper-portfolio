import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";

describe("projects", () => {
  it("each have their own slug, safe to use in an address", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });
});
