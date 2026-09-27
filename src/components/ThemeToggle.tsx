"use client";

import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function currentTheme(): Theme {
  const picked = document.documentElement.getAttribute("data-theme");
  if (picked === "dark" || picked === "light") return picked;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// The label comes from CSS (`dark:`), so the server HTML is already right for
// the visitor's theme and nothing changes on hydration.
export function ThemeToggle() {
  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the theme still applies for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="min-h-9 cursor-pointer whitespace-nowrap rounded-[4px] border border-rule px-3 text-[0.9375rem] hover:border-ink"
    >
      {/* On narrow phones only "Dark"/"Light" shows; " theme" stays in the accessible name. */}
      <span className="dark:hidden">
        Dark<span className="max-[480px]:sr-only"> theme</span>
      </span>
      <span className="hidden dark:inline">
        Light<span className="max-[480px]:sr-only"> theme</span>
      </span>
    </button>
  );
}
