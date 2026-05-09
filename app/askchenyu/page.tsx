import BackButton from "@/components/ui/BackButton";
import AskChenyuPanel from "@/components/ui/AskChenyuPanel";

export default function AskChenyuPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* Back */}
        <BackButton href="/features/askchenyu" />

        {/* Hero */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Interactive AI
          </p>

          <h1 className="mt-6 text-6xl font-bold">
            AskChenyu
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-400">
            A lightweight AI assistant built around my projects,
            research, technical background, and long-term interests.
          </p>
        </div>

        {/* AI PANEL */}
        <div className="mt-16">
          <AskChenyuPanel />
        </div>

      </div>
    </main>
  );
}