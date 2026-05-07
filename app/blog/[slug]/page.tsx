import Link from "next/link";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

import BackButton from "@/components/ui/BackButton";

import "katex/dist/katex.min.css";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({
  params,
}: BlogPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 判断是不是中文版本
  const isChinese = slug.endsWith("-cn");

  // 自动切换 slug
  const switchSlug = isChinese
    ? slug.replace("-cn", "")
    : `${slug}-cn`;

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="mx-auto max-w-6xl px-6 py-20">

        {/* Top Bar */}
        <div className="flex items-center justify-between">

          {/* Back Button */}
          <BackButton />

        {/* Language Switch */}
        <Link
          href={`/blog/${switchSlug}`}
          replace
          className="
            rounded-full
            border
            border-zinc-700
            px-4
            py-2
            text-sm
            text-zinc-300
            transition
            hover:border-white
            hover:text-white
          "
        >
          {isChinese ? "English" : "中文"}
        </Link>

        </div>

        {/* Category */}
        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-indigo-400">
          {post.category}
        </p>

        {/* Title */}
        <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="mt-6 max-w-3xl text-2xl leading-10 text-zinc-400 italic">
            {post.subtitle}
          </p>
        )}

        {/* Date */}
        <p className="mt-6 text-zinc-500">
          {post.date}
        </p>

        {/* Divider */}
        <div className="mt-12 h-px bg-zinc-800" />

        {/* Markdown Content */}
        <div
          className="
            prose
            prose-xl
            prose-invert

            mt-12
            max-w-none

            [&_p]:mb-2
            [&_p]:leading-9
            [&_p]:text-zinc-300

            [&_h1]:mt-16
            [&_h1]:mb-8
            [&_h1]:text-6xl
            [&_h1]:font-bold
            [&_h1]:text-white

            [&_h2]:mt-16
            [&_h2]:mb-6
            [&_h2]:text-4xl
            [&_h2]:font-semibold
            [&_h2]:text-white

            [&_h3]:mt-12
            [&_h3]:mb-5
            [&_h3]:text-2xl
            [&_h3]:text-white

            [&_li]:text-zinc-300
            [&_li]:leading-8

            [&_strong]:text-white

            [&_blockquote]:border-zinc-700
            [&_blockquote]:text-zinc-400
            [&_blockquote]:italic

            [&_hr]:my-16
            [&_hr]:border-zinc-800

            [&_a]:text-indigo-400
            hover:[&_a]:text-indigo-300

            [&_pre]:border
            [&_pre]:border-zinc-800
            [&_pre]:bg-zinc-900
            [&_pre]:p-6

            [&_code]:text-indigo-300

            [&_img]:rounded-2xl
            [&_img]:border
            [&_img]:border-zinc-800
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkBreaks]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

      </article>
    </main>
  );
}