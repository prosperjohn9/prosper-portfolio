# Fonts for the share images

The pages load Archivo through `next/font`. The share images (`opengraph-image.tsx`)
are drawn by `next/og`, which cannot read variable fonts, so these are two static
cuts of the same Archivo:

| File                         | Width | Weight | Used for                     |
| ---------------------------- | ----- | ------ | ---------------------------- |
| `Archivo-Wide-ExtraBold.ttf` | 118   | 800    | The name, titles and the tag |
| `Archivo-Regular.ttf`        | 100   | 400    | Everything else              |

Both were made with [fontTools](https://github.com/fonttools/fonttools): `varLib.instancer`
fixed the width and weight, and `subset` kept Latin letters, digits and punctuation.
Kerning was removed, because the image renderer adds a gap after commas and full
stops when a font has it.

Archivo is licensed under the SIL Open Font License 1.1. See `OFL.txt`.
