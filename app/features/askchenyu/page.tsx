import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import AskChenyuPanel from "@/components/ui/AskChenyuPanel";

export default function AskChenyuFeaturePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
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
              <Brain className="h-7 w-7 text-white" />
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Interactive AI
            </p>
          </div>

          <h1 className="mt-6 text-6xl font-bold">
            AskChenyu
          </h1>

          <p className="mt-10 max-w-4xl text-lg leading-8 text-zinc-400">
            AskChenyu is an experimental AI interaction module designed
            around my personal interests, projects, and technical
            background.
          </p>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-400">
            It acts as a lightweight AI assistant for topics related to
            quantitative finance, AI systems, market research,
            product thinking, and blog content.
          </p>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-zinc-400">
            The long-term goal is to build a personalized AI-native
            knowledge interface that reflects my own research,
            workflows, and thinking style.
          </p>
        </div>

        {/* PANEL */}
        <div className="mt-16 w-full">
          <AskChenyuPanel />
        </div>

        {/* INFO */}
        <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
          <h2 className="text-2xl font-semibold">
            Core Ideas
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-black/30 p-6">
              <h3 className="text-xl font-medium text-white">
                Personalized AI
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Built around my own interests, projects,
                and technical workflows.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/30 p-6">
              <h3 className="text-xl font-medium text-white">
                Research Assistant
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Supports discussions around quantitative finance,
                AI systems, crypto, and product thinking.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/30 p-6">
              <h3 className="text-xl font-medium text-white">
                AI-native Interface
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Designed as a future personal AI operating system
                and knowledge interface.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/30 p-6">
              <h3 className="text-xl font-medium text-white">
                Experimental Platform
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                Continuously evolving with new AI workflows,
                memory systems, and automation features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}