import React, { useEffect, useState } from "react";
import { Search, Check } from "lucide-react"; // Añadí Check para el icono
import { ListarStocks } from "../service/stock";
import type { StockProducto } from "../interface/stock";
import { urlBackend } from "../../../core/config/intanceAxios";
import type { carritoI } from "../../venta/interface/venta";

export const ListarStockVenta = ({ setCarrito, carrito }: { setCarrito: (v: carritoI[]) => void, carrito: carritoI[] }) => {
    const [stocks, setStock] = useState<StockProducto[]>([]);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const [paginaActual, setPaginaActual] = useState<number>(1);
    const [nombre, setNombre] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const response = await ListarStocks(nombre, paginaActual);
                setStock(response.data);
                setTotalPaginas(response.paginas);
            } catch (error) {
                console.error("Error cargando stocks", error);
            }
        })();
    }, [nombre, paginaActual]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
        setPaginaActual(1);
    };

    return (
        <div className="min-h-screen bg-white text-zinc-800 font-sans p-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Filtros y Búsqueda */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="BUSCAR POR NOMBRE..."
                            className="w-full bg-zinc-50 border-none py-3 pl-10 pr-4 text-[11px] font-bold tracking-widest outline-none focus:ring-1 focus:ring-zinc-900 transition-all uppercase"
                        />
                    </div>
                </div>

                {/* Tabla de Inventario */}
                <div className="w-full overflow-hidden border border-zinc-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider w-12">Imagen</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Detalle del Producto</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Categoría</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Talla</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Stock</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Precio</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {stocks.map((item) => (
                                <tr key={item._id} className="group hover:bg-zinc-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="w-12 h-12 bg-zinc-100 border border-zinc-200 overflow-hidden">
                                            <img
                                                src={`${urlBackend}/${item.imagen}`}
                                                alt={item.producto}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-tight">{item.producto}</p>
                                            <p className="text-[9px] text-zinc-400 font-mono">{item.codigo}</p>
                                            <p className="text-[10px] text-zinc-500 mt-1 italic line-clamp-1">{item.descripcion}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-[10px] font-bold uppercase text-zinc-600 bg-zinc-100 px-2 py-1 italic">{item.categoria}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono text-zinc-800">{item.talla}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono text-zinc-800">
                                            {item.cantidad}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono text-zinc-800">
                                            {item.precioVenta}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => {
                                                const ca: carritoI = {
                                                    cantidad: 1,
                                                    nombre: item.producto,
                                                    precio: item.precioVenta,
                                                    stock: item._id,
                                                    codigo: item.codigo,
                                                    talla: item.talla
                                                }
                                                const itemExistente = carrito.find((c) => c.stock === item._id);
                                                if (itemExistente) {
                                                    const nuevoCarrito = carrito.map((c) =>
                                                        c.stock === item._id
                                                            ? { ...c, cantidad: c.cantidad + 1 }
                                                            : c
                                                    );
                                                    setCarrito(nuevoCarrito);

                                                } else {
                                                    setCarrito([...carrito, ca])
                                                }

                                            }}
                                            className="inline-flex items-center gap-2 border border-zinc-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all transform active:scale-95 shadow-sm"
                                        >
                                            <Check size={12} />
                                            Seleccionar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <footer className="mt-8 flex justify-between items-center">
                    <p className="text-[10px] font-bold uppercase text-zinc-400 font-mono tracking-widest">
                        Página {paginaActual.toString().padStart(2, '0')} // {totalPaginas.toString().padStart(2, '0')}
                    </p>
                    <div className="flex gap-1">
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPaginaActual(p)}
                                className={`w-9 h-9 flex items-center justify-center text-[10px] font-bold transition-all border ${p === paginaActual
                                    ? 'bg-zinc-900 text-white border-zinc-900'
                                    : 'border-zinc-100 hover:bg-zinc-50 text-zinc-400'
                                    }`}
                            >
                                {p.toString().padStart(2, '0')}
                            </button>
                        ))}
                    </div>
                </footer>
            </div>
        </div>
    );
};