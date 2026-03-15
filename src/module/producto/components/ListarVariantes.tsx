import { Edit2, Trash2, Tag, CheckCircle2, ChevronRight } from 'lucide-react'
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
                setVariantes(response)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [producto, isReloading])

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-3 px-1">
                <Tag size={12} className="text-zinc-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Variantes Disponibles ({variantes.length})
                </span>
            </div>

            <div className="border border-zinc-100 rounded-sm overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse bg-white">
                    <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-100 text-[9px] uppercase tracking-tighter text-zinc-500">
                            <th className="w-10 py-3 text-center">Sel.</th>
                            <th className="px-4 py-3 font-bold">Talla / Medida</th>
                            <th className="px-4 py-3 font-bold">Color / Acabado</th>
                            <th className="px-4 py-3 font-bold text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {variantes.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center">
                                    <p className="text-[10px] uppercase text-zinc-300 font-medium tracking-widest">
                                        Sin variantes registradas
                                    </p>
                                </td>
                            </tr>
                        ) : (
                            variantes.map(v => {
                                const estaSeleccionado = variante === v._id;

                                return (
                                    <tr
                                        key={v._id}
                                        onClick={() => setVariante(v._id)}
                                        className={`group cursor-pointer transition-colors ${estaSeleccionado ? "bg-zinc-900 text-white" : "hover:bg-zinc-50"
                                            }`}
                                    >
                                        <td className="py-3 text-center">
                                            <div className="flex justify-center">
                                                {estaSeleccionado ? (
                                                    <CheckCircle2 size={14} className="text-white" />
                                                ) : (
                                                    <div className="w-3 h-3 rounded-full border border-zinc-300 group-hover:border-zinc-900" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-black uppercase ${estaSeleccionado ? "text-white" : "text-zinc-900"}`}>
                                                {v.talla}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-medium uppercase ${estaSeleccionado ? "text-zinc-300" : "text-zinc-600"}`}>
                                                {v.color}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex justify-center gap-2">
                                                <button className={`p-1 transition-colors ${estaSeleccionado ? "text-zinc-400 hover:text-white" : "text-zinc-300 hover:text-zinc-900"}`}>
                                                    <Edit2 size={14} />
                                                </button>
                                                <button className={`p-1 transition-colors ${estaSeleccionado ? "text-zinc-400 hover:text-red-400" : "text-zinc-300 hover:text-red-600"}`}>
                                                    <Trash2 size={14} />
                                                </button>
                                                <ChevronRight size={14} className={`ml-1 ${estaSeleccionado ? "text-white" : "text-zinc-200"}`} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}