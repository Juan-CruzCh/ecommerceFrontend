import type { AxiosResponse } from "axios"
import type { formTalla, listarTallaI } from "../interface/talla"
import { instanceAxios } from "../../../core/config/intanceAxios"

export async function crearTalla(data: formTalla): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("talla", data)
        return response
    } catch (error) {
        throw error

    }
}
export async function listarTallas(): Promise<listarTallaI[]> {
    try {
        const response = await instanceAxios.get(`talla`)
        return response.data
    } catch (error) {
        throw error

    }
}