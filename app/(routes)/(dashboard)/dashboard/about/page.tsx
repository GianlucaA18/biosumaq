"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditAboutTab from "../../components/editAboutTab";
import EditSection from "../../components/EditSection";
import { ToastProvider } from "@/components/ui/toast"; // Asegúrate de tener este componente

const EditAbout = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null); // Estado para el mensaje del toast
  const [showToast, setShowToast] = useState(false); // Estado para controlar la visibilidad del toast
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    seccion1: null,
    seccion2: null,
  });
  const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>({
    seccion1: "",
    seccion2: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/about/get");
        const data = await res.json();
        setAboutData(data);
        setPreviewImages({
          seccion1: data.seccion1.imagen,
          seccion2: data.seccion2.imagen,
        });
      } catch (err) {
        setError("Error al cargar la información");
      }
    };
    fetchData();
  }, []);

  const handleTextChange = async (section: string, texto: string, imagen?: string) => {
    try {
      const res = await fetch("/api/about/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section,
          texto,
          imagen,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar la sección");
      }
      setToastMessage(`Se ha actualizado correctamente la sección ${section}`); // Establecer el mensaje del toast
      setShowToast(true); // Mostrar el toast

      setTimeout(() => {
        setShowToast(false); // Ocultar el toast después de unos segundos
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar");
    }
  };

  const handleImageUpload = async (section: string) => {
    const file = files[section];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", section);

    try {
      const res = await fetch("/api/about/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error al subir la imagen");
      }

      const response = await res.json();
      return response.filePath;
    } catch (err) {
      console.error(err);
      setError("Error al subir la imagen");
      return null;
    }
  };

  const handleUpdate = async (section: string) => {
    const imagePath = await handleImageUpload(section);
    await handleTextChange(section, aboutData[section].texto, imagePath);
    setFiles({ ...files, [section]: null });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, section: string) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFiles({ ...files, [section]: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => ({
          ...prev,
          [section]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <ToastProvider>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar "Quienes Somos"</h2>
        <Tabs>
          <TabsList>
            <TabsTrigger value="quienesSomos">Quienes Somos</TabsTrigger>
            <TabsTrigger value="seccion1">Sección 1</TabsTrigger>
            <TabsTrigger value="seccion2">Sección 2</TabsTrigger>
          </TabsList>
          <TabsContent value="quienesSomos">
            <EditAboutTab
              aboutData={aboutData}
              handleTextChange={(texto) => setAboutData({ ...aboutData, quienesSomos: { ...aboutData.quienesSomos, texto } })}
              handleSubmit={() => handleUpdate("quienesSomos")}
            />
          </TabsContent>
          <TabsContent value="seccion1">
            <EditSection
              sectionName="Sección 1"
              sectionData={aboutData?.seccion1}
              previewImage={previewImages.seccion1}
              handleTextChange={(texto) => setAboutData({ ...aboutData, seccion1: { ...aboutData.seccion1, texto } })}
              handleFileUpload={(e) => handleFileChange(e, "seccion1")}
              handleSubmit={() => handleUpdate("seccion1")}
            />
          </TabsContent>
          <TabsContent value="seccion2">
            <EditSection
              sectionName="Sección 2"
              sectionData={aboutData?.seccion2}
              previewImage={previewImages.seccion2}
              handleTextChange={(texto) => setAboutData({ ...aboutData, seccion2: { ...aboutData.seccion2, texto } })}
              handleFileUpload={(e) => handleFileChange(e, "seccion2")}
              handleSubmit={() => handleUpdate("seccion2")}
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

export default EditAbout;
