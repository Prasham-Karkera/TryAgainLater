import { SyncResult } from "@/app/api/cronjob/route";
import { withRetry } from "./retry";
import { prisma } from "@/lib/prisma";

export async function fetchCodeforcesSolved(handle: string): Promise<string[]> {
  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}`,
  );
  const data = await res.json();

  if (data.status !== "OK") {
    throw new Error(data.comment ?? "Codeforces API error");
  }

  return Array.from(
    new Set<string>(
      (data.result as any[])
        .filter((sub) => sub.verdict === "OK")
        .map((sub) => `CF${sub.problem.contestId}${sub.problem.index}`),
    ),
  );
}

export async function syncCodeforces(
  userId: number,
  handle: string,
): Promise<SyncResult> {
  const base: SyncResult = {
    platform: "codeforces",
    handle,
    userId,
    synced: 0,
    skipped: 0,
    failed: 0,
  };

  try {
    const externalIds = await withRetry(() => fetchCodeforcesSolved(handle));

    if (!externalIds.length) {
      return { ...base, error: "No accepted submissions found" };
    }

    // Same pattern: createMany with skipDuplicates
    const result = await prisma.userSolvedQuestion.createMany({
      data: externalIds.map((id) => ({
        user_id: userId,
        external_question_id: id,
      })),
      skipDuplicates: true,
    });

    base.synced = result.count;
    base.skipped = externalIds.length - result.count;

    console.log(
      `[codeforces] ${handle}: synced=${base.synced} skipped=${base.skipped}`,
    );
    return base;
  } catch (err) {
    console.error(`[codeforces] ${handle}:`, err);
    return {
      ...base,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
