"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ToastProvider } from "@/components/ui/toast";

const Galeria = () => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    // Obtener las imágenes al cargar el componente
    useEffect(() => {
        const fetchImages = async () => {
            const res = await fetch("/api/galeria/get");
            const data = await res.json();
            setImages(data.images);
        };

        fetchImages();
    }, []);

    // Función para eliminar imagen
    const handleDelete = async () => {
        if (!selectedImage) return;

        const res = await fetch("/api/galeria/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageName: selectedImage }),
        });

        const result = await res.json();

        if (result.success) {
            setImages((prevImages) => prevImages.filter((img) => img !== selectedImage));
            setSelectedImage(null);
            setToastMessage("Imagen eliminada correctamente");
        } else {
            setToastMessage("Error al eliminar la imagen");
        }

        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <ToastProvider>
            <div className="p-4 h-full">
                <h2 className="text-xl font-bold mb-2">Galería de Imágenes</h2>
                <div className="overflow-y-auto scrollbar-hide h-[87vh] p-2 border border-gray-300 rounded-lg dark:bg-slate-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                            <div
                                key={image}
                                className="relative flex justify-center items-center bg-gray-200 rounded-lg w-full h-64"
                            >
                                <img
                                    src={`/img/${image}`}
                                    alt={image}
                                    className="object-contain w-full h-full rounded-lg"
                                />
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            onClick={() => setSelectedImage(image)}
                                            className="absolute top-2 right-2 bg-red-500 text-white border border-gray-300  py-1 px-2 rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>¿Deseas eliminar esta imagen?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción no se puede deshacer. La imagen será eliminada de forma permanente.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                                className="bg-red-500 text-white hover:bg-red-600"
                                            >
                                                Eliminar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}
        </ToastProvider>
    );
};

export default Galeria;
