import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../../core/config/intanceAxios"
import type { filtroProductoPublicoI, FormProducto, ImagenesI, ListarProductoPublicoI, ProductoI, VarianteForm, VarianteProductoI } from "../interface/producto"

export async function crearProducto(data: FormProducto): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("producto", data)
        return response
    } catch (error) {
        throw error

    }
}

export async function crearVarianteProducto(data: VarianteForm): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("varianteProducto", data)
        return response
    } catch (error) {
        throw error

    }
}
export async function listarImagenes(variante: string): Promise<ImagenesI[]> {
    try {
        const response = await instanceAxios.get(`imagenes/${variante}`)
        return response.data
    } catch (error) {
        throw error

    }
}
export async function cargarImagenes(imagenes: File[], variante: string, producto: string): Promise<AxiosResponse> {
    try {
        console.log(producto);

        const formData = new FormData();
        imagenes.forEach((file) => {
            formData.append("imagenes", file);
        });
        formData.append("productoVariante", variante);
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

export async function listarVarianteProducto(producto: string): Promise<VarianteProductoI[]> {
    try {
        const response = await instanceAxios.get(`varianteProducto/${producto}`)
        return response.data
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

export async function listarProducto(): Promise<ProductoI[]> {
    try {
        const response = await instanceAxios.get("producto")
        return response.data
    } catch (error) {
        throw error

    }
}