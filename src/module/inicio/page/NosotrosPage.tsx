import React from "react";

export const NosotrosPage = () => {
    return (
        <div className="min-h-screen py-20">

            {/* HISTORIA */}
            <div className="max-w-6xl mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <img
                            src="/img/Marisa.jpg"
                            alt="Marisa"
                            className="w-full h-[420px] object-cover rounded-md"
                        />
                    </div>

                    <div className="text-gray-600 leading-relaxed">

                        <p>
                            Marisa, una joven creativa con un ojo para la moda y un corazón
                            apasionado por las tradiciones, creció en un pueblo donde cada
                            ocasión especial estaba marcada por hermosos atuendos
                            tradicionales.
                        </p>

                        <p className="mt-4">
                            Desde temprana edad, quedó fascinada por la forma en que las
                            prendas contaban historias, representaban la identidad de su
                            gente y celebraban eventos importantes.
                        </p>

                    </div>

                </div>

            </div>


            {/* MISIÓN Y VISIÓN */}
            <div className="max-w-6xl mx-auto px-6 mt-24">

                <div className="grid md:grid-cols-2 gap-16">

                    <div>

                        <h2 className="text-2xl font-semibold mb-4">
                            Misión
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Brindar a los clientes ropa y accesorios tradicionales a precios
                            accesibles que les permitan sentirse cómodos y expresar su estilo
                            personal, respetando siempre las tradiciones culturales.
                        </p>

                    </div>

                    <div>

                        <h2 className="text-2xl font-semibold mb-4">
                            Visión
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Crecer como empresa en el mercado de la moda tradicional,
                            ofreciendo productos de calidad que satisfagan las necesidades de
                            nuestros clientes y posicionarnos como una marca confiable.
                        </p>

                    </div>

                </div>

            </div>


            {/* EQUIPO */}
            <div className="max-w-6xl mx-auto px-6 mt-24">

                <h2 className="text-3xl font-semibold text-center mb-12">
                    Nosotros
                </h2>

                <div className="grid md:grid-cols-3 gap-10">

                    {[
                        {
                            nombre: "Mariana Gutierrez",
                            cargo: "Community Manager",
                        },
                        {
                            nombre: "Ivan Gutierrez",
                            cargo: "Community Manager",
                        },
                        {
                            nombre: "Sofia Gutierrez",
                            cargo: "Community Manager",
                        },
                    ].map((persona, i) => (
                        <div key={i} className="text-center">

                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                                className="w-full h-72 object-cover rounded-md"
                            />

                            <h3 className="mt-4 font-medium">
                                {persona.nombre}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                {persona.cargo}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};