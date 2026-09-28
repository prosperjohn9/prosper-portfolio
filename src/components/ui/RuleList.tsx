import { Prose } from "@/components/receipts/Prose";
import type { ProductRule } from "@/domain/portfolio";

interface RuleListProps<Id extends string> {
  rules: readonly ProductRule<Id>[];
  /** Required when a reason cites receipts. */
  numberOf?: (id: Id) => number;
}

/** Rules as headings, each with its reason beside it on wide screens. */
export function RuleList<Id extends string>({ rules, numberOf }: RuleListProps<Id>) {
  return (
    <dl className="mt-4 mb-0">
      {rules.map((item) => (
        <div
          key={item.rule}
          className="grid gap-1 border-t border-rule py-4 md:grid-cols-[13rem_1fr] md:gap-6"
        >
          <dt className="t-h3">{item.rule}</dt>
          <dd className="m-0">
            <Prose text={item.reason} numberOf={numberOf} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
