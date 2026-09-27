import { MarginRow } from "@/components/layout/MarginRow";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { hero } from "@/content/home";
import { profile } from "@/content/profile";
import type { ReceiptId } from "@/content/receipts";
import type { ReceiptNumbering } from "@/domain/receipts";

export function Hero({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <section aria-labelledby="hero-name" className="wrap pt-[clamp(28px,6vw,72px)]">
      <h1 id="hero-name" className="t-name">
        {profile.nameParts.map((part) => (
          <span key={part} className="block">
            {part}
          </span>
        ))}
      </h1>
      <p className="mt-3.5 mb-7 text-base text-graphite">
        {profile.role} in {profile.location}. {profile.pronouns}.
      </p>

      {/* Receipts sit right after the paragraph that cites them, so on phones
          a tapped note opens directly under its claim. */}
      <MarginRow margin={<ReceiptNotes notes={numbering.notesFor([hero.lede])} />}>
        <p className="t-lede">
          <Prose text={hero.lede} numberOf={numbering.numberOf} sweep />
        </p>
      </MarginRow>
      <p className="mt-6 max-w-[34rem] text-graphite">
        <strong className="font-semibold text-ink">{hero.availability.headline}</strong>{" "}
        {hero.availability.detail}
      </p>
    </section>
  );
}
