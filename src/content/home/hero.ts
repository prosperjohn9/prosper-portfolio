import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";

export const hero = {
  lede: [
    "I build web products from the database to the interface, and keep them running after launch. I designed, built and run The Trader's Hindsight, ",
    { claim: "a live subscription SaaS for forex and prop-firm traders", receipt: "live-site" },
    ". Before that, I spent almost four years building REST APIs and payment integrations for a London e‑commerce platform, remotely. My background is in security: an M.Sc. in Cyber Security and over a year as a security specialist.",
  ] satisfies RichText<ReceiptId>,
  availability: {
    headline: "Open to full stack, backend and product engineering roles.",
    detail: "Remote, in Nigeria, or abroad with visa sponsorship.",
  },
  portraitAlt: "Portrait of Prosper Osaigbovo",
};
