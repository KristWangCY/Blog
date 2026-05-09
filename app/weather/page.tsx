import BackButton from "@/components/ui/BackButton";
import WeatherPanel from "@/components/ui/WeatherPanel";

export default function WeatherPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <BackButton href="/features/weather" />

        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          AI Utilities
        </p>

        <h1 className="mt-6 text-6xl font-bold">
          AI Weather Reminder
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-400">
          A lightweight weather panel with contextual AI suggestions for daily planning.
        </p>

        <div className="mt-16">
          <WeatherPanel />
        </div>
      </div>
    </main>
  );
}