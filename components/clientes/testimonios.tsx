"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Testimonio = {
  id: number;
  nombre: string;
  testimonio: string;
  avatar: string;
};

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/testimonios/get");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setTestimonios(data);
      } catch (error) {
        setError("Error al cargar los testimonios");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="flex flex-col items-center my-20 p-4">
      <h2 className="text-center text-3xl font-bold mb-6">Testimonios</h2>
      <div className="w-full max-w-6xl">
        {testimonios.map((testimonio) => (
          <div key={testimonio.id}>
            <Alert className="flex items-start bg-slate-200 p-4 rounded-lg mb-4 dark:text-white dark:bg-transparent dark:hover:bg-slate-950">
              <Avatar className="mr-4">
                <AvatarImage src={testimonio.avatar} alt={testimonio.nombre} />
                <AvatarFallback>{testimonio.nombre.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <AlertTitle className="font-bold">{testimonio.nombre}</AlertTitle>
                <AlertDescription>{testimonio.testimonio}</AlertDescription>
              </div>
            </Alert>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonios;