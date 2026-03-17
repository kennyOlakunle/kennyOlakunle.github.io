import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project case studies by Kehinde Abe across pipelines, orchestration, analytics, and machine learning.",
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
          <h1>Case studies across pipelines, orchestration, and applied machine learning.</h1>
          <p>
            These cards open into fuller documentation so visitors can move from fast scanning to technical
            depth on ingestion patterns, transformations, storage choices, and delivery decisions.
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
