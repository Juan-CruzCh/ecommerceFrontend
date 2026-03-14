import type { RouterI } from "../../../core/interface/router";
import { ContactoPage } from "../page/ContactoPage";
import { InicioPage } from "../page/InicioPage";
import { NosotrosPage } from "../page/NosotrosPage";

export const inicioRouter: RouterI[] = [
    {
        element: InicioPage,
        path: "/"
    },
    {
        element: NosotrosPage,
        path: "/nosotros"
    },
    {
        element: ContactoPage,
        path: "/contacto"
    }
]