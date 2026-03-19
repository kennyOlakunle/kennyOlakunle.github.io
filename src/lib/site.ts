export const siteConfig = {
  name: "Kehinde Abe",
  title: "Kehinde Abe | Data Engineer Portfolio",
  description:
    "Data engineer building reliable pipelines, machine learning systems, and modern data products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kennyolakunle.github.io",
  location: "England, United Kingdom",
  email: "kehindeoabe@gmail.com",
  github: "https://github.com/kennyOlakunle",
  devto: "https://dev.to/_ken0x"
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
];

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}
