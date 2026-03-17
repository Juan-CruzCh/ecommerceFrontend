import { useState } from "react";
import { ListarProducto } from "../../producto/components/ListarProducto";
import type { ProductoI } from "../../producto/interface/producto";
import { CargarImagenes } from "../../producto/components/CargarImagenes";
import { Trash2, Save, Package, ListChecks, Layers, Image as ImageIcon } from "lucide-react";
import type { stockRegistradoI } from "../interface/stock";
import { guardarStock } from "../service/stock";
import { AxiosError, HttpStatusCode } from "axios";
import { ListarTalla } from "../../talla/components/ListarTallas";
import type { listarTallaI } from "../../talla/interface/talla";
import { CrearTalla } from "../../talla/modal/CrearTalla";

export const CrearStockPage = () => {
    const [producto, setProducto] = useState<ProductoI>();
    const [talla, setTalla] = useState<listarTallaI>({ _id: "", nombre: "" });
    const [cantidad, setCantidad] = useState<number>(1);
    const [stockRegistrado, setStockRegistrado] = useState<stockRegistradoI[]>([]);

    const anadirResumen = () => {
        if (producto && talla) {
            const nuevoItem: stockRegistradoI = {
                nombre: producto.nombre,
                categoria: producto.categoria,
                cantidad: cantidad,
                talla: talla._id,
                producto: producto._id,
                nombreTalla: talla.nombre,
                precioVenta: producto.precioVenta

            };
            setStockRegistrado([...stockRegistrado, nuevoItem]);
            setTalla({ _id: "", nombre: "" });
            setCantidad(1);
        }
    };

    const eliminarItem = (index: number) => {
        setStockRegistrado(stockRegistrado.filter((_, i) => i !== index));
    };

    const guardarTodoEnDB = async () => {
        try {
            const response = await guardarStock(stockRegistrado.map((item) => ({
                cantidad: item.cantidad,
                producto: item.producto,
                talla: item.talla

            })))
            if (response.status === HttpStatusCode.Created) {
                setStockRegistrado([]);
            }
        } catch (error) {
            const e = error as AxiosError<any>
            console.error(e.response?.data);
        }
    };

    return (
        <div className="min-h-screen  text-zinc-800 font-sans">
            <div className="max-w-[1600px] mx-auto px-6 py-8">

                <header className="flex justify-between items-end mb-10 border-b border-zinc-200 pb-6">
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">Entrada de Stock</h1>
                        <p className="text-xs text-zinc-500 font-medium">Gestión secuencial de inventario.</p>
                    </div>

                </header>

                {/* --- PASO 1: SELECCIÓN DE PRODUCTO --- */}
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Package size={16} className="text-zinc-900" />
                        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">1. Seleccionar Producto</h2>
                    </div>
                    <div className="bg-white p-2 border border-zinc-200 shadow-sm">
                        <ListarProducto seleccionado={producto} setSeleccionado={setProducto} />
                    </div>
                </section>

                {producto && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* --- PASO 2: IMÁGENES DEL PRODUCTO --- */}
                        <section className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <ImageIcon size={16} className="text-zinc-900" />
                                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">2. Galería de Imágenes</h2>
                            </div>
                            <CargarImagenes producto={producto._id} />
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            <div className="bg-white p-6 border border-zinc-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <Layers size={16} className="text-zinc-900" />
                                    <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">3. Seleccionar Talla</h2>
                                </div>
                                <ListarTalla setTalla={setTalla} talla={talla} />
                            </div>

                            {/* --- PASO 4: CANTIDAD Y STOCK --- */}
                            <div className="bg-white p-6 border border-zinc-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <ListChecks size={16} className="text-zinc-900" />
                                    <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">4. Definir Cantidad</h2>
                                </div>

                                {talla ? (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-zinc-400 block mb-2 tracking-widest">Unidades a ingresar</label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="number"
                                                    value={cantidad}
                                                    min={1}
                                                    onChange={(e) => setCantidad(Number(e.target.value))}
                                                    className="flex-1 text-4xl font-black border-b-2 border-zinc-900 py-2 outline-none bg-transparent"
                                                />
                                                <button
                                                    onClick={anadirResumen}
                                                    className="bg-zinc-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all active:scale-95"
                                                >
                                                    Añadir Item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-zinc-100 rounded">
                                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Primero selecciona una talla</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TABLA DE RESUMEN --- */}
                {stockRegistrado.length > 0 && (
                    <section className="mt-16 bg-white border border-zinc-200 shadow-sm">
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">Resumen de Carga</h2>
                            <button
                                onClick={guardarTodoEnDB}
                                className="bg-emerald-600 text-white px-8 py-2.5 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-emerald-700 flex items-center gap-2 transition-all"
                            >
                                <Save size={16} /> Guardar en Base de Datos
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50 text-zinc-500">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase border-b border-zinc-100">Producto</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase border-b border-zinc-100 text-center">Talla</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase border-b border-zinc-100 text-right">Cantidad</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase border-b border-zinc-100 text-right">Precio venta</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase border-b border-zinc-100 text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {stockRegistrado.map((item, index) => (
                                        <tr key={index} className="hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-6 py-4 text-xs font-bold text-zinc-900 uppercase">{item.nombre}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[10px] font-mono bg-zinc-100 px-3 py-1 rounded text-zinc-600 uppercase">
                                                    {item.nombreTalla}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-black text-zinc-900">{item.cantidad}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-black text-zinc-900">{item.precioVenta}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button onClick={() => eliminarItem(index)} className="p-2 text-zinc-300 hover:text-red-600 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};