import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

import { getFeatureBySlug } from "@/lib/features";
import { notFound } from "next/navigation";

import BackButton from "@/components/ui/BackButton";

import "katex/dist/katex.min.css";

type FeaturePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function FeaturePage({
  params,
}: FeaturePageProps) {
  const { slug } = await params;

  const feature = getFeatureBySlug(slug);

  if (!feature) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <article className="mx-auto max-w-6xl px-6 py-20">

        {/* Top Bar */}
        <div className="flex items-center justify-between">

          {/* Back Button */}
            <BackButton href="/features" />

          {/* Feature Tag */}
          <div
            className="
              rounded-full
              border
              border-zinc-700
              px-4
              py-2
              text-sm
              uppercase
              tracking-[0.2em]
              text-zinc-400
            "
          >
            {feature.tag || "Feature"}
          </div>

        </div>

        {/* Category */}
        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-indigo-400">
          {feature.tag || "Feature"}
        </p>

        {/* Title */}
        <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
          {feature.title}
        </h1>

        {/* Description */}
        {feature.description && (
          <p className="mt-6 max-w-5xl text-2xl leading-10 text-zinc-400 italic">
            {feature.description}
          </p>
        )}

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
            {feature.content}
          </ReactMarkdown>
        </div>

      </article>
    </main>
  );
}
