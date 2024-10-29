"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PencilIcon } from "lucide-react";
import { Producto } from "@/types/producto";
import { Paginacion } from "../../../components/paginacion";
import EliminarProducto from "./eliminarProducto";
import EditarProducto from "./editarProducto";

interface TablaProductosProps {
    productos: Producto[];
    setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
}

const limitarDescripcion = (descripcion: string, limiteCaracteres: number) => {
    return descripcion.length > limiteCaracteres ? descripcion.slice(0, limiteCaracteres) + "..." : descripcion;
};

const TablaProductos: React.FC<TablaProductosProps> = ({ productos, setProductos }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [productosDestacados, setProductosDestacados] = useState<number[]>([]);
    const [visibleColumns, setVisibleColumns] = useState(() => {
        const savedColumns = localStorage.getItem("visibleColumns");
        return savedColumns ? JSON.parse(savedColumns) : {
            nombre: true,
            descripcion: true,
            precio: true,
            imagen: true,
            destacado: true,
            acciones: true,
        };
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        const savedItemsPerPage = localStorage.getItem("itemsPerPage");
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

    const actualizarDestacados = (productosList: Producto[]) => {
        const nuevosDestacados = productosList.filter((producto) => producto.destacado).map((producto) => producto.id);
        setProductosDestacados(nuevosDestacados);
    };

    useEffect(() => {
        actualizarDestacados(productos);
    }, [productos]);

    useEffect(() => {
        localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
    }, [visibleColumns]);

    useEffect(() => {
        localStorage.setItem("itemsPerPage", itemsPerPage.toString());
    }, [itemsPerPage]);

    const filteredProductos = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleColumnVisibility = (column: keyof typeof visibleColumns) => {
        setVisibleColumns((prev: typeof visibleColumns) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const eliminarProducto = (id: number) => {
        setProductos((prev: Producto[]) => prev.filter((producto) => producto.id !== id));
        actualizarDestacados(productos.filter((producto) => producto.id !== id));
        mostrarToast("El producto ha sido eliminado.");
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
                    placeholder="Buscar producto..."
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
                        {visibleColumns.nombre && <TableHead>Nombre</TableHead>}
                        {visibleColumns.descripcion && <TableHead>Descripción</TableHead>}
                        {visibleColumns.precio && <TableHead>Precio</TableHead>}
                        {visibleColumns.imagen && <TableHead>Imagen</TableHead>}
                        {visibleColumns.destacado && <TableHead>Destacado</TableHead>}
                        {visibleColumns.acciones && <TableHead>Acciones</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((producto) => (
                        <TableRow key={producto.id}>
                            {visibleColumns.nombre && <TableCell>{producto.nombre}</TableCell>}
                            {visibleColumns.descripcion && <TableCell>{limitarDescripcion(producto.descripcion, 50)}</TableCell>}
                            {visibleColumns.precio && <TableCell>{producto.precio.toFixed(2)}</TableCell>}
                            {visibleColumns.imagen && (
                                <TableCell>
                                    <img src={producto.imagen} alt={producto.nombre} className="w-16 h-16 object-cover" />
                                </TableCell>
                            )}
                            {visibleColumns.destacado && (
                                <TableCell>
                                    <Checkbox
                                        checked={producto.destacado}
                                        disabled
                                    />
                                </TableCell>
                            )}
                            {visibleColumns.acciones && (
                                <TableCell>
                                    <div className="flex gap-2">
                                        <EditarProducto
                                            producto={producto}
                                            onSave={(productoActualizado: Producto) => {
                                                setProductos((prev: Producto[]) =>
                                                    prev.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
                                                );
                                                mostrarToast("El producto ha sido editado correctamente.");
                                                actualizarDestacados(productos);
                                            }}
                                            productos={productos}
                                            onUpdateDestacados={actualizarDestacados}
                                        >
                                            <Button variant="outline" size="sm">
                                                <PencilIcon className="h-4 w-4 mr-2" />
                                                <span>Editar</span>
                                            </Button>
                                        </EditarProducto>
                                        <EliminarProducto id={producto.id} onDelete={eliminarProducto} />
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Paginacion
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredProductos.length}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default TablaProductos;