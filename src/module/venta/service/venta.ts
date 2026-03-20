import type { AxiosResponse } from "axios"
import type { listarVentaI, RealizarVentaI } from "../interface/venta"
import { instanceAxios } from "../../../core/config/intanceAxios"

export async function realizarVenta(data: RealizarVentaI): Promise<AxiosResponse> {

    try {
        const response = await instanceAxios.post(`realizarVenta`, data)
        return response
    } catch (error) {
        throw error

    }
}

export async function listarVentas(): Promise<listarVentaI[]> {

    try {
        const response = await instanceAxios.get(`listarVenta`)
        return response.data
    } catch (error) {
        throw error

    }
}
