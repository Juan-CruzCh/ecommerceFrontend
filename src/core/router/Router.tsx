import { BrowserRouter, Route, Routes } from "react-router";
import type { RouterI } from "../interface/router"

import { MainLayout } from "../components/MainLayout";
import { inicioRouter } from "../../module/inicio/router/inicio";
import { productosRouter } from "../../module/producto/router/router";
import { stockRouter } from "../../module/stock/router/router";

const renderRoutes = (routes: RouterI[]) =>
  routes.map((item, index) => (
    <Route key={index} path={item.path} element={< item.element />} />
  ));
export const AppRouter = () => {
  /*  const { isAutenticacion, token } = useContext()
    if (!isAutenticacion) {
      return (
        <Router>
  
          <Routes>
            <Route path="/" element={<AutenticacionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
  
        </Router>
      );
    }*/
  return (

    <BrowserRouter>
      <Routes>

        {/* Layout */}
        < Route element={< MainLayout />}>
          {renderRoutes(productosRouter)}
          {renderRoutes(inicioRouter)}
          {renderRoutes(stockRouter)}

        </Route>

      </Routes>
    </BrowserRouter>

  );
};