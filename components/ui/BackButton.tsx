"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="group mb-14 inline-flex items-center gap-3 text-zinc-500 transition hover:text-white"
    >
      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

      <span className="text-sm uppercase tracking-[0.25em]">
        Back
      </span>
    </button>
  );
}