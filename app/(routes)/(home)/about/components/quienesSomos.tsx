"use client"
import React, { useEffect, useState } from "react";

const QuienesSomos = () => {
    const [texto, setTexto] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/about/get");
                const data = await res.json();
                setTexto(data.quienesSomos.texto);
            } catch (err) {
                setError("Error al cargar la información");
            }
        };
        fetchData();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col items-center justify-center px-4 md:px-20 lg:px-40 py-10 md:py-16 text-center my-20">
            <p className="text-4xl font-sans font-extrabold mb-4">¿Quiénes somos?</p>
            <p className="text-base w-full max-w-2xl">{texto}</p>
        </div>
    );
};

export default QuienesSomos;