import { describe, expect, it } from "vitest";
import { homeProse, ledger } from "@/content/home";
import { receipts, type ReceiptId } from "@/content/receipts";
import { screenshots } from "@/content/screenshots";
import { stats } from "@/content/stats";
import { formatCount } from "@/domain/format";
import { citedReceipts, isLink } from "@/domain/rich-text";
import { figureId } from "@/domain/screenshot";

describe("home page receipts", () => {
  it("cites every receipt, so no note is left without a claim", () => {
    const cited = new Set(citedReceipts(homeProse));
    const orphans = (Object.keys(receipts) as ReceiptId[]).filter((id) => !cited.has(id));
    expect(orphans).toEqual([]);
  });

  it("links 'shown below' only to screenshots that exist", () => {
    const figureIds = new Set(Object.values(screenshots).map((s) => `#${figureId(s.letter)}`));
    const figureLinks = Object.values(receipts)
      .flatMap((receipt) => receipt.body)
      .filter(isLink)
      .map((link) => link.href)
      .filter((href) => href.startsWith("#figure-"));
    expect(figureLinks.length).toBeGreaterThan(0);
    for (const href of figureLinks) expect(figureIds).toContain(href);
  });
});

describe("screenshots", () => {
  it("are lettered A, B, C… in order", () => {
    const letters = Object.values(screenshots).map((s) => s.letter);
    expect(letters).toEqual(letters.map((_, i) => String.fromCharCode(65 + i)));
  });
});

describe("the numbers ledger", () => {
  const figure = (what: string) => ledger.rows.find((row) => row.what === what)?.figure;

  it.each([
    ["Lines of TypeScript, not counting tests", stats.typescriptLines],
    ["Pages", stats.pages],
    ["API routes", stats.apiRoutes],
    ["SQL migrations written, now merged into one schema baseline", stats.sqlMigrations],
    ["Automated test files", stats.testFiles],
    ["Lines of tests", stats.testLines],
    ["Commits since December 2025", stats.commits],
  ])("shows %s exactly as counted", (what, counted) => {
    expect(figure(what)).toBe(formatCount(counted));
  });
});
