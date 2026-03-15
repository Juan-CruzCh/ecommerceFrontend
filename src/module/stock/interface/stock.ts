export interface StockI {
    producto: string
    varianteProducto: string
    cantidad: number,


}

export interface stockRegistradoI extends StockI {
    nombre: string
    categoria: string
    talla: string
    color: string
}