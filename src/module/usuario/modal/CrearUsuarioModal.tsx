import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Shield, Smartphone, IdCard, Lock, User, Plus } from 'lucide-react';
import type { UsuarioFormData } from '../interface/usuario';
import { HttpStatusCode, type AxiosError } from 'axios';
import { crearUsuario } from '../service/usuario';
import { useEstadoReload } from '../../../core/utils/appUtil';
import { mostrarError } from '../../venta/utils/alertas';

export const CrearUsuarioModal = () => {
    const { triggerReload } = useEstadoReload()
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UsuarioFormData>();

    const toggleModal = () => {
        setIsVisible(!isVisible);
        if (isVisible) reset();
    };

    const onSubmit = async (data: UsuarioFormData) => {
        try {
            data.rol = "ADMINISTRADOR"
            const response = await crearUsuario(data)
            if (response.status == HttpStatusCode.Created) {
                triggerReload()
                setIsVisible(false)
            }
        } catch (error) {
            const e = error as AxiosError<any>;
            mostrarError(e.response?.data.mensaje)

        }
    };

    const inputClass = (error: any) => `
        w-full px-4 py-2 bg-white border rounded-lg text-sm outline-none transition-all
        ${error ? 'border-red-500' : 'border-gray-200 focus:border-black'}
    `;

    return (
        <>
            {/* Disparador autónomo */}
            <button
                onClick={toggleModal}
                className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
            >
                <Plus size={16} />
                Nuevo Usuario
            </button>

            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={toggleModal}
                    />

                    {/* Contenedor Modal */}
                    <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden">

                        {/* Cabecera */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-black tracking-tight">Crear Usuario</h2>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Sistema Privado</p>
                            </div>
                            <button
                                onClick={toggleModal}
                                className="text-gray-400 hover:text-black transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Nombre</label>
                                    <input
                                        {...register("nombre", { required: true })}
                                        className={inputClass(errors.nombre)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Apellidos</label>
                                    <input
                                        {...register("apellidos", { required: true })}
                                        className={inputClass(errors.apellidos)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                                        <IdCard size={12} /> C.I.
                                    </label>
                                    <input
                                        {...register("ci", {
                                            required: true,
                                            pattern: /^[0-9]+$/
                                        })}
                                        className={inputClass(errors.ci)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                                        <Smartphone size={12} /> Celular
                                    </label>
                                    <input
                                        {...register("celular", {
                                            required: true,
                                            pattern: /^[0-9]+$/
                                        })}
                                        className={inputClass(errors.celular)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                                        <User size={12} /> Usuario
                                    </label>
                                    <input
                                        {...register("usuario", { required: true })}
                                        className={inputClass(errors.usuario)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                                        <Lock size={4} /> Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                        className={inputClass(errors.password)}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                                        <Shield size={14} className="text-gray-400" />
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">Rol: Administrador</span>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="mt-8 flex flex-col gap-2">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-all uppercase tracking-widest"
                                >
                                    Confirmar Registro
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="w-full py-2 text-gray-400 text-[10px] font-medium hover:text-black transition-colors uppercase tracking-widest"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};