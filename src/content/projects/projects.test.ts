import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { caseStudyFigures } from "@/domain/project";

describe("projects", () => {
  it("each have their own slug, safe to use in an address", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it.each(projects.filter((p) => p.caseStudy))(
    "$name letters its screenshots A, B, C… in the order they appear",
    ({ caseStudy }) => {
      const letters = caseStudyFigures(caseStudy!).map((shot) => shot.letter);
      expect(letters).toEqual(letters.map((_, i) => String.fromCharCode(65 + i)));
    },
  );
});
