import type { RouterI } from "../../../core/interface/router";
import { CatalogoProductoPage } from "../page/CatalogoProductoPage";
import { ProductoDetallePage } from "../page/DetalleProductoPage";

export const productosRouter: RouterI[] = [
    {
        element: CatalogoProductoPage,
        path: "/productos"
    },
    {
        element: ProductoDetallePage,
        path: "/detalle/producto"
    }
]