import type { AxiosResponse } from "axios"
import type { clienteForm, listarClienteI } from "../interface/cliente"
import { instanceAxios } from "../../../core/config/intanceAxios"
import type { httpResponse } from "../../../core/interface/core"

export async function crearCliente(data: clienteForm): Promise<listarClienteI> {
    try {
        const response = await instanceAxios.post(`cliente`, data)
        return response.data
    } catch (error) {
        throw error

    }
}
export async function editarCliente(data: clienteForm, id: string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.patch(`cliente/${id}`, data)
        return response
    } catch (error) {
        throw error

    }
}
export async function listarClientes(codigo: string, ci: string, nombre: string, apellidos: string, celular: string, direccion: string, pagina: number): Promise<httpResponse<listarClienteI>> {
    try {
        const response = await instanceAxios.get(`cliente`,
            {
                params: {
                    codigo,
                    apellidos,
                    ci,
                    nombre,
                    celular,
                    direccion,
                    pagina

                }
            }
        )
        return response.data
    } catch (error) {
        throw error

    }
}
export async function eliminarClientes(id: string): Promise<AxiosResponse> {
    try {
        const response = await instanceAxios.delete(`cliente/${id}`)
        return response
    } catch (error) {
        throw error

    }
}