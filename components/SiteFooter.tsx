import type { Site } from "@/lib/content";
import SocialLinks from "./SocialLinks";
import MadeIn from "./MadeIn";

// Tablet and phone only. On desktop these live in the sidebar.
export default function SiteFooter({ site }: { site: Site }) {
  return (
    <footer className="site-footer">
      <nav aria-label="Social links">
        <SocialLinks links={site.links} className="social-links social-links--footer" />
      </nav>
      <MadeIn site={site} />
    </footer>
  );
}
