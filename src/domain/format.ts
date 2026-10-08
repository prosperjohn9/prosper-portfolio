const counts = new Intl.NumberFormat("en-GB");

/** 116641 becomes "116,641". */
export const formatCount = (value: number): string => counts.format(value);

const MINUS = "\u2212";
const wholeDollars = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const dollarsAndCents = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * -610 becomes "−$610" with a true minus sign; with `signed`, 60 becomes "+$60".
 * Cents are shown only when there are some.
 */
export function formatMoney(value: number, { signed = false } = {}): string {
  const amount = Math.abs(value);
  const digits = Number.isInteger(amount) ? wholeDollars : dollarsAndCents;
  const sign = value < 0 ? MINUS : signed && value > 0 ? "+" : "";
  return `${sign}$${digits.format(amount)}`;
}

/** Rounds to the nearest step: approximately(50465, 500) is 50500. */
export const approximately = (value: number, step: number): number =>
  Math.round(value / step) * step;

// Fixed names, so server and browser always print the same thing.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-02" becomes "Feb 2026". */
export function formatMonth(isoMonth: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(isoMonth);
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined;
  if (!match || !month) throw new Error(`Expected a YYYY-MM month, got "${isoMonth}".`);
  return `${month} ${match[1]}`;
}

/** "2026-09-27" becomes "27 Sep 2026". */
export function formatDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined;
  if (!match || !month) throw new Error(`Expected a YYYY-MM-DD date, got "${isoDate}".`);
  return `${Number(match[3])} ${month} ${match[1]}`;
}
