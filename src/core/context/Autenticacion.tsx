import { create } from "zustand";
import { verificarAutenticacion } from "../../module/autenticacion/service/autenticacion";

interface AutenticacionI {
    nombre: string;
    apellidos: string;
    usuario: string;
    rol: string;
    isAutenticacion: boolean;
    isLoading: boolean;
    verificarAuth: () => Promise<void>;
}

const rutasPublicas: string[] = [
    "/",
    "/autenticacion",
    "/catalogo",
    "/nosotros",
    "/contactos",
    "/detalle/producto/:id"
];

export const useAutenticacionStore = create<AutenticacionI>((set) => ({
    nombre: "",
    apellidos: "",
    usuario: "",
    rol: "",
    isAutenticacion: false,
    isLoading: true,
    verificarAuth: async () => {
        const path = window.location.pathname;

        set({ isLoading: true });

        try {
            const esPublica = rutasPublicas.some((ruta) => {
                if (ruta.includes(":")) {
                    const baseRuta = ruta.split("/:")[0];
                    return path.startsWith(baseRuta);
                }
                return ruta === path;
            });
            if (esPublica) {
                set({
                    isAutenticacion: false,
                    isLoading: false
                });
                return;
            }
            const response = await verificarAutenticacion();
            if (response) {
                set({
                    usuario: response.usuario,
                    isAutenticacion: true,
                    apellidos: response.apellidos,
                    nombre: response.nombre,
                    rol: response.rol,
                    isLoading: false
                });
            } else {
                set({
                    isAutenticacion: false,
                    isLoading: false
                });
            }

        } catch (error) {
            set({
                isAutenticacion: false,
                isLoading: false
            });
        }
    }
}));