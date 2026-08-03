export type Job = {
  company: string;
  title: string;
  location: string;
  url: string;
  source: string;
  posted_at: string | null;
  first_seen_at: string;
};

type WorkdayJob = {
  title?: string;
  locationsText?: string;
  externalPath?: string;
  postedOn?: string;
  bulletFields?: string[];
};

type WorkdayResponse = {
  jobPostings?: WorkdayJob[];
};

const endpoint =
  "https://mastercard.wd1.myworkdayjobs.com/wday/cxs/mastercard/CorporateCareers/jobs";

export async function fetchMastercardJobs(): Promise<Job[]> {
  const response = await fetch(endpoint, {
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
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`Workday request failed with status ${response.status}`);
  }

  const data = (await response.json()) as WorkdayResponse;
  const fetchedAt = new Date().toISOString();

  return (data.jobPostings ?? [])
    .flatMap((job): Job[] => {
      if (!job.title || !job.externalPath) {
        return [];
      }

      const location =
        job.locationsText ||
        job.bulletFields?.find((field) =>
          field.toLowerCase().includes("dublin")
        ) ||
        "Dublin, Ireland";

      if (!`${location} ${job.title}`.toLowerCase().includes("dublin")) {
        return [];
      }

      return [
        {
          company: "Mastercard",
          title: job.title,
          location,
          url: `https://mastercard.wd1.myworkdayjobs.com/en-US/CorporateCareers${job.externalPath}`,
          source: "mastercard_workday",
          posted_at: job.postedOn || null,
          first_seen_at: job.postedOn || fetchedAt,
        },
      ];
    });
}
