// agregarProducto.tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import { Producto } from "@/types/producto";
import { addProducto } from "@/api/productos/addProducto";
import { removeOldestDestacado } from "@/api/productos/useRemoveOldestDestacado";

interface AgregarProductoProps {
    productos: Producto[];
    onSave: (producto: Producto) => void;
    onUpdateDestacados: (productos: Producto[]) => void;
    children: ReactNode;
}

const AgregarProducto = ({
    productos,
    onSave,
    onUpdateDestacados,
    children,
}: AgregarProductoProps) => {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        imagen: "",
        destacado: false,
    });
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const getNextId = () => {
        return productos.length === 0 ? 1 : Math.max(...productos.map(p => p.id)) + 1;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? parseFloat(value) : value,
        }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            destacado: checked,
        }));
    };

    const handleSave = async () => {
        const { nombre, descripcion, precio, imagen, destacado } = formData;

        if (!nombre || !descripcion || precio <= 0 || !imagen) {
            setError("Todos los campos son obligatorios y el precio debe ser mayor a 0.");
            return;
        }

        const destacadosActuales = productos.filter(p => p.destacado);
        if (destacado && destacadosActuales.length >= 3) {
            await removeOldestDestacado(destacadosActuales[0]);
        }

        const nuevoProducto: Producto = {
            id: getNextId(),
            nombre,
            descripcion,
            precio,
            imagen,
            destacado,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const success = await addProducto(nuevoProducto);

        if (success) {
            onSave(nuevoProducto);
            onUpdateDestacados([...productos, nuevoProducto]);
            resetForm();
            setIsOpen(false);
        } else {
            setError("Error al agregar el producto.");
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: "",
            descripcion: "",
            precio: 0,
            imagen: "",
            destacado: false,
        });
        setError(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Producto</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-500">{error}</p>}
                <form>
                    <div className="space-y-4">
                        <Input
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre del producto"
                        />
                        <Input
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            placeholder="Descripción"
                        />
                        <Input
                            name="precio"
                            value={formData.precio}
                            onChange={handleInputChange}
                            placeholder="Precio"
                            type="number"
                        />
                        <Input
                            name="imagen"
                            value={formData.imagen}
                            onChange={handleInputChange}
                            placeholder="URL de la imagen"
                        />
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="destacado"
                                checked={formData.destacado}
                                onCheckedChange={handleCheckboxChange}
                            />
                            <label htmlFor="destacado" className="cursor-pointer">
                                Destacado
                            </label>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button onClick={handleSave}>Agregar producto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AgregarProducto;