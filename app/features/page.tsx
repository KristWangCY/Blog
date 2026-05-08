import Link from "next/link";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          ← Back Home
        </Link>

        <p className="mt-10 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Blog Features
        </p>

        <h1 className="mt-4 text-5xl font-bold">Features Introduction</h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          This website is not only a personal blog, but also an experimental
          platform integrating AI systems, quantitative research, automation,
          and personalized tools.
        </p>

        <section className="mt-20 space-y-20">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Personal Writing
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Blog Recording System (Built in 5th May, 2026)
            </h2>

            <div className="mt-6 max-w-4xl space-y-6 text-lg leading-8 text-zinc-400">
              <p>
                This website serves as my personal digital notebook for
                recording thoughts, research, project experiences, and long-term
                learning progress.
              </p>

              <p>
                Topics mainly include AI systems, quantitative finance, crypto
                market research, product thinking, and technology exploration.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              AI Utilities
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              AI Weather Reminder (Built in 6th May, 2026)
            </h2>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <p className="text-lg leading-8 text-zinc-400">
                The Weather AI module combines real-time weather monitoring with
                AI-generated recommendations.
              </p>

              <p className="mt-5 text-lg leading-8 text-zinc-400">
                It provides contextual suggestions based on current weather
                conditions, turning raw environmental data into practical daily
                insights.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Interactive AI
            </p>

            <h2 className="mt-4 text-3xl font-semibold">AskChenyu (Built in 7th May, 2026)</h2>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <p className="text-lg leading-8 text-zinc-400">
                AskChenyu is an experimental AI interaction module designed
                around my personal interests, projects, and technical
                background.
              </p>

              <p className="mt-5 text-lg leading-8 text-zinc-400">
                It acts as a lightweight AI assistant for topics related to
                quantitative finance, AI systems, market research, and blog
                content.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Market Intelligence
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              US Stock & Crypto News Tracking (Built in 7th May, 2026)
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
                <h3 className="text-xl font-medium">
                  US Stock Market Monitoring
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  AI-assisted monitoring pipelines for major US market news,
                  macro events, and financial updates.
                </p>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
                <h3 className="text-xl font-medium">
                  Crypto Market Tracking
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  Real-time tracking of crypto-related news, sentiment changes,
                  and emerging narratives across the digital asset ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}