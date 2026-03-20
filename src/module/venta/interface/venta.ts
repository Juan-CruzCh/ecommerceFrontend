
export interface carritoI {
    codigo: string
    stock: string
    nombre: string
    cantidad: number
    precio: number
    talla: string
}

export interface RealizarVentaI {
    cliente: string
    detalleVenta: { cantidad: number, stock: string }[]
}

export interface listarVentaI {
    _id: string
    codigo: string
    tracking: string
    totalConDescuento: number
    nombre: string
    apellidos: string
    fechaPedido: string
}

