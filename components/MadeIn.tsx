import type { Site } from "@/lib/content";

export default function MadeIn({ site }: { site: Site }) {
  return (
    <div className="made-in">
      <p className="made-in__line">
        {site.madeIn} <span aria-hidden="true">•</span> {site.year}
      </p>
      <p className="made-in__place">{site.location}</p>
    </div>
  );
}
