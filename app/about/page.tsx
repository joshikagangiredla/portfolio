import type { Metadata } from "next";
import { getAbout } from "@/lib/content";
import Picture from "@/components/Picture";

export function generateMetadata(): Metadata {
  const about = getAbout();
  return { title: about.seo.title, description: about.seo.description, alternates: { canonical: "/about" } };
}

export default function AboutPage() {
  const about = getAbout();
  return (
    <div className="about">
      <div className="about__photos" tabIndex={0} role="region" aria-label="Photos of Joshika">
        {about.photos.map((photo, i) => (
          <div key={i} className="about__photo">
            <Picture image={{ ...photo, width: 195, height: 260 }} label="Photo" fill sizes="200px" eager={i < 3} />
          </div>
        ))}
      </div>
      <div className="about__content">
        <div className="about__main">
          <p className="label">{about.label}</p>
          <h1 className="about__statement">{about.statement}</h1>
          <div className="about__body" dangerouslySetInnerHTML={{ __html: about.bodyHtml }} />
        </div>
        <div className="about__side">
          <section aria-labelledby="focus-heading">
            <h2 id="focus-heading" className="side-label">Focus</h2>
            <ul>{about.focus.map((f) => <li key={f}>{f}</li>)}</ul>
          </section>
          <section aria-labelledby="toolkit-heading">
            <h2 id="toolkit-heading" className="side-label">Toolkit</h2>
            <ul>{about.toolkit.map((t) => <li key={t}>{t}</li>)}</ul>
          </section>
        </div>
      </div>
    </div>
  );
}
