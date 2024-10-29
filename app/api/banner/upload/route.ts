import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File | null;
  const type = data.get("type") as string;

  if (!file || !type) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const directoryPath = path.join(process.cwd(), "public", "img");
  const filePath = path.join(directoryPath, file.name);

  // agregar lógica aquí para manejar diferentes tipos.
  await writeFile(filePath, buffer);

  return NextResponse.json({ success: true, filePath: `/img/${file.name}` });
}
