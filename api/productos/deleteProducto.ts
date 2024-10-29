export async function deleteProducto(id: number): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/productos/${id}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        if (!response.ok) {
            console.error("Error al eliminar el producto.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}