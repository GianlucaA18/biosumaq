"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from "@/components/clientes/navbar";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import ImgProducto from '../components/imgProducto';
import InfoProducto from '../components/infoProducto';
import { getProductoById } from '@/api/productos/getProductoById';
import { Producto } from "@/types/producto";

const PageInfoProductos = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState<Producto | null>(null);

    useEffect(() => {
        if (Array.isArray(id)) {
            console.error("El id no debe ser un array.");
            return;
        }

        if (id) {
            const fetchProducto = async () => {
                const data = await getProductoById(id);
                setProducto(data);
            };

            fetchProducto();
        }
    }, [id]);

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <Navbar />
            <Redes />
            <div className="w-full max-w-7xl mx-auto my-20 p-4">
                <div className="grid sm:grid-cols-2 rounded-lg p-10 gap-10 sm:gap-12">
                    <div className="">
                        <ImgProducto imagen={producto.imagen} />
                    </div>
                    <div className="">
                        <InfoProducto
                            nombre={producto.nombre}
                            precio={producto.precio}
                            descripcion={producto.descripcion}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PageInfoProductos;
