// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { THEME_STORAGE_KEY, themeScript } from "@/lib/theme";

// Executes the exact string that ships in <head>.
const runThemeScript = () => new Function(themeScript)();

function visit(search: string) {
  window.history.replaceState(null, "", `/${search}`);
}

const appliedTheme = () => document.documentElement.getAttribute("data-theme");

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  localStorage.clear();
  vi.restoreAllMocks();
  visit("");
});

describe("themeScript", () => {
  it("leaves the theme to the device setting when nothing was picked", () => {
    runThemeScript();
    expect(appliedTheme()).toBeNull();
  });

  it("applies the theme the visitor picked earlier", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    runThemeScript();
    expect(appliedTheme()).toBe("dark");
  });

  it("lets a ?theme= override win over the saved theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    visit("?theme=light");
    runThemeScript();
    expect(appliedTheme()).toBe("light");
  });

  it("does not save the ?theme= override", () => {
    visit("?theme=dark");
    runThemeScript();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it("ignores values that are not a theme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");
    visit("?theme=<script>");
    runThemeScript();
    expect(appliedTheme()).toBeNull();
  });

  it("still loads when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(runThemeScript).not.toThrow();
    expect(appliedTheme()).toBeNull();
  });
});
