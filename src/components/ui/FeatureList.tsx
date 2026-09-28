import { Prose } from "@/components/receipts/Prose";
import type { Feature } from "@/domain/portfolio";

interface FeatureListProps<Id extends string> {
  items: readonly Feature<Id>[];
  /** Required when a description cites receipts. */
  numberOf?: (id: Id) => number;
}

/** What a product does, one ruled row per feature. */
export function FeatureList<Id extends string>({ items, numberOf }: FeatureListProps<Id>) {
  return (
    <dl className="m-0">
      {items.map((feature) => (
        <div key={feature.name} className="border-t border-rule py-3.5">
          <dt className="t-h3">{feature.name}</dt>
          <dd className="m-0 mt-0.5">
            <Prose text={feature.description} numberOf={numberOf} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
