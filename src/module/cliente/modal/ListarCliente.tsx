import React, { useEffect, useState } from 'react';
import { listarClientes } from '../service/cliente';
import type { listarClienteI } from '../interface/cliente';

export const ListarCliente = () => {
    const [clientes, setclientes] = useState<listarClienteI[]>([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        if (isOpen) {
            (async () => {
                try {
                    const response = await listarClientes()
                    setclientes(response.data)
                } catch (error) {
                    console.log(error);

                }
            })()
        }
    }, [isOpen])

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
                    <div className="bg-white w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 border border-black">

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

                        {/* Contenedor de Tabla */}
                        <div className="flex-grow overflow-auto custom-scrollbar">
                            <table className="w-full ">
                                <thead className="sticky top-0 bg-white z-10">
                                    {/* Fila de Buscadores Estilizados */}
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        {["Código", "Nombre", "Apellidos", "Celular", "Dirección", "Acción"].map((placeholder, index) => (
                                            <th key={index} className="p-2 border-r border-gray-100">
                                                {placeholder !== "Acción" && (
                                                    <input
                                                        className="w-full bg-transparent text-[10px] uppercase tracking-wider px-2 py-1 border border-transparent focus:border-black focus:outline-none transition-all placeholder:text-gray-300"
                                                        placeholder={`Filtrar...`}
                                                    />
                                                )}
                                            </th>
                                        ))}
                                    </tr>

                                    <tr className="text-[10px] font-black uppercase tracking-widest text-black bg-white border-b border-black">
                                        <th className="px-3 py-3 text-left border-r border-gray-100">ID</th>
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
                                            <td className="px-3 py-2.5 border-r border-gray-100 text-gray-700">{c.nombre}</td>
                                            <td className="px-3 py-2.5 border-r border-gray-100 text-gray-700">{c.apellidos}</td>
                                            <td className="px-3 py-2.5 border-r border-gray-100 font-mono text-[11px]">{c.celular}</td>
                                            <td className="px-3 py-2.5 border-r border-gray-100 text-gray-500 truncate max-w-[150px]">{c.direccion}</td>
                                            <td className="px-3 py-2.5 text-center">
                                                <button
                                                    className="bg-white border border-black px-3 py-1 text-[9px] font-black uppercase hover:bg-black hover:text-white transition-all transform active:scale-95"
                                                >
                                                    Seleccionar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>
            )}
        </>
    );
};