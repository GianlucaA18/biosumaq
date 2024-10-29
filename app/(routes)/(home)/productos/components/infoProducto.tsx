import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface InfoProductoProps {
    nombre: string;
    precio: number;
    descripcion: string;
}

const InfoProducto: React.FC<InfoProductoProps> = ({ nombre, precio, descripcion }) => {
    return (
        <div className="space-y-4 p-4">
            {/* Título del producto centrado y más grande */}
            <div className="text-center space-y-4">
                <h2 className="text-5xl font-bold">{nombre}</h2>
            </div>

            {/* Precio alineado a la izquierda y más grande */}
            <div className="space-y-2">
                <p className="px-4 py-2 text-lg text-white font-bold bg-green-500 rounded-full w-fit">S/{precio}</p>
            </div>

            <Separator />

            {/* Subtítulo de descripción y contenido */}
            <div>
                <h3 className="text-xl font-semibold pb-2">Descripción: </h3>
                <p>{descripcion}</p>
            </div>

            {/* Botón de contacto */}
            <div className="flex justify-center">
                <Button>Contáctanos</Button>
            </div>
        </div>
    );
};

export default InfoProducto;
