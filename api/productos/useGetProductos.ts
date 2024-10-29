import { useState, useEffect } from "react";
import { Producto } from "@/types/producto";

export function useGetProductos() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/productos`;
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
                }
                const data: Producto[] = await response.json();
                setProductos(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error desconocido");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [url]);

    return { productos, loading, error };
}
