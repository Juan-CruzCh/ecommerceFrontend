import React, { useEffect, useState } from "react";
import { detalleProductoPublico } from "../service/producto";
import { useParams } from "react-router";
import type { ProductoDetalle } from "../interface/producto";
import { urlBackend } from "../../../core/config/intanceAxios";
import type { AxiosError } from "axios";

export const ProductoDetallePage = () => {
    const { id } = useParams()
    const [productoDetalle, setProductoDetalle] = useState<ProductoDetalle>();
    useEffect(() => {
        (async () => {
            try {
                if (id) {
                    const reponse = await detalleProductoPublico(id)
                    setProductoDetalle(reponse)
                }
            } catch (error) {
                const e = error as AxiosError<any>
                console.log(e.response?.data);


            }
        })()
    }, [id])

    return (
        <div className="min-h-screen py-20">

            <div className="max-w-6xl mx-auto px-6">

                {
                    productoDetalle && (
                        <div className="grid lg:grid-cols-2 gap-16">

                            {/* GALERÍA */}
                            <div>

                                {
                                    productoDetalle.imagenes.filter((i)=> i.principal==true).map((item)=>(
                                        <img
                                            src={`${urlBackend}/${item.nombre}`}
                                            className="w-full h-[520px] object-cover rounded-md"
                                        />
                                    ))
                                }

                                {/* thumbnails */}
                                <div className="flex gap-3 mt-4">

                                    {productoDetalle.imagenes.filter((i)=> i.principal==false).map((img, i) => (
                                        <img
                                            key={i}
                                            src={`${urlBackend}/${img.nombre}`}
                                            className="w-20 h-20 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 transition"
                                        />
                                    ))}

                                </div>

                            </div>


                            {/* DETALLE PRODUCTO */}
                            <div>

                                {/* Nombre */}
                                <h1 className="text-3xl font-semibold">
                                    {productoDetalle.nombre}
                                </h1>

                                {/* Precio */}
                                <p className="text-2xl mt-4 font-medium">
                                   {productoDetalle.precioVenta}
                                </p>


                                {/* Descripción */}
                                <p className="mt-6 text-gray-600 leading-relaxed">
                                    {productoDetalle.descripcion}
                                </p>


                               


                                {/* TALLA */}
                                <div className="mt-10">

                                    <p className="text-sm text-gray-500 mb-3">
                                        Talla
                                    </p>

                                    <div className="flex gap-3 flex-wrap">

                                        {productoDetalle.stock.map((item) => (
                                            <button
                                                key={item.idStock}
                                                className="min-w-[48px] h-10 border rounded-md text-sm hover:bg-black hover:text-white transition"
                                            >
                                                {item.talla}
                                            </button>
                                        ))}

                                    </div>

                                </div>


                                {/* CANTIDAD */}
                                <div className="mt-10">

                                    <p className="text-sm text-gray-500 mb-3">
                                        Cantidad
                                    </p>

                                    <div className="flex items-center border w-fit rounded-md">

                                        <button className="px-4 py-2 hover:bg-gray-100">
                                            -
                                        </button>

                                        <span className="px-5">
                                            1
                                        </span>

                                        <button className="px-4 py-2 hover:bg-gray-100">
                                            +
                                        </button>

                                    </div>

                                </div>


                                {/* BOTÓN */}
                                <div className="mt-12">

                                    <button className="w-full bg-black text-white py-3 rounded-md hover:opacity-90 transition">
                                        Añadir al carrito
                                    </button>

                                </div>

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    );
};