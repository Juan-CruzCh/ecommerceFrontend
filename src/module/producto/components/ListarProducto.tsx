import { useEffect, useState } from "react"
import { CrearCategoriaModal } from "../../categoria/modal/CrearCategoriaModal"
import { CrearProducto } from "../modal/CrearProducto"
import { Edit2, Eye, EyeOff, Search, Star, Trash2, Tag, FileText } from "lucide-react"
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
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <CrearCategoriaModal />
                    <CrearProducto />
                </div>

                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o categoría..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full border border-zinc-200 rounded-sm pl-10 py-2 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all"
                    />
                </div>
            </div>

            <div className="overflow-x-auto border border-zinc-200 rounded-sm">
                <table className="w-full text-left border-collapse bg-white">
                    <thead>
                        <tr className="bg-zinc-900 text-white uppercase text-[10px] tracking-[0.15em]">
                            <th className="px-6 py-4 font-black"> Código</th>
                            <th className="px-6 py-4 font-black">Producto</th>
                            <th className="px-6 py-4 font-black"><div className="flex items-center gap-2"><Tag size={12} /> Categoría</div></th>
                            <th className="px-6 py-4 font-black"><div className="flex items-center gap-2"><FileText size={12} /> Descripción</div></th>
                            <th className="px-6 py-4 font-black text-center">Estado</th>
                            <th className="px-6 py-4 font-black text-right">Compra</th>
                            <th className="px-6 py-4 font-black text-right bg-zinc-800">Venta</th>
                            <th className="px-6 py-4 font-black text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-zinc-100">
                        {productos.map((p) => (
                            <tr
                                key={p._id}
                                onClick={() => setSeleccionado(p)}
                                className={`cursor-pointer transition-all group ${seleccionado?._id === p._id ? "bg-zinc-100 shadow-inner" : "hover:bg-zinc-50"
                                    }`}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className={`font-black uppercase text-xs ${seleccionado?._id === p._id ? "text-zinc-900" : "text-zinc-700"}`}>
                                            {p.codigo}
                                        </span>

                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span >
                                            {p.nombre}
                                        </span>

                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-1 rounded-full font-bold uppercase tracking-tighter border border-zinc-200">
                                        {p.categoria}
                                    </span>
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                    <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 italic">
                                        {p.descripcion}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-3">
                                        {p.destacado && <Star size={14} className="text-amber-500 fill-amber-500" xlinkTitle="Destacado" />}
                                        {p.publico ?
                                            <Eye size={14} className="text-emerald-500" xlinkTitle="Visible en tienda" /> :
                                            <EyeOff size={14} className="text-zinc-300" xlinkTitle="Oculto" />
                                        }
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-zinc-500 font-medium">
                                    {p.precioCompra} <span className="text-[9px]">Bs</span>
                                </td>
                                <td className={`px-6 py-4 text-right font-mono font-black text-base ${seleccionado?._id === p._id ? "text-zinc-900" : "text-zinc-900"
                                    }`}>
                                    {p.precioVenta} <span className="text-[10px]">Bs</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-zinc-400 hover:text-zinc-900 hover:scale-110 transition-transform">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="text-zinc-400 hover:text-red-500 hover:scale-110 transition-transform">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}