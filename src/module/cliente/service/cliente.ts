import type { AxiosResponse } from "axios"
import type { clienteForm, listarClienteI } from "../interface/cliente"
import { instanceAxios } from "../../../core/config/intanceAxios"
import type { httpResponse } from "../../../core/interface/core"

export async function crearCliente(data: clienteForm): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.post(`cliente`, data)
        return response
    } catch (error) {
        throw error

    }
}
export async function listarClientes(): Promise<httpResponse<listarClienteI>> {
    try {
        const response = await instanceAxios.get(`cliente`)
        return response.data
    } catch (error) {
        throw error

    }
}