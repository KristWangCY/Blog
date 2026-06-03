import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type WorkdayJob = {
  title?: string;
  locationsText?: string;
  externalPath?: string;
  postedOn?: string;
  bulletFields?: string[];
};

export async function GET() {
  const endpoint =
    "https://mastercard.wd1.myworkdayjobs.com/wday/cxs/mastercard/CorporateCareers/jobs";

  const now = new Date().toISOString();

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        appliedFacets: {},
        limit: 50,
        offset: 0,
        searchText: "Dublin",
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Mastercard jobs" },
        { status: 500 }
      );
    }

    const data = await res.json();

    const jobs =
      data.jobPostings
        ?.map((job: WorkdayJob) => {
          if (!job.title || !job.externalPath) return null;

          const location =
            job.locationsText ||
            job.bulletFields?.find((field) =>
              field.toLowerCase().includes("dublin")
            ) ||
            "Dublin, Ireland";

          const url = `https://mastercard.wd1.myworkdayjobs.com/en-US/CorporateCareers${job.externalPath}`;

          return {
            company: "Mastercard",
            title: job.title,
            location,
            url,
            source: "mastercard_workday",
            posted_at: job.postedOn || null,
            last_seen_at: now,
          };
        })
        .filter(Boolean) ?? [];

    const dublinJobs = jobs.filter((job: any) =>
      `${job.location} ${job.title}`.toLowerCase().includes("dublin")
    );

    const savedJobs = [];

    for (const job of dublinJobs) {
      const { data: existing, error: selectError } = await supabase
        .from("job_posts")
        .select("id")
        .eq("url", job.url)
        .maybeSingle();

      if (selectError) {
        console.error(selectError);
        continue;
      }

      if (existing) {
        const { data: updated } = await supabase
          .from("job_posts")
          .update({
            title: job.title,
            location: job.location,
            posted_at: job.posted_at,
            last_seen_at: now,
            is_new: false,
          })
          .eq("url", job.url)
          .select()
          .single();

        if (updated) savedJobs.push(updated);
      } else {
        const { data: inserted } = await supabase
          .from("job_posts")
          .insert({
            ...job,
            first_seen_at: now,
            is_new: true,
          })
          .select()
          .single();

        if (inserted) savedJobs.push(inserted);
      }
    }

    return NextResponse.json({
      company: "Mastercard",
      location: "Dublin",
      source: "mastercard_workday",
      scanned_at: now,
      found: dublinJobs.length,
      saved: savedJobs.length,
      jobs: savedJobs,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unexpected error while scanning Mastercard jobs",
      },
      { status: 500 }
    );
  }
}