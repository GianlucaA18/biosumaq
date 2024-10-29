import { Button } from "@/components/ui/button";

type EditBeneficioTabProps = {
  index: number;
  beneficio: { pregunta: string; respuesta: string };
  handleChange: (index: number, field: keyof { pregunta: string; respuesta: string }, value: string) => void;
  handleSubmit: () => void;
};

const EditBeneficioTab = ({
  index,
  beneficio,
  handleChange,
  handleSubmit,
}: EditBeneficioTabProps) => {
  return (
    <div className="p-4 rounded-md shadow-md dark:bg-slate-800">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className="block font-semibold mb-2">Pregunta</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={beneficio.pregunta || ""}
            onChange={(e) => handleChange(index, 'pregunta', e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Respuesta</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows={4}
            value={beneficio.respuesta || ""}
            onChange={(e) => handleChange(index, 'respuesta', e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
};

export default EditBeneficioTab;
