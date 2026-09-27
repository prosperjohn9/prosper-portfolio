import type { SecurityRule } from "@/domain/portfolio";
import type { RichText } from "@/domain/rich-text";
import type { ReceiptId } from "@/content/receipts";

export const security = {
  title: "Security decisions",
  intro: [
    "Traders connect real broker accounts, so I designed the app RLS-first: the database decides who can read a row, not the API route. My background is in security: ",
    {
      claim: "an M.Sc. in Cyber Security and over a year as a security specialist",
      receipt: "security-background",
    },
    ".",
  ] satisfies RichText<ReceiptId>,
  rules: [
    {
      rule: "Each user sees only their own rows",
      reason: [
        "PostgreSQL row-level security decides what every user can read and write, so the API is not the only line of defence.",
      ],
    },
    {
      rule: "A password is not enough",
      reason: [
        "Multi-factor sign-in is enforced in the database itself, with recovery codes, so a lost phone does not lock a trader out.",
      ],
    },
    {
      rule: "Broker access is read-only",
      reason: [
        "Connections cannot place, change or close a trade, and cannot move money.",
        { cite: "read-only-brokers" },
      ],
    },
    {
      rule: "Broker tokens are sealed",
      reason: [
        "Tokens are encrypted before they are stored, so a copy of the database does not hand over broker access.",
      ],
    },
    {
      rule: "Statements stay on the trader's device",
      reason: ["Firm Fit reads statements in the browser. They are never uploaded."],
    },
    {
      rule: "Checks run without me",
      reason: [
        "Secret scanning on every CI run, a scheduled dependency audit, and error monitoring in production.",
      ],
    },
  ] satisfies SecurityRule<ReceiptId>[],
};
