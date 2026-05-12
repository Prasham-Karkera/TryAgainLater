import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export async function GET(request: Request) {
  // 1. Auth – read user from session cookie
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const useremail = session.user?.email;
  if (!useremail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userid = await prisma.user.findUnique({
    where: { email: useremail },
    select: { user_id: true },
  });

  if (!userid) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const user_id = userid.user_id;

  // 2. Handle from query param
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "Handle is required" }, { status: 400 });
  }

  try {
    // 3. Fetch from Codeforces
    const res = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle}`,
    );
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: data.comment }, { status: 400 });
    }

    // 4. Deduplicate accepted submissions
    const solvedIds = Array.from(
      new Set<string>(
        data.result
          .filter((sub: any) => sub.verdict === "OK")
          .map((sub: any) => `${sub.problem.contestId}${sub.problem.index}`),
      ),
    );

    // 5. Upsert all solved problems — skip failures, collect results
    const results = await Promise.allSettled(
      solvedIds.map((problemId) =>
        prisma.userSolvedQuestion.upsert({
          where: {
            user_id_external_question_id: {
              user_id: user_id,
              external_question_id: "CF" + problemId,
            },
          },
          update: {},
          create: {
            user_id: user_id,
            external_question_id: "CF" + problemId,
          },
        }),
      ),
    );

    // 6. Tally successes and failures
    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results
      .filter((r) => r.status === "rejected")
      .map((r, i) => ({
        problemId: solvedIds[i],
        reason: (r as PromiseRejectedResult).reason?.message ?? "unknown",
      }));

    if (failed.length > 0) {
      console.warn("[codeforces/sync] Some upserts failed:", failed);
    }

    return NextResponse.json({
      success: true,
      solved: solvedIds,
      synced: succeeded,
      failed: failed.length,
    });
  } catch (error) {
    console.error("[codeforces/sync]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
