import type { PipelineStep } from "@/domain/portfolio";
import styles from "./Steps.module.css";

/** Steps that run in order, numbered: down the page on phones, across it on wide screens. */
export function Steps({ steps }: { steps: readonly PipelineStep[] }) {
  return (
    <ol className={styles.steps}>
      {steps.map((step) => (
        <li key={step.name} className={styles.step}>
          <span className={styles.name}>{step.name}</span>
          {step.detail ? <span className={styles.detail}>{step.detail}</span> : null}
        </li>
      ))}
    </ol>
  );
}
