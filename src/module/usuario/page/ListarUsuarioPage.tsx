import React, { useEffect, useState } from 'react';
import { CrearUsuarioModal } from "../modal/CrearUsuarioModal";
import { listarUsuarios } from '../service/usuario';
import type { listarUsuariosI } from '../interface/usuario';
import { useEstadoReload } from '../../../core/utils/appUtil';


export const ListarUsuarioPage = () => {
    const { isReloading } = useEstadoReload()
    const [usuarios, setusuarios] = useState<listarUsuariosI[]>([])
    useEffect(() => {
        (async () => {
            try {
                const response = await listarUsuarios()
                setusuarios(response)
            } catch (error) {
                console.log(error);

            }
        })()
    }, [isReloading])
    return (
        <div className="p-10 max-w-7xl mx-auto space-y-10">

            {/* Encabezado de Página */}
            <div className="flex justify-between items-center border-b border-black pb-5">
                <div>
                    <h1 className="text-xl font-bold tracking-tighter text-black uppercase">Gestión de Usuarios</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Panel de control de acceso</p>
                </div>
                <CrearUsuarioModal />
            </div>

            {/* Tabla Estrictamente Administrativa */}
            <div className="w-full">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nombres</th>
                            <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Apellidos</th>
                            <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nombre de Usuario</th>
                            <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">C.I.</th>
                            <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Celular</th>
                            <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Celular</th>
                            <th className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {usuarios.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 text-sm font-medium text-black uppercase tracking-tight">{user.nombre}</td>
                                <td className="py-4 text-sm font-medium text-black uppercase tracking-tight">{user.apellidos}</td>
                                <td className="py-4 text-sm text-gray-600 font-mono tracking-tighter">{user.usuario}</td>
                                <td className="py-4 text-sm text-gray-600">{user.ci}</td>
                                <td className="py-4 text-sm text-gray-600">{user.celular}</td>
                                <td className="py-4 text-sm text-gray-600">{user.rol}</td>
                                <td className="py-4 text-right">
                                    <div className="flex justify-end gap-6">
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-black hover:underline underline-offset-4">
                                            Editar
                                        </button>
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-black">
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    );
};