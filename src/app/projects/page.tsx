import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project case studies by Kehinde Abe across data engineering, ML, and frontend delivery.",
  alternates: {
    canonical: absoluteUrl("/projects")
  }
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <section className="section-block page-intro">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h1>Case studies, experiments, and shipped products.</h1>
          <p>
            These cards open into fuller documentation so visitors can move from fast scanning to technical
            depth without losing context.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
