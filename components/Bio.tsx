import type { Site } from "@/lib/content";

export default function Bio({ site, className }: { site: Site; className?: string }) {
  return (
    <p className={`bio ${className ?? ""}`}>
      <em className="bio__lead">{site.bioLead}</em> {site.bio}
    </p>
  );
}
