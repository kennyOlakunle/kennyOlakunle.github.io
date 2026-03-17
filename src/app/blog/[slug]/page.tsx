import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { MarkdownContent } from "@/components/markdown-content";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`)
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: "article",
      publishedTime: post.publishedAt
    }
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="section-block page-intro">
      <div className="shell narrow-shell">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            author: {
              "@type": "Person",
              name: siteConfig.name
            },
            url: absoluteUrl(`/blog/${post.slug}`)
          }}
        />
        <p className="eyebrow">Article</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.description}</p>
        <p className="post-meta detail-post-meta">
          <span>{new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span>
          <span>{post.readingTime}</span>
        </p>
        <ul className="tag-list detail-tags">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <MarkdownContent content={post.content} />
      </div>
    </section>
  );
}
