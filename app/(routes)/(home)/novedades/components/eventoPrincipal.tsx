import Link from "next/link";
import FechaEvento from "./fecha";
import { Novedad } from "@/types/novedad"; // Importamos la interfaz

interface EventoPrincipalProps {
  evento: Novedad;
}

const EventoPrincipal: React.FC<EventoPrincipalProps> = ({ evento }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-10">
      <div className="relative rounded-md border-2 border-gray-50 hover:border-black transition-colors duration-300 dark:border-black dark:hover:border-white">
        <Link href={`/novedades/${evento.id}`}>
          <div className="relative">
            <img
              src={evento.imagen}
              alt="Imagen del evento"
              className="w-full h-full rounded-md brightness-50"
            />
            <h2 className="absolute inset-0 flex items-center justify-center text-white text-3xl md:text-5xl font-bold drop-shadow-md">
              {evento.titulo}
            </h2>
          </div>
          <div className="absolute bottom-2 left-2">
            <FechaEvento fecha={evento.fecha} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventoPrincipal;
