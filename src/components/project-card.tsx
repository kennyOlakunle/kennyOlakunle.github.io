import Link from "next/link";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="card-topline">
        <span>{project.year}</span>
        <span>{project.visibility === "private" ? "Private build" : "Public repo"}</span>
      </div>
      <div className="project-body">
        <div>
          <p className="eyebrow">{project.role}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <ul className="tag-list" aria-label={`${project.title} technology stack`}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="card-actions">
        <Link href={`/projects/${project.slug}`} className="text-link">
          Read case study
        </Link>
        {project.repoUrl ? (
          <Link href={project.repoUrl} target="_blank" className="text-link muted-link">
            Repository
          </Link>
        ) : null}
      </div>
    </article>
  );
}
