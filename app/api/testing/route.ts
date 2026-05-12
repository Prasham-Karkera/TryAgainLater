import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.platform.findMany();

  return NextResponse.json({ message: data });
}
