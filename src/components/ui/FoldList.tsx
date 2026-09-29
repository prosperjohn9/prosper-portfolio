"use client";

import type { ReactNode } from "react";
import { useNarrowScreen } from "@/components/layout/useNarrowScreen";
import styles from "./FoldList.module.css";

export interface FoldItem {
  key: string;
  term: ReactNode;
  detail: ReactNode;
}

interface FoldListProps {
  items: readonly FoldItem[];
  /** Spacing and rule for each row, the same at every width so nothing moves. */
  rowClassName: string;
  /** Extra layout for a row on wide screens, such as two columns. */
  wideRowClassName?: string;
  termClassName: string;
  detailClassName?: string;
}

/**
 * Terms with their details. On wide screens, and without JavaScript, every
 * detail shows. On phones each detail folds under its term, which opens it, so
 * a long list reads as a list of headings.
 */
export function FoldList({
  items,
  rowClassName,
  wideRowClassName = "",
  termClassName,
  detailClassName = "",
}: FoldListProps) {
  const narrow = useNarrowScreen();

  if (narrow) {
    return (
      <div className={styles.list}>
        {items.map((item) => (
          <details key={item.key} className={rowClassName}>
            <summary className={`${termClassName} ${styles.term}`}>{item.term}</summary>
            <div className={detailClassName}>{item.detail}</div>
          </details>
        ))}
      </div>
    );
  }

  return (
    <dl className={`m-0 ${styles.list}`}>
      {items.map((item) => (
        <div key={item.key} className={`${rowClassName} ${wideRowClassName}`}>
          <dt className={`${termClassName} ${styles.term}`}>{item.term}</dt>
          <dd className={`m-0 ${detailClassName}`}>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
