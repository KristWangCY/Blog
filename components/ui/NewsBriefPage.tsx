"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  source: string;
  link: string;
  publishedAt: string;
  summary: string;
};

type Props = {
  title: string;
  subtitle: string;
  category: "us-stock" | "crypto";
};

export default function NewsBriefPage({
  title,
  subtitle,
  category,
}: Props) {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const [news, setNews] = useState<NewsItem[]>([]);
  const [analysisMap, setAnalysisMap] = useState<Record<string, string>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [newsError, setNewsError] = useState("");

  useEffect(() => {
    fetch(`/api/news?category=${category}`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch news.");
        }

        setNews(data.news || []);
      })
      .catch((error) => {
        console.error("Failed to fetch news:", error);
        setNewsError("News is temporarily unavailable. Please try again later.");
      });
  }, [category]);

  async function analyzeNews(item: NewsItem) {
    setLoadingMap((prev) => ({ ...prev, [item.id]: true }));
    setAnalysisMap((prev) => ({ ...prev, [item.id]: "" }));

    try {
      const res = await fetch("/api/analyze-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.analysis || "Failed to analyse this news.");
      }

      setAnalysisMap((prev) => ({
        ...prev,
        [item.id]: data.analysis || "No analysis available.",
      }));
    } catch (error) {
      console.error(error);

      setAnalysisMap((prev) => ({
        ...prev,
        [item.id]:
          error instanceof Error ? error.message : "Failed to analyse this news.",
      }));
    } finally {
      setLoadingMap((prev) => ({ ...prev, [item.id]: false }));
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl">
        {/* NAVIGATION */}
        <Link
          href={from}
          className="group inline-flex items-center gap-3 text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

          <span className="text-sm uppercase tracking-[0.25em]">
            Back
          </span>
        </Link>

        {/* HEADER */}
        <div className="mt-10 flex items-center gap-6">
          <div className="h-px flex-1 bg-zinc-800" />

          <h1 className="whitespace-nowrap text-center font-serif text-sm uppercase tracking-[0.45em] text-zinc-400">
            {title}
          </h1>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <p className="mt-8 text-center text-zinc-400">{subtitle}</p>

        {/* NEWS */}
        {newsError && (
          <p className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
            {newsError}
          </p>
        )}

        <div className="mt-12 grid gap-5">
          {news.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5"
            >
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                <span>{item.source}</span>

                <span className="text-zinc-700">•</span>

                <span>
                  {new Date(item.publishedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <h2 className="mt-2 text-xl font-medium text-white">
                {item.title}
              </h2>

              {item.summary && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
                  {item.summary}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-4">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 underline underline-offset-4 hover:text-white"
                >
                  Read original →
                </a>

                <button
                  onClick={() => analyzeNews(item)}
                  className="text-sm text-indigo-400 underline underline-offset-4 hover:text-indigo-300"
                >
                  AI Analysis →
                </button>
              </div>

              {(loadingMap[item.id] || analysisMap[item.id]) && (
                <div className="mt-5 rounded-xl border border-zinc-800 bg-black/50 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    AI Analysis
                  </p>

                  {loadingMap[item.id] ? (
                    <p className="mt-4 text-sm text-zinc-400">
                      DeepSeek is analysing this news...
                    </p>
                  ) : (
                    <div className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-300">
                      {analysisMap[item.id]}
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
