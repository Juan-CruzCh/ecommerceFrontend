import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../../core/config/intanceAxios"
import type { StockI } from "../interface/stock"

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

export async function ListarStock(): Promise<AxiosResponse> {
  
    try {
        const response = await instanceAxios.get(`stock`)
        return response.data
    } catch (error) {
        throw error

    }
}