import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import WeatherPanel from "@/components/ui/WeatherPanel";
import AIBriefPanel from "@/components/ui/AIBriefPanel";
import AskChenyuPanel from "@/components/ui/AskChenyuPanel";

export default function Home() {
  const posts = getAllPosts();

  const sortedPosts = [...posts]
    .filter((post) => !post.slug.endsWith("-cn"))
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('/hero-bg.png')",
          }}
        />

        <div className="absolute inset-0 bg-black/5" />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-10 py-24 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
              Personal Blog
            </p>

            <h1 className="max-w-4xl text-6xl font-bold leading-tight md:text-7xl">
              Chenyu Notes
            </h1>

            <div className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              <p>This blog is a collection of all my interests and thoughts.</p>
              <p className="mt-3">I'll keep updating it along the way.</p>
            </div>

            <p className="mt-4 text-zinc-500">
              Established by Chenyu Wang in 5th May, 2026.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/features"
                className="rounded-full border border-zinc-700 bg-black/30 px-6 py-3 backdrop-blur transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                Blog Features
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-zinc-700 bg-black/30 px-6 py-3 backdrop-blur transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                About Me
              </Link>

              <Link
                href="/gallery"
                className="rounded-full border border-zinc-700 bg-black/30 px-6 py-3 backdrop-blur transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                View Gallery
              </Link>
            </div>

            <div className="mt-12 max-w-lg space-y-6">
              <WeatherPanel />
              <AskChenyuPanel />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S THE CRAIC */}
      <section className="mx-auto mt-6 max-w-7xl px-6">
        <div className="flex items-center gap-6">
          <div className="h-px flex-1 bg-zinc-800" />

          <h2 className="whitespace-nowrap text-center font-serif text-sm tracking-[0.45em] text-zinc-400">
            WHAT&apos;S THE CRAIC?
          </h2>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <AIBriefPanel />

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 transition hover:border-zinc-600 hover:bg-zinc-900/80">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Market Watch
            </p>

            <h3 className="mt-3 text-lg font-medium text-white">
              Crypto & Quant Signals
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Key movements, sentiment changes, and research ideas from daily
              news.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 transition hover:border-zinc-600 hover:bg-zinc-900/80">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Blog Ideas
            </p>

            <h3 className="mt-3 text-lg font-medium text-white">
              Writing Inspiration
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              I developed some features to capture US stock and crypto news with
              LLM APIs, and also monitor the weather and give advice with AI.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="mx-auto mt-24 max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />

          <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            My Blogs
          </h2>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-indigo-400">{post.category}</p>

                  {post.pinned && (
                    <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
                      📌 Pinned
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-semibold">{post.title}</h2>

                <p className="mt-4 text-zinc-400">{post.description}</p>

                <p className="mt-6 text-sm text-zinc-500">{post.date}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CONNECT */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />

          <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            Connect / Find Me
          </h2>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
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

              <div className="mt-8 flex items-center text-sm text-blue-400">
                Explore Repositories →
              </div>
            </div>
          </a>

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