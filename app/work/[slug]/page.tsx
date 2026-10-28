import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNextProject, getProject, getProjects, type Chapter, type Row } from "@/lib/content";
import Picture from "@/components/Picture";
import FigureBlock from "@/components/FigureBlock";
import LogoToggle from "@/components/LogoToggle";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: project.cover.exists ? [{ url: project.cover.src, alt: project.cover.alt }] : undefined,
    },
  };
}

function ChapterHead({ chapter }: { chapter: Chapter }) {
  return (
    <>
      <p className="label">
        {chapter.number} · {chapter.eyebrow}
      </p>
      <h2 className="chapter__title">{chapter.title}</h2>
    </>
  );
}

function RowView({ row, chapter, project }: { row: Row; chapter: Chapter; project: NonNullable<ReturnType<typeof getProject>> }) {
  switch (row.kind) {
    case "figure":
      return <FigureBlock figure={row.figure} />;
    case "widget":
      return row.name === "logo-toggle" && project.logoLight && project.logoDark ? (
        <LogoToggle light={project.logoLight} dark={project.logoDark} />
      ) : null;
    case "side":
      return (
        <div className="row row--side">
          <div>
            <ChapterHead chapter={chapter} />
            <div className="prose" dangerouslySetInnerHTML={{ __html: row.bodyHtml }} />
          </div>
          {row.figure && <FigureBlock figure={row.figure} />}
        </div>
      );
    default:
      return (
        <div className={`row row--${row.kind}`}>
          {(row.chapterHead || row.headHtml || row.kind === "split") && (
            <div className="row__head">
              {row.chapterHead && <ChapterHead chapter={chapter} />}
              {row.headHtml && <div className="beat__title" dangerouslySetInnerHTML={{ __html: row.headHtml }} />}
            </div>
          )}
          {row.bodyHtml && <div className="prose" dangerouslySetInnerHTML={{ __html: row.bodyHtml }} />}
        </div>
      );
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  return (
    <article className="project">
      <header className="project__header">
        <Link href="/" className="back-link">
          <span aria-hidden="true">←</span> All work
        </Link>
        <p className="label">{project.label}</p>
        <h1 className="project__title">{project.title}</h1>
        {project.hook && <p className="project__hook">{project.hook}</p>}
        {project.summary && <p className="project__summary">{project.summary}</p>}
        {project.links.length > 0 && (
          <ul className="project__links">
            {project.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="project__hero">
          <Picture image={project.cover} label="Hero image" eager sizes="(min-width: 1440px) 1044px, (min-width: 1024px) 75vw, 100vw" />
        </div>
        <dl className="facts">
          {project.facts.map((fact) => (
            <div key={fact.label} className="facts__item">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {project.chapters.map((chapter) => (
        <section key={chapter.number} className="chapter" aria-label={`${chapter.number} ${chapter.eyebrow}: ${chapter.title}`}>
          {chapter.rows.map((row, i) => (
            <RowView key={i} row={row} chapter={chapter} project={project} />
          ))}
        </section>
      ))}

      {project.sourcesHtml && (
        <section className="sources" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="side-label">
            Sources
          </h2>
          <div dangerouslySetInnerHTML={{ __html: project.sourcesHtml }} />
        </section>
      )}

      <nav className="next-project" aria-label="Next project">
        <p className="side-label">Next project</p>
        <Link href={`/work/${next.slug}`} className="next-project__link">
          {next.title} <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </article>
  );
}
