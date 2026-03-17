import Link from "next/link";
import { navLinks } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link href="/" className="brand-mark" aria-label="Kehinde Abe home">
          <span className="brand-kicker">KA</span>
          <span className="brand-copy">
            <strong>Kehinde Abe</strong>
            <small>Software Engineer</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
