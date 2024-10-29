import { Producto } from "@/types/producto";

export async function getProductoById(id: string): Promise<Producto | null> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/productos/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Error fetching product");
            return null;
        }
        const data: Producto = await response.json();
        return data;
    } catch (error) {
        console.error("Error de conexión: ", error);
        return null;
    }
}