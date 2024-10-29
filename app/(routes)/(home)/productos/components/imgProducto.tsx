interface ImgProductoProps {
    imagen: string;
}

const ImgProducto: React.FC<ImgProductoProps> = ({ imagen }) => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <img
                src={imagen}
                alt="Imagen del producto"
                className="w-full h-full object-cover rounded-md"
            />
        </div>
    );
};

export default ImgProducto;