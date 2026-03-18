import type { RouterI } from "../../../core/interface/router";
import { ContactoPage } from "../page/ContactoPage";
import { DashboarPage } from "../page/DashboarPage";
import { InicioPage } from "../page/InicioPage";
import { NosotrosPage } from "../page/NosotrosPage";

export const inicioRouter: RouterI[] = [
    {
        element: InicioPage,
        path: "/",
        protegida: false,

    },
    {
        element: NosotrosPage,
        path: "/nosotros",
        protegida: false,


    },
    {
        element: ContactoPage,
        path: "/contactos",
        protegida: false,

    },
    {
        element: DashboarPage,
        path: "/inicio",
        protegida: false,

    }
]