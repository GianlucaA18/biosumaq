export async function deleteNovedad(id: number): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/novedades/${id}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("Error al eliminar la novedad.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}