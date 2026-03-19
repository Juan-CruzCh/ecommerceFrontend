import React, { useState } from 'react';
import { ListarStock } from '../../stock/components/ListarStock';
import { ListarCliente } from '../../cliente/modal/ListarCliente';
import { CrearCliente } from '../../cliente/modal/CrearCliente';
import { ListarStockVenta } from '../../stock/components/ListarStockVenta';
import type { listarClienteI } from '../../cliente/interface/cliente';
import type { StockProducto } from '../../stock/interface/stock';
import type { carritoI } from '../interface/venta';

export const RealizarVenta = () => {
    const [cliente, setcliente] = useState<listarClienteI>();
    const [carrito, setCarrito] = useState<carritoI[]>([]);
    const [mostrarTablaClientes, setMostrarTablaClientes] = useState(false);



    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-4 gap-4 relative overflow-hidden">

            {/* SECCIÓN IZQUIERDA: Catálogo de Productos */}
            <div className="md:w-2/3 bg-white rounded-xl shadow-lg  flex flex-col">

                <ListarStockVenta setCarrito={setCarrito} carrito={carrito} />

            </div>

            {/* SECCIÓN DERECHA: Resumen de Venta */}
            <div className="md:w-1/3 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">

                {/* 1. SECCIÓN DE CLIENTE SELECCIONADO */}
                <div className="p-6 border-b bg-blue-50/50 flex items-center gap-4">
                    {/* Contenedor con espacio entre botones */}
                    <ListarCliente setCliente={setcliente} />
                    <span className="h-6 w-[1px] bg-blue-200 mx-2"></span> {/* Separador visual opcional */}
                    <CrearCliente setCliente={setcliente} />


                </div>

                <div className="flex-grow p-4 overflow-y-auto bg-white">
                    {cliente ? (
                        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-xl shadow-sm relative group">
                            {/* Botón para quitar cliente - Ahora más discreto en la esquina */}
                            <button
                                onClick={() => setcliente(undefined)}
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                                title="Quitar cliente"
                            >
                                x
                            </button>

                            {/* Cabecera compacta */}
                            <div className="flex items-center gap-2 mb-1">

                                <h2 className="text-sm font-bold text-gray-800 truncate">
                                    {cliente.nombre} {cliente.apellidos}
                                </h2>
                            </div>

                            {/* Datos secundarios en una sola línea */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold text-gray-400">CI:</span> {cliente.ci}
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold text-gray-400">Cel:</span> {cliente.celular}
                                </div>
                                <div className="flex items-center gap-1 truncate max-w-[150px]">
                                    <span className="font-semibold text-gray-400">Dir:</span> {cliente.direccion}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-4 p-3 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                            <p className="text-[11px] font-medium uppercase tracking-wider">Sin cliente seleccionado</p>
                        </div>
                    )}


                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Lista de Venta</h3>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                            {carrito.length} productos
                        </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {carrito.map((item, index) => (
                            <div key={index} className="py-2 flex justify-between items-center gap-2">
                                {/* Nombre y Cantidad */}
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-xs font-medium text-gray-700 truncate">
                                        <span className="font-bold text-blue-600 mr-2">{item.cantidad}x</span>
                                        {item.nombre}
                                    </h4>
                                </div>

                                {/* Precio */}
                                <div className="text-right">
                                    <span className="text-xs font-bold text-gray-800">
                                        ${(item.precio * item.cantidad).toFixed(2)}
                                    </span>
                                </div>

                                {/* Botón simple para eliminar (opcional) */}
                                <button className="text-gray-300 hover:text-red-400 text-xs ml-1">
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t bg-gray-50">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-gray-500 font-medium">Total Facturado:</span>
                        <span className="text-3xl font-black text-green-600 leading-none">$0.00</span>
                    </div>

                    <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:bg-gray-200 disabled:text-gray-400"
                        disabled={!cliente || carrito.length === 0}
                    >
                        CONFIRMAR VENTA
                    </button>
                </div>
            </div>


        </div >
    );
};