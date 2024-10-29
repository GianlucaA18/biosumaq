import { Producto } from "@/types/producto";

export async function addProducto(producto: Producto): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/productos`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto),
        });

        if (!response.ok) {
            console.error("Error al agregar el producto.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return false;
    }
}
