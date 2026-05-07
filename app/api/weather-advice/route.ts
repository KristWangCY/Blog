import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      temperature,
      feelsLike,
      humidity,
      wind,
      city,
    } = body;

    const completion = await client.chat.completions.create({
      model: "deepseek-v4-flash",

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