import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../../core/config/intanceAxios"
import type { filtroProductoPublicoI, FormProducto, ImagenesI, ListarProductoPublicoI, ProductoDetalle, ProductoI } from "../interface/producto"
import type { httpResponse } from "../../../core/interface/core"

export async function crearProducto(data: FormProducto): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("producto", data)
        return response
    } catch (error) {
        throw error

    }
}


export async function editarProducto(data: FormProducto, id: string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.patch(`producto/${id}`, data)
        return response
    } catch (error) {
        throw error

    }
}


export async function eliminarProducto(id: string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.delete(`producto/${id}`)
        return response
    } catch (error) {
        throw error

    }
}
export async function eliminarImagen(id: string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.delete(`imagen/${id}`)
        return response
    } catch (error) {
        throw error

    }
}
export async function listarImagenes(producto: string): Promise<ImagenesI[]> {
    try {
        const response = await instanceAxios.get(`imagenes/${producto}`)
        return response.data
    } catch (error) {
        throw error

    }
}
export async function cargarImagenes(imagenes: File[], producto: string): Promise<AxiosResponse> {
    try {


        const formData = new FormData();
        imagenes.forEach((file) => {
            formData.append("imagenes", file);
        });

        formData.append("producto", producto);


        const response = await instanceAxios.post("imagenes", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        return response
    } catch (error) {
        throw error

    }
}



export async function listarProductosPublico(filtro: filtroProductoPublicoI): Promise<ListarProductoPublicoI[]> {
    try {
        const response = await instanceAxios.get(`producto/publico`, {
            params: {
                categoria: filtro.categoria,
                destacado: filtro.destacado
            }
        })
        return response.data
    } catch (error) {
        throw error

    }
}

export async function listarProducto(nombre: string, pagina: number): Promise<httpResponse<ProductoI>> {
    try {
        const response = await instanceAxios.get("producto", {
            params: {
                nombre,
                pagina
            }
        })
        return response.data
    } catch (error) {
        throw error

    }
}

export async function asignarImagenPrincipal(idImagen: string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.patch(`producto/asignarImagenPrincipal/${idImagen}`)
        return response
    } catch (error) {
        throw error

    }
}
export async function detalleProductoPublico(producto: string): Promise<ProductoDetalle> {
    try {
        const response = await instanceAxios.get(`producto/publico/detalle/${producto}`)
        return response.data
    } catch (error) {
        throw error

    }
}
