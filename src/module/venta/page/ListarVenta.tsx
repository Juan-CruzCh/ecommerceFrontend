import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { listarVentas } from '../service/venta';
import type { listarVentaI } from '../interface/venta';
import { useNavigate } from 'react-router';

export const ListarVenta = () => {
    const [ventas, setVentas] = useState<listarVentaI[]>([])

    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                const response = await listarVentas()
                setVentas(response)
            } catch (error) {
                console.log(error);

            }
        })()
    }, [])
    return (
        <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-black">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="mb-16">
                    <h1 className="text-2xl font-light tracking-widest uppercase">Ventas</h1>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.3em]">Registro de operaciones</p>
                </div>

                {/* FILTROS MINIMALISTAS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16 items-end">
                    <div className="border-b border-black pb-1">
                        <label className="text-[9px] uppercase tracking-tighter block mb-1 font-bold">Referencia</label>
                        <input type="text" placeholder="CÓDIGO..." className="w-full outline-none text-xs placeholder:text-slate-200 uppercase" />
                    </div>
                    <div className="border-b border-black pb-1">
                        <label className="text-[9px] uppercase tracking-tighter block mb-1 font-bold">Cliente</label>
                        <input type="text" placeholder="NOMBRE..." className="w-full outline-none text-xs placeholder:text-slate-200 uppercase" />
                    </div>
                    <div className="border-b border-black pb-1">
                        <label className="text-[9px] uppercase tracking-tighter block mb-1 font-bold">Fecha</label>
                        <input type="date" className="w-full outline-none text-xs bg-transparent cursor-pointer uppercase" />
                    </div>
                    <button className="bg-black text-white text-[10px] font-bold py-3 hover:bg-slate-800 transition-colors uppercase tracking-[0.2em]">
                        Filtrar
                    </button>
                </div>



                <div className="w-full overflow-hidden border border-zinc-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider w-12">Cod.</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Cliente</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Estado</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Total</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Fecha</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Accion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {ventas.map((item) => (
                                <tr key={item._id} className="group hover:bg-zinc-50/30 transition-colors">
                                    <td className="p-4">

                                        <p className="text-sm font-bold uppercase tracking-tight">{item.codigo}</p>


                                    </td>
                                    <td className="p-4">

                                        {item.nombre} {item.apellidos}


                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono italic">{item.tracking}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono italic">{item.totalConDescuento}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono italic">{item.fechaPedido}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button onClick={() => navigate(`/detalle/venta/${item._id}`)}>Detalle</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



                <div className="mt-24 flex justify-between items-center border-t border-slate-100 pt-8">
                    <button className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300 hover:text-black transition-colors">Anterior</button>
                    <span className="text-[10px] font-mono tracking-widest">01 / 01</span>
                    <button className="text-[9px] font-bold uppercase tracking-[0.3em] text-black hover:text-slate-400 transition-colors">Siguiente</button>
                </div>
            </div>
        </div>
    );
};