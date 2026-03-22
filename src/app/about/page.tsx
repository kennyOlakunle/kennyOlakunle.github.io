import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Kehinde Abe, a data engineer building pipelines, orchestration workflows, and analytics-ready data systems.",
  alternates: {
    canonical: absoluteUrl("/about")
  }
};

const principles = [
  "Design ingestion and transformation workflows that are reliable, observable, and easy to extend.",
  "Model data so it stays useful for warehousing, reporting, analytics, and downstream consumers.",
  "Use Python, SQL, and orchestration tools to turn raw inputs into dependable data products."
];

export default function AboutPage() {
  return (
    <section className="section-block page-intro">
      <div className="shell narrow-shell">
        <p className="eyebrow">About</p>
        <h1>Data engineering across pipelines, orchestration, and analytics delivery.</h1>
        <p className="lead">
          I build data systems that move information from raw source data to reliable, analytics-ready
          outputs. My focus is on ingestion, transformation, orchestration, and modeling that help teams
          work with data they can trust.
        </p>
        <p>
          I enjoy the engineering side of data work: designing ETL and ELT workflows, structuring warehouse-
          friendly datasets, and building pipelines that are maintainable as requirements grow. The goal is
          always the same: turn messy inputs into clean, dependable systems for reporting, operations, and
          machine learning.
        </p>
        <div className="rich-panel">
          <h2>What I focus on</h2>
          <ul className="strength-list">
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="contact-panel">
          <div>
            <p className="eyebrow">Based in</p>
            <strong>{siteConfig.location}</strong>
          </div>
          <div>
            <p className="eyebrow">Find me on</p>
            <div className="inline-links">
              <Link href={siteConfig.linkedin} target="_blank">
                LinkedIn
              </Link>
              <Link href={siteConfig.github} target="_blank">
                GitHub
              </Link>
              <Link href={siteConfig.devto} target="_blank">
                DEV
              </Link>
              <Link href={`mailto:${siteConfig.email}`}>Email</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
