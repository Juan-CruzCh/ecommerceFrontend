import React, { useState } from 'react';
import { ListarStockVenta } from '../../stock/components/ListarStockVenta';
import { ListarCliente } from '../../cliente/modal/ListarCliente';
import { CrearCliente } from '../../cliente/modal/CrearCliente';
import type { listarClienteI } from '../../cliente/interface/cliente';
import type { carritoI, RealizarVentaI } from '../interface/venta';
import type { AxiosError } from 'axios';
import { data, useNavigate } from 'react-router';
import { realizarVenta } from '../service/venta';
import { confirmarVenta, mostrarError } from '../utils/alertas';

export const RealizarVenta = () => {
    const [cliente, setcliente] = useState<listarClienteI>();
    const [carrito, setCarrito] = useState<carritoI[]>([]);
    const navigate = useNavigate()
    const totalVenta = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const eliminarDelCarrito = (index: number) => {
        setCarrito(carrito.filter((_, i) => i !== index));
    };

    const btnRealizarVenta = async () => {
        if (!cliente || carrito.length === 0) return;

        const confimar = await confirmarVenta()
        if (!confimar) return
        try {

            const data: RealizarVentaI = {
                cliente: cliente._id,
                detalleVenta: carrito.map((item) => ({ cantidad: item.cantidad, stock: item.stock }))
            }
            const response = await realizarVenta(data)
            if(response && response.data.venta){
                navigate(`/detalle/venta/${response.data.venta}`)
            }
        } catch (error) {
            const e = error as AxiosError<any>;
            mostrarError(e.response?.data.mensaje)
          
        }
    };

    return (

        <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-gray-100 p-2 md:p-4 gap-4 overflow-y-auto md:overflow-hidden font-sans">


            <div className="w-full md:w-2/3 bg-white rounded-xl shadow-lg flex flex-col h-auto md:h-full overflow-hidden">
                <div className="flex-grow overflow-y-auto">
                    <ListarStockVenta setCarrito={setCarrito} carrito={carrito} />
                </div>
            </div>

            {/* SECCIÓN DERECHA: Resumen de Venta */}
            <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg flex flex-col h-fit md:h-full overflow-hidden">

                {/* 1. SECCIÓN DE CLIENTE SELECCIONADO */}
                <div className="p-4 md:p-6 border-b bg-blue-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ListarCliente setCliente={setcliente} />
                        <span className="h-6 w-[1px] bg-blue-200 mx-1"></span>
                        <CrearCliente setCliente={setcliente} />
                    </div>

                </div>

                {/* CONTENIDO DEL CARRITO */}
                <div className="flex-grow p-4 overflow-y-auto bg-white min-h-[300px]">
                    {cliente ? (
                        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-xl shadow-sm relative animate-fade-in">
                            <button
                                onClick={() => setcliente(undefined)}
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                                ✕
                            </button>
                            <h2 className="text-sm font-bold text-gray-800 truncate pr-6">
                                {cliente.nombre} {cliente.apellidos}
                            </h2>
                            <div className="flex flex-wrap gap-x-3 text-[10px] text-gray-500 mt-1">
                                <span><b className="text-gray-400">CI:</b> {cliente.ci}</span>
                                <span><b className="text-gray-400">Cel:</b> {cliente.celular}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-4 p-4 border-2 border-dashed border-gray-100 rounded-xl text-center">
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Seleccione un cliente</p>
                        </div>
                    )}

                    {/* TABLA DE PRODUCTOS */}
                    <div className="overflow-x-auto mt-2">
                        <table className="w-full text-[11px]">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-100 text-left uppercase tracking-tighter">
                                    <th className="pb-2 font-bold">Prod.</th>
                                    <th className="pb-2 font-bold text-center">Cant.</th>
                                    <th className="pb-2 font-bold text-right">Subtotal</th>
                                    <th className="pb-2 w-8"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {carrito.map((item, index) => (
                                    <tr key={index} className="group hover:bg-gray-50 transition-colors">
                                        <td className="py-3">
                                            <div className="font-bold text-gray-800">{item.nombre}</div>
                                            <div className="font-bold  text-gray-800">Talla: {item.talla} | {item.codigo} </div>
                                        </td>
                                        <td className="py-3 text-center font-bold text-blue-600">
                                            {item.cantidad}
                                        </td>
                                        <td className="py-3 text-right font-black text-gray-900">
                                            {(item.precio * item.cantidad).toFixed(2)}
                                        </td>
                                        <td className="py-3 text-right">
                                            <button
                                                onClick={() => eliminarDelCarrito(index)}
                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>

                {/* FOOTER: TOTAL Y BOTÓN */}
                <div className="p-6 border-t bg-gray-50 mt-auto">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <span className="text-gray-400 text-xs font-bold uppercase block">Total Venta</span>

                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-black leading-none">
                                {totalVenta} Bs
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={btnRealizarVenta}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none uppercase tracking-widest text-sm"
                        disabled={!cliente || carrito.length === 0}
                    >
                        Confirmar Venta
                    </button>
                </div>
            </div>
        </div>
    );
};