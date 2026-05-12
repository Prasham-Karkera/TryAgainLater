import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

interface Question {
  problemId: string;
  titleSlug: string;
  title: string;
  difficulty: string;
}

export async function POST(req: Request) {
  const secret = req.headers.get("x-bridge-secret");
  const REQUIRED_SECRET = "my_simple_bridge_password";

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

  // console.log(userid.user_id);

  // 1. Simple Guard
  if (secret !== REQUIRED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const questionsuser = await req.json();
    const user_id = userid.user_id;

    const questions = questionsuser.problems;

    const results = await Promise.allSettled(
      questions.map((problemId: Question) =>
        prisma.userSolvedQuestion.upsert({
          where: {
            user_id_external_question_id: {
              user_id: user_id,
              external_question_id: "LC_" + problemId.titleSlug,
            },
          },
          update: {},
          create: {
            user_id: user_id,
            external_question_id: "LC_" + problemId.titleSlug,
          },
        }),
      ),
    );

    // 6. Tally successes and failures
    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results
      .filter((r) => r.status === "rejected")
      .map((r, i) => ({
        problemId: "LC_" + questions[i].titleSlug,
        reason: (r as PromiseRejectedResult).reason?.message ?? "unknown",
      }));

    if (failed.length > 0) {
      console.warn("[leetcode/sync] Some upserts failed:", failed);
    }

    console.log(`✅ Data synced for ${user_id}`);

    return NextResponse.json({
      success: true,
      solved: questions.length,
      synced: succeeded,
      failed: failed.length,
    });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
