import Link from "next/link";
import BackButton from "@/components/ui/BackButton";

export default function AboutChinesePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24">

        <div className="flex items-center justify-between">
          <BackButton />

          <Link
            href="/about"
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-white hover:text-white"
          >
            English
          </Link>
        </div>

        <p className="mt-8 text-sm text-zinc-400">
          关于
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          关于我
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-400">

          <p>
            你好，我是晨钰，不过大多数人会叫我 Krist，
            来源于 Nirvana 乐队的贝斯手。
            我非常喜欢摇滚乐，也玩了很多年的乐队。
          </p>

            <h2 className="text-2xl font-semibold text-white">
              学术兴趣
            </h2>

          <p>
            我之前在 Trinity College Dublin
            攻读 Business Analytics 硕士，
            并以 First-Class Honours 成绩毕业。
          </p>

          <div>
            <p className="mb-3">
              我的研究与兴趣方向主要包括：
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>人工智能与大语言模型的商业应用</li>
              <li>区块链分析与 DeFi 市场研究</li>
              <li>产品管理</li>
              <li>商业分析与数据分析</li>
            </ul>
          </div>

          <p>
            我的硕士论文题目是：
            <span className="italic">
              {" "}
              Leveraging Large Language Models and Blockchain Analytics
              for Quantitative Insights in DeFi Markets
            </span>
            ，主要研究如何结合大语言模型与链上数据，
            为去中心化金融市场提供量化洞察。
          </p>

          <p>
            其实我的本科背景最早来自工程领域。
            我学习的是材料科学与工程专业，
            方向是新能源技术，
            期间做过燃料电池相关研究并发表过论文，
            同时辅修了计算机科学。
          </p>

          <p>
            在大学期间，我获得过多次奖学金及优秀学生等奖项，
            并参加全国大学生数学竞赛，取得北京市二等奖及全国三等奖。
          </p>

          <div className="space-y-4">

            <p>
              我的学术方向主要集中在 AI、
              区块链数据分析、量化金融以及商业策略的交叉领域。
              我尤其关注如何利用大语言模型、
              社交媒体数据与链上数据，
              去理解和预测金融市场行为。
            </p>

            <p>
              从工程背景转向 AI 与商业分析，
              让我形成了比较跨学科的思维方式，
              既关注技术实现，
              也关注产品逻辑与商业价值。
            </p>

          </div>

          <div className="space-y-4 pt-4">

            <h2 className="text-2xl font-semibold text-white">
              职业规划
            </h2>

            <p>
              在职业经历方面，
              我做过商业分析、AI 产品、
              金融科技以及项目管理相关工作。
            </p>

            <p>
            在 BMW Leasing 担任 Business Analyst 期间，
            我主要负责 CRM、Leasing Finance 及 AI Agent 相关项目，
            参与大模型应用、AI Agent 部署、UAT 测试以及完整产品生命周期支持。
            项目采用 Agile 开发模式，日常使用 JIRA 与 Confluence 进行需求管理与协作，
            同时运用 Python、SQL、Excel 和 Power BI 进行数据分析、流程优化及业务支持。
            </p>

            <p>
            后来我加入了 Mercedes-Benz Group，
            担任 Technical Project Manager，参与智能充电机器人及V2G（Vehicle-to-Grid）相关项目，
            负责 stakeholder 管理、供应商沟通与项目推进。
            我也参与技术方案讨论、供应商谈判以及项目 presentation，协调跨部门合作，确保项目按计划落地。
            </p>

            <p>
            除了传统企业经历之外，
            我也曾在 OKX 做过一年多交易员，主要做流动性提供。
            在 Flutter Entertainment 做过半年交易员，负责做赔率定价和风险管理。
            </p>

            <p>
            后来我逐渐意识到，
            一直追逐收益并不是我真正想长期过的生活，
            所以离开了交易行业。
            因为之前在北京也有过做酒吧助演乐队的经历，
            所以就去 Hard Rock Cafe 做了几个月 bartender，
            学调酒，也体验一种完全不同的生活节奏。
            </p>

          </div>

          <div className="space-y-4 pt-4">

            <h2 className="text-2xl font-semibold text-white">
              个人生活
            </h2>

            <p>
              除了工作与学习之外，
              我也是一个非常喜欢旅行的人。
              这些年去过几十个国家，
              包括欧洲、亚洲、非洲以及美洲。
            </p>

            <p>
              我一直认为，
              旅行最大的意义并不只是“去过哪里”，
              而是它会不断改变你理解世界的方式。
            </p>

            <p>
              我最近的一个人生目标，
              是希望在未来五年内去一次南极洲。
            </p>

          </div>

          <p>
            目前（2026 年 5 月），
            我正处于求职阶段，
            依然希望从事 Analyst、
            AI、数据、金融科技、
            能源等相关方向的工作。
          </p>

          <p>
            这个博客主要会分享：
            技术、市场、产品、
            研究、想法以及一些生活观察。
          </p>

        </div>

      </section>
    </main>
  );
}