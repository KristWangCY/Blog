import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function BlogSystemFeaturePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        {/* BACK */}
        <Link
          href="/features"
          className="group inline-flex items-center gap-3 text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

          <span className="text-sm uppercase tracking-[0.25em]">
            Back Features
          </span>
        </Link>

        {/* HERO */}
        <div className="mt-14">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-4">
              <BookOpen className="h-7 w-7 text-white" />
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Personal Writing
            </p>
          </div>

          <h1 className="mt-6 text-6xl font-bold">
            Blog Recording System
          </h1>

          <p className="mt-10 text-lg leading-8 text-zinc-400">
            This website serves as my personal digital notebook for
            recording thoughts, research, project experiences,
            and long-term learning progress.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Topics mainly include AI systems, quantitative finance,
            crypto market research, product thinking,
            and technology exploration.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            The blog is designed as both a personal archive and an
            evolving knowledge base that grows alongside my work
            and life experiences.
          </p>
        </div>

        {/* INFO CARD */}
        <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
          <h2 className="text-2xl font-semibold">
            Writing Directions
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* WORK */}
            <Link href="/blog/work">
              <div className="group rounded-2xl border border-zinc-800 bg-black/30 p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900">
                <h3 className="text-xl font-medium text-white">
                  Work
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  Quantitative finance, AI systems, energy trading,
                  business analytics, and technical research.
                </p>

                <p className="mt-8 text-sm text-zinc-500 transition group-hover:text-indigo-400">
                  View Work Blogs →
                </p>
              </div>
            </Link>

            {/* LIFE */}
            <Link href="/blog/life">
              <div className="group rounded-2xl border border-zinc-800 bg-black/30 p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900">
                <h3 className="text-xl font-medium text-white">
                  Life
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  Personal reflections, language learning,
                  gallery collections, and daily observations.
                </p>

                <p className="mt-8 text-sm text-zinc-500 transition group-hover:text-indigo-400">
                  View Life Blogs →
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}