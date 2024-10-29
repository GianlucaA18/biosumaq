import { useState, useEffect } from "react";
import { Novedad } from "@/types/novedad";

export function useGetNovedades() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/novedades`;
    const [novedades, setNovedades] = useState<Novedad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchNovedades = async () => {
            try {
                const response = await fetch(url);
                const data: Novedad[] = await response.json();

                const novedadesOrdenadas = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

                setNovedades(novedadesOrdenadas);
                setLoading(false);
            } catch (err: any) {
                setError("Error al obtener las novedades");
                setLoading(false);
            }
        };

        fetchNovedades();
    }, [url]);

    return { novedades, loading, error };
}
