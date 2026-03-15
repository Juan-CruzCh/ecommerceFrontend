import { useEffect, useState } from "react"
import { CrearCategoriaModal } from "../../categoria/modal/CrearCategoriaModal"
import { CrearProducto } from "../modal/CrearProducto"
import { Edit2, Eye, EyeOff, Search, Star, Trash2 } from "lucide-react"
import { listarProducto } from "../service/producto"
import type { AxiosError } from "axios"
import type { ProductoI } from "../interface/producto"
import { useEstadoReload } from "../../../core/utils/appUtil"

export const ListarProducto = ({ setSeleccionado, seleccionado }: { setSeleccionado: (v: ProductoI) => void, seleccionado?: ProductoI }) => {
    const { isReloading } = useEstadoReload()
    const [productos, setProductos] = useState<ProductoI[]>([])
    const [busqueda, setBusqueda] = useState("")


    useEffect(() => {
        (async () => {
            try {
                const response = await listarProducto()
                setProductos(response)
            } catch (error) {
                const e = error as AxiosError<any>
                console.log(e.response?.data)
            }
        })()
    }, [isReloading])


    return (
        <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
                <CrearCategoriaModal />
                <CrearProducto />
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full border-b border-zinc-200 pl-8 py-1 text-sm outline-none focus:border-zinc-900"
                />
            </div>

            <div className="space-y-1">
                {productos.map((p) => (
                    <div
                        key={p._id}

                        onClick={() => setSeleccionado(p)}

                        className={`p-2 border cursor-pointer group transition-colors ${seleccionado?._id === p._id
                            ? "bg-zinc-100 border-zinc-900"
                            : "border-transparent hover:bg-zinc-50"
                            }`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <span className="text-sm font-medium truncate block">
                                    {p.nombre}
                                </span>
                                <span className="text-[10px] text-zinc-400 uppercase">
                                    {p.categoria}
                                </span>
                            </div>

                            <div className="flex gap-1">
                                {p.destacado && (
                                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                )}
                                {p.publico ? (
                                    <Eye size={12} className="text-zinc-400" />
                                ) : (
                                    <EyeOff size={12} className="text-zinc-300" />
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-zinc-400 font-mono uppercase font-bold">
                                {p.codigo}
                            </span>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Edit2 size={12} className="text-zinc-400 hover:text-zinc-900 cursor-pointer" />
                                <Trash2 size={12} className="text-zinc-400 hover:text-red-500 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
