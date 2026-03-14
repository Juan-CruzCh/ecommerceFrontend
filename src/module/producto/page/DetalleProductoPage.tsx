import React from "react";

export const ProductoDetallePage = () => {
    return (
        <div className="min-h-screen py-20">

            <div className="max-w-6xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-16">

                    {/* GALERÍA */}
                    <div>

                        <img
                            src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0"
                            className="w-full h-[520px] object-cover rounded-md"
                        />

                        {/* thumbnails */}
                        <div className="flex gap-3 mt-4">

                            {[
                                "https://images.unsplash.com/photo-1593032465175-481ac7f401a0",
                                "https://images.unsplash.com/photo-1520975922327-97b3c16f3e86",
                                "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
                            ].map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    className="w-20 h-20 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 transition"
                                />
                            ))}

                        </div>

                    </div>


                    {/* DETALLE PRODUCTO */}
                    <div>

                        {/* Nombre */}
                        <h1 className="text-3xl font-semibold">
                            Pollera Tradicional Bordada
                        </h1>

                        {/* Precio */}
                        <p className="text-2xl mt-4 font-medium">
                            Bs 320
                        </p>


                        {/* Descripción */}
                        <p className="mt-6 text-gray-600 leading-relaxed">
                            Pollera artesanal confeccionada con telas tradicionales
                            y bordados únicos. Ideal para eventos culturales y
                            festividades especiales.
                        </p>


                        {/* COLOR */}
                        <div className="mt-10">

                            <p className="text-sm text-gray-500">
                                Color
                            </p>

                            <p className="mt-1">
                                Rojo
                            </p>

                        </div>


                        {/* TALLA */}
                        <div className="mt-10">

                            <p className="text-sm text-gray-500 mb-3">
                                Talla
                            </p>

                            <div className="flex gap-3 flex-wrap">

                                {["S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        className="min-w-[48px] h-10 border rounded-md text-sm hover:bg-black hover:text-white transition"
                                    >
                                        {size}
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

            </div>

        </div>
    );
};