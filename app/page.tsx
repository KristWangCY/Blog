export default function Home() {
return ( <main className="min-h-screen bg-black text-white"> <section className="mx-auto max-w-5xl px-6 py-24"> <p className="mb-4 text-sm text-zinc-400">
Personal Blog </p>


    <h1 className="max-w-3xl text-6xl font-bold leading-tight">
      Chenyu Notes
    </h1>

    <p className="mt-6 max-w-2xl text-lg text-zinc-400">
      A personal blog about AI, quantitative finance,
      analytics, and product thinking.
    </p>

    <div className="mt-10 flex gap-4">
      <button className="rounded-full bg-white px-6 py-3 text-black">
        Read Blog
      </button>

      <button className="rounded-full border border-zinc-700 px-6 py-3">
        About Me
      </button>
    </div>
  </section>

  <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 md:grid-cols-2">
    <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="mb-3 text-sm text-indigo-400">
        Quant Finance
      </p>

      <h2 className="text-2xl font-semibold">
        Building Trading Signals
      </h2>

      <p className="mt-4 text-zinc-400">
        Thoughts on factor investing, alpha research,
        and quantitative workflows.
      </p>
    </article>

    <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="mb-3 text-sm text-emerald-400">
        AI Product
      </p>

      <h2 className="text-2xl font-semibold">
        Designing AI Systems
      </h2>

      <p className="mt-4 text-zinc-400">
        Lessons from CRM intelligence systems,
        LLM products, and analytics projects.
      </p>
    </article>
  </section>
</main>

);
}