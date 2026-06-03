import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("job_posts")
      .select("*")
      .order("first_seen_at", { ascending: false })
      .limit(5);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      updated_at: new Date().toISOString(),
      total: data.length,
      jobs: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch latest jobs",
      },
      { status: 500 }
    );
  }
}