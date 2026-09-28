import { ScreenshotFigure } from "@/components/figures/ScreenshotFigure";
import { FULL_WIDTH, HALF_WIDTH } from "@/components/figures/sizes";
import { HindsightDemo } from "@/components/hindsight-demo/HindsightDemo";
import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FeatureList } from "@/components/ui/FeatureList";
import { Ledger } from "@/components/ui/Ledger";
import { RuleList } from "@/components/ui/RuleList";
import { Steps } from "@/components/ui/Steps";
import type { ReceiptId } from "@/content/receipts";
import {
  proseOf,
  runsOf,
  type CaseStudySection as SectionContent,
  type ColumnBlock,
  type WideBlock,
} from "@/domain/project";
import type { ReceiptNumbering } from "@/domain/receipts";

type NumberOf = ReceiptNumbering<ReceiptId>["numberOf"];

function ColumnBlockView({
  block,
  numberOf,
}: {
  block: ColumnBlock<ReceiptId>;
  numberOf: NumberOf;
}) {
  switch (block.kind) {
    case "intro":
      return (
        <p className="t-intro">
          <Prose text={block.text} numberOf={numberOf} />
        </p>
      );
    case "text":
      return (
        <p>
          <Prose text={block.text} numberOf={numberOf} />
        </p>
      );
    case "features":
      return <FeatureList items={block.items} numberOf={numberOf} />;
    case "rules":
      return <RuleList rules={block.rules} numberOf={numberOf} />;
    default:
      return block satisfies never;
  }
}

function WideBlockView({ block }: { block: WideBlock }) {
  switch (block.kind) {
    case "figure":
      return <ScreenshotFigure shot={block.shot} sizes={FULL_WIDTH} />;
    case "figure-pair":
      return (
        <div className="grid items-start gap-7 md:grid-cols-2">
          {block.shots.map((shot) => (
            <ScreenshotFigure key={shot.letter} shot={shot} sizes={HALF_WIDTH} />
          ))}
        </div>
      );
    case "steps":
      return <Steps steps={block.steps} />;
    case "ledger":
      return <Ledger caption={block.caption} rows={block.rows} />;
    case "actions":
      return (
        <div className="flex flex-wrap gap-3">
          {block.actions.map((action) => (
            <ButtonLink
              key={action.label}
              href={action.href}
              variant={action.primary ? "primary" : "secondary"}
              download={action.download}
            >
              {action.label}
            </ButtonLink>
          ))}
        </div>
      );
    case "hindsight-demo":
      return <HindsightDemo trades={block.trades} copy={block.copy} />;
    default:
      return block satisfies never;
  }
}

interface CaseStudySectionProps {
  section: SectionContent<ReceiptId>;
  numbering: ReceiptNumbering<ReceiptId>;
}

/**
 * One section of a project's page. Text blocks that follow each other share a
 * reading column, with their receipts in the margin; figures, tables and
 * panels take the full width.
 */
export function CaseStudySection({ section, numbering }: CaseStudySectionProps) {
  return (
    <Section id={section.id} title={section.title}>
      {runsOf(section.blocks).map((run, index) => {
        const spacing = index > 0 ? "mt-10" : undefined;
        if (run.kind === "wide") {
          return (
            <div key={`${section.id}-${index}`} className={spacing}>
              <WideBlockView block={run.block} />
            </div>
          );
        }
        const notes = numbering.notesFor(run.blocks.flatMap(proseOf));
        return (
          <div key={`${section.id}-${index}`} className={spacing}>
            <MarginRow margin={notes.length > 0 ? <ReceiptNotes notes={notes} /> : undefined}>
              {run.blocks.map((block, blockIndex) => (
                <div key={blockIndex} className={blockIndex > 0 ? "mt-4" : undefined}>
                  <ColumnBlockView block={block} numberOf={numbering.numberOf} />
                </div>
              ))}
            </MarginRow>
          </div>
        );
      })}
    </Section>
  );
}
