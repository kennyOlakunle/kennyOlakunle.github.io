import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

export async function GET() {
  const posts = getAllPosts();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.title}</title>
    <description>${siteConfig.description}</description>
    <link>${absoluteUrl("/")}</link>
    ${posts
      .map(
        (post) => `<item>
      <title>${post.title}</title>
      <description>${post.description}</description>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid>${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
