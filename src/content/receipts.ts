import { formatDate } from "@/domain/format";
import type { Receipt } from "@/domain/receipts";
import { figureId } from "@/domain/screenshot";
import { profile } from "@/content/profile";
import { screenshots } from "@/content/screenshots";
import { stats } from "@/content/stats";

const site = { text: "tradershindsight.com", href: profile.links.product };
const linkedin = { text: "LinkedIn", href: profile.links.linkedin };
const cv = { text: "CV", href: profile.cvPath };
const below = (letter: string) => ({ text: "shown below", href: `#${figureId(letter)}` });

/** Every receipt the site can cite, keyed by a stable id. */
export const receipts = {
  "live-site": {
    title: "Live site.",
    body: ["Open ", site, " and sign up; plans are $12 a month."],
  },
  "repo-count": {
    title: "Counted from the repository.",
    body: [
      `Figures from commit ${stats.commit}, counted ${formatDate(stats.countedOn)}. The code is private, so I walk you through it on a call. `,
      { text: "Public showcase repo", href: profile.links.productShowcase },
      " (no code).",
    ],
  },
  mtrendz: {
    title: "MTrendz, London, Sep 2021 to Jun 2025.",
    body: ["Listed on ", linkedin, " and in my ", cv, "."],
  },
  "founder-story": {
    title: "Founder story.",
    body: ["Told in public on ", site, ", in my own numbers."],
  },
  "screenshot-hindsight": {
    title: `Screenshot ${screenshots.hindsight.letter}.`,
    body: [
      "The Hindsight section of the public landing page, ",
      below(screenshots.hindsight.letter),
      ".",
    ],
  },
  "screenshot-foresight": {
    title: `Screenshot ${screenshots.foresight.letter}.`,
    body: ["Graded reads from a test account, ", below(screenshots.foresight.letter), "."],
  },
  "firm-fit-page": {
    title: "Public page.",
    body: [
      {
        text: "tradershindsight.com/prop-firm-fit",
        href: `${profile.links.product}/prop-firm-fit`,
      },
      " runs Firm Fit and says the statement is read in the browser and never uploaded.",
    ],
  },
  "security-background": {
    title: "Üsküdar University, Feb 2026, and Meteotech, Abuja, Mar 2019 to Jun 2020.",
    body: ["Both on ", linkedin, " and in my ", cv, "."],
  },
  "read-only-brokers": {
    title: "Stated to users.",
    body: [
      "The ",
      { text: "landing page", href: profile.links.product },
      " says the app can see trades but cannot place, change or close one, or move money.",
    ],
  },
} satisfies Record<string, Receipt>;

export type ReceiptId = keyof typeof receipts;
