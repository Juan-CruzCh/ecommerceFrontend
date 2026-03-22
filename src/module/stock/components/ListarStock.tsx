import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { ListarStocks } from "../service/stock";
import type { StockProducto } from "../interface/stock";
import { urlBackend, urlImagen } from "../../../core/config/intanceAxios";
import type { AxiosError } from "axios";
import { mostrarError } from "../../venta/utils/alertas";
import { Paginador } from "../../../core/components/Paginador";

export const ListarStock = () => {
    const [stocks, setStock] = useState<StockProducto[]>([]);
    const [paginas, setPaginas] = useState<number>(0);
    const [pagina, setPagina] = useState<number>(1);
    const [nombre, setNombre] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const response = await ListarStocks(nombre, pagina);
                setStock(response.data);
                setPaginas(response.paginas);
            } catch (error) {
                const e = error as AxiosError<any>;
                mostrarError(e.response?.data.mensaje)
            }
        })();
    }, [nombre, pagina]);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
        setPagina(1);
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
                                <th className="p-4 text-[10px] font-bold uppercase text-zinc-400 tracking-wider text-center">Precio de venta</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {stocks.map((item) => (
                                <tr key={item._id} className="group">
                                    <td className="p-4">
                                        <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 overflow-hidden">
                                            <img
                                                src={`${urlImagen}/${item.imagen}`}
                                                alt={item.producto}
                                                className="w-full h-full"
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
                                    <td className="p-4 text-center">
                                        <span className="text-xs font-bold font-mono">{item.precioVenta} Bs</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Paginador onPageChange={setPagina} totalPaginas={paginas} />
                </div>


            </div>
        </div>
    );
};