import React, { useEffect, useState } from "react";
import { detalleProductoPublico } from "../service/producto";
import { useParams } from "react-router";
import type { ProductoDetalle } from "../interface/producto";
import { urlImagen } from "../../../core/config/intanceAxios";
import { ShoppingCart, MessageCircle, Minus, Plus, ChevronLeft } from "lucide-react";
import { Link } from "react-router";

export const ProductoDetallePage = () => {
    const { id } = useParams();
    const [productoDetalle, setProductoDetalle] = useState<ProductoDetalle>();
    const [imagenSeleccionada, setImagenSeleccionada] = useState<string>("");
    const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null);
    const [cantidad, setCantidad] = useState<number>(1);

    useEffect(() => {
        (async () => {
            try {
                if (id) {
                    const response = await detalleProductoPublico(id);
                    setProductoDetalle(response);
                    const principal = response.imagenes.find((img) => img.principal);
                    setImagenSeleccionada(principal?.nombre || response.imagenes[0]?.nombre || "");
                }
            } catch (error) {
                console.error("Error al cargar el producto", error);
            }
        })();
    }, [id]);

    const handleWhatsApp = () => {
        const mensaje = `Hola! Estoy interesado en el producto: ${productoDetalle?.nombre}${tallaSeleccionada ? ` (Talla: ${tallaSeleccionada})` : ""}.`;
        const url = `https://wa.me/591XXXXXXXX?text=${encodeURIComponent(mensaje)}`; // Reemplaza XXXXXXXX con tu número
        window.open(url, '_blank');
    };

    if (!productoDetalle) return <div className="min-h-screen flex items-center justify-center text-zinc-400">Cargando producto...</div>;

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Barra de navegación superior sutil */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <Link to="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-black transition-colors">
                    <ChevronLeft size={16} />
                    <span>Volver a la tienda</span>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-4">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* GALERÍA (Columna 7 de 12) */}
                    <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
                        {/* Miniaturas */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
                            {productoDetalle.imagenes.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setImagenSeleccionada(img.nombre)}
                                    className={`relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${imagenSeleccionada === img.nombre ? "border-black shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <img src={`${urlImagen}/${img.nombre}`} className="w-full h-full object-cover" alt="Vista miniatura" />
                                </button>
                            ))}
                        </div>

                        {/* Imagen Principal */}
                        <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100">
                            <img
                                src={`${urlImagen}/${imagenSeleccionada}`}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                alt={productoDetalle.nombre}
                            />
                        </div>
                    </div>

                    {/* INFORMACIÓN (Columna 5 de 12) */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="border-b border-zinc-100 pb-6">
                            <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                                {productoDetalle.nombre}
                            </h1>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-sm font-bold text-zinc-500">Bs.</span>
                                <span className="text-3xl font-black text-zinc-900">{productoDetalle.precioVenta}</span>
                            </div>
                        </div>

                        <div className="py-6">
                            <h2 className="text-xs uppercase font-bold text-zinc-400 tracking-widest mb-3">Descripción</h2>
                            <p className="text-zinc-600 leading-relaxed text-[15px]">
                                {productoDetalle.descripcion}
                            </p>
                        </div>

                        {/* SECCIÓN TALLAS */}
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-sm font-bold text-zinc-900">Seleccionar Talla</h2>
                                <span className="text-xs text-zinc-400 font-medium">Guía de tallas</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {productoDetalle.stock.map((item) => (
                                    <button
                                        key={item.idStock}
                                        onClick={() => setTallaSeleccionada(item.talla)}
                                        className={`px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${tallaSeleccionada === item.talla
                                            ? "bg-zinc-900 text-white border-zinc-900 shadow-lg"
                                            : "bg-white text-zinc-800 border-zinc-100 hover:border-zinc-300"
                                            }`}
                                    >
                                        {item.talla}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CANTIDAD */}
                        <div className="mt-8">
                            <h2 className="text-sm font-bold text-zinc-900 mb-3">Cantidad</h2>
                            <div className="flex items-center bg-zinc-100 w-fit rounded-xl p-1">
                                <button
                                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                    className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="px-6 font-bold text-zinc-800">{cantidad}</span>
                                <button
                                    onClick={() => setCantidad(cantidad + 1)}
                                    className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* BOTONES DE ACCIÓN */}
                        <div className="mt-10 flex flex-col gap-3">
                            <button
                                disabled={!tallaSeleccionada}
                                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-xl active:scale-95 ${tallaSeleccionada
                                    ? "bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-200"
                                    : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                                    }`}
                            >
                                <ShoppingCart size={20} />
                                Añadir al Carrito
                            </button>

                            <button
                                onClick={handleWhatsApp}
                                className="w-full py-4 rounded-2xl border-2 border-green-500 text-green-600 flex items-center justify-center gap-2 font-bold hover:bg-green-50 transition-all active:scale-95"
                            >
                                <MessageCircle size={20} />
                                Consultar por WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};