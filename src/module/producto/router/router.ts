import type { RouterI } from "../../../core/interface/router";
import { CatalogoProductoPage } from "../page/CatalogoProductoPage";
import { ProductoDetallePage } from "../page/DetalleProductoPage";

export const productosRouter: RouterI[] = [
    {
        element: CatalogoProductoPage,
        path: "/catalogo",
        protegida: false,
    },
    {
        element: ProductoDetallePage,
        path: "/detalle/producto/:id",
        protegida: false,
    }
]