import Link from "next/link";
import { Images } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import BackButton from "@/components/ui/BackButton";

type LifeBlogPageProps = {
  searchParams?: Promise<{
    from?: string;
  }>;
};

export default async function LifeBlogPage({
  searchParams,
}: LifeBlogPageProps) {
  const params = await searchParams;

  const from = params?.from || "/";

  const posts = getAllPosts();

  const lifePosts = posts
    .filter(
      (post) =>
        !post.slug.endsWith("-cn") &&
        ["Personal Notes", "Life", "French"].includes(post.category)
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <BackButton href={from} />

        {/* HEADER */}
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            Blog Category
          </p>

          <h1 className="text-6xl font-bold">Life</h1>

          <p className="mt-6 max-w-6xl text-2xl leading-10 text-zinc-400 italic">
            Personal reflections, language learning, random thoughts,
            observations, gallery, and moments outside work.
          </p>
        </div>

        {/* GALLERY */}
        <div className="mt-16">
          <Link href="/gallery?from=/blog/life">
            <article className="group rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-zinc-800">
              <div className="flex items-center gap-3 text-purple-400">
                <Images className="h-5 w-5" />

                <p className="text-sm uppercase tracking-[0.25em]">
                  Gallery
                </p>
              </div>

              <h2 className="mt-6 text-3xl font-semibold text-white">
                My Gallery
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
                Photos, visual memories, travel moments,
                daily life snapshots, and personal collections.
              </p>

              <p className="mt-8 text-sm text-zinc-500 transition group-hover:text-purple-400">
                View Gallery →
              </p>
            </article>
          </Link>
        </div>

        {/* POSTS */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {lifePosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-indigo-400">
                    {post.category}
                  </p>

                  {post.pinned && (
                    <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
                      📌 Pinned
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white">
                  {post.title}
                </h2>

                <p className="mt-4 leading-7 text-zinc-400">
                  {post.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-zinc-500">
                    {post.date}
                  </p>

                  <span className="text-sm text-zinc-500 transition group-hover:text-indigo-400">
                    Read →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}