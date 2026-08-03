import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  date: string;
  content: string;
  pinned?: boolean;
  draft?: boolean;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);

      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        subtitle: data.subtitle || "",
        category: data.category || "Notes",
        description: data.description || "",
        date: data.date || "",
        pinned: data.pinned ?? false,
        draft: data.draft ?? false,
        content,
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      return (
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
      );
    });
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  if (data.draft) {
    return null;
  }

  return {
    slug,
    title: data.title || "Untitled",
    subtitle: data.subtitle || "",
    category: data.category || "Notes",
    description: data.description || "",
    date: data.date || "",
    pinned: data.pinned ?? false,
    draft: false,
    content,
  };
}
