import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content", "posts");

/* ── Lightweight Frontmatter Parser ── */
function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const data = {};

  yamlBlock.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Clean quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      // Parse arrays e.g. ["Next.js", "React"]
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value);
        } catch {
          value = value
            .slice(1, -1)
            .split(",")
            .map((s) => s.trim().replace(/^["']|["']$/g, ""));
        }
      }

      // Parse booleans
      if (value === "true") value = true;
      if (value === "false") value = false;

      data[key] = value;
    }
  });

  return { data, content };
}

/* ── Get All Posts Metadata ── */
export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = parseFrontmatter(fileContents);

      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || "",
        date: data.date || "2026-01-01",
        readTime: data.readTime || "5 min read",
        category: data.category || "General",
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author || "Zahidul Islam",
        featured: Boolean(data.featured),
        coverColor: data.coverColor || "from-indigo-600 to-purple-600",
        content,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

/* ── Get Single Post By Slug ── */
export function getPostBySlug(slug) {
  try {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);

    const fullPath = fs.existsSync(mdxPath)
      ? mdxPath
      : fs.existsSync(mdPath)
      ? mdPath
      : null;

    if (!fullPath) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = parseFrontmatter(fileContents);

    return {
      slug,
      title: data.title || slug,
      excerpt: data.excerpt || "",
      date: data.date || "2026-01-01",
      readTime: data.readTime || "5 min read",
      category: data.category || "General",
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || "Zahidul Islam",
      featured: Boolean(data.featured),
      coverColor: data.coverColor || "from-indigo-600 to-purple-600",
      content,
    };
  } catch (error) {
    console.error("Error reading post by slug:", error);
    return null;
  }
}
