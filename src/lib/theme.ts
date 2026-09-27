export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

/**
 * Runs in <head> before first paint, so the page never flashes the wrong theme.
 * A ?theme=dark|light override wins for that page view only (used for
 * screenshots); otherwise a theme the visitor picked earlier; otherwise nothing
 * is set and CSS follows the device setting. Kept dependency-free ES5 because
 * it runs before any bundle loads.
 */
export const themeScript = `(function () {
  var theme = null;
  try { theme = new URLSearchParams(location.search).get("theme"); } catch (e) {}
  if (theme !== "dark" && theme !== "light") {
    try { theme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch (e) { theme = null; }
  }
  if (theme === "dark" || theme === "light") {
    document.documentElement.setAttribute("data-theme", theme);
  }
})();`;
