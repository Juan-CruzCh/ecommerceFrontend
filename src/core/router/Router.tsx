import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import type { RouterI } from "../interface/router"

import { MainLayout } from "../components/MainLayout";
import { inicioRouter } from "../../module/inicio/router/inicio";
import { productosRouter } from "../../module/producto/router/router";
import { stockRouter } from "../../module/stock/router/router";
import { usuarioRouter } from "../../module/usuario/router/router";
import { autenticacionRouter } from "../../module/autenticacion/router/autenticacion";
import { ventaRouter } from "../../module/venta/router/router";
import { useAutenticacionStore } from "../context/Autenticacion";

const renderRoutes = (routes: RouterI[], isAuthenticated: boolean) =>  
  routes.map((item, index) => {
    console.log(isAuthenticated);
    
    if (!item.protegida) {
      return <Route key={index} path={item.path} element={<item.element />} />;
    }
    return (
      <Route
        key={index}
        path={item.path}
        element={
          isAuthenticated ? (
            <item.element />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    );
  });
export const AppRouter = () => {
  const { isAutenticacion } = useAutenticacionStore()
  return (

    <BrowserRouter>
      <Routes>

        {/* Layout */}
        < Route element={< MainLayout />}>
          {renderRoutes(productosRouter, isAutenticacion)}
          {renderRoutes(autenticacionRouter, isAutenticacion)}
          {renderRoutes(inicioRouter, isAutenticacion)}
          {renderRoutes(stockRouter, isAutenticacion)}
          {renderRoutes(usuarioRouter, isAutenticacion)}
          {renderRoutes(ventaRouter, isAutenticacion)}

        </Route>

      </Routes>
    </BrowserRouter>

  );
};