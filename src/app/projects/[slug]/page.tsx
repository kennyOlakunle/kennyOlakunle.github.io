import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { MarkdownContent } from "@/components/markdown-content";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: absoluteUrl(`/projects/${project.slug}`)
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: absoluteUrl(`/projects/${project.slug}`),
      type: "article"
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="section-block page-intro">
      <div className="shell narrow-shell">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: project.title,
            description: project.description,
            codeRepository: project.repoUrl,
            url: absoluteUrl(`/projects/${project.slug}`)
          }}
        />
        <p className="eyebrow">{project.role}</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>
        <div className="detail-meta">
          <span>{project.year}</span>
          <span>{project.status}</span>
          <span>{project.visibility === "private" ? "Private case study" : "Public documentation"}</span>
        </div>
        <ul className="tag-list detail-tags">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="button-row">
          {project.repoUrl ? (
            <Link href={project.repoUrl} className="primary-button" target="_blank">
              View repository
            </Link>
          ) : null}
          {project.documentUrl ? (
            <Link href={project.documentUrl} className="secondary-button" target="_blank">
              Open source document
            </Link>
          ) : null}
        </div>
        <MarkdownContent content={project.content} />
      </div>
    </section>
  );
}
