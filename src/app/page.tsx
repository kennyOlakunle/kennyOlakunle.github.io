import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const strengths = [
  "Batch and scheduled pipelines that stay observable under load",
  "Warehouse-ready data models designed for reporting and downstream analytics",
  "Machine learning projects translated into usable tools with production-minded delivery"
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const featuredPosts = getFeaturedPosts().slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          jobTitle: "Data Engineer",
          description: siteConfig.description,
          email: siteConfig.email,
          url: absoluteUrl("/"),
          sameAs: [siteConfig.github, siteConfig.devto, siteConfig.linkedin]
        }}
      />
      <section className="hero">
        <div className="shell hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">Data engineer with a product mindset</p>
            <h1>I build data platforms that turn raw events into trusted, analytics-ready decision systems.</h1>
            <p className="hero-text">
              From ETL workflows and orchestration to warehouse-friendly modeling and ML prototypes, I focus
              on systems that are observable, resilient, and easy to grow.
            </p>
            <div className="button-row">
              <Link href="/projects" className="primary-button">
                Explore projects
              </Link>
              <Link href="/blog" className="secondary-button">
                Read the blog
              </Link>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Highlights">
            <div>
              <span className="panel-label">Now building</span>
              <strong>Ingestion pipelines, orchestration workflows, and analytics-ready data products</strong>
            </div>
            <div>
              <span className="panel-label">Approach</span>
              <strong>Case-study thinking, warehouse-aware modeling, and pragmatic data engineering</strong>
            </div>
            <div>
              <span className="panel-label">Publishing</span>
              <strong>Articles designed for search, sharing, and repeat discovery</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="signal-strip">
        <div className="shell signal-grid">
          <div>
            <span>Featured work</span>
            <strong>{featuredProjects.length} case studies across ingestion, transformation, and ML workflows</strong>
          </div>
          <div>
            <span>Writing system</span>
            <strong>Markdown-powered blog for pipelines, platform thinking, and technical depth</strong>
          </div>
          <div>
            <span>Built for scale</span>
            <strong>Static-first publishing stack ready for search traffic and technical content growth</strong>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Selected projects</p>
            <h2>Projects centered on data ingestion, orchestration, and analytics thinking.</h2>
            <p>
              Each card gives a fast overview, while the case study page opens the technical details behind
              the pipeline design, modeling decisions, and operational trade-offs.
            </p>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block muted-section">
        <div className="shell two-column">
          <div className="section-heading compact-heading">
            <p className="eyebrow">How I work</p>
            <h2>Built to be readable by hiring teams, collaborators, and search engines.</h2>
          </div>
          <ul className="strength-list">
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Latest writing</p>
            <h2>A blog setup ready for data engineering articles and long-form thinking.</h2>
          </div>
          <div className="post-grid">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
