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
export interface StockProducto {
    _id: string
    cantidad: number
    imagen: string
    categoria: string
    codigo: string
    producto: string
    talla: string
    descripcion: string
    precioVenta: number
}