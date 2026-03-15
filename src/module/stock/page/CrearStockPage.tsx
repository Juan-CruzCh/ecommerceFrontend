import { useState } from "react";
import { CrearVarianteProducto } from "../../producto/modal/CrearVarianteProducto";
import { ListarProducto } from "../../producto/components/ListarProducto";
import type { ProductoI, stockRegistradoI } from "../../producto/interface/producto";
import { ListarVariantes } from "../../producto/components/ListarVariantes";
import { CargarImagenes } from "../../producto/components/CargarImagenes";
import { Trash2, Save } from "lucide-react"; // Añadimos iconos útiles

export const CrearStockPage = () => {
    const [producto, setProducto] = useState<ProductoI>();
    const [variante, setVariante] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(1);
    const [precio, setPrecio] = useState<number>(0);

    const [stockRegistrado, setStockRegistrado] = useState<stockRegistradoI[]>([]);

    const anadirResumen = () => {
        if (producto && variante) {

            const nuevoItem: stockRegistradoI = {

                nombre: producto.nombre,
                categoria: producto.categoria,
                cantidad: cantidad,
                precio: precio,
                talla: variante,
                color: variante,
                varianteProducto: variante,
                producto: producto._id
            };

            setStockRegistrado([...stockRegistrado, nuevoItem]);
        }
        // Resetear inputs tras añadir
        setCantidad(1);
        setPrecio(0);
    };

    const eliminarItem = (index: number) => {
        setStockRegistrado(stockRegistrado.filter((_, i) => i !== index));
    };

    const guardarTodoEnDB = async () => {
        console.log("Enviando al backend Go:", stockRegistrado);
        // Aquí llamas a tu service: await registrarStockMassivo(stockRegistrado)
        alert("¡Stock guardado con éxito!");
        setStockRegistrado([]);
    };

    return (
        <div className="min-h-screen bg-white text-zinc-800 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 py-8">

                <header className="flex justify-between items-center mb-8 border-b pb-4">
                    <div>
                        <h1 className="text-lg font-bold uppercase tracking-tight">Inventario</h1>
                        <p className="text-xs text-zinc-500">Gestión de productos y stock.</p>
                    </div>

                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    <ListarProducto seleccionado={producto} setSeleccionado={setProducto} />

                    {producto && (
                        <div className="lg:col-span-4 border-l border-r border-zinc-100 px-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-[10px] font-bold uppercase text-zinc-400">2. Variantes</h2>
                                <CrearVarianteProducto producto={producto} />
                            </div>
                            <ListarVariantes producto={producto} setVariante={setVariante} variante={variante} />
                        </div>
                    )}

                    <div className="lg:col-span-5">
                        <h2 className="text-[10px] font-bold uppercase text-zinc-400 mb-6">3. Ajuste & Galería</h2>
                        <div className="flex flex-col gap-6">
                            {variante && <CargarImagenes variante={variante} />}

                            <div className="w-full space-y-4 pt-4 border-t border-zinc-100">
                                <div>
                                    <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1">Cantidad</label>
                                    <input
                                        type="number"
                                        defaultValue={cantidad}
                                        onChange={(e) => setCantidad(Number(e.target.value))}
                                        className="w-full text-3xl font-bold border-b border-zinc-900 py-1 outline-none"
                                    />
                                    <label className="text-[10px] font-bold uppercase text-zinc-400 block mb-1 mt-4">Precio de venta</label>
                                    <input
                                        type="number"
                                        defaultValue={precio}
                                        onChange={(e) => setPrecio(Number(e.target.value))}
                                        className="w-full text-3xl font-bold border-b border-zinc-900 py-1 outline-none "
                                    />
                                </div>
                                <button
                                    onClick={anadirResumen}
                                    className="w-full bg-zinc-900 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors"
                                >
                                    Añadir al resumen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- TABLA DE RESUMEN (CARRITO) --- */}
                <div className="mt-12 border-t border-zinc-100 pt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[10px] font-bold uppercase text-zinc-400">Items listos para cargar ({stockRegistrado.length})</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-100">
                                    <th className="py-3 text-[10px] font-bold uppercase text-zinc-500">Producto</th>
                                    <th className="py-3 text-[10px] font-bold uppercase text-zinc-500">Categoría</th>
                                    <th className="py-3 text-[10px] font-bold uppercase text-zinc-500 text-center">Talla/Color</th>
                                    <th className="py-3 text-[10px] font-bold uppercase text-zinc-500 text-right">Cantidad</th>
                                    <th className="py-3 text-[10px] font-bold uppercase text-zinc-500 text-right">Subtotal</th>
                                    <th className="py-3 text-[10px] font-bold uppercase text-zinc-500 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {stockRegistrado.map((item, index) => (
                                    <tr key={index} className="group hover:bg-zinc-50/50 transition-colors">
                                        <td className="py-4 text-xs font-medium">{item.nombre}</td>
                                        <td className="py-4 text-xs text-zinc-400 uppercase">{item.categoria}</td>
                                        <td className="py-4 text-xs text-center font-bold">
                                            <span className="px-2 py-1 bg-zinc-100 rounded-sm">{item.talla}</span>
                                        </td>
                                        <td className="py-4 text-xs text-right font-bold">{item.cantidad} u.</td>
                                        <td className="py-4 text-xs text-right font-bold text-zinc-900"> {(item.cantidad * item.precio).toFixed(2)}</td>
                                        <td className="py-4 text-center">
                                            <button onClick={() => eliminarItem(index)} className="text-red-400 hover:text-red-600 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {stockRegistrado.length > 0 && (
                            <button
                                onClick={guardarTodoEnDB}
                                className="bg-blue-600 text-white px-6 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 flex items-center gap-2 transition-all"
                            >
                                <Save size={14} /> Guardar Todo
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};