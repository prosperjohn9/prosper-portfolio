import { ScreenshotFigure } from "@/components/figures/ScreenshotFigure";
import { FULL_WIDTH } from "@/components/figures/sizes";
import { HindsightDemo } from "@/components/hindsight-demo/HindsightDemo";
import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { caseStudyBlocks, demo, demoTrades } from "@/content/case-study";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";

export function Demo({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="demo" title={demo.title}>
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(caseStudyBlocks.demo)} />}>
        <p className="t-intro">
          <Prose text={demo.intro} numberOf={numbering.numberOf} />
        </p>
      </MarginRow>

      <div className="mt-8">
        <HindsightDemo trades={demoTrades} copy={demo.panel} />
      </div>

      <div className="mt-10">
        <ScreenshotFigure shot={demo.figure} sizes={FULL_WIDTH} />
      </div>
    </Section>
  );
}
