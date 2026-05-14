// Optimizations over v1:
//  1. last_synced guard  — skip users synced recently (configurable SYNC_INTERVAL_HOURS)
//  2. Semaphore          — capped concurrency (CONCURRENCY=5) instead of sequential or unbounded parallel
//  3. createMany         — one batched INSERT per user instead of N individual creates
//  4. skipDuplicates     — Prisma handles "already exists" at DB level; no pre-fetch needed
//  5. Retry with backoff — transient 429/5xx from external APIs are retried up to 3×
//  6. update last_synced — written back so the next cron run skips fresh users
//
// vercel.json:
//   { "crons": [{ "path": "/api/cron/sync-solved", "schedule": "0 * * * *" }] }
//
// Required env vars:
//   CRON_SECRET            — bearer token checked on every request
//   SYNC_INTERVAL_HOURS    — (optional, default 6) skip users synced more recently than this
//   SYNC_CONCURRENCY       — (optional, default 5) max simultaneous external API calls

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Semaphore } from "@/lib/sync/semaphore";
import { syncLeetCode } from "@/lib/sync/leetcode";
import { syncCodeforces } from "@/lib/sync/codeforces";

// ─── Config ───────────────────────────────────────────────────────────────────

const SYNC_INTERVAL_HOURS = Number(process.env.SYNC_INTERVAL_HOURS ?? 24);
const CONCURRENCY = Number(process.env.SYNC_CONCURRENCY ?? 20);

// ─── Types ────────────────────────────────────────────────────────────────────

export type SyncResult = {
  platform: string;
  handle: string;
  userId: number;
  synced: number;
  skipped: number;
  failed: number;
  error?: string;
};

export async function GET(request: Request) {
  // Auth guard
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = Date.now();
  const staleBefore = new Date(
    Date.now() - SYNC_INTERVAL_HOURS * 60 * 60 * 1000,
  );

  console.log(
    `[cron/sync-solved] starting (interval=${SYNC_INTERVAL_HOURS}h concurrency=${CONCURRENCY})`,
  );

  try {
    // 1. Only load users whose handles haven't been synced recently
    const users = await prisma.user.findMany({
      where: {
        platformHandles: {
          some: {
            last_synced: { lt: staleBefore },
          },
        },
      },
      select: {
        user_id: true,
        platformHandles: {
          where: { last_synced: { lt: staleBefore } },
          select: {
            platform_handle: true,
            platform: { select: { platform_name: true } },
          },
        },
      },
    });

    console.log(`[cron/sync-solved] ${users.length} users with stale handles`);

    // 2. Flatten into jobs
    type Job = {
      userId: number;
      platform: string;
      handle: string;
    };

    const jobs: Job[] = users.flatMap((u) =>
      u.platformHandles.map((h: any) => ({
        userId: u.user_id,
        platform: h.platform.platform_name.toLowerCase(),
        handle: h.platform_handle,
      })),
    );

    // 3. Run with semaphore (capped concurrency — no rate-limit blowup)
    const sem = new Semaphore(CONCURRENCY);
    const results = await Promise.all(
      jobs.map((job) =>
        sem.run(async (): Promise<SyncResult | null> => {
          if (job.platform === "leetcode") {
            return syncLeetCode(job.userId, job.handle);
          }
          if (job.platform === "codeforces") {
            return syncCodeforces(job.userId, job.handle);
          }
          console.warn(`[cron] unknown platform: ${job.platform}`);
          return null;
        }),
      ),
    );

    const valid = results.filter((r): r is SyncResult => r !== null);

    // 4. Update last_synced for all processed handles
    //    One updateMany call per (userId, platformName) pair
    const successfulJobKeys = jobs
      .filter((_, i) => results[i] && !results[i]?.error)
      .map((j) => ({ userId: j.userId, platform: j.platform }));

    if (successfulJobKeys.length > 0) {
      // Batch update: one write per unique platform name
      const byPlatform = successfulJobKeys.reduce<Record<string, number[]>>(
        (acc, { userId, platform }) => {
          acc[platform] = acc[platform] ?? [];
          acc[platform].push(userId);
          return acc;
        },
        {},
      );

      await Promise.all(
        Object.entries(byPlatform).map(([platformName, userIds]) =>
          prisma.userPlatformHandle.updateMany({
            where: {
              user_id: { in: userIds },
              platform: {
                platform_name: {
                  equals: platformName,
                  mode: "insensitive",
                },
              },
            },
            data: { last_synced: new Date() },
          }),
        ),
      );
    }

    // 5. Summary
    const summary = {
      durationMs: Date.now() - startedAt,
      totalJobs: valid.length,
      totalSynced: valid.reduce((a, r) => a + r.synced, 0),
      totalSkipped: valid.reduce((a, r) => a + r.skipped, 0),
      totalFailed: valid.reduce((a, r) => a + r.failed, 0),
      errors: valid
        .filter((r) => r.error)
        .map((r) => ({
          platform: r.platform,
          handle: r.handle,
          error: r.error,
        })),
    };

    console.log("[cron/sync-solved] done", summary);
    return NextResponse.json({ success: true, ...summary });
  } catch (err) {
    console.error("[cron/sync-solved] fatal:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
