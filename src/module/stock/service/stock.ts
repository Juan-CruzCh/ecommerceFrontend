import type { AxiosResponse } from "axios"
import { instanceAxios } from "../../../core/config/intanceAxios"
import type { StockI } from "../interface/stock"
import { LogIn } from "lucide-react"


export async function guardarStock(stock: StockI[]): Promise<AxiosResponse> {
    console.log(stock);

    try {
        const response = await instanceAxios.post(`stock`, {
            stock: stock
        })
        return response
    } catch (error) {
        throw error

    }
}