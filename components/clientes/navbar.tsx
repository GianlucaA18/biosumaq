"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuMobile from "./menuMobile";
import ToggleTheme from "./toggleTheme";

const Navbar = () => {
    const router = useRouter()

    return (
        <nav className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:mx-w-6xl">
            <h1 className="text-3xl" onClick={() => router.push("/")}>Bio
                <span className="font-bold text-primary">Sumaq</span>
            </h1>
            <div className="items-center justify-between hidden sm:flex space-x-4">
                <Link href="/" className="hover:text-primary">Inicio</Link>
                <Link href="/about" className="hover:text-primary">Sobre nosotros</Link>
                <Link href="/productos" className="hover:text-primary">Productos</Link>
                <Link href="/novedades" className="hover:text-primary">Novedades</Link>
                <ToggleTheme />
            </div>
            <div className="flex sm:hidden">
                <ToggleTheme/>
                <MenuMobile />
                
            </div>
        </nav>
    );
}

export default Navbar;