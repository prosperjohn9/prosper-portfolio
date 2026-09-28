// How wide figures are shown, so the browser downloads the smallest image that is sharp.

/** A figure across the whole content width. */
export const FULL_WIDTH =
  "(min-width: 1088px) 1008px, (min-width: 720px) calc(100vw - 80px), 100vw";

/** One of two figures side by side. */
export const HALF_WIDTH = "(min-width: 1088px) 490px, (min-width: 768px) calc(50vw - 54px), 100vw";
