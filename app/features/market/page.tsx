import Link from "next/link";
import { ArrowLeft, LineChart } from "lucide-react";

export default function MarketFeaturePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        {/* NAVIGATION */}
        <div className="flex items-center gap-6">

            <Link
            href="/features"
            className="group inline-flex items-center gap-3 text-zinc-500 transition hover:text-white"
            >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

            <span className="text-sm uppercase tracking-[0.25em]">
                Back Features
            </span>
            </Link>

        </div>

        {/* HERO */}
        <div className="mt-14">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-4">
              <LineChart className="h-7 w-7 text-white" />
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Market Intelligence
            </p>
          </div>

          <h1 className="mt-6 text-6xl font-bold">
            Market Intelligence
          </h1>

          <p className="mt-10 text-lg leading-8 text-zinc-400">
            This module focuses on AI-assisted monitoring of financial
            markets, macroeconomic events, and crypto ecosystems.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            It combines news aggregation, sentiment analysis,
            quantitative signals, and automated monitoring pipelines
            for market research purposes.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            The system is designed as an experimental infrastructure
            for future quantitative research and trading workflows.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {/* US STOCK */}
          <Link href="/brief/us-stock?from=market">
            <article className="group h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800">
              <h2 className="text-2xl font-semibold text-white">
                US Stock Monitoring
              </h2>

              <p className="mt-5 leading-8 text-zinc-400">
                AI-assisted pipelines for tracking major US stock market
                news, macro events, and sector movements.
              </p>

              <p className="mt-10 text-sm text-zinc-500 transition group-hover:text-indigo-400">
                Explore →
              </p>
            </article>
          </Link>

          {/* CRYPTO */}
          <Link href="/brief/crypto?from=market">
            <article className="group h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800">
              <h2 className="text-2xl font-semibold text-white">
                Crypto Market Tracking
              </h2>

              <p className="mt-5 leading-8 text-zinc-400">
                Real-time monitoring of crypto narratives, sentiment
                changes, blockchain ecosystems, and market dynamics.
              </p>

              <p className="mt-10 text-sm text-zinc-500 transition group-hover:text-indigo-400">
                Explore →
              </p>
            </article>
          </Link>
        </div>
      </div>
    </main>
  );
}