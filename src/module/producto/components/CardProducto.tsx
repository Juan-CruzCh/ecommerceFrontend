import { Plus, ShoppingCart } from "lucide-react";
import { urlImagen } from "../../../core/config/intanceAxios";
import type { ListarProductoPublicoI } from "../interface/producto";
import { Link } from "react-router";

export const CardProducto = ({ item }: { item: ListarProductoPublicoI }) => {


  return (
    <Link
      to={`/detalle/producto/${item._id}`}
      className="group bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Contenedor de Imagen */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <img
          src={`${urlImagen}/${item.imagenPrincipal}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={item.nombre}
        />

        {/* Overlay visual (ya no necesita un Link interno) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white text-zinc-900 p-2.5 rounded-full shadow-lg group-hover:bg-pink-600 group-hover:text-white transition-all transform scale-90 group-hover:scale-100">
            <Plus size={20} />
          </div>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-zinc-800 line-clamp-1 mb-1 group-hover:text-pink-600 transition-colors">
          {item.nombre}
        </h3>

        <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed">
          {item.descripcion}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-zinc-50">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-tight">Precio</span>
            <div className="flex items-baseline">
              <span className="text-lg font-black text-zinc-900">
                {item.precioVenta} Bs
              </span>
            </div>
          </div>

          {/* Botón de Carrito con StopPropagation */}
          <button
            className="relative z-10 bg-zinc-900 text-white p-2.5 rounded-lg hover:bg-pink-600 transition-colors shadow-sm active:scale-95"
            title="Añadir al carrito"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};