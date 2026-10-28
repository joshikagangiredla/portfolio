import type { Figure } from "@/lib/content";
import Picture from "./Picture";

// One or more images with an optional caption. Images show at their own size,
// up to the full width of the page, so small screenshots aren't blown up.
export default function FigureBlock({ figure }: { figure: Figure }) {
  return (
    <figure className="figure">
      <div className="figure__images">
        {figure.images.map((image) => (
          <div key={image.src} className="figure__image" style={image.exists ? { maxWidth: image.width } : undefined}>
            <Picture image={image} sizes="(min-width: 1440px) 1044px, (min-width: 1024px) 75vw, 100vw" />
          </div>
        ))}
      </div>
      {figure.caption && <figcaption>{figure.caption}</figcaption>}
    </figure>
  );
}
