import { MarginRow } from "@/components/layout/MarginRow";
import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { caseStudyBlocks, delivery } from "@/content/case-study";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";
import styles from "./Delivery.module.css";

export function Delivery({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <Section id="delivery" title={delivery.title}>
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor(caseStudyBlocks.delivery)} />}>
        <p className="t-intro">
          <Prose text={delivery.intro} numberOf={numbering.numberOf} />
        </p>
      </MarginRow>
      <ol className={styles.steps}>
        {delivery.steps.map((step) => (
          <li key={step.name} className={styles.step}>
            <span className={styles.name}>{step.name}</span>
            {step.detail ? <span className={styles.detail}>{step.detail}</span> : null}
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <MarginRow>
          <p>
            <Prose text={delivery.after} numberOf={numbering.numberOf} />
          </p>
        </MarginRow>
      </div>
    </Section>
  );
}
