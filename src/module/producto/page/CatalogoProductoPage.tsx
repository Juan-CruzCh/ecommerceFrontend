import React, { useEffect, useState } from "react";
import { listarProductosPublico } from "../service/producto";
import type { ListarProductoPublicoI } from "../interface/producto";
import { urlBackend } from "../../../core/config/intanceAxios";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { listarCategoria } from "../../categoria/service/categoria";
import type { listarCategoriaI } from "../../categoria/interface/categoria";

export const CatalogoProductoPage = () => {
    const [productos, setProductos] = useState<ListarProductoPublicoI[]>([]);
    const [categorias, setCategorias] = useState<listarCategoriaI[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const [reponseProducto, responseCategoria] = await Promise.all([
                    listarProductosPublico({ destacado: "" }),
                    listarCategoria()
                ])
                setCategorias(responseCategoria)
                setProductos(reponseProducto)

            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* Título Minimalista */}
                <header className="text-center mb-12">
                    <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-zinc-800">
                        Catálogo
                    </h1>
                    <div className="h-px w-12 bg-pink-400 mx-auto mt-4"></div>
                </header>

                {/* Categorías */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    {categorias.map((cat, i) => (
                        <button
                            key={cat.id}
                            className={`text-xs uppercase tracking-widest font-bold transition-colors ${i === 0 ? "text-pink-500 border-b border-pink-500" : "text-zinc-400 hover:text-zinc-800"
                                }`}
                        >
                            {cat.nombre}
                        </button>
                    ))}
                </div>

                {/* Grilla de Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
                    {productos.map((item) => (
                        <div key={item._id} className="group">
                            {/* Contenedor de Imagen con Overlay */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50 mb-5">
                                <img
                                    src={`${urlBackend}/${item.imagenPrincipal}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={item.nombre}
                                />

                                {/* Overlay que aparece en Hover */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Link
                                        to={`/producto/${item._id}`}
                                        className="bg-white text-zinc-900 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-zinc-900 hover:text-white flex items-center gap-2"
                                    >
                                        <Plus size={12} /> Ver Detalle
                                    </Link>
                                </div>
                            </div>

                            {/* Información del Producto */}
                            <div className="space-y-1.5 text-center">
                                <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors">
                                    {item.nombre}
                                </h3>
                                <div className="h-[1px] w-4 bg-zinc-200 mx-auto my-2 group-hover:w-8 transition-all duration-500"></div>
                                <p className="text-sm font-black text-zinc-900 tracking-tighter">
                                    {item.precioVenta} <span className="text-[10px] font-normal">Bs</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Línea final sutil */}
                <div className="w-full h-px bg-zinc-100 mt-20"></div>
            </div>
        </div>
    );
};