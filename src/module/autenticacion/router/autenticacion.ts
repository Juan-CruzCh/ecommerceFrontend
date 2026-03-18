import type { RouterI } from "../../../core/interface/router";
import { AutenticacionPage } from "../page/AutenticacionPage";

export const autenticacionRouter: RouterI[] = [
    {
        element: AutenticacionPage,
        path: "/autenticacion",
        protegida: false,
    }

]