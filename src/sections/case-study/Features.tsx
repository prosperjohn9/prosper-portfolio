import { ScreenshotFigure } from "@/components/figures/ScreenshotFigure";
import { FULL_WIDTH, HALF_WIDTH } from "@/components/figures/sizes";
import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { caseStudyBlocks, features } from "@/content/case-study";
import type { ReceiptId } from "@/content/receipts";
import { screenshots } from "@/content/screenshots";
import type { ReceiptNumbering } from "@/domain/receipts";

export function Features({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="features" title={features.title}>
      <ScreenshotFigure shot={screenshots.dashboard} sizes={FULL_WIDTH} />

      <div className="mt-12">
        <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(caseStudyBlocks.features)} />}>
          <dl className="m-0">
            {features.items.map((feature) => (
              <div key={feature.name} className="border-t border-rule py-3.5">
                <dt className="t-h3">{feature.name}</dt>
                <dd className="m-0 mt-0.5">
                  <Prose text={feature.description} numberOf={numbering.numberOf} />
                </dd>
              </div>
            ))}
          </dl>
        </MarginRow>
      </div>

      <div className="mt-9 grid items-start gap-7 md:grid-cols-2">
        <ScreenshotFigure shot={screenshots.foresight} sizes={HALF_WIDTH} />
        <ScreenshotFigure shot={screenshots.equity} sizes={HALF_WIDTH} />
      </div>
    </Section>
  );
}
