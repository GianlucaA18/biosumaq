import { Novedad } from "@/types/novedad";

export async function updateNovedad(novedad: Novedad, updatedNovedad: Novedad) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/novedades/${novedad.id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedNovedad),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la novedad.");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}
