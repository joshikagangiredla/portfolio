import Image from "next/image";
import type { SiteImage } from "@/lib/content";

// Shows an image, or a labeled placeholder box if the file hasn't been added to /public yet.
export default function Picture({
  image,
  label = "Image",
  sizes,
  eager = false,
  fill = false,
  className,
}: {
  image: SiteImage;
  label?: string;
  sizes: string;
  eager?: boolean;
  fill?: boolean;
  className?: string;
}) {
  if (!image.exists) {
    return (
      <div
        className={`placeholder ${className ?? ""}`}
        style={fill ? undefined : { aspectRatio: `${image.width} / ${image.height}` }}
        role="img"
        aria-label={image.alt || label}
      >
        <span aria-hidden="true">{label}</span>
      </div>
    );
  }
  return fill ? (
    <Image src={image.src} alt={image.alt} fill sizes={sizes} quality={90} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} className={className} />
  ) : (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      quality={90}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={className}
    />
  );
}
