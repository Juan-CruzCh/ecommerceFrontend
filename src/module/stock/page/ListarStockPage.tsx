import React from "react";
import { Search, Filter, Star, Eye, Edit3, Trash2 } from "lucide-react";
import { CrearProducto } from "../../producto/modal/CrearProducto";

export const ListarStockPage = () => {
    return (
        <div className="min-h-screen bg-white text-zinc-800 font-sans p-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Cabecera de Página */}
                <header className="flex justify-between items-end mb-10 pb-6 border-b border-zinc-100">
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-tighter italic">Stock Central</h1>
                        <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">Panel General de Existencias</p>
                    </div>
                    <div className="flex gap-3">
                        <CrearProducto />
                    </div>
                </header>

                {/* Filtros y Búsqueda */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o referencia..."
                            className="w-full bg-zinc-50 border-none py-3 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-zinc-100 text-[10px] font-bold uppercase hover:bg-zinc-50 transition-colors">
                            <Filter size={14} /> Filtros
                        </button>
                    </div>
                </div>

                {/* Tabla de Inventario */}
                <div className="w-full overflow-hidden border border-zinc-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider w-12"></th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Producto</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Stock Total</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Estado</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {[1, 2, 3].map((item) => (
                                <React.Fragment key={item}>
                                    {/* Fila Principal: PRODUCTO */}
                                    <tr className="group hover:bg-zinc-50/30 transition-colors">
                                        <td className="p-4">
                                            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200">
                                                <img src={`https://picsum.photos/100/100?random=${item}`} alt="img" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="text-sm font-bold uppercase tracking-tight">Manta Artesanal {item}</p>
                                                <p className="text-[10px] text-zinc-400 font-mono">REF-00{item}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="text-xs font-bold font-mono italic">48 u.</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center gap-3">
                                                <Star size={14} className={item === 1 ? "fill-zinc-900 text-zinc-900" : "text-zinc-200"} />
                                                <Eye size={14} className="text-zinc-400" />
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end items-center gap-2">

                                                <div className="flex items-center border-l border-zinc-100 ml-2 pl-2 gap-1">
                                                    <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all rounded-sm">
                                                        <Edit3 size={15} />
                                                    </button>
                                                    <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-sm">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Fila Secundaria: VARIANTES */}
                                    <tr className="bg-zinc-50/20">
                                        <td colSpan={5} className="px-14 py-3 border-l-2 border-zinc-900">
                                            <div className="flex gap-4 flex-wrap">
                                                {[1, 2].map(v => (
                                                    <div key={v} className="flex items-center gap-4 border border-zinc-100 bg-white p-2 pr-3 shadow-sm">
                                                        <div className="flex flex-col">
                                                            <span className="text-[8px] font-bold text-zinc-400 uppercase italic tracking-tighter">Variante {v}</span>
                                                            <span className="text-[10px] font-mono font-bold">DISPONIBLE: 24</span>
                                                        </div>
                                                        <div className="flex gap-1 border-l border-zinc-50 pl-2">
                                                            <button className="p-1 text-zinc-300 hover:text-zinc-900 transition-colors">
                                                                <Edit3 size={12} />
                                                            </button>
                                                            <button className="p-1 text-zinc-300 hover:text-red-500 transition-colors">
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <footer className="mt-8 flex justify-between items-center">
                    <p className="text-[10px] font-bold uppercase text-zinc-400 font-mono tracking-widest">Page 01 // 12</p>
                    <div className="flex gap-1">
                        {[1, 2].map(p => (
                            <button key={p} className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold ${p === 1 ? 'bg-zinc-900 text-white' : 'border border-zinc-100 hover:bg-zinc-50 transition-all'}`}>
                                0{p}
                            </button>
                        ))}
                    </div>
                </footer>
            </div>
        </div>
    );
};