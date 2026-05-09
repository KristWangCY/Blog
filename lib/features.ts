import fs from "fs";
import path from "path";
import matter from "gray-matter";

const featuresDirectory = path.join(
  process.cwd(),
  "content/features"
);

export type Feature = {
  slug: string;
  title: string;
  description: string;
  tag?: string;
  content: string;
};

export function getAllFeatures(): Feature[] {
  const fileNames = fs.readdirSync(featuresDirectory);

  const features = fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const fullPath = path.join(
      featuresDirectory,
      fileName
    );

    const fileContents = fs.readFileSync(
      fullPath,
      "utf8"
    );

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      tag: data.tag || "",
      content,
    };
  });

  return features;
}

export function getFeatureBySlug(
  slug: string
): Feature | null {
  const fullPath = path.join(
    featuresDirectory,
    `${slug}.md`
  );

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(
    fullPath,
    "utf8"
  );

  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    tag: data.tag || "",
    content,
  };
}