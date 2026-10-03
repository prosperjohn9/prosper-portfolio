import { mailto } from "@/domain/links";
import type { Project } from "@/domain/project";
import type { ReceiptId } from "@/content/receipts";
import { profile } from "@/content/profile";
import { screenshots } from "@/content/projects/isi-lens/screenshots";

const site = { text: "isilens.co.uk", href: "https://isilens.co.uk" };

export const isiLens = {
  slug: "isi-lens",
  name: "Isi Lens",
  period: "2026",
  summary:
    "A photography portfolio with a 3D gallery you walk through like a museum, and the brand identity and logo to go with it.",
  role: "Designer and developer, through HTA Studio",
  stack: ["Next.js 16", "TypeScript", "react-three-fiber", "Sanity", "Resend", "Tailwind CSS"],
  site,
  caseStudy: {
    description:
      "Isi Lens, a London photographer's portfolio where each shoot is a 3D gallery: what it does, how it is built and how it is kept safe. Every claim links to its proof.",
    lede: [
      "Isi Lens is the portfolio of a London photographer. ",
      { claim: "Each shoot is a 3D gallery you walk through", receipt: "isi-live-site" },
      ". I designed and built the site and its brand.",
    ],
    sections: [
      {
        id: "features",
        title: "What it does",
        blocks: [
          {
            kind: "features",
            items: [
              {
                name: "3D galleries",
                description: [
                  "Each collection is a room you walk through. You drag to look around, walk forward, and click a photo to read its plaque.",
                  { cite: "isi-screenshot-room" },
                ],
              },
              {
                name: "A grid when 3D can't run",
                description: [
                  "Phones and browsers without 3D get a clean grid of the same photos, with a short note.",
                  { cite: "isi-screenshot-grid" },
                ],
              },
              {
                name: "Her own editor",
                description: [
                  "She adds shoots, drags them into order and picks a dark or white room for each one. New work shows on the site within a minute, with no developer.",
                  { cite: "isi-studio" },
                ],
              },
              {
                name: "Booking enquiries",
                description: [
                  "The contact form sends each enquiry from the site's server to her inbox. Her reply goes straight to the client.",
                  { cite: "isi-contact-form" },
                ],
              },
              {
                name: "A business card page",
                description: [
                  "One link to save her contact, or reach her by phone, WhatsApp, email, Instagram or TikTok.",
                  { cite: "isi-card" },
                ],
              },
            ],
          },
          { kind: "figure-pair", shots: [screenshots.room, screenshots.grid] },
          { kind: "figure", shot: screenshots.studio },
        ],
      },
      {
        id: "built",
        title: "How it is built",
        blocks: [
          {
            kind: "intro",
            text: [
              "The site is Next.js 16 and TypeScript. Her work lives in Sanity, and the pages refresh from it every minute, so new work needs no deploy. The rooms are drawn in 3D with react-three-fiber. Enquiries are sent with Resend.",
            ],
          },
          {
            kind: "text",
            text: [
              "Every photo comes from Sanity's image service, ",
              { claim: "never more than 1,800 pixels wide", receipt: "isi-photo-sizes" },
              ". The full-size originals, up to 6,048 pixels wide, never reach a visitor.",
            ],
          },
          {
            kind: "text",
            text: [
              {
                claim: "Every page passes the WCAG AA contrast check",
                receipt: "isi-accessibility",
              },
              ". I also check by hand what the automated check can't see: text over photos and inside the 3D room.",
            ],
          },
        ],
      },
      {
        id: "security",
        title: "Security and checks",
        blocks: [
          {
            kind: "rules",
            rules: [
              {
                rule: "Pages load only what they should",
                reason: [
                  "A content security policy allows the site itself and Sanity's image service, nothing else. Camera, microphone, location, payment and USB are switched off.",
                  { cite: "isi-headers" },
                ],
              },
              {
                rule: "No other site can frame it",
                reason: [
                  "Framing is blocked on every page, so no one can wrap the site inside another to trick visitors.",
                ],
              },
              {
                rule: "The editor is kept apart",
                reason: ["It needs looser rules than the public pages, so it has its own policy."],
              },
              {
                rule: "Bots and floods are stopped",
                reason: ["The contact form traps bots and limits how often one visitor can send."],
              },
              {
                rule: "Every push is checked",
                reason: [
                  "GitHub Actions runs the type check, lint, 12 unit tests, the build and 4 browser tests. The browser tests open real pages and fail on any page error or blocked resource.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "walkthrough",
        title: "See how it is built, on a call",
        blocks: [
          {
            kind: "intro",
            text: [
              "The site is live, and the code is private. On a call I can show you how it is built: the 3D gallery, the editor and the checks.",
            ],
          },
          {
            kind: "actions",
            actions: [
              {
                label: "Ask how it is built",
                href: mailto(profile.email, "How Isi Lens is built"),
                primary: true,
              },
              { label: "Open isilens.co.uk", href: site.href },
            ],
          },
        ],
      },
    ],
  },
} satisfies Project<ReceiptId>;
