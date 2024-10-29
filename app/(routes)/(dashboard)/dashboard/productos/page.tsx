"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TablaProductos from "./components/tablaProducto";
import { Producto } from "@/types/producto";
import { PlusIcon } from "lucide-react";
import { useGetProductos } from "@/api/productos/useGetProductos";
import AgregarProducto from "./components/agregarProducto";

const SeccionProductos = () => {
    const { productos: fetchedProductos, loading, error } = useGetProductos();
    const [productos, setProductos] = useState<Producto[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (fetchedProductos) {
            setProductos(fetchedProductos);
        }
    }, [fetchedProductos]);

    const mostrarToast = (mensaje: string) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage(null);
        }, 3000);
    };

    const handleSaveProducto = (producto: Producto) => {
        const isEdit = productos.some((p) => p.id === producto.id);

        if (isEdit) {
            setProductos((prev: Producto[]) =>
                prev.map((p: Producto) => (p.id === producto.id ? producto : p))
            );
            mostrarToast("El producto ha sido editado correctamente.");
        } else {
            setProductos((prev: Producto[]) => [...prev, producto]);
            mostrarToast("Se agregó un nuevo producto.");
        }
    };

    const actualizarDestacados = (productosList: Producto[]) => {
        // Lógica para actualizar destacados, si es necesario
    };

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Gestión de Productos</h1>
                <AgregarProducto
                    productos={productos}
                    onSave={handleSaveProducto}
                    onUpdateDestacados={actualizarDestacados}
                >
                    <Button>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Agregar Producto
                    </Button>
                </AgregarProducto>
            </div>

            <TablaProductos productos={productos} setProductos={setProductos} />
        </div>
    );
};

export default SeccionProductos;
