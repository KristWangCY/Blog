import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BackButton from "@/components/ui/BackButton";

export default function WorkBlogPage() {
  const posts = getAllPosts();

  const workPosts = posts
    .filter(
      (post) =>
        !post.slug.endsWith("-cn") &&
        [
          "Finance",
          "Energy Projects",
          "Business Analytics Projects",
          "AI",
          "Quant",
        ].includes(post.category)
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        {/* BACK */}
        <BackButton />

        {/* HEADER */}
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
            Blog Category
          </p>

          <h1 className="text-6xl font-bold">Work</h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Research, quantitative finance, AI systems, analytics,
            trading, engineering, and professional projects.
          </p>
        </div>

        {/* POSTS */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {workPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-7 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800">
                <p className="text-sm text-indigo-400">
                  {post.category}
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-white">
                  {post.title}
                </h2>

                <p className="mt-4 leading-7 text-zinc-400">
                  {post.description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <p className="text-sm text-zinc-500">{post.date}</p>

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