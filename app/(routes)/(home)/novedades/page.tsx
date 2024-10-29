"use client";
import Navbar from "@/components/clientes/navbar";
import EventoPrincipal from "./components/eventoPrincipal";
import OtrosEventos from "./components/otrosEventos";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import { useGetNovedades } from "@/api/novedades/useGetNovedades";

const Novedades = () => {
  const { novedades, loading, error } = useGetNovedades();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <Redes />
      {novedades.length > 0 && <EventoPrincipal evento={novedades[0]} />} {/* Evento más reciente */}
      <OtrosEventos eventos={novedades.slice(1)} /> {/* Otros eventos */}
      <Footer />
    </div>
  );
};

export default Novedades;

