import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const EXTENSION_SECRET = process.env.EXTENSION_SECRET ;
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    const { secret } = await req.json();

    if (secret !== EXTENSION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Issue a token valid for 24 hours
    const token = jwt.sign({ origin: "chrome-extension" }, JWT_SECRET, { expiresIn: '24h' });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}