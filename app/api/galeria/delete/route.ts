import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
    const { imageName } = await request.json();

    const imgPath = path.join(process.cwd(), "public", "img", imageName);

    if (!fs.existsSync(imgPath)) {
        return NextResponse.json({ success: false, message: "Imagen no encontrada" });
    }

    try {
        fs.unlinkSync(imgPath);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error al eliminar la imagen" });
    }
}
