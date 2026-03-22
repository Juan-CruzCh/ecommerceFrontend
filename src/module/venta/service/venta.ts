import type { AxiosResponse } from "axios"
import type { DetalleVentaI, listarVentaI, RealizarVentaI } from "../interface/venta"
import { instanceAxios } from "../../../core/config/intanceAxios"

export async function realizarVenta(data: RealizarVentaI): Promise<AxiosResponse> {

    try {
        const response = await instanceAxios.post(`realizarVenta`, data)
        return response
    } catch (error) {
        throw error

    }
}

export async function listarVentas(f1: string, f2: string): Promise<listarVentaI[]> {

    try {
        const response = await instanceAxios.post(`listarVenta`, {

            fechaInicio: f1,
            fechaFin: f2


        })
        return response.data
    } catch (error) {
        throw error

    }
}
export async function detalleVentas(venta: string): Promise<DetalleVentaI> {

    try {
        const response = await instanceAxios.get(`detalleVenta/${venta}`)
        return response.data
    } catch (error) {
        throw error

    }
}
