import type { MetadataRoute } from "next";
import { getAllFeatures } from "@/lib/features";
import { getAllPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/zh",
    "/askchenyu",
    "/blog/work",
    "/blog/life",
    "/features",
    "/gallery",
    "/weather",
    "/job-watch",
    "/brief/us-stock",
    "/brief/crypto",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: post.pinned ? 0.9 : 0.6,
  }));

  const features = getAllFeatures().map((feature) => ({
    url: `${siteUrl}/features/${feature.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts, ...features];
}
