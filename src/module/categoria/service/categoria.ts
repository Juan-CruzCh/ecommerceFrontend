import type { AxiosResponse } from "axios";
import { instanceAxios } from "../../../core/config/intanceAxios";
import type { listarCategoriaI } from "../interface/categoria";


export async function crearCategoria(nombre: string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("categoria", { nombre })
        return response
    } catch (error) {
        throw error

    }
}
export async function listarCategoria(): Promise<listarCategoriaI[]> {
    try {
        const response = await instanceAxios.get("categoria")
        return response.data
    } catch (error) {
        throw error

    }
}
export async function listarCategoriaPublico(): Promise<listarCategoriaI[]> {
    try {
        const response = await instanceAxios.get("categoria/publico")
        return response.data
    } catch (error) {
        throw error

    }
}