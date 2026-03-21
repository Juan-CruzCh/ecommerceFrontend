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
    idCategoria: string
}


export interface ImagenesI {
    _id: string;
    nombre: string;
    principal: boolean

}


export interface ListarProductoPublicoI {
    _id: string;
    nombre: string
    imagenPrincipal: string
    precioVenta: number
}

export interface filtroProductoPublicoI {
    destacado?: string
    categoria?: string
}



export interface Stock {
    cantidad: number;
    idStock: string;
    productoTalla: string;
    talla: string;
}

export interface ProductoDetalle {
    descripcion: string;
    imagenes: ImagenesI[];
    nombre: string;
    precioVenta: number;
    stock: Stock[];
}