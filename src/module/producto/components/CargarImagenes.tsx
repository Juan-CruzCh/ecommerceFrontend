import { Plus, X } from 'lucide-react'
import { useEffect, useState, type ChangeEvent } from 'react'
import type { ImagenesI } from '../interface/producto'
import { asignarImagenPrincipal, cargarImagenes, listarImagenes } from '../service/producto'
import { HttpStatusCode, type AxiosError } from 'axios'
import { useEstadoReload } from '../../../core/utils/appUtil'
import { convertirAWebP } from '../utils/producto'
import { urlBackend } from '../../../core/config/intanceAxios'

export const CargarImagenes = ({ producto }: { producto: string }) => {
    const [imagenes, setImagenes] = useState<ImagenesI[]>([])
    const [subiendo, setSubiendo] = useState(false)
    const { isReloading, triggerReload } = useEstadoReload()
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const archivosOriginales = Array.from(e.target.files);
        setSubiendo(true);
        try {
            const archivosWebP = await Promise.all(
                archivosOriginales.map(archivo => convertirAWebP(archivo))
            );
            const response = await cargarImagenes(archivosWebP, producto);
            if (response.status == HttpStatusCode.Created) {
                triggerReload()

            }
        } catch (error) {
            const e = error as AxiosError<any>
            console.log(e.response?.data);

        } finally {
            setSubiendo(false);
            e.target.value = "";
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await listarImagenes(producto)
                setImagenes(response)
            } catch (error) {

            }
        })()
    }, [isReloading, producto])

    const imagenPrincial = async (id: string) => {
        try {
            const response = await asignarImagenPrincipal(id)
            if (response.status == HttpStatusCode.Ok) {
                triggerReload()
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="grid grid-cols-4 gap-2">


            {imagenes.map(img => (
                <div
                    key={img._id}
                    className="aspect-square border border-zinc-200 relative group bg-zinc-50 overflow-hidden"
                >
                    <img
                        src={`${urlBackend}/${img.nombre}`}
                        className="w-full h-full object-cover"
                    />

                    {/* Botón eliminar */}
                    <button
                        className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X size={10} />
                    </button>

                    {/* Botón imagen principal */}
                    <button
                        onClick={() => imagenPrincial(img._id)}
                        className={`absolute bottom-1 left-1 text-[10px] px-2 py-1 rounded 
            ${img.principal ? "bg-green-600 text-white" : "bg-white/80 hover:bg-white"}`}
                    >
                        {img.principal ? "Principal" : "Hacer principal"}
                    </button>
                </div>
            ))}

            <label className="aspect-square border border-dashed border-zinc-300 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 transition-colors disabled:opacity-50">

                <Plus size={16} className="text-zinc-400" />
                <span className="text-[8px] font-bold uppercase text-zinc-400">Subir</span>

                <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                    disabled={subiendo}
                    accept="image/*"
                />
            </label>
        </div>
    )
}
