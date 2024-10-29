import ProductoNombrePrecio from "./productoNombrePrecio";

interface Producto {
    nombre: string;
    precio: number;
    imagen: string;
    width?: string;
    height?: string;
}

const Productos: React.FC<Producto> = ({ nombre, precio, imagen, width = "100%", height = "24rem" }) => {
    return (
        <div className="relative rounded-md border-2 border-transparent hover:border-cyan-400 transition-colors duration-300 cursor-pointer overflow-hidden"
             style={{ width, height }}> {/* Usamos width y height aquí */}
            <img
                src={imagen}
                alt={nombre}
                className="w-full h-full object-cover transition-transform duration-400 transform hover:scale-110"
            />
            <div className="absolute bottom-2 left-2">
                <ProductoNombrePrecio nombre={nombre} precio={precio} />
            </div>
        </div>
    );
};

export default Productos;
