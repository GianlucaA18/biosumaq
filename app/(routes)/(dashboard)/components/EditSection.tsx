import { Button } from "@/components/ui/button";

type EditSectionProps = {
  sectionName: string;
  sectionData: { texto: string; imagen: string };
  previewImage: string;
  handleTextChange: (value: string) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const EditSection = ({
  sectionName,
  sectionData,
  previewImage,
  handleTextChange,
  handleFileUpload,
  handleSubmit,
}: EditSectionProps) => {
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
          <label className="block font-semibold mb-2">Texto de {sectionName}</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows={4}
            value={sectionData.texto}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Imagen de {sectionName}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="block border border-gray-300 rounded-md p-2 cursor-pointer file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 object-cover mt-2 rounded-md border border-gray-300"
            />
          )}
        </div>
        <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Guardar Cambios
        </Button>
      </form>
    </div>
  );
};

export default EditSection;
