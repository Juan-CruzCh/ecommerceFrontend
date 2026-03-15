export interface FormProducto {
    nombre: string;
    descripcion: string;
    categoria: string;
    destacado: boolean;
    publico: boolean;
}


export interface ProductoI {
    _id: string
    nombre: string
    codigo: string
    categoria: string
    publico: boolean
    destacado: boolean
}

export interface VarianteForm {
    talla: string;
    color: string;
    producto: string
}

export interface VarianteProductoI {
    _id: string;
    talla: string;
    color: string;
    producto: string;
    fecha: string;
    flag: string;
}
export interface ImagenesI {
    _id: string;
    path: string;

}


export interface StockI {
    producto: string
    varianteProducto: string
    cantidad: number,
    precio: number

}

export interface stockRegistradoI extends StockI {
    nombre:string
    categoria:string
    talla:string
    color:string
}