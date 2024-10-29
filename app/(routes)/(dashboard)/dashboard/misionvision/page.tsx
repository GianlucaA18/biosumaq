"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditSection from "../../components/EditSection";
import { ToastProvider } from "@/components/ui/toast"; // Asegúrate de que este componente exista

type SectionData = {
  texto: string;
  imagen: string;
};

type MisionVisionData = {
  mision: SectionData;
  vision: SectionData;
  valores: SectionData;
};

const EditMisionVision = () => {
  const [data, setData] = useState<MisionVisionData>({
    mision: { texto: "", imagen: "" },
    vision: { texto: "", imagen: "" },
    valores: { texto: "", imagen: "" },
  });

  const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>({
    mision: "",
    vision: "",
    valores: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/misionvision/get");
      const result = await res.json();
      setData(result);
      setPreviewImages({
        mision: result.mision.imagen,
        vision: result.vision.imagen,
        valores: result.valores.imagen,
      });
    };

    fetchData();
  }, []);

  const handleSubmit = async (section: keyof MisionVisionData) => {
    const res = await fetch("/api/misionvision/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        section,
        texto: data[section].texto,
        imagen: data[section].imagen,
      }),
    });
    if (res.ok) {
      setToastMessage("Datos guardados correctamente");
    } else {
      setToastMessage("Error al guardar los datos");
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // El toast desaparecerá después de 3 segundos
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: keyof MisionVisionData) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("type", section);
      const res = await fetch("/api/misionvision/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setData((prev) => ({
          ...prev,
          [section]: { ...prev[section], imagen: result.filePath },
        }));
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prev) => ({
            ...prev,
            [section]: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setToastMessage("Error al subir la imagen");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    }
  };

  return (
    <ToastProvider>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Editar Misión, Visión y Valores</h2>
        <Tabs>
          <TabsList>
            <TabsTrigger value="mision">Misión</TabsTrigger>
            <TabsTrigger value="vision">Visión</TabsTrigger>
            <TabsTrigger value="valores">Valores</TabsTrigger>
          </TabsList>

          <TabsContent value="mision">
            <EditSection
              sectionName="Misión"
              sectionData={data.mision}
              previewImage={previewImages.mision}
              handleTextChange={(value) =>
                setData({ ...data, mision: { ...data.mision, texto: value } })
              }
              handleFileUpload={(e) => handleFileUpload(e, "mision")}
              handleSubmit={() => handleSubmit("mision")}
            />
          </TabsContent>

          <TabsContent value="vision">
            <EditSection
              sectionName="Visión"
              sectionData={data.vision}
              previewImage={previewImages.vision}
              handleTextChange={(value) =>
                setData({ ...data, vision: { ...data.vision, texto: value } })
              }
              handleFileUpload={(e) => handleFileUpload(e, "vision")}
              handleSubmit={() => handleSubmit("vision")}
            />
          </TabsContent>

          <TabsContent value="valores">
            <EditSection
              sectionName="Valores"
              sectionData={data.valores}
              previewImage={previewImages.valores}
              handleTextChange={(value) =>
                setData({ ...data, valores: { ...data.valores, texto: value } })
              }
              handleFileUpload={(e) => handleFileUpload(e, "valores")}
              handleSubmit={() => handleSubmit("valores")}
            />
          </TabsContent>
        </Tabs>

        {/* Componente Toast */}
        {showToast && toastMessage && (
          <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>
    </ToastProvider>
  );
};

export default EditMisionVision;
