export const formatearFecha = (fechaStr: string): string => {
    const fechaObj = new Date(fechaStr);
    return fechaObj.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};