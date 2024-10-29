import { Button } from "@/components/ui/button";

type EditSectionProps = {
    sectionName: string;
    sectionData: { nombre: string; testimonio: string; avatar: string };
    previewImage: string;
    handleTextChange: (field: 'nombre' | 'testimonio', value: string) => void;
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
};

const EditSectionTestimonio = ({
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
                    <label className="block font-semibold mb-2">Nombre</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={sectionData.nombre}
                        onChange={(e) => handleTextChange('nombre', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Testimonio</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded resize-none"
                        rows={4}
                        value={sectionData.testimonio}
                        onChange={(e) => handleTextChange('testimonio', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-2">Avatar</label>
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        className="block border border-gray-300 rounded-md p-2 cursor-pointer file:mr-2 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    />
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt={sectionName}
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

export default EditSectionTestimonio;
