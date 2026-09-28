import { ScreenshotFigure } from "@/components/figures/ScreenshotFigure";
import { FULL_WIDTH, HALF_WIDTH } from "@/components/figures/sizes";
import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { ButtonLink, ButtonRow } from "@/components/ui/ButtonLink";
import { evidence, homeBlocks } from "@/content/home";
import type { ReceiptId } from "@/content/receipts";
import { screenshots } from "@/content/screenshots";
import { routes } from "@/content/site";
import type { ReceiptNumbering } from "@/domain/receipts";

export function Evidence({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="evidence" title={evidence.title}>
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(homeBlocks.story)} />}>
        <p className="t-intro">
          <Prose text={evidence.story} numberOf={numbering.numberOf} />
        </p>
      </MarginRow>

      <div className="mt-9">
        <ScreenshotFigure shot={screenshots.dashboard} sizes={FULL_WIDTH} />
      </div>

      <div className="mt-12">
        <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(homeBlocks.features)} />}>
          <dl className="m-0">
            {evidence.features.map((feature) => (
              <div key={feature.name} className="border-t border-rule py-3.5">
                <dt className="t-h3">{feature.name}</dt>
                <dd className="m-0 mt-0.5">
                  <Prose text={feature.description} numberOf={numbering.numberOf} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-graphite">{evidence.stack}</p>
        </MarginRow>
      </div>

      <div className="mt-9 grid items-start gap-7 md:grid-cols-2">
        <ScreenshotFigure shot={screenshots.foresight} sizes={HALF_WIDTH} />
        <ScreenshotFigure shot={screenshots.equity} sizes={HALF_WIDTH} />
      </div>
      <div className="mt-9">
        <ScreenshotFigure shot={screenshots.hindsight} sizes={FULL_WIDTH} />
      </div>
      <ButtonRow>
        <ButtonLink href={routes.caseStudy} variant="primary">
          Read the case study
        </ButtonLink>
      </ButtonRow>
    </Section>
  );
}
