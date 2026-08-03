import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/api-security";
import { fetchMastercardJobs } from "@/lib/jobs";

export async function GET(request: Request) {
  const rateLimit = checkRateLimit(request, "latest-jobs", 60, 60 * 60 * 1000);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  try {
    const jobs = (await fetchMastercardJobs()).slice(0, 5);

    return NextResponse.json({
      updated_at: new Date().toISOString(),
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("LATEST_JOBS_ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch latest jobs", jobs: [] },
      { status: 502 }
    );
  }
}
