import React from "react";

export const CatalogoProductoPage = () => {
    const categorias = ["Polleras", "Blusas", "Mantas", "Sombreros", "Accesorios"];

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">

            {/* Título Minimalista */}
            <header className="text-center mb-12">
                <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-zinc-800">
                    Catálogo
                </h1>
                <div className="h-px w-12 bg-pink-400 mx-auto mt-4"></div>
            </header>

            {/* Categorías - Estilo de la InicioPage */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
                {categorias.map((cat, i) => (
                    <button
                        key={cat}
                        className={`text-xs uppercase tracking-widest font-bold transition-colors ${i === 0 ? "text-pink-500 border-b border-pink-500" : "text-zinc-400 hover:text-zinc-800"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grilla de Productos con las cards de la InicioPage */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-2xl font-light uppercase tracking-widest">Destacados</h2>
                    <a href="#" className="text-sm border-b border-zinc-800 pb-1 hover:text-pink-500 hover:border-pink-500 transition-all">Ver todo</a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="aspect-[3/4] overflow-hidden bg-zinc-50 mb-4">
                                <img
                                    src="/img/imagenVertical.jpg"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    alt="Producto"
                                />
                            </div>
                            <div className="space-y-1 text-center">
                                <h3 className="text-sm uppercase tracking-wider font-medium">Producto {item}</h3>
                                <p className="text-zinc-400 text-xs tracking-tighter">Colección Tradición</p>
                                <p className="text-sm font-bold pt-2">Bs. 250</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Línea final sutil */}
            <div className="w-full h-px bg-zinc-100 mt-20"></div>

        </div>
    );
};