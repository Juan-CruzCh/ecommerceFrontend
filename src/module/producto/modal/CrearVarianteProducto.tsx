import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Plus, Palette, Maximize } from "lucide-react";
import type { ProductoI, VarianteForm } from "../interface/producto";
import { AxiosError, HttpStatusCode } from "axios";
import { crearVarianteProducto } from "../service/producto";
import { useEstadoReload } from "../../../core/utils/appUtil";


export const CrearVarianteProducto = ({ producto }: { producto: ProductoI }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { triggerReload } = useEstadoReload()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<VarianteForm>();

    const onSubmit = async (data: VarianteForm) => {
        try {
            data.producto = producto._id
            const response = await crearVarianteProducto(data)

            if (response.status == HttpStatusCode.Created) {
                triggerReload()
                reset();
                setIsOpen(false);
            }
        } catch (error) {
            const e = error as AxiosError<any>
            console.log(e.response?.data);

        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-[10px] font-bold border border-zinc-900 px-2 py-1 hover:bg-zinc-900 hover:text-white uppercase transition-all"
            >
                + Variante
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200">

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Cabecera con Nombre, Código y Categoría resaltados */}
                            <div className="flex justify-between items-start px-8 py-6 border-b border-zinc-100 bg-zinc-50/50">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] bg-zinc-900 text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                                            {producto.categoria}
                                        </span>
                                        <span className="text-[11px] font-mono text-zinc-500 font-bold uppercase">
                                            {producto.codigo}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 leading-none">
                                        {producto.nombre}
                                    </h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setIsOpen(false); reset(); }}
                                    className="p-1 hover:bg-zinc-200 rounded-full text-zinc-400"
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                {/* Talla y Color en una fila - Ambos obligatorios */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold uppercase text-zinc-400 flex items-center gap-1">
                                            <Maximize size={10} /> Talla *
                                        </label>
                                        <input
                                            {...register("talla", { required: true })}
                                            placeholder="Ej. M, L..."
                                            className={`w-full border-b py-2 text-sm outline-none transition-colors ${errors.talla ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900'
                                                }`}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold uppercase text-zinc-400 flex items-center gap-1">
                                            <Palette size={10} /> Color *
                                        </label>
                                        <input
                                            {...register("color", { required: true })}
                                            placeholder="Ej. Negro..."
                                            className={`w-full border-b py-2 text-sm outline-none transition-colors ${errors.color ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-zinc-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-lg active:scale-[0.98]"
                                >
                                    <Plus size={16} /> Añadir Variante
                                </button>
                            </div>

                            <div className="px-8 py-4 bg-zinc-50 flex justify-center border-t border-zinc-100">
                                <button
                                    type="button"
                                    onClick={() => { setIsOpen(false); reset(); }}
                                    className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};