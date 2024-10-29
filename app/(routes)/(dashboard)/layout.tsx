"use client"

import { useAuth } from "@/hooks/useAuth";
import NavbarDashboard from "./components/navbarDashboard";

export default function LayaoutDashboard({ children }: { children: React.ReactNode; }) {
    const { correo, loading } = useAuth();

    // Muestra un indicador de carga mientras se verifica la autenticación
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si no hay usuario, no se muestra el contenido
    if (!correo) {
        return null; // No renderiza nada hasta que el redireccionamiento ocurra
    }

    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            <NavbarDashboard />
            <main className="flex-1 border-t lg:border-t-0 lg:border-l">
                {children}
            </main>
        </div>
    );
}