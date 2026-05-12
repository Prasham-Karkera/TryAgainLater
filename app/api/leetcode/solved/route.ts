import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'sessions.json');
    
    // 1. Check if the session file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "No sync data found. Please use the Extension first." }, { status: 404 });
    }

    const sessions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const userData = sessions[username.toLowerCase()];

    // 2. Check if this specific user has pushed data
    if (!userData || !userData.problems) {
      return NextResponse.json({ error: `No data found for user: ${username}` }, { status: 404 });
    }

    // 3. Map the cached problems to the format your Frontend expects
    const solved = userData.problems.map((p) => ({
      problemId: p.problemId || `LC_${p.id}`,
      title: p.title,
      titleSlug: p.titleSlug || p.slug,
      // Handle the 1/2/3 difficulty levels from LeetCode REST API
      difficulty: p.difficulty === 3 ? "Hard" : p.difficulty === 2 ? "Medium" : "Easy"
    }));

    console.log(`📖 Reading Cache: Found ${solved.length} problems for ${username}`);

    return NextResponse.json({
      success: true,
      username: username,
      count: solved.length,
      problemIds: solved // Frontend expects this key
    });

  } catch (error) {
    console.error("Solved Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}