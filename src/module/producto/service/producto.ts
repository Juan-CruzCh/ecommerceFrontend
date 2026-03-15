import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../../core/config/intanceAxios"
import type { FormProducto, ImagenesI, ProductoI, VarianteForm, VarianteProductoI } from "../interface/producto"

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
export async function cargarImagenes(imagenes: File[], variante: string): Promise<AxiosResponse> {
    try {
        const formData = new FormData();
        imagenes.forEach((file) => {
            formData.append("imagenes", file);
        });
        formData.append("productoVariante", variante);
        console.log(formData);

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

export async function listarProducto(): Promise<ProductoI[]> {
    try {
        const response = await instanceAxios.get("producto")
        return response.data
    } catch (error) {
        throw error

    }
}