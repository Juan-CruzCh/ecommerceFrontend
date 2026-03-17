import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../../core/config/intanceAxios"

export async function autenticacion(usuario: string, password: string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("autenticacion", {
            usuario,
            password
        })
        return response
    } catch (error) {
        throw error

    }
}
export async function verificarAutenticacion(): Promise<{
    nombre:string
    apellidos:string,
    rol:string,
    usuario:string
}> {
    try {
        const response = await instanceAxios.get("verificar/autenticacion")
        return response.data
    } catch (error) {
        throw error

    }
}
export async function cerraSession(): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.get("cerrarSession")
        return response
    } catch (error) {
        throw error

    }
}