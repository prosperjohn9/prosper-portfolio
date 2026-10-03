import { describe, expect, it } from "vitest";
import { tradersHindsight } from "@/content/projects/traders-hindsight";
import { demoCopy } from "@/content/projects/traders-hindsight/demo";
import { demoMonth, demoTrades } from "@/content/projects/traders-hindsight/demo-trades";
import { numbers } from "@/content/projects/traders-hindsight/numbers";
import { screenshots } from "@/content/projects/traders-hindsight/screenshots";
import { stats } from "@/content/stats";
import { formatCount } from "@/domain/format";
import { rankHabits, replayMonth, type HabitId } from "@/domain/hindsight";
import { caseStudyFigures } from "@/domain/project";

describe("screenshots", () => {
  it("are lettered A, B, C… in order", () => {
    const letters = Object.values(screenshots).map((s) => s.letter);
    expect(letters).toEqual(letters.map((_, i) => String.fromCharCode(65 + i)));
  });

  it("appear on the case study in letter order", () => {
    expect(caseStudyFigures(tradersHindsight.caseStudy).map((s) => s.letter)).toEqual(
      Object.values(screenshots).map((s) => s.letter),
    );
  });
});

describe("the numbers ledger", () => {
  const ledger = numbers.blocks.find((block) => block.kind === "ledger")!;
  const figure = (what: string) => ledger.rows.find((row) => row.what === what)?.figure;

  it.each([
    ["Lines of TypeScript, not counting tests", stats.typescriptLines],
    ["Pages", stats.pages],
    ["API routes", stats.apiRoutes],
    ["Automated test files", stats.testFiles],
    ["Lines of tests", stats.testLines],
    ["Commits since December 2025", stats.commits],
  ])("shows %s exactly as counted", (what, counted) => {
    expect(figure(what)).toBe(formatCount(counted));
  });
});

// The demo only teaches if its made-up month tells the story the copy promises.
describe("the demo month", () => {
  const month = demoTrades;
  const asTraded = replayMonth(month, new Set());
  const ranking = rankHabits(month);

  it("is a losing month as traded", () => {
    expect(asTraded.total).toBeLessThan(0);
  });

  it("finds trades for every habit the panel offers", () => {
    const offered = Object.keys(demoCopy.habits) as HabitId[];
    expect(ranking.map((h) => h.habit).sort()).toEqual([...offered].sort());
  });

  it("turns positive without its costliest habit alone", () => {
    const costliest = ranking[0]!.habit;
    expect(replayMonth(month, new Set([costliest])).total).toBeGreaterThan(0);
  });

  it("has a trade that matches two habits, so switching both off is less than the sum", () => {
    expect(month.some((t) => t.habits.length > 1)).toBe(true);
    const allOff = replayMonth(month, new Set(ranking.map((h) => h.habit)));
    const sumOfCosts = ranking.reduce((sum, h) => sum + h.cost, 0);
    expect(allOff.total - asTraded.total).toBeLessThan(sumOfCosts);
  });

  it("stays inside the month it names, in day order", () => {
    const days = demoTrades.map((t) => t.day);
    expect(days).toEqual([...days].sort((a, b) => a - b));
    expect(Math.min(...days)).toBeGreaterThanOrEqual(1);
    expect(Math.max(...days)).toBeLessThanOrEqual(demoMonth.days);
  });

  it("labels itself as example data with the right count", () => {
    expect(demoCopy.exampleLabel).toContain(`${demoTrades.length} made-up trades`);
  });
});
