import type { Trade } from "@/domain/hindsight";

/** The month the example trades fall in, as the demo names it. */
export const demoMonth = { name: "June", days: 30 };

/**
 * Made-up trades for the demo. Nobody traded them. Each carries the habits
 * behind it as part of the example, and some carry more than one.
 */
export const demoTrades: readonly Trade[] = [
  { id: "t01", day: 2, instrument: "EURUSD", pnl: 180, habits: [] },
  { id: "t02", day: 3, instrument: "GBPJPY", pnl: -150, habits: [] },
  { id: "t03", day: 3, instrument: "GBPJPY", pnl: -220, habits: ["revenge"] },
  { id: "t04", day: 3, instrument: "EURUSD", pnl: -260, habits: ["revenge", "sizing", "tilt"] },
  { id: "t05", day: 5, instrument: "XAUUSD", pnl: 240, habits: [] },
  { id: "t06", day: 8, instrument: "EURUSD", pnl: -130, habits: [] },
  { id: "t07", day: 8, instrument: "EURUSD", pnl: 90, habits: [] },
  { id: "t08", day: 10, instrument: "USDJPY", pnl: 210, habits: [] },
  { id: "t09", day: 11, instrument: "GBPUSD", pnl: -160, habits: [] },
  { id: "t10", day: 11, instrument: "GBPUSD", pnl: -190, habits: ["revenge"] },
  { id: "t11", day: 11, instrument: "XAUUSD", pnl: -180, habits: ["tilt"] },
  { id: "t12", day: 15, instrument: "EURUSD", pnl: 150, habits: [] },
  { id: "t13", day: 17, instrument: "GBPJPY", pnl: -140, habits: [] },
  { id: "t14", day: 17, instrument: "EURUSD", pnl: -240, habits: ["sizing"] },
  { id: "t15", day: 22, instrument: "USDJPY", pnl: 190, habits: [] },
];
