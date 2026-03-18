import type { RouterI } from "../../../core/interface/router";
import { ListarUsuarioPage } from "../page/ListarUsuarioPage";

export const usuarioRouter: RouterI[] = [

    {
        element: ListarUsuarioPage,
        path: "/usuarios",
        protegida: true,
    }


]