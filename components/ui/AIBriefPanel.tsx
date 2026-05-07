import Link from "next/link";

export default function AIBriefPanel() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 transition hover:border-zinc-600 hover:bg-zinc-900/80">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
        AI Brief
      </p>

      <h3 className="mt-3 text-lg font-medium text-white">
        Daily Intelligence Digest
      </h3>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        AI-curated updates on markets, crypto, technology, and product thinking.
      </p>

      <div className="mt-6 grid gap-3">
        <Link
          href="/brief/us-stock"
          className="rounded-xl border border-zinc-800 bg-black/40 p-4 transition hover:border-zinc-600 hover:bg-zinc-900"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Market
          </p>
          <h4 className="mt-2 text-base font-medium text-white">US STOCK</h4>
          <p className="mt-2 text-xs leading-5 text-zinc-400">
            Daily selected news from the US equity market.
          </p>
        </Link>

        <Link
          href="/brief/crypto"
          className="rounded-xl border border-zinc-800 bg-black/40 p-4 transition hover:border-zinc-600 hover:bg-zinc-900"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Digital Assets
          </p>
          <h4 className="mt-2 text-base font-medium text-white">Crypto</h4>
          <p className="mt-2 text-xs leading-5 text-zinc-400">
            Daily selected news from crypto and DeFi markets.
          </p>
        </Link>
      </div>
    </div>
  );
}