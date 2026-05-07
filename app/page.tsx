import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="mb-4 text-sm tracking-[0.2em] text-zinc-500 uppercase">
          Personal Blog
        </p>

        <h1 className="max-w-3xl text-6xl font-bold leading-tight">
          Chenyu Notes
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          A personal blog about AI, quantitative finance, analytics, and
          product thinking.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#blog"
            className="rounded-full border border-zinc-700 px-6 py-3 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            Read Blogs
          </a>

          <Link
            href="/about"
            className="rounded-full border border-zinc-700 px-6 py-3 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            About Me
          </Link>

          <Link
            href="/gallery"
            className="rounded-full border border-zinc-700 px-6 py-3 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* BLOG */}
      <section
        id="blog"
        className="mx-auto max-w-5xl px-6 pb-24"
      >
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />

          <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            My Blogs
          </h2>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800">
                <p className="mb-3 text-sm text-indigo-400">
                  {post.category}
                </p>

                <h2 className="text-2xl font-semibold">
                  {post.title}
                </h2>

                <p className="mt-4 text-zinc-400">
                  {post.description}
                </p>

                <p className="mt-6 text-sm text-zinc-500">
                  {post.date}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CONNECT */}
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />

          <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            Connect / Find Me
          </h2>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/kristwang/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-zinc-900"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Professional
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                LinkedIn
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Professional profile, career updates, and industry experience.
              </p>

              <div className="mt-8 flex items-center text-sm text-blue-400">
                Visit Profile →
              </div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/KristWangCY"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-7 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-zinc-900"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Development
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                GitHub
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Open-source projects, experiments, quantitative research, and
                engineering work.
              </p>

              <div className="mt-8 flex items-center text-sm text-zinc-300">
                Explore Repositories →
              </div>
            </div>
          </a>

          {/* WeChat */}
          <div className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Content
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                WeChat Official Account
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                My Chinese articles, market insights, long-form thinking, and
                personal reflections.
              </p>

              <div className="mt-8 rounded-2xl border border-zinc-700 bg-black/40 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Account
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  KristWangCY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}