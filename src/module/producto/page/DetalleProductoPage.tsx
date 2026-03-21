import React, { useEffect, useState } from "react";
import { detalleProductoPublico } from "../service/producto";
import { useParams } from "react-router";
import type { ProductoDetalle } from "../interface/producto";
import { urlBackend, urlImagen } from "../../../core/config/intanceAxios";
import type { AxiosError } from "axios";

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
                    if (principal) {
                        setImagenSeleccionada(principal.nombre);
                    } else if (response.imagenes.length > 0) {
                        setImagenSeleccionada(response.imagenes[0].nombre);
                    }
                }
            } catch (error) {
                const e = error as AxiosError<any>;
                console.log(e.response?.data);
            }
        })();
    }, [id]);



    return (
        <div className="min-h-screen py-20">
            <div className="max-w-6xl mx-auto px-6">
                {productoDetalle && (
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* COLUMNA IZQUIERDA: GALERÍA */}
                        <div>
                            <div className="w-full h-[520px] overflow-hidden rounded-md border bg-gray-50">
                                <img
                                    src={`${urlImagen}/${imagenSeleccionada}`}
                                    className="w-full h-full object-cover"
                                    alt="Producto"
                                />
                            </div>

                            <div className="flex gap-3 mt-4 overflow-x-auto">
                                {productoDetalle.imagenes.map((img, i) => (
                                    <img
                                        key={i}
                                        onClick={() => setImagenSeleccionada(img.nombre)}
                                        src={`${urlImagen}/${img.nombre}`}
                                        className={`w-20 h-20 object-cover rounded-md cursor-pointer transition border-2 ${imagenSeleccionada === img.nombre ? "border-black" : "border-transparent opacity-70"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: INFO Y COMPRA */}
                        <div>
                            <h1 className="text-3xl font-semibold">{productoDetalle.nombre}</h1>
                            <p className="text-2xl mt-4 font-medium">{productoDetalle.precioVenta} Bs</p>
                            <p className="mt-6 text-gray-600 leading-relaxed">{productoDetalle.descripcion}</p>

                            {/* SECCIÓN TALLAS */}
                            <div className="mt-10">
                                <p className="text-sm font-bold text-gray-700 mb-3">
                                    Talla: <span className="text-gray-400 font-normal">{tallaSeleccionada || "Selecciona una"}</span>
                                </p>
                                <div className="flex gap-3 flex-wrap">
                                    {productoDetalle.stock.map((item) => (
                                        <button
                                            key={item.idStock}
                                            onClick={() => setTallaSeleccionada(item.talla)}
                                            className={`min-w-[48px] h-10 border rounded-md text-sm transition ${tallaSeleccionada === item.talla
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-black hover:border-black"
                                                }`}
                                        >
                                            {item.talla}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* CANTIDAD */}
                            <div className="mt-10">
                                <p className="text-sm text-gray-500 mb-3">Cantidad</p>
                                <div className="flex items-center border w-fit rounded-md">
                                    <button
                                        onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                        className="px-4 py-2 hover:bg-gray-100"
                                    > - </button>
                                    <span className="px-5 font-medium">{cantidad}</span>
                                    <button
                                        onClick={() => setCantidad(cantidad + 1)}
                                        className="px-4 py-2 hover:bg-gray-100"
                                    > + </button>
                                </div>
                            </div>

                            {/* BOTÓN AÑADIR */}
                            <div className="mt-12">
                                <button

                                    className={`w-full py-3 rounded-md transition font-medium ${tallaSeleccionada
                                        ? "bg-black text-white hover:opacity-90"
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};