import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "redes.json");

        const fileContents = await fs.readFile(filePath, "utf8");

        const redes = JSON.parse(fileContents);

        return NextResponse.json(redes);
    } catch (error) {
        return new NextResponse("Error al leer el archivo JSON", { status: 500 });
    }
}
