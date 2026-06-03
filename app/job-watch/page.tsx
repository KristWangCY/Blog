"use client";

import { useEffect, useState } from "react";

type Job = {
  title: string;
  location: string;
  url: string;
};

export default function JobWatchPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("/api/jobs/mastercard")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black px-8 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-5xl font-bold">
          Mastercard Dublin Jobs
        </h1>

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