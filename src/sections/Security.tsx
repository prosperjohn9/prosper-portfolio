import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { homeBlocks, security } from "@/content/home";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";

export function Security({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="security" title={security.title}>
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(homeBlocks.security)} />}>
        <p className="t-intro">
          <Prose text={security.intro} numberOf={numbering.numberOf} />
        </p>
        <dl className="mt-4 mb-0">
          {security.rules.map((item) => (
            <div
              key={item.rule}
              className="grid gap-1 border-t border-rule py-4 md:grid-cols-[13rem_1fr] md:gap-6"
            >
              <dt className="t-h3">{item.rule}</dt>
              <dd className="m-0">
                <Prose text={item.reason} numberOf={numbering.numberOf} />
              </dd>
            </div>
          ))}
        </dl>
      </MarginRow>
    </Section>
  );
}
