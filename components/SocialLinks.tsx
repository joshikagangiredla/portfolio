import type { ProjectLink } from "@/lib/content";

// Resume, LinkedIn, Email, Instagram, TikTok. A link without a URL shows as plain text until it's filled in.
export default function SocialLinks({ links, className }: { links: ProjectLink[]; className?: string }) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.label}>
          {link.url ? (
            <a href={link.url} {...(link.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {link.label}
            </a>
          ) : (
            <span>{link.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
