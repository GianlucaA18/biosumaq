import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";

const MenuMobile = () => {
    return (
        <Popover>
            <PopoverTrigger className="p-2 rounded-full hover:bg-gray-200 transition-all">
                <Menu className="h-6 w-6 text-gray-700" />
            </PopoverTrigger>
            <PopoverContent className=" rounded-lg shadow-lg p-4 space-y-2">
                <Link href="/" className="block text-lg font-medium   hover:text-blue-500 transition-colors">Inicio</Link>
                <Link href="/about" className="block text-lg font-medium  hover:text-blue-500 transition-colors">Sobre nosotros</Link>
                <Link href="/productos" className="block text-lg font-medium  hover:text-blue-500 transition-colors">Productos</Link>
                <Link href="/novedades" className="block text-lg font-medium  hover:text-blue-500 transition-colors">Novedades</Link>
            </PopoverContent>
        </Popover>
    );
}

export default MenuMobile;