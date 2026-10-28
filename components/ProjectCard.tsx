import Link from "next/link";
import type { Project } from "@/lib/content";
import Picture from "./Picture";

export default function ProjectCard({ project, eager }: { project: Project; eager?: boolean }) {
  return (
    <li className="card">
      <Link href={`/work/${project.slug}`} className="card__link">
        <div className="card__image">
          <Picture image={project.thumbnail} label="Project image" fill eager={eager} sizes="(min-width: 1024px) 506px, (min-width: 640px) 50vw, 100vw" />
        </div>
        <div className="card__caption">
          <div>
            <h2 className="card__title">{project.title}</h2>
            <p className="card__meta">{project.card}</p>
          </div>
          <svg className="card__arrow" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M3 10h14M11.5 4.5L17 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </li>
  );
}
