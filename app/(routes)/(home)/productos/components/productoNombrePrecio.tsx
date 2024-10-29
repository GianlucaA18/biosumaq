interface Producto {
    nombre: string;
    precio: number;
}

const ProductoNombrePrecio: React.FC<Producto> = ({ nombre, precio }) => {
    return (
        <div className="inline-flex items-center gap-3 rounded-full border-2 w-fit p-1 bg-gradient-to-r from-blue-200 via-blue-300 to-transparent bg-opacity-60">
            <p className="px-2 py-1 text-xs text-black">{nombre}</p>
            <p className="px-2 py-1 text-xs text-black bg-blue-500 rounded-full w-fit">S./{precio}</p>
        </div>
    );
}

export default ProductoNombrePrecio;