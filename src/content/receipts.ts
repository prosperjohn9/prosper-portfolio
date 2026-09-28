import { formatCount, formatDate } from "@/domain/format";
import { mailto } from "@/domain/links";
import type { Receipt } from "@/domain/receipts";
import { figureId } from "@/domain/screenshot";
import { contact } from "@/content/home/contact";
import { profile } from "@/content/profile";
import { screenshots } from "@/content/screenshots";
import { stats } from "@/content/stats";

const site = { text: "tradershindsight.com", href: profile.links.product };
const below = (letter: string) => ({ text: "shown below", href: `#${figureId(letter)}` });
const walkthrough = {
  text: "Ask me how it is built",
  href: mailto(profile.email, contact.walkthroughSubject),
};

/** Every receipt the site can cite, keyed by a stable id. */
export const receipts = {
  "live-site": {
    title: "Live site.",
    body: ["Open ", site, " and sign up. Plans start at $12 a month."],
  },
  "repo-count": {
    title: "Counted from the repository.",
    body: [
      `Figures from commit ${stats.commit}, counted ${formatDate(stats.countedOn)}. The code is private; on a call I can show you how it is built. `,
      { text: "Public showcase repo", href: profile.links.productShowcase },
      " (no code).",
    ],
  },
  "git-history": {
    title: "Git history.",
    body: [
      `All ${formatCount(stats.commits)} commits up to ${stats.commit} are mine. The repository is private. `,
      walkthrough,
      ".",
    ],
  },
  "in-the-code": {
    title: "Checked in the code.",
    body: [`The private repository, at commit ${stats.commit}. `, walkthrough, "."],
  },
  "founder-story": {
    title: "Founder story.",
    body: ["Published on ", site, "."],
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
      "Try it at ",
      {
        text: "tradershindsight.com/prop-firm-fit",
        href: `${profile.links.product}/prop-firm-fit`,
      },
      ". No account needed.",
    ],
  },
  "read-only-brokers": {
    title: "Public promise.",
    body: ["Made to every trader on ", site, "."],
  },
} satisfies Record<string, Receipt>;

export type ReceiptId = keyof typeof receipts;
