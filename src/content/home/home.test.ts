import { describe, expect, it } from "vitest";
import { ledger } from "@/content/home";
import { screenshots } from "@/content/screenshots";
import { stats } from "@/content/stats";
import { formatCount } from "@/domain/format";

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
