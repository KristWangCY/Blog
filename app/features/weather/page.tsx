import Link from "next/link";
import { ArrowLeft, CloudRain } from "lucide-react";
import WeatherPanel from "@/components/ui/WeatherPanel";

export default function WeatherFeaturePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/features"
          className="group inline-flex items-center gap-3 text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

          <span className="text-sm uppercase tracking-[0.25em]">
            Back Features
          </span>
        </Link>

        <div className="mt-14">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-4">
              <CloudRain className="h-7 w-7 text-white" />
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              AI Utilities
            </p>
          </div>

          <h1 className="mt-6 text-6xl font-bold">
            AI Weather Reminder
          </h1>

          <p className="mt-10 text-lg leading-8 text-zinc-400">
            The Weather AI module combines real-time weather monitoring with
            AI-generated recommendations.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            It transforms environmental information into practical lifestyle
            suggestions and contextual daily reminders.
          </p>
        </div>

        <div className="mt-16">
          <WeatherPanel />
        </div>
      </div>
    </main>
  );
}