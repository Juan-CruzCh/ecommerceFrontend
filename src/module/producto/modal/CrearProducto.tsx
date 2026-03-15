import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Star, Eye, AlignLeft, Plus } from "lucide-react";
import type { FormProducto } from "../interface/producto";
import type { listarCategoriaI } from "../../categoria/interface/categoria";
import { listarCategoria } from "../../categoria/service/categoria";
import { crearProducto } from "../service/producto";
import { HttpStatusCode } from "axios";
import { useEstadoReload } from "../../../core/utils/appUtil";

export const CrearProducto = () => {
    const [categorias, setCategorias] = useState<listarCategoriaI[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { triggerReload } = useEstadoReload();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormProducto>();

    const onSubmit = async (data: FormProducto) => {
        try {
            data.precioCompra = Number(data.precioCompra);
            data.precioVenta = Number(data.precioVenta);
            const response = await crearProducto(data);

            if (response.status === HttpStatusCode.Created) {
                triggerReload();
                reset();
                setIsOpen(false);
            }
        } catch (error) {
            console.error("Error al crear producto", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            (async () => {
                try {
                    const response = await listarCategoria();
                    setCategorias(response);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1 text-[10px] font-bold uppercase border border-zinc-200 px-3 py-1.5 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all"
            >
                <Plus size={12} /> Nuevo Producto
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-2xl shadow-2xl border border-zinc-100 animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">

                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-100">
                            <h2 className="text-xs font-bold uppercase tracking-widest">
                                Nuevo Producto
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-900">
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
                            <div className="p-6 space-y-5">

                                {/* Fila 1: Nombre y Categoría */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">
                                            Nombre <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full border-b ${errors.nombre ? 'border-red-500' : 'border-zinc-200'} py-1.5 text-sm outline-none focus:border-zinc-900 bg-transparent`}
                                            {...register("nombre", { required: "El nombre es obligatorio" })}
                                        />
                                        {errors.nombre && <p className="text-[9px] text-red-500 mt-1">{errors.nombre.message}</p>}
                                    </div>

                                    <div>
                                        <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">
                                            Categoría <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            className={`w-full border-b ${errors.categoria ? 'border-red-500' : 'border-zinc-200'} py-1.5 text-sm outline-none focus:border-zinc-900 bg-transparent cursor-pointer`}
                                            {...register("categoria", { required: "Selecciona una categoría" })}
                                        >
                                            <option value="">Seleccionar...</option>
                                            {categorias.map((c) => (
                                                <option key={c.id} value={c.id}>{c.nombre}</option>
                                            ))}
                                        </select>
                                        {errors.categoria && <p className="text-[9px] text-red-500 mt-1">{errors.categoria.message}</p>}
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="text-[9px] font-bold uppercase text-zinc-400 mb-1 flex items-center gap-1">
                                        <AlignLeft size={10} /> Descripción <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={2}
                                        className={`w-full border ${errors.descripcion ? 'border-red-500' : 'border-zinc-100'} p-2 text-sm outline-none focus:border-zinc-900 bg-zinc-50/50 resize-none`}
                                        {...register("descripcion", { required: "Añade una descripción breve" })}
                                    />
                                    {errors.descripcion && <p className="text-[9px] text-red-500 mt-1">{errors.descripcion.message}</p>}
                                </div>

                                {/* Fila 2: Precios */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">
                                            Precio Compra <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className={`w-full border-b ${errors.precioCompra ? 'border-red-500' : 'border-zinc-200'} py-1.5 text-sm outline-none focus:border-zinc-900 bg-transparent`}
                                            {...register("precioCompra", {
                                                required: "Requerido",
                                                min: { value: 0.01, message: "Mínimo 0.01" }
                                            })}
                                        />
                                        {errors.precioCompra && <p className="text-[9px] text-red-500 mt-1">{errors.precioCompra.message}</p>}
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-bold uppercase text-zinc-400 block mb-1">
                                            Precio Venta <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className={`w-full border-b ${errors.precioVenta ? 'border-red-500' : 'border-zinc-200'} py-1.5 text-sm outline-none focus:border-zinc-900 bg-transparent`}
                                            {...register("precioVenta", {
                                                required: "Requerido",
                                                min: { value: 0.01, message: "Mínimo 0.01" }
                                            })}
                                        />
                                        {errors.precioVenta && <p className="text-[9px] text-red-500 mt-1">{errors.precioVenta.message}</p>}
                                    </div>
                                </div>

                                {/* Estados */}
                                <div className="flex gap-4 pt-2">
                                    <label className="flex-1 flex items-center justify-center gap-2 p-2 border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-colors">
                                        <input type="checkbox" className="w-3 h-3 accent-zinc-900" {...register("destacado")} />
                                        <Star size={12} className="text-zinc-400" />
                                        <span className="text-[9px] font-bold uppercase">Destacado</span>
                                    </label>

                                    <label className="flex-1 flex items-center justify-center gap-2 p-2 border border-zinc-100 cursor-pointer hover:bg-zinc-50 transition-colors">
                                        <input type="checkbox" defaultChecked className="w-3 h-3 accent-zinc-900" {...register("publico")} />
                                        <Eye size={12} className="text-zinc-400" />
                                        <span className="text-[9px] font-bold uppercase">Público</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-zinc-900 text-white py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors"
                                >
                                    <Plus size={14} /> Crear Producto
                                </button>
                            </div>
                        </form>

                        <div className="px-6 py-3 bg-zinc-50 flex justify-center border-t border-zinc-100">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600"
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