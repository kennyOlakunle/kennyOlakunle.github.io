import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "src", "content");
const lastProjectSlug = "muano-transport-landing";

type BaseEntry = {
  slug: string;
  content: string;
};

export type Project = BaseEntry & {
  title: string;
  summary: string;
  description: string;
  year: string;
  role: string;
  status: string;
  featured: boolean;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  documentUrl?: string;
  visibility?: "public" | "private";
};

export type Post = BaseEntry & {
  title: string;
  description: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  readingTime: string;
  sourceName?: string;
  sourceUrl?: string;
};

function readCollection(collection: string) {
  const directory = path.join(contentRoot, collection);

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(directory, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(source);

      return {
        slug: file.replace(/\.md$/, ""),
        data,
        content
      };
    });
}

function countWords(text: string) {
  return text.trim().split(/\s+/).length;
}

function getReadingTime(text: string) {
  const minutes = Math.max(1, Math.round(countWords(text) / 200));
  return `${minutes} min read`;
}

export function getAllProjects(): Project[] {
  return readCollection("projects")
    .map(({ slug, data, content }) => {
      const visibility: Project["visibility"] = data.visibility === "private" ? "private" : "public";

      return {
        slug,
        content,
        title: String(data.title),
        summary: String(data.summary),
        description: String(data.description),
        year: String(data.year),
        role: String(data.role),
        status: String(data.status),
        featured: Boolean(data.featured),
        stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
        repoUrl: data.repoUrl ? String(data.repoUrl) : undefined,
        liveUrl: data.liveUrl ? String(data.liveUrl) : undefined,
        documentUrl: data.documentUrl ? String(data.documentUrl) : undefined,
        visibility
      };
    })
    .sort((left, right) => {
      if (left.slug === lastProjectSlug) {
        return 1;
      }

      if (right.slug === lastProjectSlug) {
        return -1;
      }

      return Number(right.year) - Number(left.year);
    });
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return getAllProjects().filter((project) => project.featured);
}

export function getAllPosts(): Post[] {
  return readCollection("blog")
    .map(({ slug, data, content }) => ({
      slug,
      content,
      title: String(data.title),
      description: String(data.description),
      publishedAt: String(data.publishedAt),
      featured: Boolean(data.featured),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTime: getReadingTime(content),
      sourceName: data.sourceName ? String(data.sourceName) : undefined,
      sourceUrl: data.sourceUrl ? String(data.sourceUrl) : undefined
    }))
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured);
}
