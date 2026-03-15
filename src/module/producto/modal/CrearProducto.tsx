import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Star, Eye, AlignLeft, Plus } from "lucide-react";
import type { FormProducto } from "../interface/producto";
import type { listarCategoriaI } from "../../categoria/interface/categoria";
import { listarCategoria } from "../../categoria/service/categoria";
import { crearProducto } from "../service/producto";
import { AxiosError, HttpStatusCode } from "axios";
import { useEstadoReload } from "../../../core/utils/appUtil";



export const CrearProducto = () => {
    const [categorias, setCategorias] = useState<listarCategoriaI[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { triggerReload } = useEstadoReload()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormProducto>();

    const onSubmit = async (data: FormProducto) => {
        try {
            const response = await crearProducto(data)


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

    useEffect(() => {
        if (isOpen) {
            (async () => {
                try {
                    const response = await listarCategoria()

                    setCategorias(response)
                } catch (error) {
                    console.log(error);

                }
            })()
        }
    }, [isOpen])

    return (
        <>
            {/* Botón abrir modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1 text-[10px] font-bold uppercase border border-zinc-200 px-3 py-1.5 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all"
            >
                <Plus size={12} /> Nuevo Producto
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">

                    <div className="bg-white w-full max-w-lg shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="flex justify-between items-center px-8 py-6 border-b border-zinc-50">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
                                Nuevo Producto
                            </h2>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="p-8 space-y-6">

                                {/* Nombre */}
                                <div>
                                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Nombre del producto..."
                                        className="w-full border-b border-zinc-200 py-2 text-sm outline-none focus:border-zinc-900 transition-colors bg-transparent"
                                        {...register("nombre", { required: "El nombre es obligatorio" })}
                                    />

                                    {errors.nombre && (
                                        <p className="text-[10px] text-red-500 mt-1">
                                            {errors.nombre.message}
                                        </p>
                                    )}
                                </div>

                                {/* Categoría */}
                                <div>
                                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">
                                        Categoría
                                    </label>

                                    <select
                                        className="w-full border border-zinc-200 py-2 px-2 text-sm outline-none focus:border-zinc-900 bg-transparent"
                                        {...register("categoria", { required: "Seleccione una categoría" })}
                                    >
                                        <option value="">Seleccionar categoría</option>

                                        {categorias.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.nombre}
                                            </option>
                                        ))}

                                    </select>

                                    {errors.categoria && (
                                        <p className="text-[10px] text-red-500 mt-1">
                                            {errors.categoria.message}
                                        </p>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1 flex items-center gap-1">
                                        <AlignLeft size={10} /> Descripción
                                    </label>

                                    <textarea
                                        rows={3}
                                        placeholder="Detalles del producto..."
                                        className="w-full border border-zinc-100 p-3 text-sm outline-none focus:border-zinc-900 transition-colors bg-zinc-50/50 resize-none"
                                        {...register("descripcion")}
                                    />
                                </div>

                                {/* Estados */}
                                <div className="grid grid-cols-2 gap-4 pt-2">

                                    <label className="flex items-center gap-3 p-3 border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-zinc-900"
                                            {...register("destacado")}
                                        />

                                        <div className="flex items-center gap-2">
                                            <Star size={14} className="text-zinc-400" />
                                            <span className="text-[10px] font-bold uppercase">
                                                Destacado
                                            </span>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 p-3 border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="w-4 h-4 accent-zinc-900"
                                            {...register("publico")}
                                        />

                                        <div className="flex items-center gap-2">
                                            <Eye size={14} className="text-zinc-400" />
                                            <span className="text-[10px] font-bold uppercase">
                                                Público
                                            </span>
                                        </div>
                                    </label>

                                </div>

                                {/* Botón guardar */}
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-zinc-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors shadow-lg"
                                >
                                    <Plus size={16} /> Crear Producto Nuevo
                                </button>

                            </div>

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
