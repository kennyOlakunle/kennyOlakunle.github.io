import fs from "node:fs";
import path from "node:path";

const blogDirectory = path.join(process.cwd(), "src", "content", "blog");

function yamlEscape(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function normalizeDescription(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function buildFrontmatter(post) {
  const tags = post.tags.length > 0 ? post.tags.map((tag) => `  - "${yamlEscape(tag)}"`).join("\n") : "  - \"article\"";

  return `---
title: "${yamlEscape(post.title)}"
description: "${yamlEscape(normalizeDescription(post.description))}"
publishedAt: "${post.publishedAt}"
featured: false
sourceName: "${yamlEscape(post.sourceName)}"
sourceUrl: "${yamlEscape(post.sourceUrl)}"
tags:
${tags}
---
`;
}

function buildBody(post) {
  return `> Originally published on [${post.sourceName}](${post.sourceUrl}).

${post.content.trim()}
`;
}

function writePost(post) {
  const filePath = path.join(blogDirectory, `${post.slug}.md`);
  const source = `${buildFrontmatter(post)}\n${buildBody(post)}`;
  fs.writeFileSync(filePath, source);
}

async function fetchDevPosts() {
  const listResponse = await fetch("https://dev.to/api/articles?username=_ken0x&per_page=100");
  const list = await listResponse.json();

  const detailedPosts = [];

  for (const article of list) {
    const articleResponse = await fetch(`https://dev.to/api/articles/${article.id}`);
    const details = await articleResponse.json();

    detailedPosts.push({
      slug: details.slug,
      title: details.title,
      description: details.description,
      publishedAt: details.published_at,
      sourceName: "DEV Community",
      sourceUrl: details.url,
      tags: Array.isArray(details.tags) ? details.tags : [],
      content: details.body_markdown
    });
  }

  return detailedPosts;
}

async function fetchHashnodePosts() {
  const response = await fetch("https://gql.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query ImportedHashnodePosts {
          user(username: "Ken0x") {
            posts(page: 1, pageSize: 20) {
              nodes {
                title
                slug
                publishedAt
                brief
                url
                content {
                  markdown
                }
                tags {
                  name
                }
              }
            }
          }
        }
      `
    })
  });

  const payload = await response.json();
  const nodes = payload?.data?.user?.posts?.nodes ?? [];

  return nodes.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.brief,
    publishedAt: post.publishedAt,
    sourceName: "Hashnode",
    sourceUrl: post.url,
    tags: Array.isArray(post.tags) ? post.tags.map((tag) => tag.name) : [],
    content: post.content?.markdown ?? ""
  }));
}

async function main() {
  fs.mkdirSync(blogDirectory, { recursive: true });

  const [devPosts, hashnodePosts] = await Promise.all([fetchDevPosts(), fetchHashnodePosts()]);
  const importedPosts = [...devPosts, ...hashnodePosts];

  for (const post of importedPosts) {
    writePost(post);
  }

  console.log(`Imported ${devPosts.length} DEV posts and ${hashnodePosts.length} Hashnode posts.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
