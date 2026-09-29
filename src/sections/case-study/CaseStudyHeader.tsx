import { MarginRow } from "@/components/layout/MarginRow";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptHint } from "@/components/receipts/ReceiptHint";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import type { ReceiptId } from "@/content/receipts";
import type { Fact } from "@/domain/portfolio";
import type { CaseStudy, Project } from "@/domain/project";
import type { ReceiptNumbering } from "@/domain/receipts";

interface CaseStudyHeaderProps {
  project: Project<ReceiptId>;
  caseStudy: CaseStudy<ReceiptId>;
  numbering: ReceiptNumbering<ReceiptId>;
}

export function CaseStudyHeader({ project, caseStudy, numbering }: CaseStudyHeaderProps) {
  const facts: Fact[] = [
    { term: "Role", detail: project.role },
    { term: "Built", detail: project.period },
    ...(caseStudy.facts ?? []),
    ...(project.stack ? [{ term: "Stack", detail: project.stack.join(", ") }] : []),
  ];
  return (
    <section aria-labelledby="case-study-title" className="wrap pt-[clamp(28px,6vw,72px)]">
      <h1 id="case-study-title" className="t-title">
        {project.name}
      </h1>
      <div className="mt-6">
        <MarginRow
          margin={
            <>
              <ReceiptHint />
              <ReceiptNotes notes={numbering.notesFor([caseStudy.lede])} />
            </>
          }
        >
          <p className="t-lede">
            <Prose text={caseStudy.lede} numberOf={numbering.numberOf} sweep />
          </p>
        </MarginRow>
      </div>
      <dl className="mt-8 mb-0 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-4 lg:grid-cols-[auto_auto_auto_minmax(0,1fr)] lg:gap-x-12">
        {facts.map((fact) => (
          // The last fact is the longest, so on phones it takes the whole row.
          <div key={fact.term} className="last:col-span-2 lg:last:col-span-1">
            <dt className="t-small text-graphite">{fact.term}</dt>
            <dd className="m-0 mt-0.5 font-semibold">{fact.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
