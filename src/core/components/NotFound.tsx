import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-zinc-800 font-sans flex items-center justify-center p-8">
            <div className="max-w-md w-full text-center">
                {/* Código de Error con estilo similar al Header de Stock */}
                <div className="relative mb-8">
                    <h1 className="text-[120px] font-bold leading-none tracking-tighter italic text-zinc-100 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-xl font-bold uppercase tracking-[0.2em] bg-white px-4">
                            Fuera de Stock
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">
                            Error // Recurso no encontrado
                        </h2>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            La página que buscas ha sido movida, eliminada o nunca existió en nuestro inventario central.
                        </p>
                    </div>

                    <hr className="border-zinc-100" />

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-3 px-6 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
                        >
                            <ArrowLeft size={14} />
                            Volver al rastro
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
                        >
                            Ir al Panel General
                        </button>
                    </div>
                </div>

                {/* Decoración inferior estilo industrial */}
                <footer className="mt-16 pt-6 border-t border-zinc-50">
                    <p className="text-[9px] text-zinc-300 font-mono uppercase tracking-[0.3em]">
                        Terminal ID: {Math.random().toString(36).substring(7).toUpperCase()} // Status: 404_NOT_FOUND
                    </p>
                </footer>
            </div>
        </div>
    );
};