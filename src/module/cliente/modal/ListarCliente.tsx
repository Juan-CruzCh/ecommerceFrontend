import React, { useEffect, useState } from 'react';
import { eliminarClientes, listarClientes } from '../service/cliente';
import type { listarClienteI } from '../interface/cliente';
import { HttpStatusCode, type AxiosError } from 'axios';
import { Paginador } from '../../../core/components/Paginador';
import { Trash2, Pencil, CheckCircle } from "lucide-react";
import { useEstadoReload } from '../../../core/utils/appUtil';
import { mostrarError } from '../../venta/utils/alertas';
import { confirmarEliminar } from '../../../core/utils/alerta';
import { EditarCliente } from './EditarCliente';
export const ListarCliente = ({ setCliente }: { setCliente: (v: listarClienteI) => void }) => {
    const [clientes, setclientes] = useState<listarClienteI[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [codigoFilter, setCodigoFilter] = useState('');
    const [ciFilter, setCiFilter] = useState('');
    const [nombreFilter, setNombreFilter] = useState('');
    const [apellidosFilter, setApellidosFilter] = useState('');
    const [celularFilter, setCelularFilter] = useState('');
    const [direccionFilter, setDireccionFilter] = useState('');
    const [paginas, setPaginas] = useState(1);
    const [pagina, setPagina] = useState(1);
    const { isReloading, triggerReload } = useEstadoReload()
    useEffect(() => {
        if (isOpen) {
            (async () => {
                try {
                    const response = await listarClientes(codigoFilter, ciFilter, nombreFilter, apellidosFilter, celularFilter, direccionFilter, pagina)
                    setclientes(response.data)
                    setPaginas(response.paginas)
                } catch (error) {
                    const e = error as AxiosError<any>
                    console.log(e.response?.data);
                    setPaginas(1)
                }
            })()
        }
    }, [isReloading, isOpen, ciFilter, codigoFilter, celularFilter, nombreFilter, apellidosFilter, celularFilter, direccionFilter, pagina])

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-black text-white px-4 py-2 rounded-none text-[11px] font-bold tracking-widest hover:bg-gray-800 transition-all uppercase"
            >
                Buscar Cliente
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    {/* Modal más pequeño y estilizado */}
                    <div className="bg-white w-full flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 border border-black">

                        {/* Cabecera Refinada */}
                        <div className="px-5 py-4  flex justify-between items-center bg-white">
                            <div>
                                <h2 className="text-xl font-light tracking-tighter text-black uppercase">Directorio Clientes</h2>
                                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">Selección de registro</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-black hover:text-red-600 transition-colors text-2xl font-light"
                            >
                                &times;
                            </button>
                        </div>


                        <div className="flex-grow overflow-auto custom-scrollbar">
                            <table className="w-full ">
                                <thead className="sticky top-0 bg-white z-10">
                                    {/* Fila de Buscadores Estilizados */}
                                    <tr className="text-[10px] font-black uppercase tracking-widest text-black bg-white border-b border-black">
                                        <th className="px-3 py-3 text-left border-r border-gray-100"><input type="text" placeholder='Codigo' value={codigoFilter} onChange={(e) => setCodigoFilter(e.target.value)} /></th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100"><input type="text" placeholder='Ci' value={ciFilter} onChange={(e) => setCiFilter(e.target.value)} /></th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100"><input type="text" placeholder='Nombre' value={nombreFilter} onChange={(e) => setNombreFilter(e.target.value)} /></th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100"><input type="text" placeholder='Apellidos' value={apellidosFilter} onChange={(e) => setApellidosFilter(e.target.value)} /></th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100"><input type="text" placeholder='Celular' value={celularFilter} onChange={(e) => setCelularFilter(e.target.value)} /></th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100"><input type="text" placeholder='Dirección' value={direccionFilter} onChange={(e) => setDireccionFilter(e.target.value)} /></th>
                                        <th className="px-3 py-3 text-center">Acción</th>
                                    </tr>

                                    <tr className="text-[10px] font-black uppercase tracking-widest text-black bg-white border-b border-black">
                                        <th className="px-3 py-3 text-left border-r border-gray-100">Codigo</th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100">Ci</th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100">Nombre</th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100">Apellidos</th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100">Celular</th>
                                        <th className="px-3 py-3 text-left border-r border-gray-100">Dirección</th>
                                        <th className="px-3 py-3 text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[12px]">
                                    {clientes.map((c) => (
                                        <tr key={c._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                                            <td className="px-3 py-2.5 font-bold">{c.codigo}</td>
                                            <td className="px-3 py-2.5 font-bold">{c.ci}</td>
                                            <td className="px-3 py-2.5 border-r border-gray-100 text-gray-700">{c.nombre}</td>
                                            <td className="px-3 py-2.5 border-r border-gray-100 text-gray-700">{c.apellidos}</td>
                                            <td className="px-3 py-2.5 border-r border-gray-100 font-mono text-[11px]">{c.celular}</td>
                                            <td className="px-3 py-2.5 border-r border-gray-100 text-gray-500 truncate max-w-[150px]">{c.direccion}</td>
                                            <td className="px-3 py-2.5">
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* Botón Seleccionar */}
                                                    <button
                                                        title="Seleccionar"
                                                        onClick={() => { setCliente(c); setIsOpen(false); }}
                                                        className="p-1.5 border border-black hover:bg-black hover:text-white transition-all active:scale-95"
                                                    >
                                                        <CheckCircle size={14} />
                                                    </button>

                                                    {/* Botón Editar */}
                                                    <EditarCliente cliente={c} />

                                                    {/* Botón Eliminar */}
                                                    <button
                                                        onClick={async () => {
                                                            try {
                                                                const confirmar = await confirmarEliminar(`${c.nombre} ${c.apellidos}`)
                                                                if (!confirmar) return
                                                                const response = await eliminarClientes(c._id)
                                                                if (response.status == HttpStatusCode.Ok) {
                                                                    triggerReload()
                                                                }
                                                            } catch (error) {
                                                                const e = error as AxiosError<any>;
                                                                mostrarError(e.response?.data.mensaje)
                                                            }

                                                        }}
                                                        title="Eliminar"

                                                        className="p-1.5 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all active:scale-95"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Paginador totalPaginas={paginas} onPageChange={setPagina} />
                        </div>


                    </div>
                </div >
            )}
        </>
    );
};