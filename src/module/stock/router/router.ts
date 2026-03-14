import type { RouterI } from "../../../core/interface/router";
import { CrearStockPage } from "../page/CrearStockPage";
import { ListarStockPage } from "../page/ListarStockPage";
export const stockRouter: RouterI[] = [


    {
        element: CrearStockPage,
        path: "/registrarStock"
    },
    {
        element: ListarStockPage,
        path: "/listarStock"
    }

]