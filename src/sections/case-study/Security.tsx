import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { RuleList } from "@/components/ui/RuleList";
import { caseStudyBlocks, security } from "@/content/case-study";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";

export function Security({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="security" title={security.title}>
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(caseStudyBlocks.security)} />}>
        <p className="t-intro">
          <Prose text={security.intro} numberOf={numbering.numberOf} />
        </p>
        <RuleList rules={security.rules} numberOf={numbering.numberOf} />
      </MarginRow>
    </Section>
  );
}
