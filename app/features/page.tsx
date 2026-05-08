import Link from "next/link";
import { ArrowLeft, CloudRain, Brain, LineChart, BookOpen } from "lucide-react";

const features = [
  {
    title: "Blog Recording System",
    description:
      "My personal writing system for recording research, learning, projects, and long-term thinking.",
    href: "/features/blog-system",
    icon: BookOpen,
    tag: "Personal Writing",
  },
  {
    title: "AI Weather Reminder",
    description:
      "AI-powered weather monitoring with contextual daily suggestions and reminders.",
    href: "/features/weather",
    icon: CloudRain,
    tag: "AI Utilities",
  },
  {
    title: "AskChenyu",
    description:
      "A lightweight AI assistant built around my projects, interests, and technical background.",
    href: "/features/askchenyu",
    icon: Brain,
    tag: "Interactive AI",
  },
  {
    title: "Market Intelligence",
    description:
      "US stock and crypto news tracking with AI-assisted market monitoring pipelines.",
    href: "/features/market",
    icon: LineChart,
    tag: "Market Intelligence",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* BACK */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

          <span className="text-sm uppercase tracking-[0.25em]">
            Back Home
          </span>
        </Link>

        {/* HERO */}
        <div className="mt-14">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Blog Features
          </p>

          <h1 className="mt-5 text-6xl font-bold">
            Feature Hub
          </h1>

          <p className="mt-8 max-w-4xl text-lg leading-8 text-zinc-400">
            This website is not only a personal blog, but also an
            experimental platform integrating AI systems, quantitative
            research, automation, and personalized tools.
          </p>
        </div>

        {/* FEATURE GRID */}
        <section className="mt-20 grid gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link key={feature.title} href={feature.href}>
                <article className="group h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl border border-zinc-700 bg-black/40 p-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                      {feature.tag}
                    </p>
                  </div>

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
            );
          })}
        </section>
      </div>
    </main>
  );
}