import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get('handle');

  if (!handle) return NextResponse.json({ error: "Handle is required" }, { status: 400 });

  try {
    const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: data.comment }, { status: 400 });
    }

    // Filter for unique Accepted problem IDs
    const solvedIds = Array.from(new Set(
      data.result
        .filter((sub: any) => sub.verdict === "OK")
        .map((sub: any) => `${sub.problem.contestId}${sub.problem.index}`)
    ));

    return NextResponse.json({ 
      handle, 
      count: solvedIds.length, 
      problemIds: solvedIds 
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}