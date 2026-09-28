import type { LinkSegment, RichText } from "@/domain/rich-text";

/** Something the product does, with the evidence for it. */
export interface Feature<Id extends string = string> {
  name: string;
  description: RichText<Id>;
}

/** A rule kept, such as a security decision or a way of working, and why it matters. */
export interface ProductRule<Id extends string = string> {
  rule: string;
  reason: RichText<Id>;
}

/** One row of the numbers ledger: a figure and where it comes from. */
export interface LedgerRow {
  what: string;
  figure: string;
  source: RichText<never>;
}

/** A degree, or another dated step, newest first. */
export interface Milestone {
  period: string;
  title: string;
  detail?: string;
}

/** Something I built or worked on: a product, a client site or a job. */
export interface Project {
  /** Stable and URL-safe: it keys the list, and names the project's page when it has one. */
  slug: string;
  name: string;
  period: string;
  /** What it is, in a sentence or two. */
  summary: string;
  role: string;
  stack?: readonly string[];
  /** True when the project has its own page on this site, at /work/<slug>. */
  caseStudy?: boolean;
  /** Where to see it live. */
  site?: LinkSegment;
}

/** A short labelled fact, such as a role or a price. */
export interface Fact {
  term: string;
  detail: string;
}

/** One step of a pipeline, in the order the steps run. */
export interface PipelineStep {
  name: string;
  detail?: string;
}
