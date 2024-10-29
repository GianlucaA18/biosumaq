import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const { platform, url } = await req.json();

        const filePath = path.join(process.cwd(), 'public/data/redes.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        if (data[platform]) {
            data[platform] = url;
        } else {
            return NextResponse.json({}, { status: 400 });
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({});
    } catch (error) {
        console.error("Error en la API de actualización:", error);
        return NextResponse.json({}, { status: 500 });
    }
}

