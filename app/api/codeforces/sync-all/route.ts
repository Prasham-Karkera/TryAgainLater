import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://codeforces.com/api/problemset.problems');
    const data = await res.json();

    if (data.status !== "OK") throw new Error("CF API Error");

    // Codeforces returns 'problems' and 'problemStatistics' separately
    const allProblems = data.result.problems.map((p: any) => ({
      problemId: `${p.contestId}${p.index}`,
      title: p.name,
      rating: p.rating || 0, // Some problems don't have ratings
      tags: p.tags,
      url: `https://codeforces.com/contest/${p.contestId}/problem/${p.index}`
    }));

    // In production, you would perform a Prisma upsert here
    // await db.problem.upsertMany(...) 

    return NextResponse.json({ count: allProblems.length, sample: allProblems.slice(0, 5) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to sync bank" }, { status: 500 });
  }
}