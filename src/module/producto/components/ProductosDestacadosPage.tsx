import React, { useEffect, useState } from 'react'
import { listarProductosPublico } from '../service/producto'
import type { ListarProductoPublicoI } from '../interface/producto';

import { CardProducto } from './CardProducto';

export const ProductosDestacadosPage = () => {
    const [productos, setProductos] = useState<ListarProductoPublicoI[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const reponseProducto = await listarProductosPublico({ destacado: "destacado" })
                setProductos(reponseProducto)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-pink-500 text-[10px] uppercase tracking-widest font-bold">Selección especial</span>
                        <h2 className="text-3xl font-light uppercase tracking-widest mt-2">Destacados</h2>
                    </div>
                    <a href="/catalogo" className="text-xs uppercase tracking-widest border-b border-zinc-800 pb-1 hover:text-pink-500 hover:border-pink-500 transition-all">Ver todo</a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
                    {productos.map((item) => (
                        <CardProducto item={item} />
                    ))}
                </div>
            </div>
        </>
    )
}
