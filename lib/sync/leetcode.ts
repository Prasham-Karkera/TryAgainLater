import { SyncResult } from "@/app/api/cronjob/route";
import { prisma } from "@/lib/prisma";
import { withRetry } from "./retry";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

type LeetCodeQuestion = {
  questionId?: string;
  title: string;
  titleSlug: string;
};

export async function fetchLeetCodeSolved(handle: string): Promise<string[]> {
  // Step 1: recent accepted submissions (max 20 from this API)
  const recentQuery = `
    query recentAcSubmissions($username: String!) {
      recentAcSubmissionList(username: $username) { titleSlug }
    }
  `;

  const url = new URL(LEETCODE_GRAPHQL_URL);
  url.searchParams.set("query", recentQuery);
  url.searchParams.set(
    "variables",
    JSON.stringify({ username: handle.toLowerCase() }),
  );

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "application/json, text/plain, */*",
    },
  });

  if (!res.ok) throw new Error(`LeetCode HTTP ${res.status}`);

  const json = (await res.json()) as {
    data?: { recentAcSubmissionList: { titleSlug: string }[] };
    errors?: { message: string }[];
  };

  if (json.errors?.length) throw new Error(json.errors[0].message);

  const slugs = Array.from(
    new Map(
      (json.data?.recentAcSubmissionList ?? []).map((s) => [s.titleSlug, s]),
    ).values(),
  ).slice(0, 20);

  if (!slugs.length) return [];

  // Step 2: batch fetch question IDs
  const batchQuery = `
    query questionDataBatch {
      ${slugs
        .map(
          (s, i) => `
          question${i}: question(titleSlug: ${JSON.stringify(s.titleSlug)}) {
            questionId titleSlug
          }
        `,
        )
        .join("\n")}
    }
  `;

  const batchUrl = new URL(LEETCODE_GRAPHQL_URL);
  batchUrl.searchParams.set("query", batchQuery);

  const batchRes = await fetch(batchUrl, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "application/json, text/plain, */*",
    },
  });

  if (!batchRes.ok) throw new Error(`LeetCode batch HTTP ${batchRes.status}`);

  const batchJson = (await batchRes.json()) as {
    data?: Record<string, LeetCodeQuestion>;
  };

  return Object.values(batchJson.data ?? {})
    .filter(Boolean)
    .map((q) => (q.questionId = `LC_${q.titleSlug}`));
}

export async function syncLeetCode(
  userId: number,
  handle: string,
): Promise<SyncResult> {
  const base: SyncResult = {
    platform: "leetcode",
    handle,
    userId,
    synced: 0,
    skipped: 0,
    failed: 0,
  };

  try {
    const externalIds = await withRetry(() => fetchLeetCodeSolved(handle));

    if (!externalIds.length) {
      return { ...base, error: "No accepted submissions found" };
    }

    // createMany with skipDuplicates — one INSERT, DB handles conflict
    const result = await prisma.userSolvedQuestion.createMany({
      data: externalIds.map((id) => ({
        user_id: userId,
        external_question_id: id,
      })),
      skipDuplicates: true, // ← replaces the pre-fetch + filter pattern
    });

    base.synced = result.count;
    base.skipped = externalIds.length - result.count;

    console.log(
      `[leetcode] ${handle}: synced=${base.synced} skipped=${base.skipped}`,
    );
    return base;
  } catch (err) {
    console.error(`[leetcode] ${handle}:`, err);
    return {
      ...base,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
