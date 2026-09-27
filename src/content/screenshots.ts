import dashboard from "@/assets/thh/dashboard.png";
import equityCurve from "@/assets/thh/equity-curve.png";
import foresightReads from "@/assets/thh/foresight-reads.png";
import landingHindsight from "@/assets/thh/landing-hindsight.png";
import type { Screenshot } from "@/domain/screenshot";

/**
 * Screenshots of The Trader's Hindsight, lettered in the order they appear.
 * None shows a real trader: fixture data, a test account or the public page.
 */
export const screenshots = {
  dashboard: {
    letter: "A",
    image: dashboard,
    alt: "The Trader's Hindsight dashboard for June 2026: net P&L of minus $568.99, equity of $70,601.31, a 33% win rate, trade counts and prop-firm challenge status.",
    title: "The dashboard.",
    caption: "Monthly P&L, equity and challenge status per firm. Fixture data, not a real trader.",
  },
  foresight: {
    letter: "B",
    image: foresightReads,
    alt: "Foresight reads: a scorecard of each warning's record and net result, then a trade read at entry with the warning it raised.",
    title: "Foresight reads.",
    caption: "Each warning is scored against how the trade it warned about closed. Test account.",
  },
  equity: {
    letter: "C",
    image: equityCurve,
    alt: "Daily equity curve from a $10,000 starting balance, 3 to 16 August, ending near $12,400.",
    title: "Equity curve.",
    caption: "Daily balance from a $10,000 start. Test account.",
  },
  hindsight: {
    letter: "D",
    image: landingHindsight,
    alt: "Hindsight on the public landing page: the costliest habits of the last 30 days, ranked by the dollars they cost, led by revenge trades after a loss at minus $1,687.",
    title: "Hindsight.",
    caption: "Habits ranked by what they cost. From the public landing page.",
  },
} satisfies Record<string, Screenshot>;
