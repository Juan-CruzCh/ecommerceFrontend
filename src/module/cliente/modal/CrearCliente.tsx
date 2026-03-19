import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { clienteForm, listarClienteI } from '../interface/cliente';
import { crearCliente } from '../service/cliente';
import { HttpStatusCode } from 'axios';

export const CrearCliente = ({setCliente}:{setCliente:(v:listarClienteI)=>void}) => {
    const [isOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<clienteForm>();

    const onSubmit = async (data: clienteForm) => {
        try {
            const response = await crearCliente(data)
            if (response) {
                setCliente(response)
                setIsOpen(false);
                reset();
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-black text-white px-5 py-2.5 text-xs font-bold tracking-widest hover:bg-gray-800 transition-all uppercase"
            >
                Nuevo Cliente +
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-black">
                    <div className="bg-white w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-200 border border-black">

                        <div className="px-8 py-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-light tracking-tighter uppercase">Nuevo Registro</h2>
                                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1">Información obligatoria</p>
                            </div>
                            <button
                                onClick={() => { setIsOpen(false); reset(); }}
                                className="text-black hover:opacity-40 text-3xl font-light"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8 space-y-6">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">

                                {/* CI */}
                                <div className="col-span-1">
                                    <label className="block text-[10px] font-black uppercase mb-1 tracking-widest">C.I. / Documento</label>
                                    <input
                                        {...register("ci", { required: "Requerido" })}
                                        type="text"
                                        className={`w-full bg-gray-50 border-b px-3 py-2.5 text-xs outline-none transition-all ${errors.ci ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-gray-100'}`}
                                    />
                                    {errors.ci && <p className="text-[9px] text-red-600 font-bold uppercase mt-1">{errors.ci.message}</p>}
                                </div>

                                {/* Celular */}
                                <div className="col-span-1">
                                    <label className="block text-[10px] font-black uppercase mb-1 tracking-widest">Celular</label>
                                    <input
                                        {...register("celular", { required: "Requerido" })}
                                        type="tel"
                                        className={`w-full bg-gray-50 border-b px-3 py-2.5 text-xs outline-none transition-all font-mono ${errors.celular ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-gray-100'}`}
                                    />
                                    {errors.celular && <p className="text-[9px] text-red-600 font-bold uppercase mt-1">{errors.celular.message}</p>}
                                </div>

                                {/* Nombres */}
                                <div className="col-span-1">
                                    <label className="block text-[10px] font-black uppercase mb-1 tracking-widest">Nombres</label>
                                    <input
                                        {...register("nombre", { required: "Requerido" })}
                                        type="text"
                                        className={`w-full bg-gray-50 border-b px-3 py-2.5 text-xs outline-none transition-all ${errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-gray-100'}`}
                                    />
                                    {errors.nombre && <p className="text-[9px] text-red-600 font-bold uppercase mt-1">{errors.nombre.message}</p>}
                                </div>

                                {/* Apellidos */}
                                <div className="col-span-1">
                                    <label className="block text-[10px] font-black uppercase mb-1 tracking-widest">Apellidos</label>
                                    <input
                                        {...register("apellidos", { required: "Requerido" })}
                                        type="text"
                                        className={`w-full bg-gray-50 border-b px-3 py-2.5 text-xs outline-none transition-all ${errors.apellidos ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-gray-100'}`}
                                    />
                                    {errors.apellidos && <p className="text-[9px] text-red-600 font-bold uppercase mt-1">{errors.apellidos.message}</p>}
                                </div>

                                {/* Dirección */}
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black uppercase mb-1 tracking-widest">Dirección Completa</label>
                                    <textarea
                                        {...register("direccion", { required: "Requerido" })}
                                        rows={2}
                                        className={`w-full bg-gray-50 border-b px-3 py-2.5 text-xs outline-none transition-all resize-none ${errors.direccion ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-gray-100'}`}
                                    ></textarea>
                                    {errors.direccion && <p className="text-[9px] text-red-600 font-bold uppercase mt-1">{errors.direccion.message}</p>}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-all active:scale-[0.98]"
                                >
                                    Guardar Cliente
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}