import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { useParams } from 'react-router';
import { detalleVentas } from '../service/venta';
import type { DetalleVentaI } from '../interface/venta';
import { urlImagen } from '../../../core/config/intanceAxios';

export const DetalleVenta = () => {
    const { id } = useParams()
    const [venta, setVenta] = useState<DetalleVentaI>()


    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const response = await detalleVentas(id)
                    setVenta(response)
                } catch (error) {
                    console.log(error);

                }
            })()
        }
    }, [id])
    return (
        <div className="bg-white p-6 md:p-10 max-w-5xl mx-auto my-10 font-sans text-black border border-slate-100 shadow-2xl">

            {
                venta && (
                    <>
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8 border-b border-slate-100 pb-10">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase text-slate-400 mb-1">Cliente</p>
                                    <h2 className="text-xl font-bold uppercase">{venta.venta.nombre}</h2>
                                </div>
                                <div className="text-sm space-y-1 text-slate-600">
                                    <p className="font-medium">CEL: {venta.venta.celular}</p>
                                    <p className="font-medium uppercase">{venta.venta.direccion}</p>
                                </div>
                            </div>

                            <div className="md:text-right space-y-2">
                                <p className="text-xs font-bold uppercase text-slate-400">Comprobante de Venta</p>
                                <h1 className="text-2xl font-bold uppercase">ID: {venta.venta.codigo}</h1>
                                <p className="text-xs text-slate-400">Order Ref: {venta.venta._id}</p>
                            </div>
                        </div>

                        {/* Productos */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-black p-2">
                                    <Package size={16} className="text-white" />
                                </div>
                                <h3 className="font-bold text-xs uppercase">Resumen de Productos</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b-2 border-black text-xs uppercase font-bold">
                                            <th className="py-4 px-2">Item</th>
                                            <th className="py-4">Producto</th>
                                            <th className="py-4 text-center">Cant.</th>
                                            <th className="py-4 text-right">Unitario</th>
                                            <th className="py-4 text-right px-2">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {venta.detalle.map((item, index) => (
                                            <tr key={index} className="hover:bg-slate-50 transition-colors">
                                                <td className="py-6 px-2">
                                                    <div className="w-16 h-16 border border-slate-200 overflow-hidden bg-slate-50">
                                                        <img
                                                            src={`${urlImagen}/${item.imagen}`}
                                                            alt={item.imagen}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="py-6 pr-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-slate-400">
                                                            {venta.venta.tracking}
                                                        </span>
                                                        <span className="text-sm font-bold uppercase">
                                                            {item.descripcion}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-6 text-center text-sm font-medium">
                                                    {item.cantidad}
                                                </td>
                                                <td className="py-6 text-right text-sm font-medium">
                                                    {item.precioUnitario} Bs
                                                </td>
                                                <td className="py-6 text-right px-2 text-sm font-bold">
                                                    {item.precioTotal} Bs
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totales */}
                        <div className="flex justify-end border-t border-black pt-8">
                            <div className="w-full md:w-64 space-y-4">
                                <div className="flex justify-between text-sm text-slate-500 font-medium">
                                    <span>Suma total</span>
                                    <span>{venta.venta.total} Bs</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-500 font-medium border-b border-slate-100 pb-4">
                                    <span>Descuentos</span>
                                    <span>0.00 Bs</span>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <span className="font-bold text-sm uppercase">Total Final</span>
                                    <span className="text-2xl font-bold">
                                        {venta.venta.totalConDescuento} Bs
                                    </span>
                                </div>
                            </div>
                        </div>

                    </>
                )
            }

        </div>
    );
};