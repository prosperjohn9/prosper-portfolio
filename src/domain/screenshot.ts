/** A bundled image; matches the shape of a static image import. */
export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

/** A labelled screenshot that receipts can point to by its letter. */
export interface Screenshot {
  /** A, B, C… in the order the figures appear. */
  letter: string;
  image: ImageAsset;
  alt: string;
  title: string;
  caption: string;
}

/** The element id of a screenshot, so a receipt can link to it. */
export const figureId = (letter: string) => `figure-${letter.toLowerCase()}`;
