import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentDirectory = path.join(root, "src", "content", "blog");
const publicDirectory = path.join(root, "public");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kennyolakunle.github.io";

const posts = fs
  .readdirSync(contentDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const source = fs.readFileSync(path.join(contentDirectory, file), "utf8");
    const { data } = matter(source);

    return {
      slug: file.replace(/\.md$/, ""),
      title: String(data.title),
      description: String(data.description),
      publishedAt: String(data.publishedAt)
    };
  })
  .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kehinde Abe | Data Engineer Portfolio</title>
    <description>Technical writing on data engineering, pipelines, machine learning, and growth.</description>
    <link>${siteUrl}</link>
    ${posts
      .map(
        (post) => `<item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${siteUrl}/blog/${post.slug}/</link>
      <guid>${siteUrl}/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>
`;

fs.mkdirSync(publicDirectory, { recursive: true });
fs.writeFileSync(path.join(publicDirectory, "feed.xml"), xml);
