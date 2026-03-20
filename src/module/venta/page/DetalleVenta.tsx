import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';

export const DetalleVenta = () => {
    const venta = {
        _id: "69bca6ffa410da3f43bc5606",
        codigo: "VEN-ECO-1253",
        fechaPedido: "2026-03-19",
        tracking: "FINALIZADO",
        total: 130,
        asesor: "ROSARIO Carballo"
    };

    const cliente = {
        nombre: "MAURICIO NICOLAS BARRANCO CARRASCO",
        celular: "72884186",
        direccion: "URRIOLAGOITIA 260",
    };

    // Simulando múltiples productos con imágenes
    const detalles = [
        {
            producto: "INSUMO: GENERICA / TORNILLO GUIA /",
            imagen: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=100", // Imagen simulada
            cantidad: 1,
            precioUnitario: 65,
            subtotal: 65,
            entregado: false
        },
        {
            producto: "PIEZA DENTAL: PREMOLAR SUPERIOR TIPO A",
            imagen: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=100", // Imagen simulada
            cantidad: 1,
            precioUnitario: 65,
            subtotal: 65,
            entregado: true
        }
    ];

    return (
        <div className="bg-white p-6 md:p-10 max-w-5xl mx-auto my-10 font-sans text-black border border-slate-100 shadow-2xl">

            {/* Header: Diseño Limpio */}
            <div className="flex flex-col md:flex-row justify-between mb-12 gap-8 border-b border-slate-100 pb-10">
                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cliente</p>
                        <h2 className="text-xl font-bold uppercase leading-tight">{cliente.nombre}</h2>
                    </div>
                    <div className="text-sm space-y-1 text-slate-600">
                        <p className="font-medium">CEL: {cliente.celular}</p>
                        <p className="font-medium uppercase">{cliente.direccion}</p>
                    </div>
                </div>

                <div className="md:text-right space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Comprobante de Venta</p>
                    <h1 className="text-2xl font-light tracking-tighter uppercase">ID: {venta.codigo}</h1>
                    <p className="text-xs font-mono text-slate-400">Order Ref: {venta._id.slice(-10)}</p>
                </div>
            </div>

            {/* Sección Productos */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-black p-2">
                        <Package size={16} className="text-white" />
                    </div>
                    <h3 className="font-black text-xs uppercase tracking-[0.3em]">Resumen de Productos</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b-2 border-black text-[10px] uppercase tracking-widest font-black">
                                <th className="py-4 px-2">Item</th>
                                <th className="py-4">Producto</th>
                                <th className="py-4 text-center">Cant.</th>
                                <th className="py-4 text-right">Unitario</th>
                                <th className="py-4 text-right px-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {detalles.map((item, index) => (
                                <tr key={index} className="group hover:bg-slate-50 transition-colors">
                                    <td className="py-6 px-2">
                                        {/* IMAGEN DEL PRODUCTO */}
                                        <div className="w-16 h-16 border border-slate-200 overflow-hidden bg-slate-50 grayscale hover:grayscale-0 transition-all">
                                            <img
                                                src={item.imagen}
                                                alt={item.producto}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-6 pr-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 mb-1">
                                                {item.entregado ? '✓ ENTREGADO' : '○ PENDIENTE'}
                                            </span>
                                            <span className="text-sm font-bold uppercase leading-snug">{item.producto}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 text-center text-sm font-medium">{item.cantidad}</td>
                                    <td className="py-6 text-right text-sm font-medium italic">${item.precioUnitario}</td>
                                    <td className="py-6 text-right px-2 text-sm font-black">${item.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer de Totales: Minimalismo Extremo */}
            <div className="flex justify-end border-t border-black pt-8">
                <div className="w-full md:w-64 space-y-4">
                    <div className="flex justify-between items-center text-xs text-slate-500 uppercase font-bold tracking-widest">
                        <span>Suma total</span>
                        <span>${venta.total}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 uppercase font-bold tracking-widest border-b border-slate-100 pb-4">
                        <span>Descuentos</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="font-black text-xs uppercase tracking-[0.2em]">Total Final</span>
                        <span className="text-3xl font-light tracking-tighter italic">${venta.total}</span>
                    </div>
                </div>
            </div>

            <div className="mt-20 text-[9px] text-slate-300 uppercase tracking-widest text-center">
                Generado el {new Date().toLocaleDateString()} — Documento Digital
            </div>
        </div>
    );
};