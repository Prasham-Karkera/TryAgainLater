import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contestSlug = searchParams.get('contestSlug');

  // FIND THESE IN YOUR BROWSER (Network Tab -> Headers)
  const CSRF_TOKEN = "6Q4BWr75YDzwBUcLOqZQkjY8JSP0l06q"; 
  const LEETCODE_SESSION = "YOUR_SESSION_COOKIE"; // Only if you want access to premium/private data

  const INFO_URL = `https://leetcode.com/contest/api/info/${contestSlug}/`;

  try {
    const response = await fetch(INFO_URL, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": `https://leetcode.com/contest/${contestSlug}/`,
        "Cookie": `csrftoken=${CSRF_TOKEN};`, 
        "x-csrftoken": CSRF_TOKEN,
        "x-requested-with": "XMLHttpRequest",
        "sec-ch-ua": '"Not A(Byte;Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
    });

    if (response.status === 403) {
      console.error("❌ 403 Forbidden: Cloudflare is blocking the server IP.");
      return NextResponse.json({ error: "Access Denied by LeetCode. Your Server IP might be flagged." }, { status: 403 });
    }

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const data = await response.json();
    
    // ... rest of your mapping logic
    return NextResponse.json({ success: true, problems: data.questions });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}