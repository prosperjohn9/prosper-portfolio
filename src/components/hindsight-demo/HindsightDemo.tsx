"use client";

import { useId, useMemo, useState, type CSSProperties } from "react";
import { formatMoney } from "@/domain/format";
import {
  rankHabits,
  replayMonth,
  type HabitId,
  type Replay,
  type ReplayedTrade,
  type Trade,
} from "@/domain/hindsight";
import styles from "./HindsightDemo.module.css";
import { useCountUp } from "./useCountUp";

interface HabitCopy {
  key: string;
  name: string;
  phrase: string;
}

export interface HindsightDemoCopy {
  title: string;
  exampleLabel: string;
  totalLabel: string;
  prompt: string;
  noScriptPrompt: string;
  asTraded: string;
  footnote: string;
  takeOut: string;
  putBack: string;
  reset: string;
  better: string;
  winRate: string;
  and: string;
  tradesSummary: string;
  chartCaption: string;
  habits: Record<HabitId, HabitCopy>;
  table: Record<"day" | "pair" | "habits" | "pnl" | "replayed" | "none" | "removed", string>;
}

interface HindsightDemoProps {
  trades: readonly Trade[];
  copy: HindsightDemoCopy;
}

/** Fills {name} placeholders in a sentence from the copy. */
const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, name: string) => values[name] ?? "");

const joinWithAnd = (items: string[], and: string) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} ${and} ${items.at(-1)}`;

const signed = (value: number) => formatMoney(value, { signed: true });

function describeReplay(
  copy: HindsightDemoCopy,
  takenOut: HabitId[],
  replay: Replay,
  asTraded: number,
): string {
  if (takenOut.length === 0) return copy.prompt;
  const better = fill(copy.better, {
    habits: joinWithAnd(
      takenOut.map((habit) => copy.habits[habit].phrase),
      copy.and,
    ),
    amount: formatMoney(replay.total - asTraded),
  });
  if (replay.winRate === null) return better;
  const winRate = fill(copy.winRate, {
    rate: `${Math.round(replay.winRate * 100)}%`,
    count: String(replay.tradeCount),
  });
  return `${better} ${winRate}`;
}

/**
 * The Hindsight idea as a working panel: take a habit out and the month is
 * replayed without it. The first render works without JavaScript: the costs,
 * the chart and the trades are all in the HTML.
 */
export function HindsightDemo({ trades: month, copy }: HindsightDemoProps) {
  const ranking = useMemo(() => rankHabits(month), [month]);
  const asTraded = useMemo(() => replayMonth(month, new Set()).total, [month]);
  const largest = useMemo(() => Math.max(...month.map((t) => Math.abs(t.pnl))), [month]);

  const [takenOut, setTakenOut] = useState<HabitId[]>([]);
  const [highlighted, setHighlighted] = useState<HabitId | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [shownTotal, countTo] = useCountUp(asTraded);

  const replay = useMemo(() => replayMonth(month, new Set(takenOut)), [month, takenOut]);
  const sentence = describeReplay(copy, takenOut, replay, asTraded);

  function apply(next: HabitId[]) {
    // Kept in ranking order, so the sentence names habits the way the list does.
    const ordered = ranking.map((h) => h.habit).filter((habit) => next.includes(habit));
    const nextReplay = replayMonth(month, new Set(ordered));
    setTakenOut(ordered);
    countTo(nextReplay.total);
    setAnnouncement(
      `${copy.totalLabel} ${signed(nextReplay.total)}. ${describeReplay(copy, ordered, nextReplay, asTraded)}`,
    );
  }

  const toggle = (habit: HabitId) =>
    apply(takenOut.includes(habit) ? takenOut.filter((h) => h !== habit) : [...takenOut, habit]);

  const titleId = useId();
  const displayTotal = Math.round(shownTotal);

  return (
    <figure className={styles.panel} aria-labelledby={titleId}>
      <div className={styles.head}>
        <h3 id={titleId} className={styles.title}>
          {copy.title}
        </h3>
        <p className={styles.example}>{copy.exampleLabel}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.result}>
          <p className={styles.totalLabel}>{copy.totalLabel}</p>
          <p className={styles.total} data-sign={displayTotal < 0 ? "loss" : "gain"}>
            {signed(displayTotal)}
          </p>
          <p className={styles.asTraded}>
            {takenOut.length > 0 ? (
              <>
                {copy.asTraded} <s>{signed(asTraded)}</s>
              </>
            ) : null}
          </p>
          <p className={styles.sentence}>
            <span className={styles.needsScript}>{sentence}</span>
            <span className={styles.withoutScript}>{copy.noScriptPrompt}</span>
          </p>

          <Chart trades={replay.trades} largest={largest} copy={copy} highlighted={highlighted} />
          <p className={styles.caption}>{copy.chartCaption}</p>
        </div>

        <div className={styles.controls}>
          <ul className={styles.habits}>
            {ranking.map(({ habit, cost }) => {
              const words = copy.habits[habit];
              const out = takenOut.includes(habit);
              return (
                <li
                  key={habit}
                  className={styles.habit}
                  data-out={out || undefined}
                  onMouseEnter={() => setHighlighted(habit)}
                  onMouseLeave={() => setHighlighted(null)}
                >
                  <span className={styles.key} aria-hidden="true">
                    {words.key}
                  </span>
                  <span className={styles.habitName}>{words.name}</span>
                  <span className={styles.cost}>cost {formatMoney(cost)}</span>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.needsScript}`}
                    onClick={() => toggle(habit)}
                    onFocus={() => setHighlighted(habit)}
                    onBlur={() => setHighlighted(null)}
                  >
                    {out ? copy.putBack : copy.takeOut}
                    <span className="sr-only"> {words.phrase}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className={styles.footnote}>{copy.footnote}</p>
          <button
            type="button"
            className={`${styles.reset} ${styles.needsScript}`}
            onClick={() => apply([])}
            disabled={takenOut.length === 0}
          >
            {copy.reset}
          </button>
        </div>
      </div>

      <details className={styles.trades}>
        <summary>{copy.tradesSummary}</summary>
        <TradeTable trades={replay.trades} copy={copy} />
      </details>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </figure>
  );
}

