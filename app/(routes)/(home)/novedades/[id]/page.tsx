"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/clientes/navbar";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import { Novedad } from "@/types/novedad";
import { formatearFecha } from "@/types/fecha";
import { getNovedadById } from "@/api/novedades/getNovedadById";

const InfoNovedades = ({ params }: { params: { id: string } }) => {
    const [evento, setEvento] = useState<Novedad | null>(null);
    const { id } = params;

    useEffect(() => {
        const fetchEvento = async () => {
            if (id) {
                const data = await getNovedadById(id);
                setEvento(data);
            }
        };

        fetchEvento();
    }, [id]);

    if (!evento) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <Redes />
            <div className="flex flex-col items-center justify-center p-6 my-6">
                <div>
                    <img
                        src={evento.imagen}
                        alt="Imagen del evento"
                        className="w-[1000px] h-[500px] object-cover mx-auto rounded-md"
                    />
                </div>
                <div className="mt-4 text-center w-[1000px]">
                    <h2 className="text-3xl font-bold mb-2">{evento.titulo}</h2>
                    <span className="text-sm text-gray-500">{formatearFecha(evento.fecha)}</span>
                    <p className="text-justify">{evento.info}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default InfoNovedades;