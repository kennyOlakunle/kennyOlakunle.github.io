import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const strengths = [
  "Data pipelines and backend services that stay observable under load",
  "Machine learning projects translated into usable product experiences",
  "Marketing and product websites that feel polished, fast, and conversion-minded"
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
          jobTitle: "Software Engineer",
          description: siteConfig.description,
          email: siteConfig.email,
          url: absoluteUrl("/"),
          sameAs: [siteConfig.github, siteConfig.devto]
        }}
      />
      <section className="hero">
        <div className="shell hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">Software engineer with a data and product mindset</p>
            <h1>I build software that turns ideas into usable, measurable systems.</h1>
            <p className="hero-text">
              From ETL workflows and ML prototypes to responsive web experiences, I focus on products that
              are clear to use, resilient to ship, and easy to grow.
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
              <strong>Data systems, ML tools, and conversion-focused websites</strong>
            </div>
            <div>
              <span className="panel-label">Approach</span>
              <strong>Case-study thinking, accessible frontend craft, and pragmatic engineering</strong>
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
            <strong>{featuredProjects.length} highlighted case studies</strong>
          </div>
          <div>
            <span>Writing system</span>
            <strong>Markdown-powered blog with RSS, sitemap, and metadata</strong>
          </div>
          <div>
            <span>Built for scale</span>
            <strong>Static-first Next.js structure ready for high traffic</strong>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Selected projects</p>
            <h2>Project cards that open into full build stories.</h2>
            <p>
              Inspired by high-performing engineer portfolios, each card gives a quick read while the case
              study page opens the fuller documentation behind the work.
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
            <h2>Built to be readable by users, recruiters, and search engines.</h2>
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
            <h2>A blog setup ready for technical articles and long-form thinking.</h2>
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
