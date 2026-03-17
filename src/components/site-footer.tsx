import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: siteConfig.github, label: "GitHub" },
  { href: siteConfig.devto, label: "DEV" },
  { href: `mailto:${siteConfig.email}`, label: "Email" }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-shell">
        <div>
          <p className="eyebrow">Open to meaningful software work</p>
          <h2>Let&apos;s build something useful and durable.</h2>
        </div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
