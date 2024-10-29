"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Redes = () => {
    const [redes, setRedes] = useState({
        whatsapp: "",
        instagram: "",
        facebook: "",
    });

    const fetchData = async () => {
        try {
            const res = await fetch("/api/redes/get", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error(`Error fetching data: ${res.status}`);
            }

            const result = await res.json();
            setRedes(result);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-5 p-2 rounded-lg shadow-lg z-10">
            <Link href={redes.whatsapp} target="_blank" rel="noopener noreferrer">
                <img src="/img/whatsapp.svg" width={30} height={30} alt="Imagen de WhatsApp" />
            </Link>
            <Link href={redes.instagram} target="_blank" rel="noopener noreferrer">
                <img src="/img/instagram.svg" width={30} height={30} alt="Imagen de Instagram" />
            </Link>
            <Link href={redes.facebook} target="_blank" rel="noopener noreferrer">
                <img src="/img/facebook.svg" width={30} height={30} alt="Imagen de Facebook" />
            </Link>
        </div>
    );
};

export default Redes;