import { getProjects, getSite } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import Bio from "@/components/Bio";

// The landing page is the Work page: one grid of every project.
export default function WorkPage() {
  const projects = getProjects();
  const site = getSite();
  return (
    <div className="work">
      <h1 className="visually-hidden">Work</h1>
      <Bio site={site} className="work__intro" />
      <ul className="work__grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} eager={i < 2} />
        ))}
      </ul>
    </div>
  );
}
