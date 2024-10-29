import React from "react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { deleteNovedad } from "@/api/novedades/deleteNovedad";

interface EliminarNovedadProps {
    id: number;
    onDelete: (id: number) => void;
}

const EliminarNovedad: React.FC<EliminarNovedadProps> = ({ id, onDelete }) => {
    const eliminarNovedad = async () => {
        const success = await deleteNovedad(id);

        if (success) {
            onDelete(id);
        } else {
            console.error("Error al eliminar la novedad.");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <TrashIcon className="h-4 w-4 mr-2" />
                    <span>Eliminar</span>
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Deseas eliminar esta novedad?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no podrá deshacerse.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={eliminarNovedad}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EliminarNovedad;
