import Link from "next/link";
import type { Site } from "@/lib/content";
import Asterisk from "./Asterisk";
import PhoneMenu from "./PhoneMenu";

export default function TopBar({ site }: { site: Site }) {
  return (
    <header className="topbar">
      <Link href="/" className="topbar__home" aria-label={`${site.name}, home`}>
        <Asterisk />
        <span className="topbar__wordmark wordmark" aria-hidden="true">
          {site.name}
        </span>
      </Link>
      <nav aria-label="Main" className="topbar__nav">
        <Link href="/about">About</Link>
        <Link href="/">Work</Link>
      </nav>
      <PhoneMenu />
    </header>
  );
}
