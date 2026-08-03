import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkRateLimit, isSameOriginRequest } from "@/lib/api-security";
import { retrieveContext } from "@/lib/rag";

export async function POST(req: Request) {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const rateLimit = checkRateLimit(req, "ask-chenyu", 12, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many questions. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  try {
    const body = (await req.json()) as { question?: unknown };
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question || question.length > 500) {
      return NextResponse.json(
        { error: "Question must be between 1 and 500 characters." },
        { status: 400 }
      );
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: "Missing DEEPSEEK_API_KEY." }, { status: 500 });
    }

    const client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
    });

    const docs = retrieveContext(question, 3);

    const context = docs
      .map((doc) => `Source: ${doc.source}\n${doc.content}`)
      .join("\n\n---\n\n");

    const completion = await client.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are Chenyu, an AI assistant representing Chenyu Wang. Answer only from the retrieved context. If the answer is absent, say you do not have enough information. Answer in the user's language and mention the source file names when helpful.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${question}`,
        },
      ],
    });

    return NextResponse.json({
      answer: completion.choices[0]?.message?.content || "No answer generated.",
    });
  } catch (error) {
    console.error("ASK_CHENYU_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to ask Chenyu. Please try again later." },
      { status: 500 }
    );
  }
}
