export const siteConfig = {
  name: "Kehinde Abe",
  title: "Kehinde Abe | Software Engineer Portfolio",
  description:
    "Software engineer building data products, machine learning systems, and modern web experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: "England, United Kingdom",
  email: "olakunlemuyiwa@gmail.com",
  github: "https://github.com/kennyOlakunle",
  devto: "https://dev.to/kehinde_abe_5408cc71d4fc04"
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
