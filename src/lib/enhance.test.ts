// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { enhanceScript, NARROW_QUERY, SWEEP_SESSION_KEY } from "@/lib/enhance";

// jsdom has no layout, so media queries are answered by this switchboard.
const media = { narrow: false, reducedMotion: false };
const fakeWindow = {
  matchMedia: (query: string) => ({
    get matches() {
      if (query === NARROW_QUERY) return media.narrow;
      if (query === "(prefers-reduced-motion: reduce)") return media.reducedMotion;
      return false;
    },
    addEventListener: () => {},
  }),
};

const PAGE = `
  <p>A claim <a data-cite href="#receipt-a" id="cite">1</a></p>
  <ol><li id="receipt-a" class="note">Proof</li></ol>
  <p>The same proof again <a data-cite href="#receipt-a" id="again">1</a></p>`;

/** A fresh page load: a new document, then the shipped script, then DOMContentLoaded. */
function load(): Document {
  const page = document.implementation.createHTMLDocument("");
  page.body.innerHTML = PAGE; // fixed test markup
  new Function("document", "window", enhanceScript)(page, fakeWindow);
  page.dispatchEvent(new Event("DOMContentLoaded"));
  return page;
}

afterEach(() => {
  sessionStorage.clear();
  media.narrow = false;
  media.reducedMotion = false;
  vi.useRealTimers();
});

describe("the marker sweep", () => {
  const sweeping = (page: Document) => page.documentElement.classList.contains("sweep");

  it("marks the page as enhanced", () => {
    expect(load().documentElement.classList.contains("js")).toBe(true);
  });

  it("plays on the first page view of a visit", () => {
    expect(sweeping(load())).toBe(true);
    expect(sessionStorage.getItem(SWEEP_SESSION_KEY)).toBe("1");
  });

  it("does not replay later in the same visit", () => {
    load();
    expect(sweeping(load())).toBe(false);
  });

  it("never plays for people who ask for reduced motion", () => {
    media.reducedMotion = true;
    expect(sweeping(load())).toBe(false);
  });

  it("clears itself once the strokes have finished", () => {
    vi.useFakeTimers();
    const page = load();
    vi.advanceTimersByTime(3000);
    expect(sweeping(page)).toBe(false);
  });
});

describe("receipt numbers", () => {
  const parts = (page: Document) => ({
    cite: page.getElementById("cite")!,
    note: page.getElementById("receipt-a")!,
    click: () =>
      page
        .getElementById("cite")!
        .dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true })),
  });

  it("open and close their note in place on narrow screens", () => {
    media.narrow = true;
    const { cite, note, click } = parts(load());
    expect(cite.getAttribute("aria-expanded")).toBe("false");
    expect(click()).toBe(false); // the jump to the note is replaced by opening it
    expect(note.classList.contains("is-open")).toBe(true);
    expect(cite.getAttribute("aria-expanded")).toBe("true");
    expect(cite.getAttribute("aria-controls")).toBe("receipt-a");
    click();
    expect(note.classList.contains("is-open")).toBe(false);
    expect(cite.getAttribute("aria-expanded")).toBe("false");
  });

  it("stay plain links on wide screens, where notes sit in the margin", () => {
    const { cite, note, click } = parts(load());
    expect(click()).toBe(true);
    expect(note.classList.contains("is-open")).toBe(false);
    expect(cite.hasAttribute("aria-expanded")).toBe(false);
  });

  it("cited again below their note, jump up to it and leave it open", () => {
    media.narrow = true;
    const page = load();
    const again = page.getElementById("again")!;
    const note = page.getElementById("receipt-a")!;
    expect(again.hasAttribute("aria-expanded")).toBe(false);
    const followed = again.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
    expect(followed).toBe(true);
    expect(note.classList.contains("is-open")).toBe(true);
    // The number that opens the note in place now says it is open.
    expect(page.getElementById("cite")!.getAttribute("aria-expanded")).toBe("true");
  });

  it("register their handlers once, even if the script runs twice", () => {
    media.narrow = true;
    const page = load();
    new Function("document", "window", enhanceScript)(page, fakeWindow);
    const { note, click } = parts(page);
    click();
    expect(note.classList.contains("is-open")).toBe(true);
  });
});
