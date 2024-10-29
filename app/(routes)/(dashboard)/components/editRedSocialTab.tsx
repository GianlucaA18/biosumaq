import { Button } from "@/components/ui/button";

type EditRedSocialProps = {
    platform: string;
    url: string;
    handleChange: (value: string) => void;
    handleSubmit: () => void;
};

const EditRedSocial = ({ platform, url, handleChange, handleSubmit }: EditRedSocialProps) => {
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
                    <label className="block font-semibold mb-2">Enlace de {platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded"
                        type="text"
                        value={url}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
                <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar Cambios</Button>
            </form>
        </div>
    );
};

export default EditRedSocial;
