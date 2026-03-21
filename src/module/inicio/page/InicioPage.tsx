import React, { useState, useEffect } from "react";
import type { ListarProductoPublicoI } from "../../producto/interface/producto";
import { listarProductosPublico } from "../../producto/service/producto";
import { urlBackend } from "../../../core/config/intanceAxios";
import { CardProducto } from "../../producto/components/CardProducto";
import { ProductosDestacadosPage } from "../../producto/components/ProductosDestacadosPage";
import { SeoManager } from "../../../core/components/SeoManager";

export const InicioPage = () => {

    const imagenesHero = [
        "/img/imagenVertical.jpg",
        "/img/hero2.jpg",
        "/img/hero3.jpg"
    ];

    const [currentImage, setCurrentImage] = useState(0);
    const [productos, setProductos] = useState<ListarProductoPublicoI[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % imagenesHero.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [imagenesHero.length]);

    useEffect(() => {
        (async () => {
            try {
                const reponse = await listarProductosPublico({ destacado: "destacado" })
                setProductos(reponse)
            } catch (error) {

            }
        })()
    }, [])
    return (
        <div className="w-full bg-white text-zinc-800">
            <SeoManager 
                titulo="Moda Tradicional y Diseños Únicos" 
                descripcion="Bienvenida a Tienda Marisa. Descubre nuestra nueva colección de ropa tradicional con diseños exclusivos que cuentan historias. Calidad y elegancia en cada prenda."
                ruta=""
                imagen="/img/Marisa.jpg" 
                tipo="website"
            />

            {/* HERO CARRUSEL - Limpio y con transición suave */}
            <div className="relative w-full h-[75vh] bg-zinc-100 overflow-hidden">
                {imagenesHero.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${index}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="text-center text-white px-6">
                        <span className="text-[10px] tracking-[0.4em] uppercase mb-4 block opacity-80">Nueva Colección</span>
                        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                            Tienda Marisa
                        </h1>
                        <p className="max-w-lg mx-auto text-lg font-light opacity-90 mb-10">
                            Moda tradicional con diseños únicos.
                        </p>
                        <button className="border border-white px-10 py-4 hover:bg-white hover:text-black transition-colors duration-500 uppercase text-[10px] tracking-[0.3em] font-bold">
                            Ver Colección
                        </button>
                    </div>
                </div>

                {/* Indicadores del carrusel (bolitas) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {imagenesHero.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentImage(i)}
                            className={`h-1 transition-all duration-500 ${i === currentImage ? "w-8 bg-white" : "w-4 bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>

                <div className="mt-6">
                        <ProductosDestacadosPage />
                </div>

            {/* INFO MARISA */}
            <div className="bg-zinc-50 py-32 border-t border-zinc-100">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl font-light uppercase tracking-[0.2em]">Nuestra Historia</h2>
                        <div className="h-px w-16 bg-pink-400"></div>
                        <p className="text-zinc-500 leading-relaxed font-light text-xl">
                            Marisa, una joven creativa apasionada por las tradiciones, creció rodeada de atuendos que contaban historias. Hoy, cada prenda de esta tienda es un tributo a esa identidad.
                        </p>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="border border-zinc-200 p-3 bg-white">
                            <img
                                src="/img/Marisa.jpg"
                                className="w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                alt="Marisa"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};