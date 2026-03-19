import React, { useState } from 'react';
import { ListarStock } from '../../stock/components/ListarStock';
import { ListarCliente } from '../../cliente/modal/ListarCliente';
import { CrearCliente } from '../../cliente/modal/CrearCliente';
import { ListarStockVenta } from '../../stock/components/ListarStockVenta';

export const RealizarVenta = () => {
    const [carrito, setCarrito] = useState([]);
    const [cliente, setCliente] = useState(null);
    const [mostrarTablaClientes, setMostrarTablaClientes] = useState(false);

    // Datos de ejemplo con los nuevos campos
    const clientesEjemplo = [
        { id: 1, codigo: "CLI-001", nombre: "Juan", apellidos: "Pérez Ramos", celular: "70012345", direccion: "Av. Las Américas #123" },
        { id: 2, codigo: "CLI-002", nombre: "María", apellidos: "García López", celular: "65098765", direccion: "Calle Murillo esq. Bolívar" },
        { id: 3, codigo: "CLI-003", nombre: "Carlos", apellidos: "Torres Méndez", celular: "71122334", direccion: "Barrio Lindo, C/ 4" },
    ];

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-4 gap-4 relative overflow-hidden">

            {/* SECCIÓN IZQUIERDA: Catálogo de Productos */}
            <div className="md:w-2/3 bg-white rounded-xl shadow-lg  flex flex-col">

                <ListarStockVenta />

            </div>

            {/* SECCIÓN DERECHA: Resumen de Venta */}
            <div className="md:w-1/3 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">

                {/* 1. SECCIÓN DE CLIENTE SELECCIONADO */}
                <div className="p-6 border-b bg-blue-50/50 flex items-center gap-4">
                    {/* Contenedor con espacio entre botones */}
                    <ListarCliente />
                    <span className="h-6 w-[1px] bg-blue-200 mx-2"></span> {/* Separador visual opcional */}
                    <CrearCliente />
                </div>
                {/* 2. CARRITO Y TOTALES */}
                <div className="flex-grow p-4 overflow-y-auto bg-white">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Lista de Venta</h3>
                    {/* Items del carrito (Simulados) */}
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