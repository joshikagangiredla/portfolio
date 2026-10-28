import Link from "next/link";
import type { Site } from "@/lib/content";
import SocialLinks from "./SocialLinks";
import MadeIn from "./MadeIn";
import Bio from "./Bio";

// The fixed left column on desktop. On tablet and phone it's hidden; the same content
// appears as the intro on the Work page and in the footer.
export default function Sidebar({ site }: { site: Site }) {
  return (
    <aside className="sidebar" aria-label="About Joshika">
      <div className="sidebar__intro">
        <Link href="/" className="wordmark">
          {site.name}
        </Link>
        <Bio site={site} className="sidebar__bio" />
      </div>
      <nav aria-label="Social links" className="sidebar__links">
        <SocialLinks links={site.links} className="social-links" />
      </nav>
      <div className="sidebar__spacer" />
      <div className="sidebar__bottom">
        <MadeIn site={site} />
      </div>
    </aside>
  );
}
