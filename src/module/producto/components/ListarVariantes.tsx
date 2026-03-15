import { ArrowRight, Edit2, Trash2, Tag, CheckCircle2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import type { ProductoI, VarianteProductoI } from '../interface/producto'
import { listarVarianteProducto } from '../service/producto'
import { useEstadoReload } from '../../../core/utils/appUtil'

export const ListarVariantes = ({ producto, setVariante, variante }: { producto: ProductoI, setVariante: (v: string) => void, variante: string }) => {
    const [variantes, setVariantes] = useState<VarianteProductoI[]>([])
    const { isReloading } = useEstadoReload()

    useEffect(() => {
        (async () => {
            try {
                const response = await listarVarianteProducto(producto._id)
                console.log(response);

                setVariantes(response)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [producto, isReloading])

    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2 mb-3 px-1">
                <Tag size={12} className="text-zinc-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Variantes Disponibles ({variantes.length})
                </span>
            </div>

            {variantes.length === 0 ? (
                <div className="p-8 border border-dashed border-zinc-200 text-center">
                    <p className="text-[10px] uppercase text-zinc-400 font-medium">Sin variantes registradas</p>
                </div>
            ) : (
                variantes.map(v => {
                    const estaSeleccionado = variante === v._id;

                    return (
                        <div
                            key={v._id}
                            onClick={() => setVariante(v._id)}
                            className={`group flex items-center justify-between p-3 border cursor-pointer transition-all duration-200 ${estaSeleccionado
                                ? "border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900"
                                : "border-zinc-100 hover:border-zinc-400 bg-white"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Check o Barra Lateral */}
                                {estaSeleccionado ? (
                                    <div className="flex items-center justify-center w-1 h-8">
                                        <CheckCircle2 size={16} className="text-zinc-900" />
                                    </div>
                                ) : (
                                    <div className="w-1 h-8 bg-zinc-200 group-hover:bg-zinc-900 transition-colors" />
                                )}

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-black uppercase tracking-tight ${estaSeleccionado ? "text-zinc-900" : "text-zinc-500"}`}>
                                            Talla {v.talla}
                                        </span>
                                        <span className="text-[10px] text-zinc-400 font-bold uppercase">/</span>
                                        <span className={`text-xs font-medium uppercase ${estaSeleccionado ? "text-zinc-900" : "text-zinc-600"}`}>
                                            {v.color}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[9px] font-mono text-zinc-400 uppercase">
                                            ID: {v._id.slice(-6)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                                {/* Botones de acción */}
                                <div className={`flex gap-3 transition-all ${estaSeleccionado ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                    <button
                                        className="p-1.5 hover:bg-zinc-200 rounded-full text-zinc-400 hover:text-zinc-900 transition-colors"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        className="p-1.5 hover:bg-red-50 rounded-full text-zinc-400 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                                <ArrowRight size={14} className={`${estaSeleccionado ? "text-zinc-900" : "text-zinc-300"}`} />
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}
