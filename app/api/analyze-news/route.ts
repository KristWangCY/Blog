import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { checkRateLimit, isSameOriginRequest } from "@/lib/api-security";

export async function POST(req: NextRequest) {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const rateLimit = checkRateLimit(req, "analyze-news", 10, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, analysis: "请求过于频繁，请稍后再试。" },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  try {
    const body = (await req.json()) as {
      title?: unknown;
      source?: unknown;
      link?: unknown;
      summary?: unknown;
    };
    const title = typeof body.title === "string" ? body.title.slice(0, 300) : "";
    const source = typeof body.source === "string" ? body.source.slice(0, 120) : "";
    const link = typeof body.link === "string" ? body.link.slice(0, 1000) : "";
    const summary = typeof body.summary === "string" ? body.summary.slice(0, 3000) : "";

    if (!title) {
      return NextResponse.json(
        { success: false, analysis: "缺少新闻标题。" },
        { status: 400 }
      );
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { success: false, analysis: "新闻分析服务尚未配置。" },
        { status: 503 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
    });

    const response = await client.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a professional financial news analyst. Reply only in Chinese. Use only the supplied headline and RSS summary; do not invent facts or imply that you opened the link.",
        },
        {
          role: "user",
          content: `
请分析这条新闻：

标题：${title}
来源：${source}
链接：${link}
RSS 摘要：${summary || "未提供摘要"}

请按照以下结构输出：

1. 今天发生了什么？
（简要概括新闻内容，100字以内）

2. 你的看法
（200字以内，分析新闻对市场、公司、行业或加密货币的潜在影响，并给出你的观察或投资角度）

要求：
- 使用中文
- 不要输出 Markdown
- 信息不足时明确说明，不要猜测新闻正文
- 保持专业、简洁、像 Bloomberg/机构研究摘要
          `,
        },
      ],
      stream: false,
    });

    return NextResponse.json({
      success: true,
      analysis: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("DeepSeek API Error:", error);

    return NextResponse.json(
      {
        success: false,
        analysis: "新闻分析生成失败，请稍后重试。",
      },
      { status: 500 }
    );
  }
}
