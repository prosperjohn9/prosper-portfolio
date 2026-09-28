import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { RuleList } from "@/components/ui/RuleList";
import { architecture, caseStudyBlocks } from "@/content/case-study";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";

export function Architecture({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="architecture" title={architecture.title}>
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(caseStudyBlocks.decisions)} />}>
        <p className="t-intro">{architecture.intro}</p>
        <RuleList rules={architecture.decisions} numberOf={numbering.numberOf} />
      </MarginRow>
    </Section>
  );
}
