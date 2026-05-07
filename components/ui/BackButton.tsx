"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="
        mb-8 inline-flex items-center gap-2
        rounded-xl border border-zinc-700
        px-4 py-2 text-sm text-zinc-300
        transition hover:border-zinc-500
        hover:bg-zinc-900 hover:text-white
      "
    >
      ← Back
    </button>
  );
}