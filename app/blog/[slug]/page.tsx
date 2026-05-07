import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

import BackButton from "@/components/ui/BackButton";

import "katex/dist/katex.min.css";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="mx-auto max-w-3xl px-6 py-20">

        <BackButton />

        <p className="mt-8 text-sm text-indigo-400">
          {post.category}
        </p>

        <h1 className="mt-4 text-5xl font-bold leading-tight">
          {post.title}
        </h1>

        <p className="mt-4 text-zinc-500">
          {post.date}
        </p>

        <div className="prose prose-invert mt-10 max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}