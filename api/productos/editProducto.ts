import { Producto } from "@/types/producto";

export async function editProducto(producto: Producto, updatedProducto: Producto) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/productos/${producto.id}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProducto),
        });

        if (!response.ok) {
            throw new Error("Error al editar el producto.");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}
