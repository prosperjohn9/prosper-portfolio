import { useSyncExternalStore } from "react";
import { NARROW_QUERY } from "@/lib/enhance";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(NARROW_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * True on phones and small tablets, the widths where receipts sit under the
 * text. False on the server and in the first render, so hydration matches the
 * static HTML; React then re-renders with the real value.
 */
export function useNarrowScreen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(NARROW_QUERY).matches,
    () => false,
  );
}
