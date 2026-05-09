import { Suspense } from "react";
import NewsBriefPage from "@/components/ui/NewsBriefPage";

export default function CryptoBriefPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewsBriefPage
        title="Crypto"
        subtitle="Daily selected news from crypto and DeFi markets."
        category="crypto"
      />
    </Suspense>
  );
}

function Loading() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <p className="text-zinc-400">Loading crypto brief...</p>
    </main>
  );
}