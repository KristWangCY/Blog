import BackButton from "@/components/ui/BackButton";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24">

        <BackButton />

        <p className="text-sm text-zinc-400">
          About
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          About Me
        </h1>

        <p className="mt-8 text-lg leading-8 text-zinc-400">
          I am a MSc Business Analytics student at Trinity College Dublin with
          interests in AI, quantitative finance, blockchain analytics, and
          product strategy.
        </p>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          I previously worked with Mercedes-Benz and BMW on AI, analytics, and
          digital product initiatives. I also conduct research in quantitative
          finance and DeFi markets using machine learning and blockchain data.
        </p>

        <p className="mt-6 text-lg leading-8 text-zinc-400">
          This blog is where I share ideas, projects, research notes, and
          thoughts on technology, markets, and building products.
        </p>
      </section>
    </main>
  );
}