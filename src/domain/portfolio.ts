import type { RichText } from "@/domain/rich-text";

/** Something the product does, with the evidence for it. */
export interface Feature<Id extends string = string> {
  name: string;
  description: RichText<Id>;
}

/** A security rule the product keeps, and why it matters. */
export interface SecurityRule<Id extends string = string> {
  rule: string;
  reason: RichText<Id>;
}

/** One row of the numbers ledger: a figure and where it comes from. */
export interface LedgerRow {
  what: string;
  figure: string;
  source: RichText<never>;
}

/** A job or a degree, newest first. */
export interface Milestone {
  period: string;
  title: string;
  detail?: string;
}

/** A site built for a client. */
export interface ClientProject {
  name: string;
  href: string;
  description: string;
}
