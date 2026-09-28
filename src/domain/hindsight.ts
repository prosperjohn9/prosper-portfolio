/**
 * The idea behind Hindsight, shown on example data: take a habit out, replay
 * the month without the trades it produced, and rank the habits by what they
 * cost. Each example trade arrives already labelled with its habits; how the
 * product finds them stays in the product. Pure functions, no I/O.
 */

export type HabitId = "revenge" | "sizing" | "tilt";

/** An example trade: its day of the month, pair, net P&L in dollars, and the habits behind it. */
export interface Trade {
  id: string;
  day: number;
  instrument: string;
  pnl: number;
  habits: readonly HabitId[];
}

export interface ReplayedTrade {
  trade: Trade;
  /** True when one of the habits taken out produced this trade. */
  takenOut: boolean;
}

export interface Replay {
  trades: ReplayedTrade[];
  total: number;
  /** Wins as a share of the wins and losses left in the month; null when none are left. */
  winRate: number | null;
  /** Trades still in the month. */
  tradeCount: number;
}

export interface HabitCost {
  habit: HabitId;
  /** How much better the month is without this habit alone. */
  cost: number;
  tradeCount: number;
}

/** Rounds to whole cents, so sums of money never pick up float noise. */
const cents = (value: number) => Math.round(value * 100) / 100;

/**
 * The month without the habits taken out. A trade that two of them produced
 * is taken out once.
 */
export function replayMonth(trades: readonly Trade[], takenOut: ReadonlySet<HabitId>): Replay {
  const replayed = trades.map((trade) => ({
    trade,
    takenOut: trade.habits.some((habit) => takenOut.has(habit)),
  }));
  const left = replayed.filter((t) => !t.takenOut).map((t) => t.trade);
  const wins = left.filter((t) => t.pnl > 0).length;
  const decided = left.filter((t) => t.pnl !== 0).length;
  return {
    trades: replayed,
    total: cents(left.reduce((sum, t) => sum + t.pnl, 0)),
    winRate: decided ? wins / decided : null,
    tradeCount: left.length,
  };
}

/** Each habit's cost on its own, largest first, leaving out habits that did not cost money. */
export function rankHabits(trades: readonly Trade[]): HabitCost[] {
  const asTraded = replayMonth(trades, new Set()).total;
  const habits = [...new Set(trades.flatMap((t) => t.habits))];
  return habits
    .map((habit) => ({
      habit,
      cost: cents(replayMonth(trades, new Set([habit])).total - asTraded),
      tradeCount: trades.filter((t) => t.habits.includes(habit)).length,
    }))
    .filter((h) => h.cost > 0)
    .sort((a, b) => b.cost - a.cost);
}
