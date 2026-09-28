import type { HindsightDemoCopy, Trade } from "@/domain/hindsight";
import type { Fact, Feature, LedgerRow, PipelineStep, ProductRule } from "@/domain/portfolio";
import type { LinkSegment, RichText } from "@/domain/rich-text";
import type { Screenshot } from "@/domain/screenshot";

/** A link shown as a button. */
export interface Action {
  label: string;
  href: string;
  primary?: boolean;
  /** Set for files the visitor saves, such as the CV. */
  download?: boolean;
}

/** Blocks read in the column, with their receipts in the margin beside them. */
export type ColumnBlock<Id extends string = string> =
  | { kind: "intro"; text: RichText<Id> }
  | { kind: "text"; text: RichText<Id> }
  | { kind: "features"; items: readonly Feature<Id>[] }
  | { kind: "rules"; rules: readonly ProductRule<Id>[] };

/** Blocks that take the full width of the page. */
export type WideBlock =
  | { kind: "figure"; shot: Screenshot }
  | { kind: "figure-pair"; shots: readonly [Screenshot, Screenshot] }
  | { kind: "steps"; steps: readonly PipelineStep[] }
  | { kind: "ledger"; caption: string; rows: readonly LedgerRow[] }
  | { kind: "actions"; actions: readonly Action[] }
  | { kind: "hindsight-demo"; trades: readonly Trade[]; copy: HindsightDemoCopy };

export type Block<Id extends string = string> = ColumnBlock<Id> | WideBlock;

export interface CaseStudySection<Id extends string = string> {
  /** The section's anchor. */
  id: string;
  title: string;
  blocks: readonly Block<Id>[];
}

/** A project's own page: a lede and facts, then its sections in order. */
export interface CaseStudy<Id extends string = string> {
  /** For search results and link previews. */
  description: string;
  lede: RichText<Id>;
  /** Facts beyond the project's role, period and stack, such as a price. */
  facts?: readonly Fact[];
  sections: readonly CaseStudySection<Id>[];
}

/** Something I built, as the Selected work list shows it. */
export interface Project<Id extends string = string> {
  /** Stable and URL-safe: it keys the list, and names the project's page. */
  slug: string;
  name: string;
  period: string;
  /** What it is, in a sentence or two. */
  summary: string;
  role: string;
  stack?: readonly string[];
  /** Where to see it live. */
  site?: LinkSegment;
  /** With one, the project gets its own page at /work/<slug>. */
  caseStudy?: CaseStudy<Id>;
}

/** Consecutive column blocks share a reading column; a wide block stands alone. */
export type BlockRun<Id extends string = string> =
  { kind: "column"; blocks: ColumnBlock<Id>[] } | { kind: "wide"; block: WideBlock };

const COLUMN_KINDS: ReadonlySet<Block["kind"]> = new Set(["intro", "text", "features", "rules"]);

const isColumnBlock = <Id extends string>(block: Block<Id>): block is ColumnBlock<Id> =>
  COLUMN_KINDS.has(block.kind);

/** A section's blocks as the page lays them out, top to bottom. */
export function runsOf<Id extends string>(blocks: readonly Block<Id>[]): BlockRun<Id>[] {
  const runs: BlockRun<Id>[] = [];
  for (const block of blocks) {
    const last = runs.at(-1);
    if (!isColumnBlock(block)) runs.push({ kind: "wide", block });
    else if (last?.kind === "column") last.blocks.push(block);
    else runs.push({ kind: "column", blocks: [block] });
  }
  return runs;
}

/** The texts in a block that can cite receipts, in reading order. */
export function proseOf<Id extends string>(block: Block<Id>): RichText<Id>[] {
  switch (block.kind) {
    case "intro":
    case "text":
      return [block.text];
    case "features":
      return block.items.map((item) => item.description);
    case "rules":
      return block.rules.map((rule) => rule.reason);
    default:
      return [];
  }
}

/** Every text on a case study that can cite receipts, top to bottom. Receipt numbers follow it. */
export function caseStudyProse<Id extends string>(caseStudy: CaseStudy<Id>): RichText<Id>[] {
  return [
    caseStudy.lede,
    ...caseStudy.sections.flatMap((section) => section.blocks.flatMap(proseOf)),
  ];
}

/** Every screenshot a case study shows, top to bottom. */
export function caseStudyFigures(caseStudy: CaseStudy): Screenshot[] {
  return caseStudy.sections.flatMap((section) =>
    section.blocks.flatMap((block) => {
      if (block.kind === "figure") return [block.shot];
      if (block.kind === "figure-pair") return [...block.shots];
      return [];
    }),
  );
}
