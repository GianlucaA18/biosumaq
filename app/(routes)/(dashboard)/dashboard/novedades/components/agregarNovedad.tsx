import { ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Novedad } from "@/types/novedad";
import { addNovedad } from "@/api/novedades/addNovedad";

interface AgregarNovedadProps {
    novedades: Novedad[];
    onSave: (novedad: Novedad) => void;
    children: ReactNode;
}

const AgregarNovedad = ({
    novedades,
    onSave,
    children,
}: AgregarNovedadProps) => {
    const [formData, setFormData] = useState({
        titulo: "",
        info: "",
        imagen: "",
        fecha: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const getNextId = () => {
        return novedades.length === 0 ? 1 : Math.max(...novedades.map(n => n.id)) + 1;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        const { titulo, info, imagen, fecha } = formData;

        if (!titulo || !info || !imagen || !fecha) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const nuevaNovedad: Novedad = {
            id: getNextId(),
            titulo,
            info,
            imagen,
            fecha,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const success = await addNovedad(nuevaNovedad); // Llama a la función `addNovedad`

        if (success) {
            onSave(nuevaNovedad);
            resetForm();
            setIsOpen(false);
        } else {
            setError("Error al agregar la novedad.");
        }
    };

    const resetForm = () => {
        setFormData({
            titulo: "",
            info: "",
            imagen: "",
            fecha: "",
        });
        setError(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Novedad</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <form>
                    <div className="space-y-4">
                        <Input
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleInputChange}
                            placeholder="Título de la novedad"
                        />
                        <Input
                            name="info"
                            value={formData.info}
                            onChange={handleInputChange}
                            placeholder="Descripción o información"
                        />
                        <Input
                            name="imagen"
                            value={formData.imagen}
                            onChange={handleInputChange}
                            placeholder="URL de la imagen"
                        />
                        <Input
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleInputChange}
                            placeholder="Fecha"
                            type="date"
                        />
                    </div>
                </form>
                <DialogFooter>
                    <Button onClick={handleSave}>Agregar novedad</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AgregarNovedad;