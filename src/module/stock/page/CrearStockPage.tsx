import React from "react";
import { Search, UploadCloud, Check, Plus, ArrowRight, Save, Edit2, Trash2, Star, Eye, EyeOff, X } from "lucide-react";
import { CrearProducto } from "../../producto/modal/CrearProducto";
import { CrearVarianteProducto } from "../../producto/modal/CrearVarianteProducto";

export const CrearStockPage = () => {
    return (
        <div className="min-h-screen bg-white text-zinc-800 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 py-8">

                {/* Cabecera */}
                <header className="flex justify-between items-center mb-8 border-b pb-4">
                    <div>
                        <h1 className="text-lg font-bold uppercase tracking-tight">Inventario</h1>
                        <p className="text-xs text-zinc-500">Gestión de productos y stock.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2 text-xs font-semibold hover:bg-zinc-800">
                        <Save size={16} /> Guardar todo
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* 1. PRODUCTOS */}
                    <div className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[10px] font-bold uppercase text-zinc-400">1. Productos</h2>
                            <CrearProducto />
                        </div>

                        <div className="relative mb-4">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="w-full border-b border-zinc-200 pl-8 py-1 text-sm outline-none focus:border-zinc-900"
                            />
                        </div>

                        <div className="space-y-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`p-2 border ${i === 1 ? 'border-zinc-900 bg-zinc-50' : 'border-transparent hover:bg-zinc-50'} cursor-pointer group`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-sm font-medium truncate">Manta Artesanal {i}</span>
                                        <div className="flex gap-1">
                                            <Star size={12} className={i === 1 ? "text-yellow-500 fill-yellow-500" : "text-zinc-200"} />
                                            {i % 2 === 0 ? <EyeOff size={12} className="text-zinc-300" /> : <Eye size={12} className="text-zinc-400" />}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-zinc-400 font-mono uppercase font-bold">REF-00{i}</span>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit2 size={12} className="text-zinc-400 hover:text-zinc-900" />
                                            <Trash2 size={12} className="text-zinc-400 hover:text-red-500" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. VARIANTES */}
                    <div className="lg:col-span-4 border-l border-r border-zinc-100 px-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[10px] font-bold uppercase text-zinc-400">2. Variantes</h2>
                            <CrearVarianteProducto />
                        </div>

                        <div className="space-y-2">
                            {[1, 2, 3].map(v => (
                                <div key={v} className={`flex items-center justify-between p-3 border ${v === 1 ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-100 hover:border-zinc-200'} cursor-pointer group`}>
                                    <div>
                                        <p className="text-xs font-bold uppercase">Talla {v === 1 ? 'M' : 'S'} / Rojo</p>
                                        <p className={`text-[10px] ${v === 1 ? 'text-zinc-400' : 'text-zinc-500'}`}>Stock: 12</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit2 size={12} />
                                            <Trash2 size={12} className="hover:text-red-500" />
                                        </div>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. STOCK & MULTI-IMAGEN */}
                    <div className="lg:col-span-5">
                        <h2 className="text-[10px] font-bold uppercase text-zinc-400 mb-6">3. Ajuste & Galería</h2>
                        <div className="flex flex-col gap-6">

                            {/* Galería de Imágenes */}
                            <div className="grid grid-cols-4 gap-2">
                                {/* Imagen Principal */}
                                <div className="col-span-2 row-span-2 aspect-square border border-zinc-200 relative group bg-zinc-50 overflow-hidden">
                                    <img src="https://picsum.photos/400/400?1" className="w-full h-full object-cover" />
                                    <button className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={12} />
                                    </button>
                                </div>
                                {/* Miniaturas */}
                                {[2, 3, 4].map(img => (
                                    <div key={img} className="aspect-square border border-zinc-200 relative group bg-zinc-50 overflow-hidden">
                                        <img src={`https://picsum.photos/200/200?${img}`} className="w-full h-full object-cover" />
                                        <button className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                                {/* Botón Añadir más */}
                                <label className="aspect-square border border-dashed border-zinc-300 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors">
                                    <Plus size={16} className="text-zinc-400" />
                                    <span className="text-[8px] font-bold uppercase text-zinc-400">Subir</span>
                                    <input type="file" className="hidden" multiple />
                                </label>
                            </div>

                            <div className="w-full space-y-4 pt-4 border-t border-zinc-100">
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Stock a añadir</label>
                                    <input
                                        type="number"
                                        className="w-full text-3xl font-bold border-b border-zinc-900 py-1 outline-none"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="flex gap-4 py-3 border-y border-zinc-50">
                                    <div className="flex-1">
                                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Actual</span>
                                        <p className="text-sm font-semibold">12 u.</p>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[9px] text-zinc-400 uppercase font-bold">Final</span>
                                        <p className="text-sm font-bold text-zinc-900 underline underline-offset-2">12 u.</p>
                                    </div>
                                </div>

                                <button className="w-full bg-zinc-900 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors">
                                    Actualizar Variante
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};