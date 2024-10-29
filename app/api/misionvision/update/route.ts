import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const { section, texto, imagen } = await request.json();

  const jsonPath = path.join(process.cwd(), "public", "data", "misionVision.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(jsonPath, "utf-8");
  const misionVisionData = JSON.parse(fileContents);

  if (misionVisionData[section]) {
    misionVisionData[section].texto = texto;
    if (imagen) {
      misionVisionData[section].imagen = imagen;
    }
    fs.writeFileSync(jsonPath, JSON.stringify(misionVisionData, null, 2));
  }

  return NextResponse.json({ success: true });
}
