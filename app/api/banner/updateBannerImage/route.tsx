import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const { image } = await request.json();

  const jsonPath = path.join(process.cwd(), "public", "data", "banner.json");
  const bannerData = { image };

  fs.writeFileSync(jsonPath, JSON.stringify(bannerData, null, 2));

  return NextResponse.json({ success: true });
}
