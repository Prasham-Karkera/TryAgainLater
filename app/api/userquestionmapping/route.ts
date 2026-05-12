import { prisma } from "@/lib/prisma";
import axios from "axios";

import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const { user_id, leetcode_id, codeforces_id } = await request.json();
  const leetcode_data = await axios.get("api/leetcode?username=" + leetcode_id);
  return NextResponse.json({
    message: user_id + " " + leetcode_id + " " + codeforces_id,
  });
}