interface ChartProps {
  trades: ReplayedTrade[];
  largest: number;
  copy: HindsightDemoCopy;
  highlighted: HabitId | null;
}

/** Bars around a zero line. The table below carries the same data for screen readers. */
function Chart({ trades, largest, copy, highlighted }: ChartProps) {
  // Half the chart is above the zero line and half below; leave a little headroom.
  const height = (pnl: number) => `${(Math.abs(pnl) / largest) * 46}%`;
  return (
    <div className={styles.chart} aria-hidden="true">
      {trades.map(({ trade, takenOut }) => {
        const side = trade.pnl < 0 ? "loss" : "gain";
        return (
          <div
            key={trade.id}
            className={styles.column}
            data-flagged={(highlighted && trade.habits.includes(highlighted)) || undefined}
          >
            <div className={styles.plot}>
              <span
                className={takenOut ? styles.ghost : styles.bar}
                data-side={side}
                style={{ "--bar": height(trade.pnl) } as CSSProperties}
              />
            </div>
            <span className={styles.day}>{trade.day}</span>
            <span className={styles.tags}>
              {trade.habits.map((habit) => copy.habits[habit].key).join("")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TradeTable({ trades, copy }: { trades: ReplayedTrade[]; copy: HindsightDemoCopy }) {
  const { table } = copy;
  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{table.day}</th>
            <th scope="col">{table.pair}</th>
            <th scope="col">{table.habits}</th>
            <th scope="col" className={styles.number}>
              {table.pnl}
            </th>
            <th scope="col" className={styles.number}>
              {table.replayed}
            </th>
          </tr>
        </thead>
        <tbody>
          {trades.map(({ trade, takenOut }) => (
            <tr key={trade.id} data-taken-out={takenOut || undefined}>
              <td>{trade.day}</td>
              <td>{trade.instrument}</td>
              <td>
                {trade.habits.length
                  ? trade.habits.map((habit) => copy.habits[habit].name).join(", ")
                  : table.none}
              </td>
              <td className={styles.number}>{signed(trade.pnl)}</td>
              <td className={styles.number}>{takenOut ? table.removed : signed(trade.pnl)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
