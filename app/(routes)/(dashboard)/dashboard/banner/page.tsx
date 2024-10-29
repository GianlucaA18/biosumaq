"use client";

import { useState } from "react";
import { ToastProvider } from "@/components/ui/toast"; // Asegúrate de tener este componente
import { Button } from "@/components/ui/button"; // Botón reutilizable en tu proyecto

const EditBanner = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null); // Estado para el mensaje del toast
  const [showToast, setShowToast] = useState(false); // Estado para controlar la visibilidad del toast

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleConfirmImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("type", selectedFile.type);

      try {
        const res = await fetch("/api/banner/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const { filePath } = await res.json();

          await fetch("/api/banner/updateBannerImage", {
            method: "POST",
            body: JSON.stringify({ image: filePath }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          setToastMessage("Imagen actualizada con éxito");
          setImagePreview(null);
          setSelectedFile(null);
        } else {
          setToastMessage("Error al subir la imagen");
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setToastMessage("Error al subir la imagen");
      }

      // Mostrar el toast
      setShowToast(true);

      // Ocultar el toast después de unos segundos
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // El toast desaparecerá después de 3 segundos
    }
  };

  return (
    <ToastProvider> {/* Proveedor de toast */ }
      <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
        <h1 className="text-3xl font-bold mb-6 dark:text-blue-500">Edita el Banner</h1>
        <label className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <span className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow cursor-pointer hover:bg-blue-600 transition duration-300">
            Seleccionar Archivo
          </span>
        </label>

        {imagePreview && (
          <div className="flex flex-col items-center justify-center mt-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-blue-500">Vista previa de la imagen seleccionada:</h2>
            <img
              src={imagePreview}
              alt="Vista previa del banner"
              className="w-96 h-auto mb-6 rounded-lg shadow-md"
            />
            <Button
              onClick={handleConfirmImage}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
            >
              Aceptar
            </Button>
          </div>
        )}
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

export default EditBanner;
