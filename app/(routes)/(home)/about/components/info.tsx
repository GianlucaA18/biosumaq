"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const Info = () => {
    const [aboutData, setAboutData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/about/get");
                const data = await res.json();
                setAboutData(data);
            } catch (err) {
                setError("Error al cargar la información");
            }
        };
        fetchData();
    }, []);

    if (error) return <p>{error}</p>;

    // Verifica que aboutData no sea null
    if (!aboutData) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center my-20 mx-10">
                <Card className="flex flex-col items-center text-center space-y-2 hover:border-primary transition-colors duration-300 bg-slate-200 dark:bg-slate-950">
                    <CardContent>
                        <Image src={aboutData.seccion1.imagen} width={300} height={300} alt="imagen de misión" className="h-64 w-64 mx-auto" />
                    </CardContent>
                    <CardFooter>
                        <p className="text-base md:px-8 text-justify">{aboutData.seccion1.texto}</p>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col items-center text-center space-y-2 hover:border-primary transition-colors duration-300 bg-slate-200 dark:bg-slate-950">
                    <CardContent>
                        <Image src={aboutData.seccion2.imagen} width={300} height={300} alt="imagen de visión" className="h-64 w-64 mx-auto" />
                    </CardContent>
                    <CardFooter>
                        <p className="text-base md:px-8 text-justify">{aboutData.seccion2.texto}</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Info;