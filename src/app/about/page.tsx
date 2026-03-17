import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Kehinde Abe, a data engineer building pipelines, ML systems, and data products.",
  alternates: {
    canonical: absoluteUrl("/about")
  }
};

const principles = [
  "Start from the user need, then work backward to the architecture.",
  "Prefer systems that are observable, documented, and easy for others to extend.",
  "Treat content and discoverability as product features, not afterthoughts."
];

export default function AboutPage() {
  return (
    <section className="section-block page-intro">
      <div className="shell narrow-shell">
        <p className="eyebrow">About</p>
        <h1>Data engineering across pipelines, machine learning, and modern delivery.</h1>
        <p className="lead">
          I enjoy building systems that connect technical depth with real outcomes: data pipelines that
          automate workflows, orchestration that keeps them reliable, and ML experiments that become usable
          tools for real people.
        </p>
        <div className="rich-panel">
          <h2>What I optimize for</h2>
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
