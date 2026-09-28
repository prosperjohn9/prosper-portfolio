import { describe, expect, it } from "vitest";
import { demo, demoMonth, demoTrades } from "@/content/case-study";
import { rankHabits, replayMonth, type HabitId } from "@/domain/hindsight";

// The demo only teaches if its made-up month tells the story the copy promises.
describe("the demo month", () => {
  const month = demoTrades;
  const asTraded = replayMonth(month, new Set());
  const ranking = rankHabits(month);

  it("is a losing month as traded", () => {
    expect(asTraded.total).toBeLessThan(0);
  });

  it("finds trades for every habit the panel offers", () => {
    const offered = Object.keys(demo.panel.habits) as HabitId[];
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
    expect(demo.panel.exampleLabel).toContain(`${demoTrades.length} made-up trades`);
  });
});
