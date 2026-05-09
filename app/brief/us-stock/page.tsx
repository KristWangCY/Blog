import { Suspense } from "react";
import NewsBriefPage from "@/components/ui/NewsBriefPage";

export default function USStockBriefPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewsBriefPage
        title="US STOCK"
        subtitle="Daily selected news from the US equity market."
        category="us-stock"
      />
    </Suspense>
  );
}

function Loading() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <p className="text-zinc-400">Loading US stock brief...</p>
    </main>
  );
}