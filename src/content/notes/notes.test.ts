import { describe, expect, it } from "vitest";
import { howIWork } from "@/content/home";
import { notes } from "@/content/notes";
import { formatDate } from "@/domain/format";
import { notePath } from "@/domain/links";
import { isLink } from "@/domain/rich-text";

describe("notes", () => {
  it("each have their own slug, safe to use in an address", () => {
    const slugs = notes.map((n) => n.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("are listed newest first, each with a real date", () => {
    for (const note of notes) expect(() => formatDate(note.published)).not.toThrow();
    const dates = notes.map((n) => n.published);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("each back one position under How I work, which links to it", () => {
    const linked = howIWork.positions.items.flatMap((p) =>
      p.reason.filter(isLink).map((link) => link.href),
    );
    expect([...linked].sort()).toEqual(notes.map((n) => notePath(n.slug)).sort());
  });
});
