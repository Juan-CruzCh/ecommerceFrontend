import { create } from "zustand";
import { verificarAutenticacion } from "../../module/autenticacion/service/autenticacion";

interface AutenticacionI {
    nombre: string
    apellidos: string
    usuario: string
    rol: string
    isAutenticacion: boolean;
    verificarAuth: () => Promise<void>;
}

const rutasPulica: string[] = ["/", "/catalogo", "/detalle/producto/:id"]

export const useAutenticacionStore = create<AutenticacionI>((set) => ({
    apellidos: '',
    isAutenticacion: false,
    nombre: '',
    rol: '',
    usuario: "",
    verificarAuth: async () => {
        const path = window.location.pathname
        try {
            const esPublica = rutasPulica.some(ruta => {
                if (ruta.includes(":")) {
                    const baseRuta = ruta.split("/:")[0];
                    return path.startsWith(baseRuta);
                }
                return ruta === path;
            });
            if (!esPublica) {
                const response = await verificarAutenticacion();
                if (response) {
                    set({
                        usuario: "",
                        isAutenticacion: true,
                        apellidos: response.apellidos,
                        nombre: response.nombre,
                        rol: response.rol
                    });
                }
            }
        } catch (error) {
            set({ isAutenticacion: false });
        }
    }
}))