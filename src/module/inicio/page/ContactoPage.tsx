import React from "react";

export const ContactoPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* MAPA */}
            <div className="w-full h-[420px] shadow-md">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6047.830333149744!2d-65.26287122269668!3d-19.034481971045135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f1ae126b914f21%3A0x7c31f47f6ecbc7ec!2sDestacamento%20111%20N%C2%BA%20192%2C%20Sucre%2C%20Bolivia!5e0!3m2!1sen!2sus!4v1563812068529!5m2!1sen!2sus"
                    className="w-full h-full border-0"
                    loading="lazy"
                ></iframe>
            </div>

            {/* DATOS DE CONTACTO */}
            <div className="max-w-6xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-3 gap-8 text-center">

                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <h3 className="font-semibold text-lg">Dirección</h3>
                        <p className="text-gray-600 mt-3">
                            Destacamento 111 Nº 193 <br />
                            Bolivia - Sucre
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <h3 className="font-semibold text-lg">Celular</h3>
                        <p className="text-gray-600 mt-3">
                            +591 74216356
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                        <h3 className="font-semibold text-lg">Correo</h3>
                        <p className="text-gray-600 mt-3">
                            marisadesign@gmail.com
                        </p>
                    </div>

                </div>

            </div>

            {/* FORMULARIO */}
            <div className="max-w-3xl mx-auto px-6 pb-24">

                <div className="bg-white shadow-md rounded-xl p-10">

                    <h2 className="text-2xl font-semibold text-center mb-10">
                        Suscríbete a nuestro boletín
                    </h2>

                    <form className="space-y-6">

                        <div>
                            <label className="block text-sm text-gray-500 mb-2">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                                placeholder="Tu nombre"
                            />
                        </div>

                        {/* TELEFONO */}
                        <div>
                            <label className="block text-sm text-gray-500 mb-2">
                                Número de teléfono
                            </label>
                            <input
                                type="tel"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                                placeholder="+591 70000000"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 mb-2">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                                placeholder="correo@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 mb-2">
                                Mensaje (opcional)
                            </label>
                            <textarea
                                rows={3}
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition"
                                placeholder="Escribe tu mensaje"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                        >
                            Suscribirse
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};