import Image from "next/image";
import portrait from "@/assets/portrait.jpg";
import { Prose } from "@/components/receipts/Prose";
import { ReceiptNotes } from "@/components/receipts/ReceiptNotes";
import { ButtonLink, ButtonRow } from "@/components/ui/ButtonLink";
import { hero, homeBlocks } from "@/content/home";
import { profile } from "@/content/profile";
import type { ReceiptId } from "@/content/receipts";
import { routes } from "@/content/site";
import { mailto } from "@/domain/links";
import type { ReceiptNumbering } from "@/domain/receipts";
import styles from "./Hero.module.css";

export function Hero({ numbering }: { numbering: ReceiptNumbering<ReceiptId> }) {
  return (
    <section aria-labelledby="hero-name" className={`wrap ${styles.hero}`}>
      <div className={styles.grid}>
        <header className={styles.name}>
          <h1 id="hero-name" className="t-name">
            {profile.nameParts.map((part) => (
              <span key={part} className="block">
                {part}
              </span>
            ))}
          </h1>
          <p className="mt-3.5 text-base text-graphite">
            {profile.role} in {profile.location}. {profile.pronouns}.
          </p>
        </header>

        <Image
          src={portrait}
          alt={hero.portraitAlt}
          sizes="(min-width: 1000px) 128px, 84px"
          placeholder="blur"
          loading="eager"
          className={styles.photo}
        />

        {/* Receipts follow the paragraph that cites them, so on phones a tapped
            note opens directly under its claim. */}
        <p className={`t-lede ${styles.lede}`}>
          <Prose text={hero.lede} numberOf={numbering.numberOf} sweep />
        </p>
        <div className={`t-small ${styles.notes}`}>
          <ReceiptNotes notes={numbering.notesFor(homeBlocks.hero)} />
        </div>

        <div className={styles.rest}>
          <p className="max-w-[34rem] text-graphite">
            <strong className="font-semibold text-ink">{hero.availability.headline}</strong>{" "}
            {hero.availability.detail}
          </p>
          <ButtonRow>
            <ButtonLink href={routes.caseStudy} variant="primary">
              Read the case study
            </ButtonLink>
            <ButtonLink href={profile.cvPath} download>
              Download CV (PDF)
            </ButtonLink>
            <ButtonLink href={mailto(profile.email)}>Email me</ButtonLink>
          </ButtonRow>
        </div>
      </div>
    </section>
  );
}
