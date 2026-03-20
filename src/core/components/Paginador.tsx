import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginadorProps {
    totalPaginas: number;
    onPageChange: (pagina: number) => void;
}

export const Paginador: React.FC<PaginadorProps> = ({ totalPaginas, onPageChange }) => {
    const [paginaActual, setPaginaActual] = useState(1);

    const irAPagina = (n: number) => {
        if (n < 1) n = 1;
        if (n > totalPaginas) n = totalPaginas;
        setPaginaActual(n);
        onPageChange(n);
    };

    const rango = 2;
    const paginas: (number | '...')[] = [];

    for (let i = 1; i <= totalPaginas; i++) {
        if (
            i === 1 ||
            i === totalPaginas ||
            (i >= paginaActual - rango && i <= paginaActual + rango)
        ) {
            paginas.push(i);
        } else if (
            (i === paginaActual - rango - 1 && i > 1) ||
            (i === paginaActual + rango + 1 && i < totalPaginas)
        ) {
            paginas.push('...');
        }
    }

    return (
        <div className="flex flex-col items-center gap-2 py-3">
            <div className="flex items-center gap-1">

                <button
                    onClick={() => irAPagina(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    className="p-2 border rounded disabled:opacity-50"
                >
                    <ArrowLeft size={16} />
                </button>


                {paginas.map((p, idx) =>
                    p === '...' ? (
                        <span key={idx} className="px-2 py-1 text-gray-500">
                            ...
                        </span>
                    ) : (
                        <button
                            key={idx}
                            onClick={() => irAPagina(p as number)}
                            className={`px-3 py-1 border rounded transition-colors ${p === paginaActual
                                    ? 'bg-black text-white font-bold'
                                    : 'bg-white text-black hover:bg-gray-200'
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    onClick={() => irAPagina(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    className="p-2 border rounded disabled:opacity-50"
                >
                    <ArrowRight size={16} />
                </button>
            </div>

            
        </div>
    );
};