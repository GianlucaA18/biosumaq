"use client"
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Beneficios = () => {
  const [beneficios, setBeneficios] = useState<any>(null);

  useEffect(() => {
    const fetchBeneficios = async () => {
      const response = await fetch('/api/beneficios/get');
      const data = await response.json();
      setBeneficios(data);
    };
    fetchBeneficios();
  }, []);

  return (
    <div className="flex flex-col items-center my-20 p-4">
      <h2 className="text-center font-bold text-3xl">Beneficios</h2>
      <div className="w-full max-w-6xl">
        <Accordion type="single" collapsible>
          {beneficios && beneficios.map((beneficio: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{beneficio.pregunta}</AccordionTrigger>
              <AccordionContent className="text-left">
                {beneficio.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Beneficios;
