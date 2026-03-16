import React, { useEffect, useState } from "react";
import { listarProductosPublico } from "../service/producto";
import type { ListarProductoPublicoI } from "../interface/producto";
import { urlBackend } from "../../../core/config/intanceAxios";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { listarCategoria } from "../../categoria/service/categoria";
import type { listarCategoriaI } from "../../categoria/interface/categoria";
import { CardProducto } from "../components/CardProducto";

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
                     <CardProducto item={item}/>
                    ))}
                </div>

                {/* Línea final sutil */}
                <div className="w-full h-px bg-zinc-100 mt-20"></div>
            </div>
        </div>
    );
};