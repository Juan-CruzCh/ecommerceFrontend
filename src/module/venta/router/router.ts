import type { RouterI } from "../../../core/interface/router";
import { DetalleVenta } from "../page/DetalleVenta";
import { ListarVenta } from "../page/ListarVenta";
import { RealizarVenta } from "../page/RealizarVenta";

export const ventaRouter: RouterI[] = [
    {
        element: RealizarVenta,
        path: "/realizarVenta",
        protegida: true,
    },
    {
        element: DetalleVenta,
        path: "/detalle/venta/:id",
        protegida: true,
    },
    {
        element: ListarVenta,
        path: "/listarVenta",
        protegida: true,
    },


]