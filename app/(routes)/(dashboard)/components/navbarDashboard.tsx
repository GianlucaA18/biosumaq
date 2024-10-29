"use client"

import Link from "next/link";
import MenuMobileDashboard from "./menuMobileDashboard";
import CerrarSesion from "./cerrarSesion";

const NavbarDashboard = () => {
    return (
        <div className="flex">
            <aside className="hidden lg:flex w-64 shadow-md flex-col justify-between">
                <div className="p-6 text-center">
                    <Link href="/dashboard" className="text-xl font-semibold">FishFood</Link>
                </div>
                <nav className="space-y-2 px-4 flex-1 flex flex-col">
                    <Link href="/dashboard/banner" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Banner
                    </Link>
                    <Link href="/dashboard/redes" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Redes
                    </Link>
                    <Link href="/dashboard/misionvision" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Misión, Visión y Valores
                    </Link>
                    <Link href="/dashboard/beneficios" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Beneficios
                    </Link>
                    <Link href="/dashboard/testimonios" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Testimonio
                    </Link>
                    <Link href="/dashboard/about" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Sobre Nosotros
                    </Link>
                    <Link href="/dashboard/galeria" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Galeria
                    </Link>
                    <Link href="/dashboard/productos" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Productos
                    </Link>
                    <Link href="/dashboard/novedades" className="flex items-center p-2 hover:bg-gray-500 rounded">
                        Novedades
                    </Link>
                </nav>
                <div className="px-4 mb-6">
                    <CerrarSesion />
                </div>
            </aside>

            <div className="flex lg:hidden justify-between items-center p-4 shadow-md w-full">
                <Link href="/dashboard" className="text-xl font-semibold">FishFood</Link>
                <div className="ml-auto">
                    <MenuMobileDashboard />
                </div>
            </div>
        </div>
    );
}

export default NavbarDashboard;