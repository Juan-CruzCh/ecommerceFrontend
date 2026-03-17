import type { AxiosResponse } from "axios"
import type { listarUsuariosI, UsuarioFormData } from "../interface/usuario"
import { instanceAxios } from "../../../core/config/intanceAxios"


export async function crearUsuario(data: UsuarioFormData): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post("usuario", data)
        return response
    } catch (error) {
        throw error

    }
}
export async function listarUsuarios(): Promise<listarUsuariosI[]> {
    try {
        const response = await instanceAxios.get("usuario")
        return response.data
    } catch (error) {
        throw error

    }
}