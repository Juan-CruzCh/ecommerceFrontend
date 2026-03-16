import { Edit2, Trash2, Tag, CheckCircle2, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import type { ProductoI } from '../../producto/interface/producto'

import { useEstadoReload } from '../../../core/utils/appUtil'
import { listarTallas } from '../service/talla'
import type { listarTallaI } from '../interface/talla'

export const ListarTalla = ({ setTalla, talla }: { setTalla: (v: listarTallaI) => void, talla?: listarTallaI }) => {
    const [tallas, setTallas] = useState<listarTallaI[]>([])
    const { isReloading } = useEstadoReload()

    useEffect(() => {
        (async () => {
            try {
                const response = await listarTallas()
                setTallas(response)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [isReloading])

    return (
        <div className="w-full">


            <div className="border border-zinc-100 rounded-sm overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse bg-white">
                    <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-100 text-[9px] uppercase tracking-tighter text-zinc-500">
                            <th className="w-10 py-3 text-center">Sel.</th>
                            <th className="px-4 py-3 font-bold">Talla </th>

                            <th className="px-4 py-3 font-bold text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {
                            tallas.map(v => {
                                const estaSeleccionado = talla?._id === v._id;

                                return (
                                    <tr
                                        key={v._id}
                                        onClick={() => setTalla(v)}
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
                                                {v.nombre}
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
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}