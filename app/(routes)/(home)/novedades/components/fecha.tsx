import { formatearFecha } from "@/types/fecha";

interface FechaEventoProps {
    fecha: string;
  }
  
  const FechaEvento: React.FC<FechaEventoProps> = ({ fecha }) => {
  
    return (
      <div className="inline-flex items-center gap-3 rounded-full border-2 border-white w-fit p-1">
        <p className="px-2 py-1 text-xs text-white rounded-full w-fit bg-black">
          {formatearFecha(fecha)}
        </p>
      </div>
    );
  };
  
  export default FechaEvento;
  