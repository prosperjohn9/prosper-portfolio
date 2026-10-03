import grid from "@/assets/isi-lens/grid.jpg";
import room from "@/assets/isi-lens/room.jpg";
import studio from "@/assets/isi-lens/studio.png";
import type { Screenshot } from "@/domain/screenshot";

/** Screenshots of Isi Lens, lettered in the order they appear on its case study. */
export const screenshots = {
  room: {
    letter: "A",
    image: room,
    alt: "The Jersey August 2026 collection as a 3D gallery: a white room with framed photos of Jersey along both walls, a spotlight above each one and benches down the middle.",
    title: "The 3D gallery.",
    caption: "Jersey August 2026, in the white room. From the live site.",
  },
  grid: {
    letter: "B",
    image: grid,
    alt: "The same collection as a grid of photos, under a note that the 3D room can't start because graphics acceleration is turned off, with the steps to turn it on.",
    title: "The grid.",
    caption: "The same collection with 3D switched off. From the live site.",
  },
  studio: {
    letter: "C",
    image: studio,
    alt: "Isi Lens Studio. On the left, the collections in their order, each with a drag handle. On the right, the Jersey August 2026 collection with its category, a choice of Dark room or White cube for its 3D gallery, and the first of its photographs.",
    title: "Her editor.",
    caption: "Collections in order, and a room picked for each one. Sanity Studio.",
  },
} satisfies Record<string, Screenshot>;
