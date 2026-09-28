import { useCallback, useEffect, useRef, useState } from "react";

const DURATION_MS = 520;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * A number that counts to each new value instead of jumping. With reduced
 * motion it jumps. A timer lands it on the exact value even when animation
 * frames are throttled, as in a background tab.
 */
export function useCountUp(initial: number): readonly [number, (target: number) => void] {
  const [value, setValue] = useState(initial);
  const shown = useRef(initial);
  const frame = useRef(0);
  const settle = useRef(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    window.clearTimeout(settle.current);
  }, []);
  useEffect(() => stop, [stop]);

  const countTo = useCallback(
    (target: number) => {
      stop();
      const show = (next: number) => {
        shown.current = next;
        setValue(next);
      };
      const from = shown.current;
      if (from === target || window.matchMedia(REDUCED_MOTION).matches) {
        show(target);
        return;
      }
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION_MS);
        const eased = 1 - (1 - progress) ** 3;
        show(progress < 1 ? from + (target - from) * eased : target);
        if (progress < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
      settle.current = window.setTimeout(() => {
        cancelAnimationFrame(frame.current);
        show(target);
      }, DURATION_MS + 60);
    },
    [stop],
  );

  return [value, countTo] as const;
}
