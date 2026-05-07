import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export async function POST(req: NextRequest) {
  try {
    const { title, source, link } = await req.json();

    const response = await client.chat.completions.create({
      model: "deepseek-v4-pro",
      messages: [
        {
          role: "system",
          content:
            "You are a professional financial news analyst. Reply ONLY in Chinese. Be concise, analytical, and practical.",
        },
        {
          role: "user",
          content: `
请分析这条新闻：

标题：${title}
来源：${source}
链接：${link}

请按照以下结构输出：

1. 今天发生了什么？
（简要概括新闻内容，100字以内）

2. 你的看法
（200字以内，分析新闻对市场、公司、行业或加密货币的潜在影响，并给出你的观察或投资角度）

要求：
- 使用中文
- 不要输出 Markdown
- 不要输出标题以外的额外内容
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