import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/blog"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date()
  }));

  const projectPages = getAllProjects().map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(`${project.year}-12-31`)
  }));

  const postPages = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt)
  }));

  return [...pages, ...projectPages, ...postPages];
}
