"use client";

import { useEffect, useState } from "react";
import { ToastProvider } from "@/components/ui/toast"; // Asegúrate de tener este componente
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditRedSocial from "../../components/editRedSocialTab";

type RedesData = {
    whatsapp: string;
    instagram: string;
    facebook: string;
};

const EditRedes = () => {
    const [data, setData] = useState<RedesData>({
        whatsapp: "",
        instagram: "",
        facebook: ""
    });
    const [toastMessage, setToastMessage] = useState<string | null>(null); // Estado para el mensaje del toast
    const [showToast, setShowToast] = useState(false); // Estado para controlar la visibilidad del toast

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/redes/get");
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result: RedesData = await res.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setToastMessage("Error al cargar los datos.");
                setShowToast(true);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (platform: keyof RedesData) => {
        try {
            const res = await fetch("/api/redes/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    platform,
                    url: data[platform],
                }),
            });

            if (!res.ok) {
                throw new Error("Error al actualizar el enlace."); // Mensaje de error personalizado
            }

            setToastMessage("Enlace actualizado correctamente."); // Mensaje de éxito
        } catch (error) {
            console.error("Failed to update data:", error);
            setToastMessage("Error al actualizar el enlace."); // Mensaje de error
        }

        // Mostrar el toast
        setShowToast(true);

        // Ocultar el toast después de unos segundos
        setTimeout(() => {
            setShowToast(false);
        }, 3000); // El toast desaparecerá después de 3 segundos
    };

    return (
        <ToastProvider> {/* Proveedor de toast */}
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Editar Redes Sociales</h2>
                <Tabs>
                    <TabsList>
                        <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                        <TabsTrigger value="instagram">Instagram</TabsTrigger>
                        <TabsTrigger value="facebook">Facebook</TabsTrigger>
                    </TabsList>

                    <TabsContent value="whatsapp">
                        <EditRedSocial
                            platform="whatsapp"
                            url={data.whatsapp}
                            handleChange={(value) => setData({ ...data, whatsapp: value })}
                            handleSubmit={() => handleSubmit('whatsapp')}
                        />
                    </TabsContent>

                    <TabsContent value="instagram">
                        <EditRedSocial
                            platform="instagram"
                            url={data.instagram}
                            handleChange={(value) => setData({ ...data, instagram: value })}
                            handleSubmit={() => handleSubmit('instagram')}
                        />
                    </TabsContent>

                    <TabsContent value="facebook">
                        <EditRedSocial
                            platform="facebook"
                            url={data.facebook}
                            handleChange={(value) => setData({ ...data, facebook: value })}
                            handleSubmit={() => handleSubmit('facebook')}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Componente Toast */}
            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}
        </ToastProvider>
    );
};

export default EditRedes;
