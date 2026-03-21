import  { useEffect, useState } from "react";
import { listarProductosPublico } from "../service/producto";
import type { ListarProductoPublicoI } from "../interface/producto";

import {  listarCategoriaPublico } from "../../categoria/service/categoria";
import type { listarCategoriaI } from "../../categoria/interface/categoria";
import { CardProducto } from "../components/CardProducto";
import { SeoManager } from "../../../core/components/SeoManager";

export const CatalogoProductoPage = () => {
    const [productos, setProductos] = useState<ListarProductoPublicoI[]>([]);
    const [categorias, setCategorias] = useState<listarCategoriaI[]>([]);
    const [categoria, setCategoria] = useState<listarCategoriaI>();

    useEffect(() => {
        (async () => {
            try {
                const [reponseProducto, responseCategoria] = await Promise.all([
                    listarProductosPublico({ destacado: "", categoria: categoria?.id }),
                    listarCategoriaPublico()
                ])
                setCategorias(responseCategoria)
                setProductos(reponseProducto)
                if (!categoria && responseCategoria.length > 0) {
                    setCategoria(responseCategoria[0]);
                }
            } catch (error) {
                console.error(error);
            }
        })()
    }, [categoria])

    return (
        <div className="min-h-screen bg-white">
            <SeoManager 
                titulo={categoria ? `Colección de ${categoria.nombre}` : "Catálogo Completo"}
                descripcion={`Explora nuestra selección de ${categoria?.nombre || 'ropa tradicional'} en Tienda Marisa. Diseños exclusivos y calidad artesanal.`}
                ruta="catalogo"
                tipo="website"
            />

            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* Título Minimalista */}
                <header className="text-center mb-12">
                    <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-zinc-800">
                        Catálogo de productos
                    </h1>
                    <div className="h-px w-12 bg-pink-400 mx-auto mt-4"></div>
                </header>

                {/* Categorías con diseño mejorado */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categorias.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategoria(cat)}
                            className={`
        px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300
        ${cat.id === categoria?.id
                                    ? "bg-[#D68B8F] text-white shadow-lg transform scale-105"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-pink-100 hover:text-pink-500"
                                }
      `}
                        >
                            {cat.nombre}
                        </button>
                    ))}
                </div>
                {/* Grilla de Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
                    {productos.map((item) => (
                        <CardProducto item={item} />
                    ))}
                </div>

                {/* Línea final sutil */}
                <div className="w-full h-px bg-zinc-100 mt-20"></div>
            </div>
        </div>
    );
};