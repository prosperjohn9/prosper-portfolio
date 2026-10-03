import { formatCount, formatDate } from "@/domain/format";
import { mailto } from "@/domain/links";
import type { Receipt } from "@/domain/receipts";
import { figureId } from "@/domain/screenshot";
import { contact } from "@/content/home/contact";
import { profile } from "@/content/profile";
import { isiLensCheckedOn } from "@/content/projects/isi-lens/checked-on";
import { screenshots as isiLensScreenshots } from "@/content/projects/isi-lens/screenshots";
import { screenshots } from "@/content/projects/traders-hindsight/screenshots";
import { stats } from "@/content/stats";

const site = { text: "tradershindsight.com", href: profile.links.product };
const below = (letter: string) => ({ text: "shown below", href: `#${figureId(letter)}` });
const walkthrough = {
  text: "Ask me how it is built",
  href: mailto(profile.email, contact.walkthroughSubject),
};

const isiLensSite = { text: "isilens.co.uk", href: "https://isilens.co.uk" };
const isiLensChecked = formatDate(isiLensCheckedOn);

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
  "isi-live-site": {
    title: "Live site.",
    body: ["Open ", isiLensSite, " and walk into any collection. No account needed."],
  },
  "isi-screenshot-room": {
    title: `Screenshot ${isiLensScreenshots.room.letter}.`,
    body: ["A collection's 3D room on the live site, ", below(isiLensScreenshots.room.letter), "."],
  },
  "isi-screenshot-grid": {
    title: `Screenshot ${isiLensScreenshots.grid.letter}.`,
    body: [
      "The same collection in a browser with 3D switched off, ",
      below(isiLensScreenshots.grid.letter),
      ".",
    ],
  },
  "isi-studio": {
    title: `Screenshot ${isiLensScreenshots.studio.letter}.`,
    body: [
      "Her editor, Sanity Studio, ",
      below(isiLensScreenshots.studio.letter),
      ". It needs a sign-in.",
    ],
  },
  "isi-photo-sizes": {
    title: "Page source.",
    body: [
      "View the source of any page on ",
      isiLensSite,
      `. On ${isiLensChecked}, all 190 photo links across its 14 pages asked for 1,800 pixels wide or less.`,
    ],
  },
  "isi-contact-form": {
    title: "Live form.",
    body: [
      "The form at ",
      { text: "isilens.co.uk/contact", href: "https://isilens.co.uk/contact" },
      " posts to the site's own server. There is no mail link behind it.",
    ],
  },
  "isi-card": {
    title: "Live page.",
    body: ["Open ", { text: "isilens.co.uk/card", href: "https://isilens.co.uk/card" }, "."],
  },
  "isi-accessibility": {
    title: "Accessibility check.",
    body: [
      "Run axe on any page of ",
      isiLensSite,
      `. On ${isiLensChecked}, it found no WCAG A or AA problems on any of the 14 pages in its sitemap.`,
    ],
  },
  "isi-headers": {
    title: "Response headers.",
    body: [
      "Open ",
      isiLensSite,
      " with your browser's developer tools and read the headers of any page.",
    ],
  },
} satisfies Record<string, Receipt>;

export type ReceiptId = keyof typeof receipts;
