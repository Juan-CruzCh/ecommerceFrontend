import type { RouterI } from "../../../core/interface/router";
import { RealizarVenta } from "../page/RealizarVenta";

export const ventaRouter: RouterI[] = [
    {
        element: RealizarVenta,
        path: "/realizarVenta",
        protegida: true,
    },


]