import Link from "next/link";
import type { Post } from "@/lib/content";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <p className="post-meta">
        <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span>
        <span>{post.readingTime}</span>
      </p>
      <h3>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.description}</p>
      <ul className="tag-list">
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
