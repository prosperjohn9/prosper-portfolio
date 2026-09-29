import { Prose } from "@/components/receipts/Prose";
import { FoldList } from "@/components/ui/FoldList";
import type { ProductRule } from "@/domain/portfolio";

interface RuleListProps<Id extends string> {
  rules: readonly ProductRule<Id>[];
  /** Required when a reason cites receipts. */
  numberOf?: (id: Id) => number;
}

/** Rules as headings, each with its reason beside it on wide screens and folded under it on phones. */
export function RuleList<Id extends string>({ rules, numberOf }: RuleListProps<Id>) {
  return (
    <div className="mt-4">
      <FoldList
        items={rules.map((item) => ({
          key: item.rule,
          term: item.rule,
          detail: <Prose text={item.reason} numberOf={numberOf} />,
        }))}
        rowClassName="border-t border-rule py-4"
        wideRowClassName="grid gap-1 md:grid-cols-[13rem_1fr] md:gap-6"
        termClassName="t-h3"
      />
    </div>
  );
}
