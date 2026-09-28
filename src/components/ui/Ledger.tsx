import { Prose } from "@/components/receipts/Prose";
import type { LedgerRow } from "@/domain/portfolio";
import styles from "./Ledger.module.css";

interface LedgerProps {
  caption: string;
  rows: readonly LedgerRow[];
}

/** Figures with their sources: the one ruled table on a page, so its lines mean "audited". */
export function Ledger({ caption, rows }: LedgerProps) {
  return (
    <table className={styles.table}>
      <caption className={styles.caption}>{caption}</caption>
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
        {rows.map((row) => (
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
  );
}
