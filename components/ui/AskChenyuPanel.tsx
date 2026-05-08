"use client";

import { useState } from "react";

export default function AskChenyuPanel() {
  const [question, setQuestion] = useState("");
  const [expanded, setExpanded] = useState(true);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askChenyu() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask-chenyu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await res.json();

      console.log(data);

      setAnswer(
        data.answer ||
          data.error ||
          "Sorry, I could not answer that."
      );
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md md:p-8">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Ask Chenyu
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400">
            AI assistant for my projects, research, and experience.
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30 text-lg text-zinc-300 transition hover:bg-white/10"
        >
          {expanded ? "−" : "+"}
        </button>
      </div>

      {expanded && (
        <>
          {/* SEARCH */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askChenyu()}
              placeholder="Ask me anything..."
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30"
            />

            <button
              type="button"
              onClick={askChenyu}
              disabled={loading}
              className="rounded-xl bg-white px-8 py-3 font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-[140px]"
            >
              {loading ? "..." : "Ask"}
            </button>
          </div>

          {/* QUICK TAGS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["Trading", "Projects", "Dissertation"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuestion(item)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          {/* ANSWER */}
          {answer && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Chenyu
              </p>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-300">
                {answer}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}