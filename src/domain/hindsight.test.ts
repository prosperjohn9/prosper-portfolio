import { describe, expect, it } from "vitest";
import { rankHabits, replayMonth, type HabitId, type Trade } from "@/domain/hindsight";

let nextId = 0;
const trade = (pnl: number, ...habits: HabitId[]): Trade => ({
  id: `t${++nextId}`,
  day: 1,
  instrument: "EURUSD",
  pnl,
  habits,
});
const without = (...habits: HabitId[]) => new Set(habits);

// Three wins, a plain loss, a revenge trade that was also sized up, and a trade on tilt.
const month = [
  trade(100),
  trade(100),
  trade(100),
  trade(-100),
  trade(-200, "revenge", "sizing"),
  trade(-50, "tilt"),
];

describe("replaying the month", () => {
  it("leaves the month as traded when no habit is taken out", () => {
    const replay = replayMonth(month, without());
    expect(replay.total).toBe(-50);
    expect(replay.tradeCount).toBe(6);
    expect(replay.winRate).toBe(0.5);
    expect(replay.trades.every((t) => !t.takenOut)).toBe(true);
  });

  it("takes out the trades a habit produced", () => {
    const replay = replayMonth(month, without("tilt"));
    expect(replay.total).toBe(0);
    expect(replay.trades.filter((t) => t.takenOut).map((t) => t.trade.pnl)).toEqual([-50]);
  });

  it("takes a trade that two habits produced out once", () => {
    const replay = replayMonth(month, without("revenge", "sizing"));
    expect(replay.total).toBe(150);
    expect(replay.tradeCount).toBe(5);
  });

  it("works out the win rate from the trades left", () => {
    expect(replayMonth(month, without("revenge", "tilt")).winRate).toBe(0.75);
  });

  it("has no win rate when no wins or losses are left", () => {
    expect(replayMonth([trade(-10, "revenge")], without("revenge")).winRate).toBeNull();
  });

  it("keeps money in whole cents", () => {
    expect(replayMonth([trade(0.1), trade(0.2)], without()).total).toBe(0.3);
  });
});

describe("ranking the habits", () => {
  it("ranks each habit by what it cost on its own", () => {
    expect(rankHabits(month)).toEqual([
      { habit: "revenge", cost: 200, tradeCount: 1 },
      { habit: "sizing", cost: 200, tradeCount: 1 },
      { habit: "tilt", cost: 50, tradeCount: 1 },
    ]);
  });

  it("leaves out a habit that made money", () => {
    expect(rankHabits([trade(-100), trade(300, "revenge")])).toEqual([]);
  });
});
