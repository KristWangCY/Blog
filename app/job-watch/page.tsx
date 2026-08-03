"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/ui/BackButton";

type Job = {
  title: string;
  location: string;
  url: string;
};

export default function JobWatchPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/jobs/mastercard")
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load jobs.");
        }

        return data;
      })
      .then((data) => {
        setJobs(data.jobs || []);
      })
      .catch((requestError) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Failed to load jobs."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-black px-8 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <BackButton href="/" />

        <h1 className="mb-10 text-5xl font-bold">
          Mastercard Dublin Jobs
        </h1>

        {loading && <p className="text-zinc-400">Checking current openings...</p>}

        {error && (
          <p className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-red-300">
            {error}
          </p>
        )}

        {!loading && !error && jobs.length === 0 && (
          <p className="text-zinc-400">No Dublin openings found right now.</p>
        )}

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <a
              key={index}
              href={job.url}
              target="_blank"
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <h2 className="text-2xl font-semibold">
                {job.title}
              </h2>

              <p className="mt-2 text-zinc-400">
                {job.location}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
