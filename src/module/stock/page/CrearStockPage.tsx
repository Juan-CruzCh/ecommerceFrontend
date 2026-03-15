import { useState } from "react";
import { CrearVarianteProducto } from "../../producto/modal/CrearVarianteProducto";
import { ListarProducto } from "../../producto/components/ListarProducto";
import type { ProductoI } from "../../producto/interface/producto";
import { ListarVariantes } from "../../producto/components/ListarVariantes";
import { CargarImagenes } from "../../producto/components/CargarImagenes";
import { Trash2, Save, Package, ListChecks, Layers } from "lucide-react";
import type { stockRegistradoI } from "../interface/stock";
import { guardarStock } from "../service/stock";
import { HttpStatusCode } from "axios";

export const CrearStockPage = () => {
    const [producto, setProducto] = useState<ProductoI>();
    const [variante, setVariante] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(1);
    const [stockRegistrado, setStockRegistrado] = useState<stockRegistradoI[]>([]);

    const anadirResumen = async () => {
        if (producto && variante) {
            const nuevoItem: stockRegistradoI = {
                nombre: producto.nombre,
                categoria: producto.categoria,
                cantidad: cantidad,
                talla: variante,
                color: variante,
                varianteProducto: variante,
                producto: producto._id
            };
            setStockRegistrado([...stockRegistrado, nuevoItem]);
        }
        setCantidad(1);
    };

    const eliminarItem = (index: number) => {
        setStockRegistrado(stockRegistrado.filter((_, i) => i !== index));
    };

    const guardarTodoEnDB = async () => {
        try {
            const reponse = await guardarStock(stockRegistrado.map((item) => ({
                cantidad: item.cantidad,
                producto: item.producto,
                varianteProducto: item.varianteProducto
            })))
            if (reponse.status == HttpStatusCode.Created) {
                setStockRegistrado([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-zinc-800 font-sans">
            <div className="max-w-[1600px] mx-auto px-6 py-8">

                <header className="flex justify-between items-end mb-10 border-b border-zinc-200 pb-6">
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">Entrada de Stock</h1>
                        <p className="text-xs text-zinc-500 font-medium">Selecciona un producto y gestiona sus cantidades.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase">Items en cola</p>
                            <p className="text-xl font-black text-zinc-900">{stockRegistrado.length}</p>
                        </div>
                    </div>
                </header>

                {/* --- PASO 1: PRODUCTOS (ANCHO COMPLETO) --- */}
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Package size={16} className="text-zinc-900" />
                        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">1. Seleccionar Producto</h2>
                    </div>
                    <div className="bg-white p-2 border border-zinc-200 shadow-sm">
                        <ListarProducto seleccionado={producto} setSeleccionado={setProducto} />
                    </div>
                </section>

                {/* --- PASO 2: VARIANTES Y STOCK (FILA INFERIOR) --- */}
                {producto && (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Columna Variantes */}
                        <div className="bg-white p-6 border border-zinc-200 shadow-sm relative">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <Layers size={16} className="text-zinc-900" />
                                    <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">2. Variantes del Producto</h2>
                                </div>
                                <CrearVarianteProducto producto={producto} />
                            </div>
                            <ListarVariantes producto={producto} setVariante={setVariante} variante={variante} />
                        </div>

                        {/* Columna Ajuste y Carga */}
                        <div className="bg-white p-6 border border-zinc-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <ListChecks size={16} className="text-zinc-900" />
                                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">3. Carga de Stock</h2>
                            </div>

                            <div className="space-y-8">
                                {variante ? (
                                    <>
                                        <CargarImagenes variante={variante} producto={producto._id} />
                                        <div className="pt-6 border-t border-zinc-100">
                                            <label className="text-[10px] font-black uppercase text-zinc-400 block mb-2 tracking-widest">Cantidad a ingresar</label>
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
                                                    className="bg-zinc-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all hover:shadow-lg active:scale-95"
                                                >
                                                    Añadir a la lista
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center py-10 border-2 border-dashed border-zinc-100 rounded">
                                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Selecciona una variante para continuar</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- TABLA DE RESUMEN (FINAL) --- */}
                <section className="mt-16 bg-white border border-zinc-200 shadow-sm">
                    <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">Items en espera de confirmación</h2>
                        {stockRegistrado.length > 0 && (
                            <button
                                onClick={guardarTodoEnDB}
                                className="bg-emerald-600 text-white px-8 py-2.5 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-emerald-700 flex items-center gap-2 transition-all shadow-md"
                            >
                                <Save size={16} /> Confirmar y Guardar Todo
                            </button>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-50 text-zinc-500">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b border-zinc-100">Producto</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b border-zinc-100">Categoría</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b border-zinc-100 text-center">Variante ID</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b border-zinc-100 text-right">Cantidad</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest border-b border-zinc-100 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {stockRegistrado.map((item, index) => (
                                    <tr key={index} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="px-6 py-4 text-xs font-bold text-zinc-900 uppercase">{item.nombre}</td>
                                        <td className="px-6 py-4 text-[10px] text-zinc-400 font-bold uppercase">{item.categoria}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-[10px] font-mono bg-zinc-100 px-2 py-1 rounded text-zinc-600">
                                                {item.varianteProducto.slice(-8).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-black text-zinc-900">{item.cantidad}</span>
                                            <span className="text-[10px] text-zinc-400 ml-1 font-bold">UNIDADES</span>
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
            </div>
        </div>
    );
};