"use client";

import { Card, CardContent, CardFooter } from "../ui/card";
import { useEffect, useState } from "react";

const MisionVision = () => {
    const [data, setData] = useState({
        mision: { texto: "", imagen: "" },
        vision: { texto: "", imagen: "" },
        valores: { texto: "", imagen: "" },
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/misionvision/get");
            if (res.ok) {
                const result = await res.json();
                setData(result);
            } else {
                console.error("Error al cargar los datos:", res.statusText);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 justify-items-center my-20">
                <Card className="flex flex-col items-center text-center space-y-2 hover:border-primary transition-colors duration-300 bg-slate-200 dark:bg-slate-950">
                    <CardContent>
                        <img src={data.mision.imagen} width={300} height={300} alt="imagen de misión" className="h-64 w-64 mx-auto" />
                    </CardContent>
                    <CardFooter className="max-w-sm mx-auto">
                        <p className="text-sm text-justify">
                            {data.mision.texto}
                        </p>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col items-center text-center space-y-2 hover:border-primary transition-colors duration-300 bg-slate-200 dark:bg-slate-950 ">
                    <CardContent>
                        <img src={data.vision.imagen} width={300} height={300} alt="imagen de visión" className="h-64 w-64 mx-auto" />
                    </CardContent>
                    <CardFooter className="max-w-sm mx-auto">
                        <p className="text-sm my-4 text-justify">
                            {data.vision.texto}
                        </p>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col items-center text-center space-y-2 hover:border-primary transition-colors duration-300 bg-slate-200 dark:bg-slate-950">
                    <CardContent>
                        <img src={data.valores.imagen} width={300} height={300} alt="imagen de valores" className="h-64 w-64 mx-auto" />
                    </CardContent>
                    <CardFooter className="max-w-sm mx-auto">
                        <p className="text-sm my-4 text-justify">
                            {data.valores.texto}
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default MisionVision;
