import Parser from "rss-parser";
import { NextRequest, NextResponse } from "next/server";

const parser = new Parser();

const RSS_MAP = {
  "us-stock": "https://feeds.finance.yahoo.com/rss/2.0/headline?s=CRWV,QQQ,AAPL,NVDA,META,RKLB,TSLA,ORCL&region=US&lang=en-US",

  // CoinDesk RSS
  crypto: "https://www.coindesk.com/arc/outboundfeeds/rss/",
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category =
      searchParams.get("category") || "us-stock";

    const rssUrl =
      category === "crypto"
        ? RSS_MAP.crypto
        : RSS_MAP["us-stock"];

    const feed = await parser.parseURL(rssUrl);

    const news = feed.items.slice(0, 10).map((item, index) => ({
      id: String(index + 1),

      title: item.title || "Untitled",

      link: item.link || "",

      source:
        (item as any).source ||
        feed.title ||
        "CoinDesk",

      publishedAt:
        item.pubDate ||
        item.isoDate ||
        "",
    }));

    return NextResponse.json({ news });
  } catch (error) {
    console.error("RSS Fetch Error:", error);

    return NextResponse.json(
      {
        news: [],
        error: "Failed to fetch RSS feed",
      },
      { status: 500 }
    );
  }
}