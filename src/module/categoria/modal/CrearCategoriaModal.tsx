import { useState } from "react";

import { X, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { crearCategoria } from "../service/categoria";
import { HttpStatusCode } from "axios";

interface FormCategoria {
    nombre: string;
}

export const CrearCategoriaModal = () => {

    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormCategoria>();

    const onSubmit = async (data: FormCategoria) => {
        console.log(data);
        try {
            const response = await crearCategoria(data.nombre)
            if (response.status == HttpStatusCode.Created) {
                reset();
                setIsOpen(false);

            }
        } catch (err) {
            console.log(err);


        }

    };

    return (
        <>
            {/* Botón abrir modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1 text-[10px] font-bold uppercase border border-zinc-200 px-3 py-1.5 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all"
            >
                <Plus size={12} /> Nuevo Categoria
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-lg shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="flex justify-between items-center px-8 py-6 border-b border-zinc-50">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
                                Nuevo Categoria
                            </h2>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="p-8 space-y-6">

                                <div className="group">
                                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Nombre del categoria..."
                                        className="w-full border-b border-zinc-200 py-2 text-sm outline-none focus:border-zinc-900 transition-colors bg-transparent"
                                        {...register("nombre", {
                                            required: "El nombre es obligatorio"
                                        })}
                                    />

                                    {errors.nombre && (
                                        <p className="text-[10px] text-red-500 mt-1">
                                            {errors.nombre.message}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* Guardar */}
                            <button
                                type="submit"
                                className="w-full mt-4 bg-zinc-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                            >
                                <Plus size={16} /> Guardar
                            </button>

                        </form>

                        {/* Footer */}
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
