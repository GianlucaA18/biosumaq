import { Novedad } from "@/types/novedad";

export async function getNovedadById(id: string): Promise<Novedad | null> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/novedades/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Error fetching evento");
            return null;
        }
        const data: Novedad = await response.json();
        return data;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return null;
    }
}