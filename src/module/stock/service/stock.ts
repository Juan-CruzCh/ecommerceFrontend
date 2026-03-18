import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../../core/config/intanceAxios"
import type { StockI, StockProducto } from "../interface/stock"
import type { httpResponse } from "../../../core/interface/core"

export async function guardarStock(stock: StockI[]): Promise<AxiosResponse> {

    try {
        const response = await instanceAxios.post(`stock`, {
            stock: stock
        })
        return response
    } catch (error) {
        throw error

    }
}

export async function ListarStocks(nombre: string, pagina: number): Promise<httpResponse<StockProducto>> {
    try {
        const response = await instanceAxios.get(`stock`, {
            params: {
                nombre,
                pagina
            }
        })
        return response.data
    } catch (error) {
        throw error

    }
}