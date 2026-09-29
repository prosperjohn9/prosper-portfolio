import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { RuleList } from "@/components/ui/RuleList";
import { homeBlocks, howIWork } from "@/content/home";
import { profile } from "@/content/profile";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";

export function HowIWork({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  const { positions, decisions } = howIWork;
  return (
    <Section id="how-i-work" title={howIWork.title}>
      <MarginRow>
        <RuleList rules={positions.items} />
        <p className="mt-4">
          <a href={profile.links.linkedin}>{positions.more}</a>
        </p>
      </MarginRow>

      <div className="mt-14">
        <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(homeBlocks.decisions)} />}>
          <h3 className="t-subhead">{decisions.title}</h3>
          <p className="mt-2">
            <Prose text={decisions.intro} numberOf={numbering.numberOf} />
          </p>
          <RuleList rules={decisions.items} />
        </MarginRow>
      </div>
    </Section>
  );
}
