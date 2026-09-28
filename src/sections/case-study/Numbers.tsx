import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ButtonLink, ButtonRow } from "@/components/ui/ButtonLink";
import { contact, ledger } from "@/content/home";
import { profile } from "@/content/profile";
import { mailto } from "@/domain/links";
import styles from "./Ledger.module.css";

export function Ledger() {
  return (
    <Section id="numbers" title={ledger.title}>
      <p className="t-intro max-w-[38rem]">{ledger.intro}</p>
      <table className={styles.table}>
        <caption className={styles.caption}>{ledger.caption}</caption>
        <thead>
          <tr>
            <th scope="col">What</th>
            <th scope="col" className={styles.figure}>
              Figure
            </th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <tbody>
          {ledger.rows.map((row) => (
            <tr key={row.what}>
              <td className={styles.what}>{row.what}</td>
              <td className={styles.figure}>{row.figure}</td>
              <td className={styles.source}>
                <Prose text={row.source} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ButtonRow>
        <ButtonLink href={mailto(profile.email, contact.walkthroughSubject)} variant="primary">
          Ask how it is built
        </ButtonLink>
        <ButtonLink href={profile.links.productShowcase}>
          See the public showcase on GitHub
        </ButtonLink>
      </ButtonRow>
    </Section>
  );
}
