export const SWEEP_SESSION_KEY = "marker-swept";
/** Below this width, receipts sit under the text and open when their number is tapped. */
export const NARROW_QUERY = "(max-width: 999px)";
/** Long enough for the last claim's stroke to finish (see Claim's sweep timing). */
const SWEEP_CLEANUP_MS = 3000;

/**
 * Runs in <head> before first paint, with no dependencies:
 *
 * - adds `js` to <html>, so phones hide receipts only when they can be reopened;
 * - plays the marker sweep once per visit, never with reduced motion, and sets
 *   the class before paint so the highlights never flash in and out;
 * - on narrow screens, turns each receipt number into a toggle for its note.
 *   A number cited again further down, after its note, stays a link that jumps
 *   up to the note and leaves it open. Without JavaScript the numbers stay
 *   plain links and every note stays visible.
 */
export const enhanceScript = `(function () {
  var root = document.documentElement;
  if (root.hasAttribute("data-enhanced")) return;
  root.setAttribute("data-enhanced", "");
  root.classList.add("js");

  try {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && !sessionStorage.getItem(${JSON.stringify(SWEEP_SESSION_KEY)})) {
      sessionStorage.setItem(${JSON.stringify(SWEEP_SESSION_KEY)}, "1");
      root.classList.add("sweep");
      setTimeout(function () { root.classList.remove("sweep"); }, ${SWEEP_CLEANUP_MS});
    }
  } catch (e) {}

  var narrow = window.matchMedia(${JSON.stringify(NARROW_QUERY)});
  function citeFrom(node) {
    return node && node.closest ? node.closest("[data-cite]") : null;
  }
  function noteFor(cite) {
    return document.getElementById((cite.getAttribute("href") || "").slice(1));
  }
  // A note opens in place under the text that first cites it, which comes before it.
  function opensInPlace(cite, note) {
    return !!note && (cite.compareDocumentPosition(note) & 4) !== 0;
  }
  function sync(cite) {
    var note = noteFor(cite);
    if (narrow.matches && opensInPlace(cite, note)) {
      cite.setAttribute("aria-controls", note.id);
      cite.setAttribute("aria-expanded", String(note.classList.contains("is-open")));
    } else {
      cite.removeAttribute("aria-controls");
      cite.removeAttribute("aria-expanded");
    }
  }
  function syncAll() {
    var cites = document.querySelectorAll("[data-cite]");
    for (var i = 0; i < cites.length; i++) sync(cites[i]);
  }

  document.addEventListener("DOMContentLoaded", syncAll);
  if (narrow.addEventListener) narrow.addEventListener("change", syncAll);
  // Pages reached by client-side navigation sync when a number first gets focus.
  document.addEventListener("focusin", function (event) {
    var cite = citeFrom(event.target);
    if (cite) sync(cite);
  });
  document.addEventListener("click", function (event) {
    var cite = citeFrom(event.target);
    if (!cite || !narrow.matches) return;
    var note = noteFor(cite);
    if (!note) return;
    if (!opensInPlace(cite, note)) {
      // Follow the link up to the note, and keep it open once the reader is there.
      note.classList.add("is-open");
      syncAll();
      return;
    }
    event.preventDefault();
    note.classList.toggle("is-open");
    sync(cite);
  });
})();`;
