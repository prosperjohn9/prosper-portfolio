import { Section } from "@/components/layout/Section";
import { Prose } from "@/components/receipts/Prose";
import { ledger } from "@/content/case-study";
import styles from "./Numbers.module.css";

export function Numbers() {
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
    </Section>
  );
}
