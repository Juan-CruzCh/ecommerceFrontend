import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X, Maximize, Plus } from 'lucide-react'
import type { formTalla } from '../interface/talla';
import { crearTalla } from '../service/talla';
import { HttpStatusCode } from 'axios';



export const CrearTalla = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Configuración de react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<formTalla>();

    const onSubmit = async (data: formTalla) => {
        const response = await crearTalla(data)

        if (response.status === HttpStatusCode.Created) {
            reset();
            setIsOpen(false);
        }

    };

    return (
        <>
            {/* Botón disparador */}
            <button
                onClick={() => setIsOpen(true)}
                className="text-[10px] font-bold border border-zinc-900 px-3 py-1.5 hover:bg-zinc-900 hover:text-white uppercase transition-all flex items-center gap-2"
            >
                <Plus size={14} /> Nueva Talla
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-sm shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200">

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Cabecera Limpia */}
                            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-100 bg-zinc-50">
                                <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900">
                                    Registrar Talla
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => { setIsOpen(false); reset(); }}
                                    className="p-1 hover:bg-zinc-200 rounded-full text-zinc-400 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Cuerpo del Formulario */}
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-zinc-500 flex items-center gap-1">
                                        <Maximize size={12} /> Nombre de Talla
                                    </label>
                                    <input
                                        {...register("nombre", {
                                            required: "El nombre es obligatorio",
                                            minLength: { value: 1, message: "Mínimo 1 carácter" }
                                        })}
                                        placeholder="Ej: XL, 42, Única..."
                                        autoFocus
                                        className={`w-full border-b-2 py-2 text-lg font-medium outline-none transition-colors ${errors.nombre ? 'border-red-500' : 'border-zinc-200 focus:border-zinc-900'
                                            }`}
                                    />
                                    {errors.nombre && (
                                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">
                                            {errors.nombre.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-zinc-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-lg active:scale-[0.95]"
                                >
                                    Guardar Talla
                                </button>
                            </div>

                            {/* Footer / Cancelar */}
                            <div className="px-6 py-4 bg-zinc-50 flex justify-center border-t border-zinc-100">
                                <button
                                    type="button"
                                    onClick={() => { setIsOpen(false); reset(); }}
                                    className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                                >
                                    Cerrar Ventana
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}