import React, { useState, useEffect } from "react";

export const InicioPage = () => {
    // Imágenes del carrusel
    const imagenesHero = [
        "/img/imagenVertical.jpg",
        "/img/hero2.jpg", // Asegúrate de tener estas rutas o usa placeholders
        "/img/hero3.jpg"
    ];

    const [currentImage, setCurrentImage] = useState(0);

    // Efecto para cambio automático
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % imagenesHero.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [imagenesHero.length]);

    return (
        <div className="w-full bg-white text-zinc-800">

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

            {/* CATEGORIAS */}
            <div className="border-b border-zinc-100">
                <div className="max-w-7xl mx-auto py-8 px-6">
                    <div className="flex flex-wrap justify-center gap-10">
                        {["Polleras", "Blusas", "Mantas", "Sombreros"].map((cat) => (
                            <button key={cat} className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400 hover:text-pink-500 transition-colors">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* PRODUCTOS DESTACADOS */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-pink-500 text-[10px] uppercase tracking-widest font-bold">Selección especial</span>
                        <h2 className="text-3xl font-light uppercase tracking-widest mt-2">Destacados</h2>
                    </div>
                    <a href="#" className="text-xs uppercase tracking-widest border-b border-zinc-800 pb-1 hover:text-pink-500 hover:border-pink-500 transition-all">Ver todo</a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="aspect-[3/4] overflow-hidden bg-zinc-50 mb-6 relative">
                                <img
                                    src="/img/imagenVertical.jpg"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Producto"
                                />
                            </div>
                            <div className="space-y-2 text-center">
                                <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-zinc-600">Producto {item}</h3>
                                <p className="text-sm font-bold">Bs. 250</p>
                            </div>
                        </div>
                    ))}
                </div>
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