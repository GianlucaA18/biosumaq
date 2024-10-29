"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PencilIcon } from "lucide-react";
import { Novedad } from "@/types/novedad";
import EliminarNovedad from "./eliminarNovedad";
import EditarNovedad from "./editarNovedad";
import { Paginacion } from "../../../components/paginacion";

interface TablaNovedadProps {
    novedades: Novedad[];
    setNovedades: React.Dispatch<React.SetStateAction<Novedad[]>>;
}

const limitarDescripcion = (info: string, limiteCaracteres: number) => {
    return info.length > limiteCaracteres ? info.slice(0, limiteCaracteres) + "..." : info;
};

const TablaNovedad: React.FC<TablaNovedadProps> = ({ novedades, setNovedades }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [visibleColumns, setVisibleColumns] = useState(() => {
        const savedColumns = localStorage.getItem("visibleColumnsNovedades");
        return savedColumns ? JSON.parse(savedColumns) : {
            titulo: true,
            info: true,
            imagen: true,
            fecha: true,
            acciones: true,
        };
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        const savedItemsPerPage = localStorage.getItem("itemsPerPageNovedades");
        return savedItemsPerPage ? parseInt(savedItemsPerPage) : 5;
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const mostrarToast = (mensaje: string) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage(null);
        }, 3000);
    };

    useEffect(() => {
        localStorage.setItem("visibleColumnsNovedades", JSON.stringify(visibleColumns));
    }, [visibleColumns]);

    useEffect(() => {
        localStorage.setItem("itemsPerPageNovedades", itemsPerPage.toString());
    }, [itemsPerPage]);

    const filteredNovedades = novedades.filter((novedad) =>
        novedad.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNovedades.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleColumnVisibility = (column: keyof typeof visibleColumns) => {
        setVisibleColumns((prev: typeof visibleColumns) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const eliminarNovedad = (id: number) => {
        setNovedades((prev: Novedad[]) => prev.filter((novedad) => novedad.id !== id));
        mostrarToast("La novedad ha sido eliminada.");
    };

    const handleUpdateNovedad = (updatedNovedad: Novedad) => {
        setNovedades((prev) =>
            prev.map((novedad) =>
                novedad.id === updatedNovedad.id ? updatedNovedad : novedad
            )
        );
        mostrarToast("La novedad ha sido actualizada.");
    };

    return (
        <div>
            {showToast && toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}

            <div className="mb-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <Input
                    placeholder="Buscar novedad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-auto"
                />
                <Select>
                    <SelectTrigger className="w-full md:w-[240px]">
                        <span>Seleccionar columnas</span>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(visibleColumns).map((col) => (
                            <div key={col} className="flex items-center px-2 py-1">
                                <Checkbox
                                    checked={visibleColumns[col as keyof typeof visibleColumns]}
                                    onCheckedChange={() => handleColumnVisibility(col as keyof typeof visibleColumns)}
                                />
                                <label className="ml-2 capitalize">{col}</label>
                            </div>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setItemsPerPage(parseInt(value))}>
                    <SelectTrigger className="w-full md:w-[240px]">
                        <span>Filas por página</span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3">3 filas</SelectItem>
                        <SelectItem value="5">5 filas</SelectItem>
                        <SelectItem value="10">10 filas</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {visibleColumns.titulo && <TableHead>Título</TableHead>}
                        {visibleColumns.info && <TableHead>Info</TableHead>}
                        {visibleColumns.imagen && <TableHead>Imagen</TableHead>}
                        {visibleColumns.fecha && <TableHead>Fecha</TableHead>}
                        {visibleColumns.acciones && <TableHead>Acciones</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((novedad) => (
                        <TableRow key={novedad.id}>
                            {visibleColumns.titulo && <TableCell>{novedad.titulo}</TableCell>}
                            {visibleColumns.info && <TableCell>{limitarDescripcion(novedad.info, 50)}</TableCell>}
                            {visibleColumns.imagen && (
                                <TableCell>
                                    <img src={novedad.imagen} alt={novedad.titulo} className="w-16 h-16 object-cover" />
                                </TableCell>
                            )}
                            {visibleColumns.fecha && <TableCell>{novedad.fecha}</TableCell>}
                            {visibleColumns.acciones && (
                                <TableCell>
                                    <div className="flex gap-2">
                                        <EditarNovedad novedad={novedad} onUpdate={handleUpdateNovedad}>
                                            <Button variant="outline" size="sm">
                                                <PencilIcon className="h-4 w-4 mr-2" />
                                                <span>Editar</span>
                                            </Button>
                                        </EditarNovedad>
                                        <EliminarNovedad id={novedad.id} onDelete={eliminarNovedad} />
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Paginacion
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalItems={filteredNovedades.length}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default TablaNovedad;
