import { Producto } from "@/types/producto";

export async function removeOldestDestacado(productoAMover: Producto) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/productos/${productoAMover.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...productoAMover, destacado: false }),
        });

        if (!response.ok) {
            throw new Error("Error al quitar el producto de destacados");
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}