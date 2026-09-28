import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { caseStudyBlocks, why } from "@/content/case-study";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";

export function Why({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="why" title={why.title}>
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(caseStudyBlocks.why)} />}>
        <p className="t-intro">
          <Prose text={why.text} numberOf={numbering.numberOf} />
        </p>
      </MarginRow>
    </Section>
  );
}
