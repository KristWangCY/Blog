import OpenAI from "openai";
import { NextResponse } from "next/server";
import { checkRateLimit, isSameOriginRequest } from "@/lib/api-security";

export async function POST(req: Request) {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ advice: "Invalid request origin." }, { status: 403 });
  }

  const rateLimit = checkRateLimit(req, "weather-advice", 20, 10 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { advice: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  try {
    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { advice: "AI advice is not configured yet." },
        { status: 503 }
      );
    }

    const body = await req.json();

    const {
      temperature,
      feelsLike,
      humidity,
      wind,
      city,
    } = body;

    const values = [temperature, feelsLike, humidity, wind];

    if (
      typeof city !== "string" ||
      city.length > 120 ||
      values.some((value) => typeof value !== "number" || !Number.isFinite(value))
    ) {
      return NextResponse.json({ advice: "Invalid weather data." }, { status: 400 });
    }

    const client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com",
    });

    const completion = await client.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",

      messages: [
        {
          role: "system",
          content:
            "You are a concise weather lifestyle assistant.",
        },

        {
          role: "user",
          content: `
City: ${city}
Temperature: ${temperature}°C
Feels Like: ${feelsLike}°C
Humidity: ${humidity}%
Wind Speed: ${wind} km/h

Give ONE short lifestyle/weather suggestion.
Keep it under 10 words.
Sound natural and modern.
          `,
        },
      ],

      stream: false,
    });

    return NextResponse.json({
      advice: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        advice: "Unable to generate advice right now.",
      },
      {
        status: 500,
      }
    );
  }
}
