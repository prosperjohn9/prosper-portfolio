import { Prose } from "@/components/receipts/Prose";
import { FoldList } from "@/components/ui/FoldList";
import type { Feature } from "@/domain/portfolio";

interface FeatureListProps<Id extends string> {
  items: readonly Feature<Id>[];
  /** Required when a description cites receipts. */
  numberOf?: (id: Id) => number;
}

/** What a product does, one ruled row per feature; on phones each folds under its name. */
export function FeatureList<Id extends string>({ items, numberOf }: FeatureListProps<Id>) {
  return (
    <FoldList
      items={items.map((feature) => ({
        key: feature.name,
        term: feature.name,
        detail: <Prose text={feature.description} numberOf={numberOf} />,
      }))}
      rowClassName="border-t border-rule py-3.5"
      termClassName="t-h3"
      detailClassName="mt-0.5"
    />
  );
}
