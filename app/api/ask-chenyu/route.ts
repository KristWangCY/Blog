import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

function loadKnowledgeBase() {
  const dataDir = path.join(process.cwd(), "data", "chenyu");

  if (!fs.existsSync(dataDir)) {
    throw new Error(`Knowledge base folder not found: ${dataDir}`);
  }

  const files = fs.readdirSync(dataDir).filter((file) => file.endsWith(".md"));

  return files.map((file) => ({
    source: file,
    content: fs.readFileSync(path.join(dataDir, file), "utf-8"),
  }));
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json({ error: "Missing DEEPSEEK_API_KEY." }, { status: 500 });
    }

    const docs = loadKnowledgeBase();

    const context = docs
      .map((doc) => `Source: ${doc.source}\n${doc.content}`)
      .join("\n\n---\n\n");

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are Chenyu, an AI assistant representing Chenyu Wang. Answer only based on the provided context. If the answer is not in the context, say you don't have enough information. Answer in the same language as the user.",
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
      { error: error instanceof Error ? error.message : "Failed to ask Chenyu." },
      { status: 500 }
    );
  }
}