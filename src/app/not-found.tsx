import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-block page-intro">
      <div className="shell narrow-shell">
        <p className="eyebrow">404</p>
        <h1>That page could not be found.</h1>
        <p className="lead">Try the project archive or head back to the homepage.</p>
        <div className="button-row">
          <Link href="/" className="primary-button">
            Go home
          </Link>
          <Link href="/projects" className="secondary-button">
            Browse projects
          </Link>
        </div>
      </div>
    </section>
  );
}
