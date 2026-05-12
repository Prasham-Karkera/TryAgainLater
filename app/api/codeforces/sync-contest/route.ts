import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contestId = searchParams.get('contestId');

  if (!contestId) return NextResponse.json({ error: "contestId is required" }, { status: 400 });

  try {
    // Fetch contest standings with count=1 to get the problem metadata only
    const res = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1`);
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: data.comment }, { status: 400 });
    }

    const problems = data.result.problems.map((p: any) => ({
      problemId: `${p.contestId}${p.index}`,
      title: p.name,
      rating: p.rating || 0,
      tags: p.tags,
      link: `https://codeforces.com/contest/${p.contestId}/problem/${p.index}`
    }));

    return NextResponse.json({
      contestName: data.result.contest.name,
      problems: problems
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contest data" }, { status: 500 });
  }
}