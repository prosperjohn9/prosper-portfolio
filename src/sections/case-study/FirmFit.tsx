import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { caseStudyBlocks, firmFit } from "@/content/case-study";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";

export function FirmFit({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="firm-fit" title={firmFit.title}>
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(caseStudyBlocks.firmFit)} />}>
        <p>
          <Prose text={firmFit.text} numberOf={numbering.numberOf} />
        </p>
      </MarginRow>
    </Section>
  );
}
