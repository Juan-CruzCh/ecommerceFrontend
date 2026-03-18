import { BrowserRouter, Route, Routes } from "react-router";
import type { RouterI } from "../interface/router"

import { MainLayout } from "../components/MainLayout";
import { inicioRouter } from "../../module/inicio/router/inicio";
import { productosRouter } from "../../module/producto/router/router";
import { stockRouter } from "../../module/stock/router/router";
import { usuarioRouter } from "../../module/usuario/router/router";
import { autenticacionRouter } from "../../module/autenticacion/router/autenticacion";

const renderRoutes = (routes: RouterI[]) =>
  routes.map((item, index) => (
    <Route key={index} path={item.path} element={< item.element />} />
  ));
export const AppRouter = () => {


  return (

    <BrowserRouter>
      <Routes>

        {/* Layout */}
        < Route element={< MainLayout />}>
          {renderRoutes(productosRouter)}
          {renderRoutes(autenticacionRouter)}
          {renderRoutes(inicioRouter)}
          {renderRoutes(stockRouter)}
          {renderRoutes(usuarioRouter)}

        </Route>

      </Routes>
    </BrowserRouter>

  );
};