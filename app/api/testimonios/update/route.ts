import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  const { id, nombre, testimonio, avatar } = await request.json();

  const jsonPath = path.join(process.cwd(), "public", "data", "testimonios.json");

  if (!fs.existsSync(jsonPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileContents = fs.readFileSync(jsonPath, "utf-8");
  const testimonios = JSON.parse(fileContents);

  const index = testimonios.findIndex((item: { id: number }) => item.id === id);
  if (index !== -1) {
    testimonios[index] = { id, nombre, testimonio, avatar };
    fs.writeFileSync(jsonPath, JSON.stringify(testimonios, null, 2));
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Testimonio not found" }, { status: 404 });
}
