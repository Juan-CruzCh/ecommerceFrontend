import { useState } from "react";
import { X, Star, Eye, AlignLeft, Hash, Plus } from "lucide-react";

export const CrearProducto = () => {
    // El componente ahora controla su propio estado de apertura
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Botón que dispara el Modal (puedes moverlo según necesites) */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1 text-[10px] font-bold uppercase border border-zinc-200 px-3 py-1.5 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all"
            >
                <Plus size={12} /> Nuevo Producto
            </button>

            {/* Modal condicional */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-lg shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200">

                        {/* Cabecera */}
                        <div className="flex justify-between items-center px-8 py-6 border-b border-zinc-50">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Nuevo Producto</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Nombre */}
                            <div className="group">
                                <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full border-b border-zinc-200 py-2 text-sm outline-none focus:border-zinc-900 transition-colors bg-transparent"
                                    placeholder="Nombre del producto..."
                                />
                            </div>


                            {/* Descripción */}
                            <div className="group">
                                <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1 flex items-center gap-1">
                                    <AlignLeft size={10} /> Descripción
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full border border-zinc-100 p-3 text-sm outline-none focus:border-zinc-900 transition-colors bg-zinc-50/50 resize-none"
                                    placeholder="Detalles del producto..."
                                />
                            </div>

                            {/* Estados */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <label className="flex items-center gap-3 p-3 border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-colors">
                                    <input type="checkbox" className="w-4 h-4 accent-zinc-900" />
                                    <div className="flex items-center gap-2">
                                        <Star size={14} className="text-zinc-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-tight">Destacado</span>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-colors">
                                    <input type="checkbox" className="w-4 h-4 accent-zinc-900" defaultChecked />
                                    <div className="flex items-center gap-2">
                                        <Eye size={14} className="text-zinc-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-tight">Público</span>
                                    </div>
                                </label>
                            </div>

                            {/* Botón de Guardado que también cierra el modal */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full mt-4 bg-zinc-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                            >
                                <Plus size={16} /> Crear Producto Nuevo
                            </button>
                        </div>

                        {/* Footer secundario */}
                        <div className="px-8 py-4 bg-zinc-50 flex justify-center border-t border-zinc-100">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors"
                            >
                                Cancelar y salir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};