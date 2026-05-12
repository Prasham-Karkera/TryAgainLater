import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const secret = req.headers.get('x-bridge-secret');
  const REQUIRED_SECRET = "my_simple_bridge_password";

  // 1. Simple Guard
  if (secret !== REQUIRED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'sessions.json');
    
    let store: any = {};
    if(fs.existsSync(filePath)){
      store = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    // 2. Update Store
    store[data.username] = {
      problems: data.problems,
      lastSync: new Date().toISOString()
    };

    fs.writeFileSync(filePath, JSON.stringify(store, null, 2));

    console.log(`✅ Data synced for ${data.username}`);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}