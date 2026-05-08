import Link from "next/link";
import BackButton from "@/components/ui/BackButton";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="flex items-center justify-between">
          <BackButton />

          <Link
            href="/about/zh"
            replace
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-white hover:text-white"
          >
            中文
          </Link>
        </div>

        <h1 className="mt-4 text-5xl font-bold">
          About Me
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-400">
          <p>
            Hi, I'm Chenyu from China — though most people call me Krist,
            inspired by the bass player of Nirvana.
            I've been deeply passionate about rock music for years
            and spent a long time playing in bands.
            By the way, I call myself a "minimalist", as you can see from this blog design.
          </p>

          <h2 className="text-2xl font-semibold text-white">
            Academically
          </h2>

          <p>
            I am a postgraduate student in Business Analytics at
            Trinity College Dublin, graduating with first-class honours.
          </p>

          <div>
            <p className="mb-3">
              My work and academic interests mainly focus on:
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Artificial Intelligence and Large Language Models (LLMs)</li>
              <li>Blockchain Analytics and DeFi Markets</li>
              <li>Product Management</li>
              <li>Business and Data Analytics</li>
            </ul>
          </div>

          <p>
            My postgraduate dissertation,
            <span className="italic">
              {" "}
              Leveraging Large Language Models and Blockchain Analytics
              for Quantitative Insights in DeFi Markets
            </span>,
            explores how LLMs and blockchain data can be combined to generate
            quantitative insights for decentralized finance markets.
          </p>

          <p>
            Interestingly, my academic background originally began in engineering.
            I studied Materials Science and Engineering with a specialization
            in New Energy Technologies, where I conducted research related
            to fuel cells and published research papers in the field.
            Alongside this, I also completed a minor in Computer Science.
          </p>

          <p>
            Throughout university, I received multiple scholarships and academic
            awards, including recognition in the National College Mathematics Competition.
          </p>

          <div className="space-y-4">
            <p>
              My academic journey focuses on the intersection of AI,
              quantitative finance, blockchain analytics, and business strategy.
              I am particularly interested in how large language models
              and on-chain data can be applied to generate quantitative
              insights for DeFi and financial markets.
            </p>

            <p>
              Coming from an engineering background while transitioning
              into analytics and AI has given me a multidisciplinary perspective
              on problem solving — combining technical thinking,
              data analysis, and business understanding.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-white">
              Professionally
            </h2>

            <p>
              I have accumulated experience across analytics,
              AI, fintech, and project management through several internships
              and industry roles.
            </p>

            <p>
              At BMW Leasing, I worked as a Business Analyst focusing on CRM systems,
              leasing finance operations, and AI-powered solutions.
              My responsibilities included AI Agent deployment,
              LLM applications, UAT testing, and supporting products
              throughout the full lifecycle from business requirements to implementation.
            </p>

            <p>
              Later, I joined Mercedes-Benz as a Project Manager,
              where I worked on projects related to smart charging
              infrastructure and electricity trading operations.
            </p>

            <p>
              Outside traditional corporate roles, I also spent over a year
              working as a trader at OKX and six months at Flutter Entertainment.
              Eventually, I realized that constantly chasing profits was not the kind
              of life I wanted long term, so I stepped away from trading and spent
              several months working as a bartender at Hard Rock Cafe to experience
              a completely different pace of life.
            </p>
          </div>

          <p>
            As of May 2026, I am currently exploring new opportunities
            and remain highly interested in analyst-related roles,
            particularly those connected to AI, data, strategy,
            fintech, and emerging technologies.
          </p>

          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-semibold text-white">
              Personally
            </h2>

            <p>
              Outside of work and academics, I’m also someone who deeply enjoys traveling.
              Over the years, I’ve visited dozens of countries across Europe, Asia,
              Africa, and the Americas.
            </p>

            <p>
              Experiencing different cultures and perspectives has shaped the way
              I think about people and the world itself.
            </p>

            <p>
              One of my personal goals for the next five years is to travel to Antarctica.
            </p>
          </div>

          <p>
            This blog is where I share ideas, projects, research notes,
            and thoughts on technology, markets, and building products.
          </p>
        </div>
      </section>
    </main>
  );
}