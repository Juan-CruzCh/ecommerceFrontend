import { Link } from "react-router";
import { Plus, ShoppingCart, Star } from "lucide-react"; // Añadimos iconos para rellenar
import { urlBackend } from "../../../core/config/intanceAxios";
import type { ListarProductoPublicoI } from "../interface/producto";

export const CardProducto = ({ item }: { item: ListarProductoPublicoI }) => {
  console.log(urlBackend,"/",item.imagenPrincipal);
  
  return (
    <div className="group bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">

      {/* Contenedor de Imagen */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <img
          src={`${urlBackend}/${item.imagenPrincipal}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={item.nombre} 
        />
        
        {/* Badge de Descuento o Stock (Relleno visual superior) */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
           <span className="bg-pink-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-md shadow-sm">
             Nuevo {`${urlBackend}/${item.imagenPrincipal}`}
           </span>
        </div>

        {/* Overlay Hover mejorado */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/detalle/producto/${item._id}`}
            className="bg-white text-zinc-900 p-3 rounded-full shadow-xl hover:bg-pink-500 hover:text-white transition-colors"
          >
            <Plus size={20} />
          </Link>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="p-5 flex flex-col flex-grow">
    
        <h3 className="text-sm font-semibold text-zinc-800 line-clamp-2 min-h-[2.5rem] mb-3 group-hover:text-pink-600 transition-colors">
          {item.nombre}
        </h3>
        
        {/* Separador sutil */}
        <div className="h-px w-full bg-zinc-100 mb-4"></div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 uppercase font-medium">Precio</span>
            <p className="text-xl font-black text-zinc-900 leading-none">
              <span className="text-xs font-bold mr-0.5">Bs.</span>
              
              {item.precioVenta}
            </p>
          </div>

          {/* Botón de acción rápida */}
          <button className="bg-zinc-900 text-white p-2.5 rounded-xl hover:bg-pink-500 transition-all shadow-md active:scale-95">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};