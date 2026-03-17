import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on data engineering, pipelines, machine learning, and technical growth.",
  alternates: {
    canonical: absoluteUrl("/blog")
  }
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="section-block page-intro">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">Blog</p>
          <h1>Technical writing built for search, sharing, and depth.</h1>
          <p>
            The blog uses crawlable routes, article metadata, RSS, and structured content so new posts are
            easy to publish and discover.
          </p>
        </div>
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
