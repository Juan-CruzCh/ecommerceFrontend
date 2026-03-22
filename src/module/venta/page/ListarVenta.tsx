import React, { useEffect, useState } from 'react';
import { Search, Eye, FileText, Calendar, Filter, ArrowRight } from 'lucide-react';
import { listarVentas } from '../service/venta';
import type { listarVentaI } from '../interface/venta';
import { useNavigate } from 'react-router';
import type { AxiosError } from 'axios';
import { useEstadoReload } from '../../../core/utils/appUtil';

export const ListarVenta = () => {
    const { isReloading, triggerReload } = useEstadoReload()
    const hoy = new Date().toISOString().split('T')[0];

    const [ventas, setVentas] = useState<listarVentaI[]>([]);
    const navigate = useNavigate();
    const [fechaInicio, setfechaInicio] = useState(hoy)
    const [fechaFin, setfechaFin] = useState(hoy)
    useEffect(() => {
        (async () => {
            try {
                const response = await listarVentas(fechaInicio, fechaFin);
                setVentas(response);
            } catch (error) {
                const e = error as AxiosError<any>
                console.error(e.response?.data);
            }
        })();
    }, [isReloading]);

    const btnBuscar = () => {
        triggerReload()
    }
    return (
        <div className="w-full font-sans antialiased text-zinc-900">

            {/* --- FILTROS (SOLO DISEÑO) --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">

                    {/* Fecha Inicio */}
                    <div className="flex items-center border border-zinc-200 rounded-sm px-3 py-2 bg-white shadow-sm hover:border-zinc-400 transition-all">
                        <Calendar size={14} className="text-zinc-400 mr-2" />
                        <input
                            value={fechaInicio}
                            onChange={(e) => setfechaInicio(e.target.value)}
                            type="date"
                            className="outline-none text-sm bg-transparent"
                        />
                    </div>
                    <div className="flex items-center border border-zinc-200 rounded-sm px-3 py-2 bg-white shadow-sm hover:border-zinc-400 transition-all">
                        <Calendar size={14} className="text-zinc-400 mr-2" />
                        <input
                            value={fechaFin}
                            onChange={(e) => setfechaFin(e.target.value)}
                            type="date"
                            className="outline-none text-sm bg-transparent"
                        />
                    </div>
                    <button
                        onClick={() => btnBuscar()}
                        className="flex items-center gap-2 px-5 py-2 text-[11px] font-black uppercase border border-zinc-900 bg-zinc-900 text-white hover:bg-white hover:text-zinc-900 transition-all rounded-sm tracking-wide"
                    >

                        <Search size={14} />
                        Buscar
                    </button>

                </div>

            </div>

            {/* --- TABLA ESTILO ZINC --- */}
            <div className="overflow-x-auto border border-zinc-200 rounded-sm shadow-sm">
                <table className="w-full text-left border-collapse bg-white">
                    <thead>
                        <tr className="bg-zinc-900 text-white uppercase text-[10px] tracking-[0.15em]">
                            <th className="px-6 py-4 font-black">Código</th>
                            <th className="px-6 py-4 font-black">Cliente</th>
                            <th className="px-6 py-4 font-black text-center">Estado</th>
                            <th className="px-6 py-4 font-black text-center"><div className="flex items-center justify-center gap-2"><Calendar size={12} /> Fecha</div></th>
                            <th className="px-6 py-4 font-black text-right bg-zinc-800">Total</th>
                            <th className="px-6 py-4 font-black text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-zinc-100">
                        {ventas.map((item) => (
                            <tr key={item._id} className="hover:bg-zinc-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="font-black text-zinc-900 ">
                                        {item.codigo}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-zinc-800 uppercase text-[13px]">{item.nombre} {item.apellidos}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="font-bold text-zinc-800 uppercase text-[13px]">
                                        {item.tracking}
                                    </span>
                                </td>
                                <td className="font-bold text-zinc-800 uppercase text-[13px]">
                                    {item.fechaPedido}
                                </td>
                                <td className="font-bold text-zinc-800 uppercase text-[13px]">
                                    {item.totalConDescuento} <span >Bs</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => navigate(`/detalle/venta/${item._id}`)}
                                        className="inline-flex items-center justify-center w-8 h-8 rounded-sm border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 hover:bg-zinc-100 transition-all"
                                        title="Ver Detalles"
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};