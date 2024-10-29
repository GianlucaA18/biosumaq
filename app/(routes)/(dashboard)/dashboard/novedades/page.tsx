"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TablaNovedad from "./components/tablaNovedad";
import { Novedad } from "@/types/novedad";
import { PlusIcon } from "lucide-react";
import { useGetNovedades } from "@/api/novedades/useGetNovedades";
import AgregarNovedad from "./components/agregarNovedad";

const SeccionNovedades = () => {
  const { novedades: fetchedNovedades, loading, error } = useGetNovedades();
  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (fetchedNovedades) {
      setNovedades(fetchedNovedades);
    }
  }, [fetchedNovedades]);

  const mostrarToast = (mensaje: string) => {
    setToastMessage(mensaje);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveNovedad = (novedad: Novedad) => {
    const isEdit = novedades.some((n) => n.id === novedad.id);

    if (isEdit) {
      setNovedades((prev: Novedad[]) =>
        prev.map((n) => (n.id === novedad.id ? novedad : n))
      );
      mostrarToast("La novedad ha sido editada correctamente.");
    } else {
      setNovedades((prev: Novedad[]) => [...prev, novedad]);
      mostrarToast("Se agregó una nueva novedad.");
    }
  };

  if (loading) {
    return <div>Cargando novedades...</div>;
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
        <h1 className="text-xl font-bold">Gestión de Novedades</h1>
        <AgregarNovedad novedades={novedades} onSave={handleSaveNovedad}>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Agregar Novedad
          </Button>
        </AgregarNovedad>
      </div>

      <TablaNovedad novedades={novedades} setNovedades={setNovedades} />
    </div>
  );
};

export default SeccionNovedades;