import type { ReactNode } from "react";

interface MarginRowProps {
  children: ReactNode;
  /** Shown in a narrow right-hand column on wide screens, and below the text on phones. */
  margin?: ReactNode;
}

/** The page grid: a reading column with a margin beside it for receipts. */
export function MarginRow({ children, margin }: MarginRowProps) {
  return (
    <div className="margin-row">
      <div className="min-w-0">{children}</div>
      {margin ? <aside className="t-small">{margin}</aside> : null}
    </div>
  );
}
