const counts = new Intl.NumberFormat("en-GB");

/** 116641 becomes "116,641". */
export const formatCount = (value: number): string => counts.format(value);

/** Rounds to the nearest step: approximately(50465, 500) is 50500. */
export const approximately = (value: number, step: number): number =>
  Math.round(value / step) * step;

// Fixed names, so server and browser always print the same thing.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-09-27" becomes "27 Sep 2026". */
export function formatDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined;
  if (!match || !month) throw new Error(`Expected a YYYY-MM-DD date, got "${isoDate}".`);
  return `${Number(match[3])} ${month} ${match[1]}`;
}
