export interface StockI {
    producto: string
    talla: string
    cantidad: number,



}

export interface stockRegistradoI extends StockI {
    nombre: string
    categoria: string
    nombreTalla: string

    precioVenta: number


}