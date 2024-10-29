import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const { beneficios } = await request.json();

  const jsonPath = path.join(process.cwd(), "public", "data", "beneficios.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(beneficios, null, 2));

  return NextResponse.json({ success: true });
}
