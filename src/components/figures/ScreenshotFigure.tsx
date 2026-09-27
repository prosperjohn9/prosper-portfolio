import Image from "next/image";
import { figureId, type Screenshot } from "@/domain/screenshot";

interface ScreenshotFigureProps {
  shot: Screenshot;
  /** How wide the figure is shown, for the browser to pick an image size. */
  sizes: string;
}

/**
 * A lettered screenshot mounted on the night plate in both themes. Selecting it
 * opens the original at full size.
 */
export function ScreenshotFigure({ shot, sizes }: ScreenshotFigureProps) {
  return (
    <figure id={figureId(shot.letter)} className="m-0 scroll-mt-6">
      {/* The link is named by the image's description, then what selecting it does. */}
      <a href={shot.image.src} className="plate">
        <Image
          src={shot.image}
          alt={shot.alt}
          sizes={sizes}
          placeholder={shot.image.blurDataURL ? "blur" : "empty"}
          className="block h-auto w-full"
        />
        <span className="sr-only">(opens the screenshot at full size)</span>
      </a>
      <figcaption className="t-small mt-2.5 max-w-[42rem] text-graphite">
        <strong className="font-semibold text-ink">
          {shot.letter}. {shot.title}
        </strong>{" "}
        {shot.caption}
      </figcaption>
    </figure>
  );
}
