import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllFeatures } from "@/lib/features";

export default function FeaturesPage() {
  const features = getAllFeatures();

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* BACK */}
        <Link
          href="/"
          className="
            group
            mb-8
            inline-flex
            items-center
            gap-3
            text-zinc-500
            transition
            hover:text-white
          "
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

          <span className="text-sm uppercase tracking-[0.25em]">
            Back
          </span>
        </Link>

        {/* HERO */}
        <div className="mt-6">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Blog Features
          </p>

          <h1 className="mt-5 text-6xl font-bold">
            Feature Hub
          </h1>

          <p className="mt-6 max-w-8xl text-2xl leading-10 text-zinc-400 italic">
            This website is not only a personal blog, 
          </p>
          
          <p className="mt-1 max-w-8xl text-2xl leading-10 text-zinc-400 italic">
          but also an
            experimental platform integrating AI systems,
            quantitative research, automation,
            and personalized tools.
            </p>
        </div>

        {/* FEATURE GRID */}
        <section className="mt-20 grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <Link
              key={feature.slug}
              href={`/features/${feature.slug}`}
            >
              <article
                className="
                  group
                  h-full
                  rounded-3xl
                  border border-zinc-800
                  bg-zinc-900
                  p-8
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-zinc-600
                  hover:bg-zinc-800
                "
              >
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                  {feature.tag || "Feature"}
                </p>

                <h2 className="mt-8 text-3xl font-semibold text-white">
                  {feature.title}
                </h2>

                <p className="mt-5 max-w-xl leading-8 text-zinc-400">
                  {feature.description}
                </p>

                <p className="mt-10 text-sm text-zinc-500 transition group-hover:text-indigo-400">
                  Explore Feature →
                </p>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}