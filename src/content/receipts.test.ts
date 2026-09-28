import { describe, expect, it } from "vitest";
import { homeProse } from "@/content/home";
import { projects } from "@/content/projects";
import { receipts, type ReceiptId } from "@/content/receipts";
import type { RichText } from "@/domain/rich-text";
import { citedReceipts, isLink } from "@/domain/rich-text";
import { caseStudyFigures, caseStudyProse } from "@/domain/project";
import { figureId, type Screenshot } from "@/domain/screenshot";

interface Page {
  name: string;
  prose: readonly RichText<ReceiptId>[];
  figures: readonly Screenshot[];
}

const pages: Page[] = [
  { name: "home page", prose: homeProse, figures: [] },
  ...projects.flatMap(({ name, caseStudy }) =>
    caseStudy
      ? [{ name, prose: caseStudyProse(caseStudy), figures: caseStudyFigures(caseStudy) }]
      : [],
  ),
];

describe("receipts", () => {
  it("are each cited on at least one page, so no note is left without a claim", () => {
    const cited = new Set(pages.flatMap((page) => citedReceipts(page.prose)));
    const orphans = (Object.keys(receipts) as ReceiptId[]).filter((id) => !cited.has(id));
    expect(orphans).toEqual([]);
  });

  it.each(pages)("on the $name link 'shown below' only to figures on that page", (page) => {
    const figureIds = new Set(page.figures.map((s) => `#${figureId(s.letter)}`));
    const figureLinks = citedReceipts(page.prose)
      .flatMap((id) => receipts[id].body)
      .filter(isLink)
      .map((link) => link.href)
      .filter((href) => href.startsWith("#figure-"));
    for (const href of figureLinks) expect(figureIds).toContain(href);
  });
});
