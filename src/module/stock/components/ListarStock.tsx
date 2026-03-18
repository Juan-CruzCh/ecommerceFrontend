import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { CrearProducto } from "../../producto/modal/CrearProducto";
import { ListarStocks } from "../service/stock";
import type { StockProducto } from "../interface/stock";
import { urlBackend } from "../../../core/config/intanceAxios";

export const ListarStock = () => {
    const [stocks, setStock] = useState<StockProducto[]>([]);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const [paginaActual, setPaginaActual] = useState<number>(1); // Estado para la página
    const [nombre, setNombre] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                // Asumiendo que ListarStocks acepta (nombre, pagina)
                const response = await ListarStocks(nombre, paginaActual);
                setStock(response.data);
                setTotalPaginas(response.paginas);
            } catch (error) {
                console.error("Error cargando stocks", error);
            }
        })();
    }, [nombre, paginaActual]); // Se ejecuta cuando cambia el nombre o la página

    // Resetear a la página 1 cuando se busca algo nuevo
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
        setPaginaActual(1);
    };

    return (
        <div className="min-h-screen bg-white text-zinc-800 font-sans p-8">
            <div className="max-w-[1400px] mx-auto">
                <header className="flex justify-between items-end mb-10 pb-6 border-b border-zinc-100">
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-tighter italic">Stock Central</h1>
                        <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">Panel General de Existencias</p>
                    </div>
                    <div className="flex gap-3">
                        <CrearProducto />
                    </div>
                </header>

                {/* Filtros y Búsqueda */}
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Buscar por nombre"
                            className="w-full bg-zinc-50 border-none py-3 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
                        />
                    </div>
                </div>

                {/* Tabla de Inventario */}
                <div className="w-full overflow-hidden border border-zinc-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100">
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider w-12"></th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Producto</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Categoria</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Talla</th>
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Cantidad</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {stocks.map((item) => (
                                <tr key={item._id} className="group hover:bg-zinc-50/30 transition-colors">
                                    <td className="p-4">
                                        <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 overflow-hidden">
                                            <img
                                                src={`${urlBackend}/${item.imagen}`}
                                                alt={item.producto}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-tight">{item.producto}</p>
                                            <p className="text-[10px] text-zinc-400 font-mono">{item.codigo}</p>
                                            <p className="text-[10px] text-zinc-500 mt-1">{item.descripcion}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono italic">{item.categoria}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono italic">{item.talla}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono">{item.cantidad}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación Dinámica */}
                <footer className="mt-8 flex justify-between items-center">
                    <p className="text-[10px] font-bold uppercase text-zinc-400 font-mono tracking-widest">
                        Página {paginaActual.toString().padStart(2, '0')} // {totalPaginas.toString().padStart(2, '0')}
                    </p>
                    <div className="flex gap-1">
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPaginaActual(p)}
                                className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold transition-all ${p === paginaActual
                                    ? 'bg-zinc-900 text-white'
                                    : 'border border-zinc-100 hover:bg-zinc-50 text-zinc-400'
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