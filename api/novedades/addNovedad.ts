import { Novedad } from "@/types/novedad";

export async function addNovedad(novedad: Novedad): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/novedades`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novedad),
        });

        if (!response.ok) {
            console.error("Error al agregar la novedad.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}
