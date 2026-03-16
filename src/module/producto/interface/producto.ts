export interface FormProducto {
    nombre: string;
    descripcion: string;
    categoria: string;
    destacado: boolean;
    publico: boolean;
    precioVenta: number
    precioCompra: number

}


export interface ProductoI {
    _id: string
    nombre: string
    codigo: string
    categoria: string
    publico: boolean
    destacado: boolean
    precioVenta: number
    precioCompra: number
    descripcion: string
}


export interface ImagenesI {
    _id: string;
    path: string;
    principal: boolean

}


export interface ListarProductoPublicoI {
    _id: string;
    nombre: string
    imagen: string
    precioVenta: number
}

export interface filtroProductoPublicoI {
    destacado?: string
    categoria?: string
}
