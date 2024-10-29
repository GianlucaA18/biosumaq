"use client";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/clientes/navbar";
import Productos from "./components/productos";
import Slider from "./components/slider";
import Redes from "@/components/clientes/redes";
import Footer from "@/components/clientes/footer";
import { useGetProductos } from '@/api/productos/useGetProductos';

const SeccionProductos = () => {
  const router = useRouter();
  const { productos, loading, error } = useGetProductos();

  const handleProductoClick = (id: number) => {
    router.push(`/productos/${id}`);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const productosDestacados = productos.filter(producto => producto.destacado);

  return (
    <div>
      <Navbar />
      <Redes />
      <section className="flex flex-col items-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl w-full">
          <div className="col-span-1 md:col-span-2 flex justify-center items-center h-full">
            {productosDestacados.length > 0 && (
              <div className='h-full' onClick={() => handleProductoClick(productosDestacados[0].id)}>
                <Productos
                  nombre={productosDestacados[0].nombre}
                  precio={productosDestacados[0].precio}
                  imagen={productosDestacados[0].imagen}
                  height="785px" // Especifica el alto aquí
                />
              </div>
            )}
          </div>
          <div className="col-span-1 flex flex-col justify-between space-y-4">
            {productosDestacados.slice(1, 3).map((producto) => (
              <div key={producto.id} className="flex-1 flex justify-center" onClick={() => handleProductoClick(producto.id)}>
                <Productos
                  nombre={producto.nombre}
                  precio={producto.precio}
                  imagen={producto.imagen}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        {productos.length > 0 && <Slider productos={productos} />}
      </section>
      <Footer />
    </div>
  );
}

export default SeccionProductos;

