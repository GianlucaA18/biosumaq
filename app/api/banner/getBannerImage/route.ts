import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  const jsonPath = path.join(process.cwd(), "public", "data", "banner.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json({ image: null });
  }

  const fileContents = fs.readFileSync(jsonPath, "utf-8");
  const bannerData = JSON.parse(fileContents);

  if (!bannerData.image || !bannerData.image.startsWith('/img/')) {
    return NextResponse.json({ image: null });
  }

  return NextResponse.json(bannerData);
}
