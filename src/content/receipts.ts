import { formatDate } from "@/domain/format";
import type { Receipt } from "@/domain/receipts";
import { profile } from "@/content/profile";
import { stats } from "@/content/stats";

/** Every receipt the site can cite, keyed by a stable id. */
export const receipts = {
  "live-site": {
    title: "Live site.",
    body: [
      "Open ",
      { text: "tradershindsight.com", href: profile.links.product },
      " and sign up; plans are $12 a month.",
    ],
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
    body: [
      "Listed on ",
      { text: "LinkedIn", href: profile.links.linkedin },
      " and in my ",
      { text: "CV", href: profile.cvPath },
      ".",
    ],
  },
} satisfies Record<string, Receipt>;

export type ReceiptId = keyof typeof receipts;
