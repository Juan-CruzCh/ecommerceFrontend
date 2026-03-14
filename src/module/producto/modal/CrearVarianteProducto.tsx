import React, { useState } from "react";
import { X, Plus, Palette, Maximize, Hash, Save } from "lucide-react";

export const CrearVarianteProducto = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Botón para abrir el Modal de Variante */}
            <button
                onClick={() => setIsOpen(true)}
                className="text-[10px] font-bold border border-zinc-900 px-2 py-1 hover:bg-zinc-900 hover:text-white uppercase transition-all"
            >
                + Variante
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200">

                        {/* Cabecera */}
                        <div className="flex justify-between items-center px-8 py-6 border-b border-zinc-50">
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Nueva Variante</h2>
                                <p className="text-[9px] text-zinc-400 uppercase mt-1">Manta Artesanal / REF-001</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">

                            {/* Talla y Color en una fila */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1 flex items-center gap-1">
                                        <Maximize size={10} /> Talla
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-zinc-200 py-2 text-sm outline-none focus:border-zinc-900 transition-colors bg-transparent"
                                        placeholder="Ej. M, L, Única"
                                    />
                                </div>
                                <div className="group">
                                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1 flex items-center gap-1">
                                        <Palette size={10} /> Color
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-b border-zinc-200 py-2 text-sm outline-none focus:border-zinc-900 transition-colors bg-transparent"
                                        placeholder="Ej. Rojo, Beige"
                                    />
                                </div>
                            </div>




                            {/* Botón de Guardado */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full mt-4 bg-zinc-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                            >
                                <Plus size={16} /> Añadir Variante
                            </button>
                        </div>

                        {/* Footer secundario */}
                        <div className="px-8 py-4 bg-zinc-50 flex justify-center border-t border-zinc-100">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};